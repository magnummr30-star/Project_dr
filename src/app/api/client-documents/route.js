import { Readable } from "node:stream";
import { GridFSBucket, ObjectId } from "mongodb";
import { getClientAuthSession } from "@/lib/clientAuthSession";
import { getMongoDb } from "@/lib/mongodb";
import { normalizeWhatsAppPhone } from "@/lib/ultramsg";

export const runtime = "nodejs";

const collectionName = process.env.MONGODB_CONSULTATIONS_COLLECTION || "consultation_requests";
const bucketName = "client_documents";
const maxFileSize = 10 * 1024 * 1024;
const maxFiles = 10;
const acceptedExtensions = new Set([".pdf", ".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"]);

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function getFileExtension(fileName) {
  const normalizedName = cleanText(fileName).toLowerCase();
  const extensionStart = normalizedName.lastIndexOf(".");
  return extensionStart >= 0 ? normalizedName.slice(extensionStart) : "";
}

function isAcceptedFile(file) {
  const extension = getFileExtension(file.name);
  const mimeType = cleanText(file.type).toLowerCase();

  return acceptedExtensions.has(extension) && (mimeType === "application/pdf" || mimeType.startsWith("image/"));
}

function createSafeFileName(fileName) {
  const name = cleanText(fileName) || "client-document";
  return name.replace(/[^\w.\-\u0600-\u06FF]+/g, "-").slice(0, 120);
}

function uploadBuffer(bucket, buffer, fileName, metadata) {
  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(fileName, {
      contentType: metadata.mimeType,
      metadata
    });

    uploadStream.once("error", reject);
    uploadStream.once("finish", () => {
      resolve({
        fileId: uploadStream.id,
        fileName: uploadStream.filename
      });
    });

    uploadStream.end(buffer);
  });
}

function createFileAccessMessage(status = 401) {
  const html = `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>لا توجد صلاحية</title>
    <style>
      :root {
        color-scheme: light;
        --green: #0c3b2d;
        --green-soft: #128456;
        --gold: #e5ad39;
        --ink: #10231d;
        --muted: #60736d;
      }

      * {
        box-sizing: border-box;
      }

      body {
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        background:
          radial-gradient(circle at 78% 18%, rgba(229, 173, 57, 0.2), transparent 28%),
          radial-gradient(circle at 14% 22%, rgba(18, 132, 86, 0.16), transparent 30%),
          #f7faf8;
        color: var(--ink);
        font-family: Tahoma, Arial, sans-serif;
        padding: 24px;
      }

      main {
        width: min(560px, 100%);
        border: 1px solid rgba(18, 132, 86, 0.16);
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.94);
        box-shadow: 0 28px 70px rgba(16, 35, 29, 0.14);
        padding: 34px 28px;
        text-align: center;
      }

      .icon {
        width: 72px;
        height: 72px;
        display: inline-grid;
        place-items: center;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--green), var(--green-soft));
        color: var(--gold);
        font-size: 34px;
        font-weight: 900;
        margin-bottom: 18px;
      }

      h1 {
        margin: 0;
        color: var(--green);
        font-size: clamp(28px, 6vw, 42px);
        line-height: 1.25;
      }

      p {
        margin: 14px auto 0;
        max-width: 420px;
        color: var(--muted);
        font-size: 16px;
        font-weight: 700;
        line-height: 1.8;
      }

      a {
        min-height: 48px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: linear-gradient(135deg, var(--green), var(--green-soft));
        color: #fff;
        padding: 0 22px;
        margin-top: 24px;
        font-size: 15px;
        font-weight: 900;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <main>
      <div class="icon" aria-hidden="true">!</div>
      <h1>ليس لك صلاحية الدخول على هذا الملف</h1>
      <p>هذا الملف خاص بحساب العميل ولا يمكن عرضه إلا بعد تسجيل الدخول من لوحة العملاء.</p>
      <a href="/clients/login">الذهاب إلى دخول العملاء</a>
    </main>
  </body>
</html>`;

  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store"
    }
  });
}

function getClientDocuments(clientRecord) {
  return Array.isArray(clientRecord.clientDocuments) ? clientRecord.clientDocuments : [];
}

function mapClientDocument(document) {
  const fileId = String(document.fileId);
  const viewUrl = `/api/client-documents?fileId=${encodeURIComponent(fileId)}`;

  return {
    fileId,
    originalName: document.originalName || document.fileName || "ملف مرفق",
    documentType: document.documentType || "غير محدد",
    mimeType: document.mimeType || "",
    size: document.size || 0,
    uploadedAt: document.uploadedAt || "",
    viewUrl
  };
}

