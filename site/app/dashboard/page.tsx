import { env } from "cloudflare:workers";
import Link from "next/link";
import {
  Activity, ArrowLeft, BarChart3, Beaker, BookOpenCheck, Brain, CheckCircle2,
  Clock3, LogOut, MousePointerClick, RotateCcw, ShieldCheck, Target,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStudyQuestion, studyModuleRegistry } from "@/content/registry";
import { chatGPTSignOutPath } from "@/app/chatgpt-auth";
import { getDashboardAccess } from "@/lib/admin-access";
import { ProfileManager } from "@/components/profile-manager";

export const dynamic = "force-dynamic";

type SessionRow = {
  id: string;
  module_id: string;
  source: "live" | "imported";
  status: "active" | "paused" | "completed";
  started_at: string | null;
  last_activity_at: string;
  ended_at: string | null;
  total_questions: number;
  mastered_count: number;
  total_attempts: number;
  correct_answers: number;
  direct_correct: number;
};

type DifficultyRow = {
  module_id: string;
  question_id: string;
  topic: string;
  attempts: number;
  errors: number;
  direct_correct: number;
  average_response_ms: number;
};

type AttemptSummary = { module_id: string; attempts: number; correct: number; first_attempts: number; first_correct: number };
type DashboardData = { sessions: SessionRow[]; difficulty: DifficultyRow[]; attemptSummaries: AttemptSummary[] };

function number(value: unknown) { return Number(value ?? 0); }

async function getDashboardData(studentId: string) {
  const db = env.DB;
  if (!db) throw new Error("A base de acompanhamento ainda não está disponível.");

  const [sessionsResult, difficultyResult, attemptSummary] = await Promise.all([
    db.prepare(`
      SELECT id, module_id, source, status, started_at, last_activity_at, ended_at,
        total_questions, mastered_count, total_attempts, correct_answers, direct_correct
      FROM study_sessions WHERE student_id = ?
      ORDER BY COALESCE(started_at, ended_at, last_activity_at) DESC LIMIT 100
    `).bind(studentId).all<SessionRow>(),
    db.prepare(`
      SELECT module_id, question_id, topic, COUNT(*) AS attempts,
        SUM(CASE WHEN correct = 0 THEN 1 ELSE 0 END) AS errors,
        SUM(CASE WHEN attempt_number = 1 AND correct = 1 THEN 1 ELSE 0 END) AS direct_correct,
        AVG(response_ms) AS average_response_ms
      FROM answer_attempts WHERE student_id = ?
      GROUP BY module_id, question_id, topic
      HAVING SUM(CASE WHEN correct = 0 THEN 1 ELSE 0 END) > 0
      ORDER BY errors DESC, attempts DESC, question_id ASC
    `).bind(studentId).all<DifficultyRow>(),
    db.prepare(`
      SELECT module_id, COUNT(*) AS attempts,
        SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) AS correct,
        SUM(CASE WHEN attempt_number = 1 THEN 1 ELSE 0 END) AS first_attempts,
        SUM(CASE WHEN attempt_number = 1 AND correct = 1 THEN 1 ELSE 0 END) AS first_correct
      FROM answer_attempts WHERE student_id = ?
      GROUP BY module_id
    `).bind(studentId).all<AttemptSummary>(),
  ]);

  return {
    sessions: sessionsResult.results,
    difficulty: difficultyResult.results,
    attemptSummaries: attemptSummary.results,
  };
}

function formatDate(value: string | null) {
  if (!value) return "Não registrado";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}

function duration(session: SessionRow) {
  if (!session.started_at) return null;
  const end = new Date(session.ended_at ?? session.last_activity_at).getTime();
  return Math.max(0, Math.round((end - new Date(session.started_at).getTime()) / 60_000));
}

function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
}

function statusLabel(status: SessionRow["status"]) {
  return status === "completed" ? "Concluída" : status === "paused" ? "Pausada" : "Em andamento";
}

