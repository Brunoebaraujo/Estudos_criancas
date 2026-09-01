import { env } from "cloudflare:workers";
import { isDashboardAdmin } from "@/lib/admin-access";

export const dynamic = "force-dynamic";

async function ensureMaya() {
  const now = new Date().toISOString();
  await env.DB.prepare(`INSERT INTO student_profiles (id, name, school_year, avatar, created_at)
    VALUES ('maya', 'Maya', '7º ano', 'book', ?) ON CONFLICT(id) DO NOTHING`).bind(now).run();
}

export async function GET() {
  if (!await isDashboardAdmin()) return Response.json({ error: "Não autorizado" }, { status: 401 });
  if (!env.DB) return Response.json({ error: "Base indisponível" }, { status: 503 });
  await ensureMaya();
  const result = await env.DB.prepare(`SELECT id, name, school_year, avatar, created_at
    FROM student_profiles WHERE archived_at IS NULL ORDER BY created_at`).all();
  return Response.json({ profiles: result.results });
}

export async function POST(request: Request) {
  if (!await isDashboardAdmin()) return Response.json({ error: "Não autorizado" }, { status: 401 });
  const body = await request.json().catch(() => ({})) as { name?: unknown; schoolYear?: unknown };
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 40) : "";
  const schoolYear = typeof body.schoolYear === "string" ? body.schoolYear.trim().slice(0, 30) : null;
  if (name.length < 2) return Response.json({ error: "Informe o nome da criança" }, { status: 400 });
  const slug = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "perfil";
  const id = `${slug}-${crypto.randomUUID().slice(0, 8)}`;
  await env.DB.prepare(`INSERT INTO student_profiles (id, name, school_year, avatar, created_at)
    VALUES (?, ?, ?, 'book', ?)`).bind(id, name, schoolYear || null, new Date().toISOString()).run();
  return Response.json({ profile: { id, name, schoolYear: schoolYear || null, avatar: "book" } }, { status: 201 });
}
