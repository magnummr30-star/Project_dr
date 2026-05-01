import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const storageDir = path.join(process.cwd(), "storage");
const storageFile = path.join(storageDir, "inquiry-requests.json");

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

async function readRequests() {
  try {
    const content = await readFile(storageFile, "utf8");
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
}

export async function POST(request) {
  const body = await request.json();

  const record = {
    id: `inquiry-${Date.now()}`,
    createdAt: new Date().toISOString(),
    topic: cleanText(body.topic),
    phone: cleanText(body.phone),
    message: cleanText(body.message)
  };

  if (!record.phone || !record.message) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  await mkdir(storageDir, { recursive: true });
  const requests = await readRequests();
  requests.unshift(record);
  await writeFile(storageFile, `${JSON.stringify(requests, null, 2)}\n`, "utf8");

  return Response.json({ ok: true, id: record.id });
}