function MetricCard({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: string; note: string }) {
  return <article className="rounded-3xl border border-[#d8c4a2] bg-[#fffdf8] p-5 shadow-[0_12px_36px_rgba(65,42,28,.08)]">
    <div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[.14em] text-[#846047]">{label}</p><span className="grid size-10 place-items-center rounded-2xl bg-[#f1e2c8] text-[#6f2232] [&>svg]:size-5">{icon}</span></div>
    <strong className="mt-4 block font-serif text-3xl font-black text-[#3d281c]">{value}</strong><p className="mt-1 text-xs leading-5 text-[#765741]">{note}</p>
  </article>;
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ module?: string; student?: string }> }) {
  const { authorized } = await getDashboardAccess("/dashboard");

  if (!authorized) return <main className="grid min-h-screen place-items-center bg-[#f6eddd] px-5"><section className="max-w-md rounded-3xl border border-[#d9c3a0] bg-white p-7 text-center shadow-xl"><ShieldCheck className="mx-auto size-12 text-[#6f2232]" /><h1 className="mt-4 font-serif text-3xl font-black">Acesso restrito</h1><p className="mt-3 text-sm leading-6 text-[#71523d]">Este painel contém o histórico escolar da Maya e está disponível somente para a conta responsável autorizada.</p><Link href="/" className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-[#6f2232]"><ArrowLeft className="size-4" /> Voltar aos estudos</Link></section></main>;

  const params = await searchParams;
  const studentId = typeof params.student === "string" && /^[a-z0-9-]{1,80}$/i.test(params.student) ? params.student : "maya";
  const student = await env.DB.prepare("SELECT name FROM student_profiles WHERE id = ?").bind(studentId).first<{ name: string }>().catch(() => null);
  const studentName = student?.name ?? (studentId === "maya" ? "Maya" : "Criança");
  let rawData: DashboardData;
  try {
    rawData = await getDashboardData(studentId);
  } catch {
    rawData = { sessions: [], difficulty: [], attemptSummaries: [] };
  }

  const requestedModule = params.module;
  const selectedModuleId = requestedModule && studyModuleRegistry[requestedModule] ? requestedModule : "all";
  const selectedModule = selectedModuleId === "all" ? null : studyModuleRegistry[selectedModuleId];
  const data: DashboardData = {
    sessions: selectedModule ? rawData.sessions.filter((session) => session.module_id === selectedModuleId) : rawData.sessions,
    difficulty: selectedModule ? rawData.difficulty.filter((item) => item.module_id === selectedModuleId) : rawData.difficulty,
    attemptSummaries: selectedModule ? rawData.attemptSummaries.filter((item) => item.module_id === selectedModuleId) : rawData.attemptSummaries,
  };
  const attemptSummary = data.attemptSummaries.reduce((total, item) => ({
    module_id: selectedModuleId,
    attempts: total.attempts + number(item.attempts),
    correct: total.correct + number(item.correct),
    first_attempts: total.first_attempts + number(item.first_attempts),
    first_correct: total.first_correct + number(item.first_correct),
  }), { module_id: selectedModuleId, attempts: 0, correct: 0, first_attempts: 0, first_correct: 0 });

  const imported = data.sessions.filter((session) => session.source === "imported");
  const live = data.sessions.filter((session) => session.source === "live");
  const importedAttempts = imported.reduce((sum, session) => sum + number(session.total_attempts), 0);
  const importedDirect = imported.reduce((sum, session) => sum + number(session.direct_correct), 0);
  const importedDirectBase = imported.reduce((sum, session) => sum + number(session.mastered_count), 0);
  const totalAttempts = number(attemptSummary.attempts) + importedAttempts;
  const directCorrect = number(attemptSummary.first_correct) + importedDirect;
  const directBase = number(attemptSummary.first_attempts) + importedDirectBase;
  const directRate = directBase ? Math.round((directCorrect / directBase) * 100) : 0;
  const completedSessions = data.sessions.filter((session) => session.status === "completed").length;
  const totalMinutes = live.reduce((sum, session) => sum + (duration(session) ?? 0), 0);
  const lastActivity = data.sessions[0]?.last_activity_at ?? null;
  const latest = data.sessions[0];

  return <main className="min-h-screen bg-[#f7efe1] pb-16 text-[#3f2a1e]">
    <header className="border-b border-[#d8c4a2] bg-[#4d1e2a] px-5 py-6 text-[#fff9ed]"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e0bd82]">Acompanhamento responsável</p><h1 className="mt-1 font-serif text-2xl font-black sm:text-3xl">Painel de aprendizagem de {studentName}</h1></div><div className="flex gap-2"><Link href="/" aria-label="Voltar aos estudos" className="grid size-11 place-items-center rounded-2xl bg-white/10"><BookOpenCheck className="size-5" /></Link><a href={chatGPTSignOutPath("/")} aria-label="Sair" className="grid size-11 place-items-center rounded-2xl bg-white/10"><LogOut className="size-5" /></a></div></div></header>

    <div className="mx-auto max-w-6xl px-5 pt-7">
      <ProfileManager selectedId={studentId} />
      <nav aria-label="Filtrar acompanhamento por matéria" className="mb-7 rounded-3xl border border-[#d8c4a2] bg-[#fffdf8] p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-black uppercase tracking-[.14em] text-[#846047]">Matéria acompanhada</p><Link href="/dashboard/teste" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#cfae7a] bg-[#fff8ea] px-3 text-xs font-black text-[#6f2232] hover:bg-[#f5e7ce]"><Beaker className="size-4" /> Testar exercícios</Link></div>
        <Link href={`/dashboard?student=${encodeURIComponent(studentId)}`} aria-current={selectedModuleId === "all" ? "page" : undefined} className={selectedModuleId === "all" ? "inline-block rounded-full bg-[#6f2232] px-4 py-2 text-sm font-black text-white" : "inline-block rounded-full bg-[#f1e2c8] px-4 py-2 text-sm font-black text-[#6f2232]"}>Todas as matérias</Link>
        <div className="mt-4 grid gap-3 md:grid-cols-3">{[...new Map(Object.values(studyModuleRegistry).map(module => [module.subjectId, module.subject])).entries()].map(([subjectId, subject]) => <div key={subjectId} className="rounded-2xl bg-[#f5ead6] p-3"><b className="text-sm">{subject}</b><div className="mt-2 border-l-2 border-[#c79b61] pl-2">{Object.values(studyModuleRegistry).filter(module => module.subjectId === subjectId).map(module => <Link key={module.id} href={`/dashboard?student=${encodeURIComponent(studentId)}&module=${encodeURIComponent(module.id)}`} aria-current={selectedModuleId === module.id ? "page" : undefined} className={selectedModuleId === module.id ? "mb-1 block rounded-lg bg-[#6f2232] px-3 py-2 text-xs font-black text-white" : "mb-1 block rounded-lg bg-white/70 px-3 py-2 text-xs font-black text-[#6f2232]"}>{module.collection}</Link>)}</div></div>)}</div>
      </nav>

      <section className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-sm font-bold text-[#8c6447]">{selectedModule ? selectedModule.subject : "Visão geral"}</p><h2 className="font-serif text-3xl font-black">{selectedModule ? selectedModule.title : "O que aconteceu nas revisões"}</h2></div><p className="text-sm text-[#795a44]">Última atividade: <b>{formatDate(lastActivity)}</b></p></section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard icon={<Target />} label="Acertos diretos" value={`${directRate}%`} note={`${directCorrect} de ${directBase} respostas na primeira tentativa`} />
        <MetricCard icon={<MousePointerClick />} label="Tentativas" value={String(totalAttempts)} note="Respostas registradas em todas as revisões" />
        <MetricCard icon={<CheckCircle2 />} label="Conclusões" value={String(completedSessions)} note={`${data.sessions.length} sessões registradas no total`} />
        <MetricCard icon={<Clock3 />} label="Tempo acompanhado" value={formatMinutes(totalMinutes)} note="Calculado apenas nas sessões com horário disponível" />
      </section>

      {latest && <section className="mt-6 rounded-3xl border border-[#d8c4a2] bg-[#fffdf8] p-5 sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[.14em] text-[#8a6247]">Revisão mais recente</p><h3 className="mt-1 font-serif text-2xl font-black">{studyModuleRegistry[latest.module_id]?.title ?? latest.module_id}</h3></div><span className="rounded-full bg-[#eee0c8] px-3 py-1 text-xs font-black text-[#6f2232]">{statusLabel(latest.status)}</span></div><div className="mt-5 flex justify-between text-sm font-bold"><span>{latest.mastered_count} dominadas</span><span>{Math.round((latest.mastered_count / latest.total_questions) * 100)}%</span></div><Progress value={(latest.mastered_count / latest.total_questions) * 100} className="mt-2 h-3 bg-[#ead9bc] [&>div]:bg-[#6f2232]" /></section>}

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <article className="rounded-3xl border border-[#d8c4a2] bg-[#fffdf8] p-5 sm:p-6"><div className="flex items-center gap-3"><BarChart3 className="size-6 text-[#6f2232]" /><div><p className="text-xs font-black uppercase tracking-[.14em] text-[#8a6247]">Diagnóstico</p><h3 className="font-serif text-2xl font-black">Perguntas com mais dificuldade</h3></div></div>
          {data.difficulty.length ? <div className="mt-5 space-y-5">{data.difficulty.slice(0, 7).map((item) => { const question = getStudyQuestion(item.module_id, item.question_id); const errors = number(item.errors); const attempts = number(item.attempts); return <div key={item.module_id + ":" + item.question_id}><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-bold leading-5">{question?.prompt ?? item.question_id}</p><p className="mt-1 text-xs text-[#846149]">{studyModuleRegistry[item.module_id]?.subject} · {item.topic}</p></div><span className="shrink-0 rounded-full bg-[#f4ddd5] px-3 py-1 text-xs font-black text-[#8b3834]">{errors} erro{errors === 1 ? "" : "s"}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[#eadbc2]"><div className="h-full rounded-full bg-[#a94c45]" style={{ width: `${attempts ? Math.max(8, (errors / attempts) * 100) : 0}%` }} /></div></div>; })}</div> : <EmptyState />}
        </article>

        <article className="rounded-3xl border border-[#d8c4a2] bg-[#fffdf8] p-5 sm:p-6"><div className="flex items-center gap-3"><Brain className="size-6 text-[#6f2232]" /><div><p className="text-xs font-black uppercase tracking-[.14em] text-[#8a6247]">Leitura pedagógica</p><h3 className="font-serif text-2xl font-black">Como interpretar</h3></div></div><ul className="mt-5 space-y-4 text-sm leading-6 text-[#694b37]"><li><b>Acerto direto</b> significa resposta correta na primeira tentativa daquela sessão.</li><li><b>Tentativa extra</b> indica que a pergunta precisou voltar ao fim da fila.</li><li>Perguntas com muitos erros devem virar a prioridade da próxima conversa ou revisão.</li><li>O histórico importado preserva apenas totais conhecidos; não inventa horário nem resposta antiga.</li></ul></article>
      </section>

      <section className="mt-8 overflow-hidden rounded-3xl border border-[#d8c4a2] bg-[#fffdf8]"><div className="flex items-center gap-3 border-b border-[#e1d0b3] p-5 sm:p-6"><Activity className="size-6 text-[#6f2232]" /><div><p className="text-xs font-black uppercase tracking-[.14em] text-[#8a6247]">Linha do tempo</p><h3 className="font-serif text-2xl font-black">Execuções das revisões</h3></div></div>
        {data.sessions.length ? <div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Entrada</TableHead><TableHead>Matéria</TableHead><TableHead>Estado</TableHead><TableHead>Domínio</TableHead><TableHead>Diretos</TableHead><TableHead>Tentativas</TableHead><TableHead>Duração</TableHead></TableRow></TableHeader><TableBody>{data.sessions.map((session) => <TableRow key={session.id}><TableCell><b>{formatDate(session.started_at)}</b>{session.source === "imported" && <span className="block text-xs text-[#916b4f]">Histórico importado</span>}</TableCell><TableCell>{studyModuleRegistry[session.module_id]?.subject ?? session.module_id}</TableCell><TableCell>{statusLabel(session.status)}</TableCell><TableCell>{session.mastered_count}/{session.total_questions}</TableCell><TableCell>{session.direct_correct}</TableCell><TableCell>{session.total_attempts}</TableCell><TableCell>{duration(session) === null ? "Indisponível" : formatMinutes(duration(session)!)}</TableCell></TableRow>)}</TableBody></Table></div> : <div className="p-6"><EmptyState /></div>}
      </section>
    </div>
  </main>;
}

function EmptyState() {
  return <div className="rounded-2xl bg-[#f4e8d4] p-5 text-sm leading-6 text-[#73533d]"><RotateCcw className="mb-2 size-5 text-[#6f2232]" />Os dados aparecerão depois que a Maya abrir a versão atualizada. Se houver progresso salvo no celular, os totais conhecidos serão importados automaticamente.</div>;
}
