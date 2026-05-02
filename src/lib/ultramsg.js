const defaultCountryCode = "971";

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

export function normalizeWhatsAppPhone(value) {
  const phone = cleanText(value);
  let digits = phone.replace(/[^\d+]/g, "");

  if (digits.startsWith("+")) {
    digits = digits.slice(1);
  }

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  if (digits.startsWith("0")) {
    digits = `${defaultCountryCode}${digits.slice(1)}`;
  } else if (digits.startsWith("5") && digits.length === 9) {
    digits = `${defaultCountryCode}${digits}`;
  }

  return digits.replace(/\D/g, "");
}

export async function checkWhatsAppNumber(value) {
  const apiUrl = process.env.ULTRAMSG_API_URL;
  const token = process.env.ULTRAMSG_TOKEN;
  const phone = normalizeWhatsAppPhone(value);

  if (!apiUrl || !token) {
    throw new Error("UltraMsg is not configured");
  }

  if (!phone) {
    return { isValid: false, phone, chatId: "" };
  }

  const chatId = `${phone}@c.us`;
  const url = new URL("contacts/check", apiUrl);
  url.searchParams.set("token", token);
  url.searchParams.set("chatId", chatId);
  url.searchParams.set("nocache", "true");

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("UltraMsg number check failed");
  }

  const result = await response.json();

  return {
    isValid: result.status === "valid",
    phone,
    chatId: result.chatId || chatId,
    status: result.status
  };
}

export async function sendWhatsAppMessage(to, body) {
  const apiUrl = process.env.ULTRAMSG_API_URL;
  const token = process.env.ULTRAMSG_TOKEN;
  const phone = normalizeWhatsAppPhone(to);

  if (!apiUrl || !token) {
    throw new Error("UltraMsg is not configured");
  }

  if (!phone || !cleanText(body)) {
    throw new Error("WhatsApp message is missing required data");
  }

  const url = new URL("messages/chat", apiUrl);
  const payload = new URLSearchParams({
    token,
    to: phone,
    body
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: payload,
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("UltraMsg message send failed");
  }

  return response.json();
}