function getObjectId(value) {
  try {
    return new ObjectId(value);
  } catch (error) {
    return null;
  }
}

async function findClientRecord(collection, consultationId, phone) {
  return collection.findOne({
    id: consultationId,
    $or: [
      { clientLoginPhone: phone },
      { phoneNormalized: phone }
    ]
  });
}

export async function GET(request) {
  const session = getClientAuthSession(request);

  if (!session) {
    return createFileAccessMessage(401);
  }

  const { searchParams } = new URL(request.url);
  const consultationId = session.consultationId;
  const phone = session.phone;
  const fileId = cleanText(searchParams.get("fileId"));

  try {
    const db = await getMongoDb();
    const collection = db.collection(collectionName);
    const clientRecord = await findClientRecord(collection, consultationId, phone);

    if (!clientRecord) {
      return createFileAccessMessage(403);
    }

    const clientDocuments = getClientDocuments(clientRecord);

    if (!fileId) {
      return Response.json({
        ok: true,
        documents: clientDocuments.map((document) => mapClientDocument(document))
      });
    }

    const objectId = getObjectId(fileId);
    const documentRecord = clientDocuments.find((document) => String(document.fileId) === fileId);

    if (!objectId || !documentRecord) {
      return createFileAccessMessage(403);
    }

    const bucket = new GridFSBucket(db, { bucketName });
    const gridFile = await bucket.find({ _id: objectId, "metadata.consultationId": consultationId }).next();

    if (!gridFile) {
      return createFileAccessMessage(403);
    }

    const downloadStream = bucket.openDownloadStream(objectId);
    const fileName = encodeURIComponent(documentRecord.originalName || gridFile.filename || "client-document");

    return new Response(Readable.toWeb(downloadStream), {
      headers: {
        "Content-Type": gridFile.contentType || documentRecord.mimeType || "application/octet-stream",
        "Content-Disposition": `inline; filename*=UTF-8''${fileName}`,
        "Cache-Control": "private, no-store"
      }
    });
  } catch (error) {
    console.error("Failed to load client documents", error);
    return Response.json({ error: "Unable to load documents" }, { status: 500 });
  }
}

export async function POST(request) {
  const session = getClientAuthSession(request);

  if (!session) {
    return Response.json({ error: "Login is required" }, { status: 401 });
  }

  const formData = await request.formData();
  const consultationId = cleanText(formData.get("consultationId"));
  const phone = normalizeWhatsAppPhone(formData.get("phone"));
  const documentType = cleanText(formData.get("documentType"));
  const files = formData
    .getAll("documents")
    .filter((file) => typeof file === "object" && typeof file.arrayBuffer === "function" && file.size > 0);

  if (!consultationId || !phone || !documentType || !files.length) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (consultationId !== session.consultationId || phone !== session.phone) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  if (files.length > maxFiles) {
    return Response.json(
      {
        code: "too_many_files",
        error: "Too many files"
      },
      { status: 400 }
    );
  }

  const invalidFile = files.find((file) => !isAcceptedFile(file) || file.size > maxFileSize);

  if (invalidFile) {
    return Response.json(
      {
        code: "invalid_file_type",
        error: "Only PDF and image files are accepted"
      },
      { status: 415 }
    );
  }

  try {
    const db = await getMongoDb();
    const collection = db.collection(collectionName);
    const clientRecord = await findClientRecord(collection, consultationId, phone);

    if (!clientRecord) {
      return Response.json({ error: "Consultation was not found" }, { status: 404 });
    }

    const bucket = new GridFSBucket(db, { bucketName });
    const uploadedAt = new Date();
    const uploadedDocuments = [];

    for (const file of files) {
      const safeFileName = `${consultationId}-${Date.now()}-${createSafeFileName(file.name)}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      const metadata = {
        consultationId,
        clientPhone: phone,
        documentType,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        uploadedAt
      };
      const uploadResult = await uploadBuffer(bucket, buffer, safeFileName, metadata);

      uploadedDocuments.push({
        ...metadata,
        fileId: uploadResult.fileId,
        fileName: uploadResult.fileName
      });
    }

    await collection.updateOne(
      { _id: clientRecord._id },
      {
        $push: {
          clientDocuments: {
            $each: uploadedDocuments
          }
        },
        $set: {
          clientDocumentsUpdatedAt: uploadedAt,
          dataCompletionStatus: "documents_uploaded"
        }
      }
    );

    return Response.json({
      ok: true,
      documents: uploadedDocuments.map((document) => mapClientDocument(document))
    });
  } catch (error) {
    console.error("Failed to upload client documents", error);
    return Response.json({ error: "Unable to upload documents" }, { status: 500 });
  }
}
