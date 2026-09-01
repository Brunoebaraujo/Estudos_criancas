import { studentFromRequest } from "@/lib/student-access";

export async function GET(request: Request) {
  const profile = await studentFromRequest(request);
  return profile ? Response.json({ profile }) : Response.json({ error: "Aparelho não vinculado" }, { status: 401 });
}
