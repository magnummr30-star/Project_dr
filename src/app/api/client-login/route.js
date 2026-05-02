import { getMongoDb } from "@/lib/mongodb";
import { normalizeWhatsAppPhone } from "@/lib/ultramsg";

export const runtime = "nodejs";

const collectionName = process.env.MONGODB_CONSULTATIONS_COLLECTION || "consultation_requests";

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
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

    return Response.json({
      ok: true,
      client: {
        clientName: clientRecord.fullName || "عميل الشركة",
        phone: clientRecord.phone || clientRecord.clientLoginPhone,
        projectCode: clientRecord.id,
        serviceTitle: clientRecord.serviceTitle || "استشارة متخصصة",
        projectStage: clientRecord.projectStage || "",
        contactWindow: clientRecord.contactWindow || "",
        requestStatus: clientRecord.status || "new",
        createdAt: clientRecord.createdAt
      }
    });
  } catch (error) {
    console.error("Failed to login client", error);
    return Response.json({ error: "Unable to login" }, { status: 500 });
  }
}
