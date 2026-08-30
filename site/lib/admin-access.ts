import { env } from "cloudflare:workers";
import { requireChatGPTUser } from "@/app/chatgpt-auth";

export async function getDashboardAccess(returnTo: string) {
  const user = await requireChatGPTUser(returnTo);
  const runtimeEnv = env as typeof env & { ADMIN_EMAIL?: string };
  const allowedEmail = runtimeEnv.ADMIN_EMAIL?.trim().toLowerCase();

  return {
    user,
    authorized: Boolean(allowedEmail && user.email.trim().toLowerCase() === allowedEmail),
  };
}
