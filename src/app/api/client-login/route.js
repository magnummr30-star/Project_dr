import { createClientAuthCookie, createClientAuthToken } from "@/lib/clientAuthSession";
import { getMongoDb } from "@/lib/mongodb";
import { normalizeWhatsAppPhone } from "@/lib/ultramsg";

export const runtime = "nodejs";

const collectionName = process.env.MONGODB_CONSULTATIONS_COLLECTION || "consultation_requests";

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
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

export async function POST(request) {
  const body = await request.json();
  const phone = normalizeWhatsAppPhone(body.phone);
  const password = cleanText(body.password);

  if (!phone || !password) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const db = await getMongoDb();
    const clientRecord = await db.collection(collectionName).findOne({
      clientLoginPhone: phone,
      clientPassword: password,
      clientAccountStatus: "active"
    });

    if (!clientRecord) {
      return Response.json({ error: "Invalid login data" }, { status: 401 });
    }

    const clientDocuments = Array.isArray(clientRecord.clientDocuments) ? clientRecord.clientDocuments : [];
    const clientPhone = clientRecord.phone || clientRecord.clientLoginPhone;
    const clientPortalToken = createClientAuthToken({
      consultationId: clientRecord.id,
      phone: clientRecord.clientLoginPhone || normalizeWhatsAppPhone(clientPhone)
    });

    return Response.json({
      ok: true,
      client: {
        clientName: clientRecord.fullName || "عميل الشركة",
        phone: clientPhone,
        email: clientRecord.email || "",
        location: clientRecord.location || "",
        investorType: clientRecord.investorType || "",
        consultationNeed: clientRecord.consultationNeed || "",
        projectCode: clientRecord.id,
        serviceTitle: clientRecord.serviceTitle || "استشارة متخصصة",
        projectStage: clientRecord.projectStage || "",
        contactWindow: clientRecord.contactWindow || "",
        message: clientRecord.message || "",
        requestStatus: clientRecord.status || "new",
        consultationStatus: "جاري الاتصال",
        consultationDate: clientRecord.createdAt,
        uploadedDocumentsCount: clientDocuments.length,
        uploadedDocuments: clientDocuments.map((document) => mapClientDocument(document)),
        lastDocumentsUploadedAt: clientRecord.clientDocumentsUpdatedAt || "",
        clientPortalToken,
        createdAt: clientRecord.createdAt
      }
    }, {
      headers: {
        "Set-Cookie": createClientAuthCookie(clientPortalToken)
      }
    });
  } catch (error) {
    console.error("Failed to login client", error);
    return Response.json({ error: "Unable to login" }, { status: 500 });
  }
}
