import { services } from "@/data/services";
import { createClientCredentialsMessage, generateClientPassword } from "@/lib/clientCredentials";
import { getMongoDb } from "@/lib/mongodb";
import { checkWhatsAppNumber, normalizeWhatsAppPhone, sendWhatsAppMessage } from "@/lib/ultramsg";

export const runtime = "nodejs";

const collectionName = process.env.MONGODB_CONSULTATIONS_COLLECTION || "consultation_requests";
const recommendServiceSlug = "recommend-service";

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function cleanEmail(value) {
  return cleanText(value).toLowerCase();
}

function getServiceSelection(serviceSlug) {
  if (serviceSlug === recommendServiceSlug) {
    return {
      serviceSlug: recommendServiceSlug,
      serviceTitle: "ترشيح الخدمة المناسبة"
    };
  }

  const selectedService = services.find((service) => service.slug === serviceSlug);

  return {
    serviceSlug: selectedService?.slug ?? "",
    serviceTitle: selectedService?.title ?? ""
  };
}

export async function POST(request) {
  const body = await request.json();
  const selectedService = getServiceSelection(cleanText(body.serviceSlug));
  const mobilePhone = cleanText(body.mobilePhone);
  const whatsappPhone = cleanText(body.phone);

  const record = {
    id: `consult-${Date.now()}`,
    createdAt: new Date(),
    fullName: cleanText(body.fullName),
    mobilePhone,
    mobilePhoneNormalized: mobilePhone ? normalizeWhatsAppPhone(mobilePhone) : "",
    phone: whatsappPhone,
    phoneNormalized: normalizeWhatsAppPhone(whatsappPhone),
    whatsappPhone,
    whatsappPhoneNormalized: normalizeWhatsAppPhone(whatsappPhone),
    email: cleanEmail(body.email),
    location: cleanText(body.location),
    investorType: cleanText(body.investorType),
    consultationNeed: cleanText(body.consultationNeed),
    serviceSlug: selectedService.serviceSlug,
    serviceTitle: selectedService.serviceTitle,
    projectStage: cleanText(body.projectStage),
    contactWindow: cleanText(body.contactWindow),
    message: cleanText(body.message),
    status: "new",
    source: "website-consultation-form"
  };

  if (!record.fullName || !record.mobilePhone || !record.phone || !record.serviceSlug) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const db = await getMongoDb();
    const collection = db.collection(collectionName);
    const duplicateChecks = [
      { mobilePhone: record.mobilePhone },
      { mobilePhoneNormalized: record.mobilePhoneNormalized },
      { phone: record.phone },
      { phoneNormalized: record.phoneNormalized },
      { whatsappPhone: record.whatsappPhone },
      { whatsappPhoneNormalized: record.whatsappPhoneNormalized }
    ];

    if (record.email) {
      duplicateChecks.push({ email: record.email });
    }

    const existingRequest = await collection.findOne({ $or: duplicateChecks });

    if (existingRequest) {
      return Response.json(
        {
          code: "duplicate_consultation",
          error: "Client data already registered"
        },
        { status: 409 }
      );
    }

    const whatsappCheck = await checkWhatsAppNumber(record.whatsappPhone);

    if (!whatsappCheck.isValid) {
      return Response.json(
        {
          code: "whatsapp_not_registered",
          error: "Phone number is not registered on WhatsApp"
        },
        { status: 422 }
      );
    }

    record.phoneNormalized = whatsappCheck.phone;
    record.whatsappPhoneNormalized = whatsappCheck.phone;
    record.whatsappChatId = whatsappCheck.chatId;
    record.whatsappVerifiedAt = new Date();
    record.clientLoginPhone = whatsappCheck.phone;
    record.clientPassword = generateClientPassword();
    record.clientAccountStatus = "active";
    record.clientAccountCreatedAt = new Date();
    record.credentialsDeliveryStatus = "pending";

    await collection.insertOne(record);

    try {
      const messageResult = await sendWhatsAppMessage(record.phoneNormalized, createClientCredentialsMessage(record));
      await collection.updateOne(
        { id: record.id },
        {
          $set: {
            credentialsDeliveryStatus: "sent",
            credentialsSentAt: new Date(),
            credentialsMessageResult: messageResult
          }
        }
      );
    } catch (error) {
      await collection.updateOne(
        { id: record.id },
        {
          $set: {
            credentialsDeliveryStatus: "failed",
            credentialsDeliveryError: error.message,
            credentialsDeliveryFailedAt: new Date()
          }
        }
      );
      throw error;
    }
  } catch (error) {
    console.error("Failed to save consultation request", error);
    return Response.json({ error: "Unable to save request" }, { status: 500 });
  }

  return Response.json({ ok: true, id: record.id });
}
