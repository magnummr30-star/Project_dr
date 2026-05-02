const sessionKey = "greenClientPortal";
const maxSessionAge = 7 * 24 * 60 * 60 * 1000;
const idleSessionAge = 30 * 60 * 1000;

function getBrowserStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  return {
    local: window.localStorage,
    session: window.sessionStorage
  };
}

function parseSession(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

function isExpired(session, now) {
  const expiresAt = Number(session?.expiresAt || 0);
  const lastActivityAt = Number(session?.lastActivityAt || 0);

  return !expiresAt || expiresAt <= now || !lastActivityAt || now - lastActivityAt > idleSessionAge;
}

export function clearClientPortalSession() {
  const storage = getBrowserStorage();

  if (!storage) {
    return;
  }

  storage.local.removeItem(sessionKey);
  storage.session.removeItem(sessionKey);
}

export function saveClientPortalSession(client) {
  const storage = getBrowserStorage();

  if (!storage) {
    return null;
  }

  const now = Date.now();
  const session = {
    ...client,
    loggedAt: new Date(now).toISOString(),
    lastActivityAt: now,
    expiresAt: now + maxSessionAge
  };

  storage.local.setItem(sessionKey, JSON.stringify(session));
  storage.session.removeItem(sessionKey);

  return session;
}

export function getClientPortalSession({ refreshActivity = false } = {}) {
  const storage = getBrowserStorage();

  if (!storage) {
    return null;
  }

  const now = Date.now();
  const session = parseSession(storage.local.getItem(sessionKey)) || parseSession(storage.session.getItem(sessionKey));

  if (!session || !session.projectCode || !session.phone || isExpired(session, now)) {
    clearClientPortalSession();
    return null;
  }

  if (refreshActivity) {
    const refreshedSession = {
      ...session,
      lastActivityAt: now
    };

    storage.local.setItem(sessionKey, JSON.stringify(refreshedSession));
    storage.session.removeItem(sessionKey);
    return refreshedSession;
  }

  return session;
}

export function refreshClientPortalActivity() {
  return getClientPortalSession({ refreshActivity: true });
}
