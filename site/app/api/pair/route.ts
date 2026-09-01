import { env } from "cloudflare:workers";
import { randomToken, sha256 } from "@/lib/student-access";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Origem inválida" }, { status: 403 });
  const body = await request.json().catch(() => ({})) as { code?: unknown };
  const code = typeof body.code === "string" ? body.code.replace(/\D/g, "") : "";
  if (code.length !== 6) return Response.json({ error: "Digite os 6 números do código" }, { status: 400 });
  const now = new Date().toISOString();
  const row = await env.DB.prepare(`SELECT c.id, p.id AS student_id, p.name, p.school_year, p.avatar
    FROM pairing_codes c JOIN student_profiles p ON p.id = c.student_id
    WHERE c.code_hash = ? AND c.used_at IS NULL AND c.expires_at > ? AND p.archived_at IS NULL LIMIT 1`)
    .bind(await sha256(code), now).first<{ id: string; student_id: string; name: string; school_year: string | null; avatar: string }>();
  if (!row) return Response.json({ error: "Código inválido ou expirado" }, { status: 400 });
  const token = randomToken();
  await env.DB.batch([
    env.DB.prepare("UPDATE pairing_codes SET used_at = ? WHERE id = ?").bind(now, row.id),
    env.DB.prepare(`INSERT INTO student_devices (id, student_id, token_hash, label, created_at, last_used_at)
      VALUES (?, ?, ?, 'Aparelho vinculado', ?, ?)`).bind(crypto.randomUUID(), row.student_id, await sha256(token), now, now),
  ]);
  return Response.json({ token, profile: { id: row.student_id, name: row.name, schoolYear: row.school_year, avatar: row.avatar } });
}
