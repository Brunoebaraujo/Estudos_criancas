import { env } from "cloudflare:workers";
import { getChatGPTUser, requireChatGPTUser } from "@/app/chatgpt-auth";

function emailIsAllowed(email: string | undefined) {
  const runtimeEnv = env as typeof env & { ADMIN_EMAIL?: string };
  const allowedEmail = runtimeEnv.ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(allowedEmail && email?.trim().toLowerCase() === allowedEmail);
}

export async function isDashboardAdmin() {
  const user = await getChatGPTUser();
  return Boolean(user && emailIsAllowed(user.email));
}

export async function getDashboardAccess(returnTo: string) {
  const user = await requireChatGPTUser(returnTo);
  return {
    user,
    authorized: emailIsAllowed(user.email),
  };
}
