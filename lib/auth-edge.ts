import { jwtVerify } from "jose"

const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET!)
type SessionPayload = {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: "USER" | "CHECKER" | "ADMIN" | "SUPER_ADMIN"
  }
  expires: string
}
export async function getSessionFromToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey)
    return payload as SessionPayload
  } catch {
    return null
  }
}