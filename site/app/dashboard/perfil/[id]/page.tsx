import { env } from "cloudflare:workers";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDashboardAccess } from "@/lib/admin-access";
import { StudyHome } from "@/components/study-home";
import { studyModuleRegistry } from "@/content/registry";

export const dynamic = "force-dynamic";

export default async function ProfilePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { authorized } = await getDashboardAccess("/dashboard");
  if (!authorized) return null;
  const { id } = await params;
  const row = await env.DB.prepare("SELECT id, name, school_year, avatar FROM student_profiles WHERE id = ? AND archived_at IS NULL").bind(id)
    .first<{ id: string; name: string; school_year: string | null; avatar: string }>();
  if (!row) return <main className="p-8"><Link href="/dashboard"><ArrowLeft className="inline size-4" /> Perfil não encontrado</Link></main>;
  const [answers, completed] = await Promise.all([
    env.DB.prepare("SELECT module_id, question_id, COUNT(*) attempts FROM answer_attempts WHERE student_id = ? AND correct = 1 GROUP BY module_id, question_id").bind(id).all<{ module_id: string; question_id: string; attempts: number }>(),
    env.DB.prepare("SELECT module_id FROM study_sessions WHERE student_id = ? AND status = 'completed' GROUP BY module_id").bind(id).all<{ module_id: string }>(),
  ]);
  const completedIds = new Set(completed.results.map((item) => item.module_id));
  const progress: Record<string, { mastered: string[]; queue: string[]; attempts: Record<string, number>; completed: boolean; updatedAt: string }> = {};
  for (const studyModule of Object.values(studyModuleRegistry)) {
    const mastered = completedIds.has(studyModule.id) ? studyModule.questions.map(q => q.id) : answers.results.filter(a => a.module_id === studyModule.id).map(a => a.question_id);
    progress[studyModule.id] = { mastered, queue: studyModule.questions.map(q => q.id).filter(q => !mastered.includes(q)), attempts: {}, completed: mastered.length === studyModule.questions.length, updatedAt: new Date().toISOString() };
  }
  return <><div className="sticky top-0 z-50 bg-[#3e1d27] px-4 py-2 text-center text-sm font-bold text-white"><Link href={`/dashboard?student=${encodeURIComponent(id)}`}><ArrowLeft className="mr-2 inline size-4" />Voltar ao dashboard</Link></div><StudyHome profile={{ id: row.id, name: row.name, schoolYear: row.school_year, avatar: row.avatar }} preview initialProgress={progress} /></>;
}
