import {
  clearClientAuthCookie,
  createClientAuthCookie,
  verifyClientAuthToken
} from "@/lib/clientAuthSession";
import { getMongoDb } from "@/lib/mongodb";

export const runtime = "nodejs";

const collectionName = process.env.MONGODB_CONSULTATIONS_COLLECTION || "consultation_requests";

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

export async function POST(request) {
  const body = await request.json();
  const token = cleanText(body.token);
  const session = verifyClientAuthToken(token);

  if (!session) {
    return Response.json({ error: "Invalid session" }, { status: 401 });
  }

  try {
    const db = await getMongoDb();
    const clientRecord = await db.collection(collectionName).findOne({
      id: session.consultationId,
      clientLoginPhone: session.phone,
      clientAccountStatus: "active"
    });

    if (!clientRecord) {
      return Response.json({ error: "Invalid session" }, { status: 401 });
    }

    return Response.json(
      { ok: true },
      {
        headers: {
          "Set-Cookie": createClientAuthCookie(token)
        }
      }
    );
  } catch (error) {
    console.error("Failed to refresh client session", error);
    return Response.json({ error: "Unable to refresh session" }, { status: 500 });
  }
}

export async function DELETE() {
  return Response.json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": clearClientAuthCookie()
      }
    }
  );
}
