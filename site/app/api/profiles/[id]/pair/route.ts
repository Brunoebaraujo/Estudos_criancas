import { env } from "cloudflare:workers";
import { isDashboardAdmin } from "@/lib/admin-access";
import { sha256 } from "@/lib/student-access";

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!await isDashboardAdmin()) return Response.json({ error: "Não autorizado" }, { status: 401 });
  const { id } = await context.params;
  const profile = await env.DB.prepare("SELECT id FROM student_profiles WHERE id = ? AND archived_at IS NULL").bind(id).first();
  if (!profile) return Response.json({ error: "Perfil não encontrado" }, { status: 404 });
  const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000).padStart(6, "0");
  const now = new Date();
  const expires = new Date(now.getTime() + 10 * 60_000);
  await env.DB.prepare(`INSERT INTO pairing_codes (id, student_id, code_hash, created_at, expires_at)
    VALUES (?, ?, ?, ?, ?)`).bind(crypto.randomUUID(), id, await sha256(code), now.toISOString(), expires.toISOString()).run();
  return Response.json({ code, expiresAt: expires.toISOString() });
}
