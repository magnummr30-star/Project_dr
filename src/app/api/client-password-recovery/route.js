import { createClientCredentialsMessage, generateClientPassword } from "@/lib/clientCredentials";
import { getMongoDb } from "@/lib/mongodb";
import { normalizeWhatsAppPhone, sendWhatsAppMessage } from "@/lib/ultramsg";

export const runtime = "nodejs";

const collectionName = process.env.MONGODB_CONSULTATIONS_COLLECTION || "consultation_requests";

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

export async function POST(request) {
  const body = await request.json();
  const phone = normalizeWhatsAppPhone(body.phone);

  if (!phone) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const db = await getMongoDb();
    const collection = db.collection(collectionName);
    const clientRecord = await collection.findOne({
      $or: [
        { clientLoginPhone: phone },
        { phoneNormalized: phone }
      ]
    });

    if (!clientRecord) {
      return Response.json(
        {
          code: "client_not_found",
          error: "Client account was not found"
        },
        { status: 404 }
      );
    }

    const accountRecord = {
      ...clientRecord,
      clientLoginPhone: clientRecord.clientLoginPhone || phone,
      phoneNormalized: clientRecord.phoneNormalized || phone,
      clientPassword: cleanText(clientRecord.clientPassword) || generateClientPassword()
    };

    const messageResult = await sendWhatsAppMessage(
      accountRecord.clientLoginPhone,
      createClientCredentialsMessage(accountRecord, { isRecovery: true })
    );

    await collection.updateOne(
      { _id: clientRecord._id },
      {
        $set: {
          clientLoginPhone: accountRecord.clientLoginPhone,
          phoneNormalized: accountRecord.phoneNormalized,
          clientPassword: accountRecord.clientPassword,
          clientAccountStatus: clientRecord.clientAccountStatus || "active",
          passwordRecoveryLastRequestedAt: new Date(),
          passwordRecoveryDeliveryStatus: "sent",
          passwordRecoverySentAt: new Date(),
          passwordRecoveryMessageResult: messageResult
        }
      }
    );

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Failed to recover client password", error);
    return Response.json({ error: "Unable to recover password" }, { status: 500 });
  }
}
