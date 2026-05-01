import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { services } from "@/data/services";

export const runtime = "nodejs";

const storageDir = path.join(process.cwd(), "storage");
const storageFile = path.join(storageDir, "consultation-requests.json");

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
  const selectedService = services.find((service) => service.slug === body.serviceSlug);

  const record = {
    id: `consult-${Date.now()}`,
    createdAt: new Date().toISOString(),
    fullName: cleanText(body.fullName),
    phone: cleanText(body.phone),
    email: cleanText(body.email),
    location: cleanText(body.location),
    investorType: cleanText(body.investorType),
    serviceSlug: selectedService?.slug ?? "",
    serviceTitle: selectedService?.title ?? "",
    projectStage: cleanText(body.projectStage),
    contactWindow: cleanText(body.contactWindow),
    message: cleanText(body.message)
  };

  if (!record.fullName || !record.phone || !record.serviceSlug) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  await mkdir(storageDir, { recursive: true });
  const requests = await readRequests();
  requests.unshift(record);
  await writeFile(storageFile, `${JSON.stringify(requests, null, 2)}\n`, "utf8");

  return Response.json({ ok: true, id: record.id });
}
