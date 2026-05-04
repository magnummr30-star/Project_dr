import { createHmac, timingSafeEqual } from "node:crypto";

export const clientAuthCookieName = "greenClientPortalAuth";

const tokenMaxAgeSeconds = 7 * 24 * 60 * 60;
const cookieMaxAgeSeconds = 30 * 60;

function getSecret() {
  return process.env.CLIENT_SESSION_SECRET || process.env.MONGODB_URI || "green-client-session-development-secret";
}

function base64UrlEncode(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function base64UrlDecode(value) {
  return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
}

function signValue(value) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function parseCookies(cookieHeader) {
  return String(cookieHeader || "")
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .reduce((cookies, cookie) => {
      const separatorIndex = cookie.indexOf("=");

      if (separatorIndex < 0) {
        return cookies;
      }

      const name = cookie.slice(0, separatorIndex);
      const value = cookie.slice(separatorIndex + 1);
      cookies[name] = decodeURIComponent(value);
      return cookies;
    }, {});
}

function createCookie(value, maxAge) {
  const secureFlag = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${clientAuthCookieName}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secureFlag}`;
}

export function createClientAuthToken({ consultationId, phone }) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = {
    consultationId,
    phone,
    iat: issuedAt,
    exp: issuedAt + tokenMaxAgeSeconds
  };
  const encodedPayload = base64UrlEncode(payload);
  const signature = signValue(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyClientAuthToken(token) {
  const [encodedPayload, signature] = String(token || "").split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signValue(encodedPayload);
  const expectedBuffer = Buffer.from(expectedSignature);
  const actualBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== actualBuffer.length || !timingSafeEqual(expectedBuffer, actualBuffer)) {
    return null;
  }

  try {
    const payload = base64UrlDecode(encodedPayload);
    const now = Math.floor(Date.now() / 1000);

    if (!payload.consultationId || !payload.phone || !payload.exp || payload.exp <= now) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

export function getClientAuthSession(request) {
  const cookies = parseCookies(request.headers.get("cookie"));
  return verifyClientAuthToken(cookies[clientAuthCookieName]);
}

export function createClientAuthCookie(token) {
  return createCookie(token, cookieMaxAgeSeconds);
}

export function clearClientAuthCookie() {
  return createCookie("", 0);
}
