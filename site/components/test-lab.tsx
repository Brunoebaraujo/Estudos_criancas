/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft, Beaker, Check, CheckCircle2, ChevronRight, CircleAlert,
  Eye, FlaskConical, Lightbulb, RotateCcw, ShieldCheck, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { studyModuleRegistry } from "@/content/registry";
import type { StudyQuestion } from "@/content/types";
import { shuffledCopy } from "@/lib/shuffle";

type LabScreen = "modules" | "question" | "feedback" | "complete";
type LabFeedback = { question: StudyQuestion; optionId: string; correct: boolean } | null;

export function TestLab() {
  const [screen, setScreen] = useState<LabScreen>("modules");
  const [moduleId, setModuleId] = useState(Object.keys(studyModuleRegistry)[0]);
  const [queue, setQueue] = useState<string[]>([]);
  const [mastered, setMastered] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<LabFeedback>(null);
  const activeModule = studyModuleRegistry[moduleId];
  const currentQuestion = activeModule.questions.find((question) => question.id === queue[0]);
  const retryNumber = currentQuestion ? attempts[currentQuestion.id] ?? 0 : 0;
  const options = useMemo(() => {
    void retryNumber;
    return currentQuestion ? shuffledCopy(currentQuestion.options) : [];
  }, [currentQuestion, retryNumber]);
  const percent = activeModule.questions.length ? Math.round((mastered.length / activeModule.questions.length) * 100) : 0;

  function start(targetModuleId: string) {
    const target = studyModuleRegistry[targetModuleId];
    if (!target) return;
    setModuleId(targetModuleId);
    setQueue(target.questions.map((question) => question.id));
    setMastered([]);
    setAttempts({});
    setSelected(null);
    setFeedback(null);
    setScreen("question");
  }

  function answer() {
    if (!currentQuestion || !selected) return;
    const correct = selected === currentQuestion.correctOptionId;
    const remaining = queue.slice(1);
    setQueue(correct ? remaining : [...remaining, currentQuestion.id]);
    setAttempts((current) => ({ ...current, [currentQuestion.id]: (current[currentQuestion.id] ?? 0) + 1 }));
    if (correct) setMastered((current) => current.includes(currentQuestion.id) ? current : [...current, currentQuestion.id]);
    setFeedback({ question: currentQuestion, optionId: selected, correct });
    setSelected(null);
    setScreen("feedback");
  }

  function continueAfterFeedback() {
    if (queue.length === 0) setScreen("complete");
    else {
      setFeedback(null);
      setScreen("question");
    }
  }

  function leaveExercise() {
    setQueue([]);
    setMastered([]);
    setAttempts({});
    setSelected(null);
    setFeedback(null);
    setScreen("modules");
  }

  if (screen === "modules") {
    return <LabShell>
      <section className="mx-auto max-w-5xl px-5 py-8">
        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-[#a25f35]"><FlaskConical className="size-4" /> Laboratório de conteúdo</p>
        <h1 className="mt-2 font-serif text-4xl font-black">Teste os exercícios sem contaminar os dados.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6e503b]">Nada feito aqui é salvo no aparelho ou enviado ao dashboard. Ao sair ou atualizar a página, o teste é descartado.</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {Object.values(studyModuleRegistry).map((module) => <article key={module.id} className="rounded-3xl border border-[#d8c4a2] bg-[#fffdf8] p-6 shadow-[0_12px_36px_rgba(65,42,28,.08)]">
            <p className="text-xs font-black uppercase tracking-[.14em] text-[#9a673e]">{module.subject} · {module.questions.length} exercícios</p>
            <h2 className="mt-2 font-serif text-2xl font-black">{module.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#70513c]">{module.description}</p>
            <Button onClick={() => start(module.id)} className="mt-5 h-12 w-full rounded-2xl bg-[#6f2232] font-bold text-white hover:bg-[#571927]"><Beaker className="mr-2 size-5" /> Testar esta matéria</Button>
          </article>)}
        </div>
      </section>
    </LabShell>;
  }

  if (screen === "complete") {
    const totalAttempts = Object.values(attempts).reduce((sum, value) => sum + value, 0);
    return <LabShell onExit={leaveExercise}>
      <section className="mx-auto max-w-xl px-5 py-12 text-center">
        <CheckCircle2 className="mx-auto size-16 text-[#36734e]" />
        <p className="mt-5 text-xs font-black uppercase tracking-[.16em] text-[#a25f35]">Teste concluído</p>
        <h1 className="mt-2 font-serif text-4xl font-black">Todos os exercícios foram conferidos.</h1>
        <p className="mt-4 text-sm leading-6 text-[#6e503b]">{totalAttempts} tentativas feitas neste teste. Nenhuma delas entrou nas estatísticas.</p>
        <Button onClick={() => start(moduleId)} className="mt-7 h-12 w-full rounded-2xl bg-[#6f2232] font-bold text-white"><RotateCcw className="mr-2 size-5" /> Recomeçar teste</Button>
        <button onClick={leaveExercise} className="mt-3 min-h-11 w-full text-sm font-bold text-[#704d38]">Escolher outra matéria</button>
      </section>
    </LabShell>;
  }

  if (screen === "feedback" && feedback) {
    const chosen = feedback.question.options.find((option) => option.id === feedback.optionId)!;
    return <LabShell onExit={leaveExercise}>
      <section className="mx-auto max-w-2xl px-5 py-8">
        <div className={`grid size-16 place-items-center rounded-3xl text-white ${feedback.correct ? "bg-[#3d7a54]" : "bg-[#a4423e]"}`}>{feedback.correct ? <CheckCircle2 className="size-9" /> : <CircleAlert className="size-9" />}</div>
        <p className="mt-6 text-xs font-black uppercase tracking-[.16em] text-[#a25f35]">Inspeção da resposta · {feedback.question.id}</p>
        <h1 className="mt-2 font-serif text-3xl font-black">{feedback.correct ? "Resposta correta" : "Resposta incorreta"}</h1>
        <div className="mt-6 rounded-3xl border border-[#d8c4a2] bg-white/80 p-5">
          <p className="text-sm font-bold">{chosen.text}</p>
          <p className={`mt-4 rounded-2xl p-4 text-sm leading-6 ${feedback.correct ? "bg-[#e3f0e2] text-[#315d3e]" : "bg-[#f7dfd7] text-[#76332f]"}`}>{chosen.feedback}</p>
        </div>
        <div className="mt-4 rounded-3xl border border-[#dac59f] bg-[#fffaf0] p-5">
          <p className="flex items-center gap-2 font-serif text-lg font-bold"><Lightbulb className="size-5 text-[#a66b2b]" /> Explicação exibida à Maya</p>
          <p className="mt-2 text-sm leading-6 text-[#644833]">{feedback.question.correctExplanation}</p>
          <p className="mt-4 text-xs font-bold text-[#8b674b]">Fonte: {feedback.question.source}</p>
        </div>
        {!feedback.correct && <p className="mt-5 text-sm font-bold text-[#76332f]">A pergunta foi movida para o fim da fila deste teste.</p>}
        <Button onClick={continueAfterFeedback} className="mt-7 h-12 w-full rounded-2xl bg-[#6f2232] font-bold text-white">Continuar teste <ChevronRight className="ml-2 size-5" /></Button>
      </section>
    </LabShell>;
  }

  if (!currentQuestion) return null;
  return <LabShell onExit={leaveExercise}>
    <header className="sticky top-[73px] z-10 border-b border-[#dcc6a2] bg-[#fbf6ea]/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center gap-3">
        <button onClick={leaveExercise} aria-label="Encerrar teste" className="grid size-11 place-items-center rounded-xl text-[#6f2232]"><X className="size-6" /></button>
        <div className="min-w-0 flex-1"><div className="mb-1 flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#815e46]"><span>{mastered.length} verificadas</span><span>{percent}%</span></div><Progress value={percent} className="h-2 bg-[#e3cfad] [&>div]:bg-[#6f2232]" /></div>
      </div>
    </header>
    <section className="mx-auto max-w-2xl px-5 pb-28 pt-6">
      <div className="mb-4 flex flex-wrap gap-2"><span className="rounded-full bg-[#f0d8ad] px-3 py-1 text-xs font-black text-[#6f2232]">{currentQuestion.id}</span><span className="rounded-full bg-[#eadfcb] px-3 py-1 text-xs font-bold">{currentQuestion.chapter} · {currentQuestion.topic}</span></div>
      {currentQuestion.image && <figure className="mb-5 overflow-hidden rounded-3xl border border-[#d6bd93] bg-[#382820]"><img src={currentQuestion.image.src} alt={currentQuestion.image.alt} className="h-52 w-full object-cover object-top opacity-90" /><figcaption className="bg-[#4a3327] px-4 py-2 text-xs text-[#f1ddba]">{currentQuestion.image.credit}</figcaption></figure>}
      {currentQuestion.context && <p className="mb-3 rounded-2xl border-l-4 border-[#b9803d] bg-[#f4e6ce] p-4 text-sm italic leading-6">{currentQuestion.context}</p>}
      <h1 className="font-serif text-2xl font-black leading-8 sm:text-3xl sm:leading-10">{currentQuestion.prompt}</h1>
      <div className="mt-6 space-y-3" role="radiogroup" aria-label="Alternativas">
        {options.map((option, index) => { const isSelected = selected === option.id; return <button key={option.id} role="radio" aria-checked={isSelected} onClick={() => setSelected(option.id)} className={`option-button ${isSelected ? "option-selected" : ""}`}><span className="option-letter">{String.fromCharCode(65 + index)}</span><span>{option.text}</span>{isSelected && <Check className="ml-auto size-5 shrink-0" />}</button>; })}
      </div>
    </section>
    <div className="fixed inset-x-0 bottom-0 z-10 border-t border-[#dcc6a2] bg-[#fffaf0]/96 p-4 backdrop-blur"><Button disabled={!selected} onClick={answer} className="mx-auto flex h-13 w-full max-w-2xl rounded-2xl bg-[#6f2232] text-base font-bold text-white disabled:opacity-40">Conferir resposta</Button></div>
  </LabShell>;
}

function LabShell({ children, onExit }: { children: React.ReactNode; onExit?: () => void }) {
  return <main className="min-h-screen bg-[#f7efe1] text-[#3f2a1e]">
    <div className="sticky top-0 z-20 border-b border-[#d8c4a2] bg-[#4d1e2a] px-5 py-4 text-[#fff9ed]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-2xl bg-white/10"><FlaskConical className="size-5" /></span><div><p className="font-serif text-lg font-black">Laboratório de exercícios</p><p className="flex items-center gap-1 text-[11px] font-bold text-[#e0bd82]"><ShieldCheck className="size-3" /> Modo isolado · nenhum dado registrado</p></div></div>
        {onExit ? <button onClick={onExit} className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold hover:bg-white/10"><Eye className="size-4" /> Matérias</button> : <Link href="/dashboard" className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold hover:bg-white/10"><ArrowLeft className="size-4" /> Dashboard</Link>}
      </div>
    </div>
    {children}
  </main>;
}
