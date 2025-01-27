// app/utils/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["tu-secret"], // Usar variable de entorno
    secure: process.env.NODE_ENV === "production",
  },
});

export async function createUserSession(token: string) {
  const session = await sessionStorage.getSession();
  session.set("token", token);
  return sessionStorage.commitSession(session);
}

export async function getUserToken(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const token = session.get("token");
  if (!token) return null;
  return token;
}

// Función para destruir la sesión (útil para logout)
export async function destroyUserSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return sessionStorage.destroySession(session);
}