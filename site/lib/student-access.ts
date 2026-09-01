import { env } from "cloudflare:workers";

const TOKEN_PATTERN = /^[A-Za-z0-9_-]{30,200}$/;

export type StudentProfile = { id: string; name: string; schoolYear: string | null; avatar: string };

export async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function randomToken(bytes = 32) {
  const data = crypto.getRandomValues(new Uint8Array(bytes));
  return btoa(String.fromCharCode(...data)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function studentFromRequest(request: Request): Promise<StudentProfile | null> {
  const value = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!TOKEN_PATTERN.test(value) || !env.DB) return null;
  const hash = await sha256(value);
  const row = await env.DB.prepare(`
    SELECT p.id, p.name, p.school_year, p.avatar
    FROM student_devices d JOIN student_profiles p ON p.id = d.student_id
    WHERE d.token_hash = ? AND d.revoked_at IS NULL AND p.archived_at IS NULL LIMIT 1
  `).bind(hash).first<{ id: string; name: string; school_year: string | null; avatar: string }>();
  if (!row) return null;
  await env.DB.prepare("UPDATE student_devices SET last_used_at = ? WHERE token_hash = ?").bind(new Date().toISOString(), hash).run();
  return { id: row.id, name: row.name, schoolYear: row.school_year, avatar: row.avatar };
}
