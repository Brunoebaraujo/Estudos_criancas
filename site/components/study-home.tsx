/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, BookOpen, Brain, Check, CheckCircle2, ChevronRight, CircleAlert,
  Calculator, Clock3, Home, Languages, Lightbulb, Medal, RotateCcw, ScrollText, Sparkles, Target, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { studyModuleRegistry } from "@/content/registry";
import type { ChallengeKind, StudyModule, StudyQuestion } from "@/content/types";
import { studyModules } from "@/content/modules";
import { shuffledCopy } from "@/lib/shuffle";
import { finishStudySession, importLegacyProgress, recordStudyAttempt, startStudySession } from "@/lib/telemetry";

const STORAGE_KEY = "estudos-criancas-progress-v1";

type ModuleProgress = {
  mastered: string[];
  queue: string[];
  attempts: Record<string, number>;
  completed: boolean;
  updatedAt: string;
};

type SavedProgress = Record<string, ModuleProgress>;
type Screen = "home" | "intro" | "question" | "feedback" | "review" | "complete" | "sources";
type FeedbackState = { questionId: string; optionId: string; correct: boolean } | null;

const kindLabels: Record<ChallengeKind, string> = {
  pista: "Caça à pista",
  "verdadeiro-ou-falso": "Verdadeiro ou falso",
  "linha-do-tempo": "Linha do tempo",
  "quem-sou-eu": "Quem sou eu?",
  conexao: "Faça a conexão",
  calculo: "Hora de calcular",
  problema: "Resolva o problema",
  "desafio-mental": "Desafio mental",
  "analise-de-texto": "Análise de texto",
  revisao: "Revisão linguística",
};

const DEFAULT_MODULE_ID = "RecHist2Tri26";

function emptyProgress(module: StudyModule): ModuleProgress {
  return {
    mastered: [],
    queue: module.questions.map((question) => question.id),
    attempts: {},
    completed: false,
    updatedAt: new Date().toISOString(),
  };
}

export function StudyHome() {
  const [selectedModuleId, setSelectedModuleId] = useState(DEFAULT_MODULE_ID);
  const activeModule = studyModuleRegistry[selectedModuleId];
  const [allProgress, setAllProgress] = useState<SavedProgress>({});
  const [progress, setProgress] = useState<ModuleProgress>(() => emptyProgress(studyModuleRegistry[DEFAULT_MODULE_ID]));
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const questionStartedAtRef = useRef(0);
  const progressRef = useRef(progress);
  const moduleRef = useRef(activeModule);

  const questionMap = useMemo(() => new Map(activeModule.questions.map((question) => [question.id, question])), [activeModule]);
  const currentQuestion = questionMap.get(progress.queue[0]);
  const feedbackQuestion = feedback ? questionMap.get(feedback.questionId) : undefined;
  const percent = Math.round((progress.mastered.length / activeModule.questions.length) * 100);

  useEffect(() => { progressRef.current = progress; }, [progress]);
  useEffect(() => { moduleRef.current = activeModule; }, [activeModule]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed: SavedProgress = raw ? JSON.parse(raw) : {};
        setAllProgress(parsed);
        if (parsed[DEFAULT_MODULE_ID]) setProgress(parsed[DEFAULT_MODULE_ID]);
        for (const [moduleId, saved] of Object.entries(parsed)) {
          const studyModule = studyModuleRegistry[moduleId];
          if (studyModule && saved.updatedAt) void importLegacyProgress(moduleId, studyModule.questions.length, saved);
        }
      } catch {
        setAllProgress({});
      }
      setReady(true);
    }, 0);
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const pauseActiveSession = () => {
      const sessionId = sessionIdRef.current;
      if (!sessionId) return;
      const currentProgress = progressRef.current;
      finishStudySession({
        sessionId,
        moduleId: moduleRef.current.id,
        status: "paused",
        masteredCount: currentProgress.mastered.length,
      }, true);
    };
    window.addEventListener("pagehide", pauseActiveSession);
    return () => window.removeEventListener("pagehide", pauseActiveSession);
  }, []);

  function persist(next: ModuleProgress) {
    const normalized = { ...next, updatedAt: new Date().toISOString() };
    const updated = { ...allProgress, [activeModule.id]: normalized };
    setProgress(normalized);
    setAllProgress(updated);
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* private mode can reject storage */ }
  }

  function openModule(moduleId: string) {
    const targetModule = studyModuleRegistry[moduleId];
    if (!targetModule) return;
    setSelectedModuleId(moduleId);
    const saved = allProgress[moduleId];
    setProgress(saved ?? emptyProgress(targetModule));
    setScreen("intro");
  }

  function begin() {
    let nextProgress = progress;
    if (progress.completed || progress.queue.length === 0) {
      const fresh = emptyProgress(activeModule);
      persist(fresh);
      nextProgress = fresh;
    }
    const sessionId = startStudySession(activeModule.id, activeModule.questions.length);
    sessionIdRef.current = sessionId;
    progressRef.current = nextProgress;
    questionStartedAtRef.current = Date.now();
    setSelectedOption(null);
    setScreen("question");
  }

  function answer() {
    if (!currentQuestion || !selectedOption) return;
    const correct = selectedOption === currentQuestion.correctOptionId;
    const remaining = progress.queue.slice(1);
    const attempts = { ...progress.attempts, [currentQuestion.id]: (progress.attempts[currentQuestion.id] ?? 0) + 1 };
    const mastered = correct && !progress.mastered.includes(currentQuestion.id)
      ? [...progress.mastered, currentQuestion.id]
      : progress.mastered;
    const queue = correct ? remaining : [...remaining, currentQuestion.id];
    const completed = correct && queue.length === 0;
    const nextProgress = { ...progress, attempts, mastered, queue, completed };
    persist(nextProgress);
    progressRef.current = nextProgress;
    const sessionId = sessionIdRef.current ?? startStudySession(activeModule.id, activeModule.questions.length);
    sessionIdRef.current = sessionId;
    const attemptRequest = recordStudyAttempt({
      sessionId,
      moduleId: activeModule.id,
      questionId: currentQuestion.id,
      selectedOptionId: selectedOption,
      responseMs: Date.now() - questionStartedAtRef.current,
      masteredCount: mastered.length,
    });
    if (completed) {
      sessionIdRef.current = null;
      void attemptRequest.finally(() => finishStudySession({
        sessionId,
        moduleId: activeModule.id,
        status: "completed",
        masteredCount: mastered.length,
      }));
    }
    setFeedback({ questionId: currentQuestion.id, optionId: selectedOption, correct });
    setSelectedOption(null);
    setScreen("feedback");
  }

  function continueAfterFeedback() {
    if (!feedback) return;
    if (feedback.correct && progress.queue.length === 0) {
      setScreen("complete");
      return;
    }
    if (!feedback.correct && progress.queue.length === 1) {
      setReviewIndex((progress.attempts[feedback.questionId] ?? 0) % activeModule.reviewFacts.length);
      setScreen("review");
      return;
    }
    setFeedback(null);
    questionStartedAtRef.current = Date.now();
    setScreen("question");
  }

  function pauseAndExit() {
    const sessionId = sessionIdRef.current;
    if (sessionId) {
      void finishStudySession({
        sessionId,
        moduleId: activeModule.id,
        status: "paused",
        masteredCount: progress.mastered.length,
      });
      sessionIdRef.current = null;
    }
    setScreen("home");
  }

  function resetModule() {
    if (sessionIdRef.current) pauseAndExit();
    const fresh = emptyProgress(activeModule);
    persist(fresh);
    setFeedback(null);
    setSelectedOption(null);
    setScreen("intro");
  }

  if (!ready) return <main className="grid min-h-screen place-items-center bg-[#fbf6ea]"><p className="font-serif text-xl font-bold text-[#6f2232]">Abrindo os livros…</p></main>;

  if (screen === "home") return <HomeScreen allProgress={allProgress} onOpen={openModule} onSources={() => setScreen("sources")} />;
  if (screen === "sources") return <SourcesScreen onBack={() => setScreen("home")} />;
  if (screen === "intro") return <IntroScreen module={activeModule} progress={progress} onBack={() => setScreen("home")} onBegin={begin} onReset={resetModule} />;
  if (screen === "question" && currentQuestion) return (
    <QuestionScreen question={currentQuestion} progress={progress} percent={percent} selected={selectedOption} onSelect={setSelectedOption} onAnswer={answer} onExit={pauseAndExit} />
  );
  if (screen === "feedback" && feedback && feedbackQuestion) return (
    <FeedbackScreen question={feedbackQuestion} feedback={feedback} onContinue={continueAfterFeedback} />
  );
  if (screen === "review") return (
    <ReviewBreak fact={activeModule.reviewFacts[reviewIndex]} onContinue={() => { setFeedback(null); questionStartedAtRef.current = Date.now(); setScreen("question"); }} />
  );
  if (screen === "complete") return <CompleteScreen module={activeModule} progress={progress} onHome={() => setScreen("home")} onRestart={resetModule} />;
  return <HomeScreen allProgress={allProgress} onOpen={openModule} onSources={() => setScreen("sources")} />;
}

function HomeScreen({ allProgress, onOpen, onSources }: { allProgress: SavedProgress; onOpen: (moduleId: string) => void; onSources: () => void }) {
  return (
    <main className="min-h-screen overflow-hidden pb-12">
      <header className="relative border-b border-amber-900/10 bg-[#f7edda] px-5 pb-10 pt-8">
        <div className="paper-dots absolute inset-0 opacity-[0.07]" />
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-7 flex items-center justify-between">
            <Brand />
            <div className="flex gap-2"><a href="/dashboard" className="rounded-full border border-[#caa56b]/50 bg-white/55 px-3 py-2 text-xs font-bold text-[#6f2232]">Acompanhamento</a><button onClick={onSources} className="rounded-full border border-[#caa56b]/50 bg-white/55 px-3 py-2 text-xs font-bold text-[#6f2232]">Fontes</button></div>
          </div>
          <div className="max-w-2xl">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-[#9a673e]"><Sparkles className="size-4" /> Central de revisão</p>
            <h1 className="font-serif text-4xl font-black leading-[1.02] tracking-tight text-[#3c2418] sm:text-5xl">Aprender é entender, testar e tentar de novo.</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#664733]">Escolha uma matéria, resolva os desafios e reveja cada erro até dominar todo o conteúdo.</p>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-5 pt-8" aria-labelledby="modules-heading">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div><p className="eyebrow">Biblioteca</p><h2 id="modules-heading" className="mt-1 font-serif text-2xl font-bold">Matérias disponíveis</h2></div>
          <BookOpen className="size-7 text-[#b7803e]" />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {studyModules.map((module) => {
            const saved = allProgress[module.id];
            const mastered = saved?.mastered?.length ?? 0;
            const modulePercent = Math.round((mastered / module.questionCount) * 100);
            return (
              <article key={module.id} className="overflow-hidden rounded-[1.75rem] border border-[#d6bd93] bg-[#fffdf7] shadow-[0_18px_50px_rgba(81,54,35,.10)]">
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#402431] via-[#6f2232] to-[#b7803e]">
                  {module.coverImage ? <img src={module.coverImage} alt={module.coverAlt ?? ""} className="h-full w-full object-cover object-[50%_28%] opacity-75" /> : module.subject === "Matemática" ? <Calculator className="absolute right-6 top-6 size-24 text-white/15" /> : <Languages className="absolute right-6 top-6 size-24 text-white/15" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#302018] via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-[#fff9eb]"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8c68c]">{module.subject} · {module.period}</p><h3 className="mt-1 font-serif text-2xl font-bold">{module.title}</h3></div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-6 text-[#6c4d39]">{module.description}</p>
                  <div className="mt-5 rounded-2xl bg-[#f6ead5] p-4">
                    <div className="mb-2 flex items-center justify-between text-xs font-bold text-[#6f2232]"><span>{saved?.completed ? "Concluído" : mastered ? "Em andamento" : "Ainda não iniciado"}</span><span>{modulePercent}%</span></div>
                    <Progress value={modulePercent} className="h-2 bg-[#dfc9a5] [&>div]:bg-[#6f2232]" />
                    <p className="mt-2 text-xs text-[#806147]">{mastered} de {module.questionCount} desafios dominados</p>
                  </div>
                  <Button onClick={() => onOpen(module.id)} className="mt-5 h-12 w-full rounded-2xl bg-[#6f2232] text-base font-bold text-white hover:bg-[#571927]">
                    {saved?.completed ? <Medal className="mr-2 size-5" /> : <Target className="mr-2 size-5" />}{saved?.completed ? "Revisar novamente" : mastered ? "Continuar revisão" : "Começar revisão"}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function Brand() {
  return <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-[#6f2232] text-[#fff7e8]"><BookOpen className="size-6" /></span><div><p className="font-serif text-xl font-bold leading-none">Estudos da Maya</p><p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a5a38]">7º ano</p></div></div>;
}

function IntroScreen({ module, progress, onBack, onBegin, onReset }: { module: StudyModule; progress: ModuleProgress; onBack: () => void; onBegin: () => void; onReset: () => void }) {
  const hasProgress = progress.mastered.length > 0 && !progress.completed;
  return (
    <main className="min-h-screen px-5 py-6"><div className="mx-auto max-w-2xl">
      <button onClick={onBack} className="mb-6 flex min-h-11 items-center gap-2 font-bold text-[#6f2232]"><ArrowLeft className="size-5" /> Voltar</button>
      <section className="rounded-[2rem] border border-[#d6bd93] bg-[#fffdf7] p-6 shadow-[0_18px_60px_rgba(81,54,35,.10)] sm:p-8">
        <p className="eyebrow">{module.subtitle}</p><h1 className="mt-2 font-serif text-3xl font-black leading-tight">{module.title}</h1>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat icon={<Brain />} value={String(module.questions.length)} label="desafios" /><Stat icon={<ScrollText />} value={String(module.chapterCount)} label="capítulos" /><Stat icon={<Target />} value="100%" label="para concluir" />
        </div>
        <div className="mt-7 rounded-2xl border border-[#e0c99f] bg-[#f8eedc] p-5"><h2 className="flex items-center gap-2 font-serif text-xl font-bold"><Lightbulb className="size-5 text-[#aa6f2c]" /> Como funciona</h2>
          <ol className="mt-3 space-y-3 text-sm leading-6 text-[#684a36]"><li><b>1.</b> Acertou? A pergunta fica dominada.</li><li><b>2.</b> Errou? Você recebe uma explicação específica.</li><li><b>3.</b> A pergunta volta no fim da fila, nunca logo depois.</li><li><b>4.</b> A revisão só termina quando todas estiverem certas.</li></ol>
        </div>
        {hasProgress && <div className="mt-6"><div className="mb-2 flex justify-between text-sm font-bold"><span>Seu progresso</span><span>{progress.mastered.length}/{module.questions.length}</span></div><Progress value={(progress.mastered.length / module.questions.length) * 100} className="h-3 bg-[#e3cfad] [&>div]:bg-[#6f2232]" /></div>}
        <Button onClick={onBegin} className="mt-7 h-13 w-full rounded-2xl bg-[#6f2232] text-base font-bold text-white hover:bg-[#571927]">{hasProgress ? "Continuar de onde parei" : "Iniciar os desafios"}<ChevronRight className="ml-2 size-5" /></Button>
        {hasProgress && <button onClick={onReset} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 text-sm font-bold text-[#8b5940]"><RotateCcw className="size-4" /> Recomeçar do zero</button>}
      </section>
    </div></main>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return <div className="flex items-center gap-3 rounded-2xl bg-[#f3e4c9] p-4 text-[#6f2232]"><span className="[&>svg]:size-5">{icon}</span><div><b className="block text-lg leading-none">{value}</b><span className="text-xs text-[#795844]">{label}</span></div></div>;
}

function QuestionScreen({ question, progress, percent, selected, onSelect, onAnswer, onExit }: { question: StudyQuestion; progress: ModuleProgress; percent: number; selected: string | null; onSelect: (id: string) => void; onAnswer: () => void; onExit: () => void }) {
  // QuestionScreen is remounted after every feedback screen, so retries receive
  // a fresh order too. The source content remains unchanged for answer checking.
  const [shuffledOptions] = useState(() => shuffledCopy(question.options));

  return (
    <main className="min-h-screen pb-28"><header className="sticky top-0 z-10 border-b border-[#dcc6a2] bg-[#fbf6ea]/95 px-4 py-3 backdrop-blur"><div className="mx-auto flex max-w-2xl items-center gap-3"><button onClick={onExit} aria-label="Sair e voltar ao menu" className="grid size-11 shrink-0 place-items-center rounded-xl text-[#6f2232]"><X className="size-6" /></button><div className="min-w-0 flex-1"><div className="mb-1 flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#815e46]"><span>{progress.mastered.length} dominadas</span><span>{percent}%</span></div><Progress value={percent} className="h-2 bg-[#e3cfad] [&>div]:bg-[#6f2232]" /></div></div></header>
      <section className="mx-auto max-w-2xl px-5 pt-6"><div className="mb-4 flex flex-wrap gap-2"><span className="challenge-tag">{kindLabels[question.kind]}</span><span className="topic-tag">{question.chapter} · {question.topic}</span></div>
        {question.image && <figure className="mb-5 overflow-hidden rounded-3xl border border-[#d6bd93] bg-[#382820]"><img src={question.image.src} alt={question.image.alt} className="h-52 w-full object-cover object-top opacity-90" /><figcaption className="bg-[#4a3327] px-4 py-2 text-xs text-[#f1ddba]">{question.image.credit}</figcaption></figure>}
        {question.context && <p className="mb-3 rounded-2xl border-l-4 border-[#b9803d] bg-[#f4e6ce] p-4 text-sm italic leading-6">{question.context}</p>}
        <h1 className="font-serif text-2xl font-black leading-8 sm:text-3xl sm:leading-10">{question.prompt}</h1>
        <div className="mt-6 space-y-3" role="radiogroup" aria-label="Alternativas">
          {shuffledOptions.map((option, index) => { const isSelected = selected === option.id; return <button key={option.id} role="radio" aria-checked={isSelected} onClick={() => onSelect(option.id)} className={`option-button ${isSelected ? "option-selected" : ""}`}><span className="option-letter">{String.fromCharCode(65 + index)}</span><span>{option.text}</span>{isSelected && <Check className="ml-auto size-5 shrink-0" />}</button>; })}
        </div>
      </section>
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-[#dcc6a2] bg-[#fffaf0]/96 p-4 backdrop-blur"><Button disabled={!selected} onClick={onAnswer} className="mx-auto flex h-13 w-full max-w-2xl rounded-2xl bg-[#6f2232] text-base font-bold text-white hover:bg-[#571927] disabled:opacity-40">Confirmar resposta</Button></div>
    </main>
  );
}

function FeedbackScreen({ question, feedback, onContinue }: { question: StudyQuestion; feedback: NonNullable<FeedbackState>; onContinue: () => void }) {
  const selected = question.options.find((option) => option.id === feedback.optionId)!;
  return (
    <main className={`min-h-screen px-5 py-8 ${feedback.correct ? "bg-[#eaf3e7]" : "bg-[#fbede7]"}`}><section className="mx-auto max-w-2xl">
      <div className={`grid size-16 place-items-center rounded-3xl text-white ${feedback.correct ? "bg-[#3d7a54]" : "bg-[#a4423e]"}`}>{feedback.correct ? <CheckCircle2 className="size-9" /> : <CircleAlert className="size-9" />}</div>
      <p className="eyebrow mt-6">{feedback.correct ? "Resposta dominada" : "Hora de entender a pista"}</p><h1 className="mt-2 font-serif text-3xl font-black">{feedback.correct ? "Muito bem!" : "Ainda não — mas agora faz sentido."}</h1>
      <div className="mt-6 rounded-3xl border border-black/10 bg-white/75 p-5 shadow-sm"><p className="text-sm font-bold uppercase tracking-wider text-[#8a654c]">Sua escolha</p><p className="mt-2 font-bold leading-6">{selected.text}</p><div className={`mt-4 rounded-2xl p-4 text-sm leading-6 ${feedback.correct ? "bg-[#e3f0e2] text-[#315d3e]" : "bg-[#f7dfd7] text-[#76332f]"}`}>{selected.feedback}</div></div>
      <div className="mt-4 rounded-3xl border border-[#dac59f] bg-[#fffaf0] p-5"><p className="flex items-center gap-2 font-serif text-lg font-bold"><Lightbulb className="size-5 text-[#a66b2b]" /> Guarde esta ideia</p><p className="mt-2 text-sm leading-6 text-[#644833]">{question.correctExplanation}</p><p className="mt-4 text-xs font-bold text-[#8b674b]">Base: {question.source}</p></div>
      {!feedback.correct && <p className="mt-5 flex items-start gap-2 text-sm font-bold leading-6 text-[#76332f]"><Clock3 className="mt-0.5 size-5 shrink-0" /> Esta pergunta foi enviada para o fim da fila. Ela voltará depois das outras.</p>}
      <Button onClick={onContinue} className="mt-7 h-13 w-full rounded-2xl bg-[#6f2232] text-base font-bold text-white hover:bg-[#571927]">{feedback.correct ? "Próximo desafio" : "Continuar a revisão"}<ChevronRight className="ml-2 size-5" /></Button>
    </section></main>
  );
}

function ReviewBreak({ fact, onContinue }: { fact: string; onContinue: () => void }) {
  return <main className="grid min-h-screen place-items-center bg-[#f0e4ce] px-5 py-8"><section className="max-w-lg rounded-[2rem] border border-[#d0b789] bg-[#fffaf0] p-7 text-center shadow-xl"><span className="mx-auto grid size-16 place-items-center rounded-3xl bg-[#b9803d] text-white"><Brain className="size-9" /></span><p className="eyebrow mt-6">Pausa estratégica</p><h1 className="mt-2 font-serif text-3xl font-black">Antes da pergunta voltar…</h1><p className="mt-5 rounded-2xl bg-[#f5e6ca] p-5 text-left text-base font-semibold leading-7">{fact}</p><p className="mt-4 text-sm leading-6 text-[#73533e]">A pergunta ficou por último. Leia a pista acima e só então tente novamente.</p><Button onClick={onContinue} className="mt-6 h-13 w-full rounded-2xl bg-[#6f2232] font-bold text-white">Estou pronta</Button></section></main>;
}

function CompleteScreen({ module, progress, onHome, onRestart }: { module: StudyModule; progress: ModuleProgress; onHome: () => void; onRestart: () => void }) {
  const totalAttempts = Object.values(progress.attempts).reduce((sum, value) => sum + value, 0);
  const reviewed = totalAttempts - module.questions.length;
  return <main className="grid min-h-screen place-items-center bg-[#efe0bd] px-5 py-8"><section className="max-w-xl text-center"><div className="mx-auto grid size-24 place-items-center rounded-full border-4 border-[#f5d88b] bg-[#6f2232] text-[#ffe6a1] shadow-xl"><Medal className="size-12" /></div><p className="eyebrow mt-7">Revisão concluída</p><h1 className="mt-2 font-serif text-4xl font-black">Todas as {module.questions.length} perguntas foram dominadas.</h1><p className="mt-4 text-base leading-7 text-[#644833]">Você não escapou dos erros: entendeu cada um e acertou quando a pergunta voltou. É isso que transforma revisão em aprendizagem.</p><div className="mt-7 grid grid-cols-2 gap-3"><Stat icon={<CheckCircle2 />} value={String(module.questions.length)} label="dominadas" /><Stat icon={<RotateCcw />} value={String(Math.max(0, reviewed))} label="reaplicações" /></div><Button onClick={onHome} className="mt-7 h-13 w-full rounded-2xl bg-[#6f2232] text-base font-bold text-white"><Home className="mr-2 size-5" /> Voltar ao menu</Button><button onClick={onRestart} className="mt-3 min-h-11 w-full text-sm font-bold text-[#704d38]">Refazer a matéria do zero</button></section></main>;
}

function SourcesScreen({ onBack }: { onBack: () => void }) {
  return <main className="min-h-screen px-5 py-6"><section className="mx-auto max-w-2xl"><button onClick={onBack} className="mb-6 flex min-h-11 items-center gap-2 font-bold text-[#6f2232]"><ArrowLeft className="size-5" /> Voltar ao menu</button><p className="eyebrow">Transparência</p><h1 className="mt-2 font-serif text-3xl font-black">Fontes dos módulos</h1><p className="mt-3 text-sm leading-6 text-[#674a36]">As perguntas seguem o conteúdo programático informado. Quando as páginas do livro não foram fornecidas, os exercícios são originais e não são apresentados como reprodução da obra.</p>
    <div className="mt-6 space-y-4"><SourceCard title="História — material didático da escola" body="Capítulo 3, pp. 48–53, 56–58, 60 e 62; Capítulo 4, pp. 80–82; anotações e exercícios do caderno enviados em 29/08/2026." /><SourceCard title="Matemática — conteúdo programático" body="Capítulo 5, pp. 114–129, exceto 118–119; Capítulo 6, pp. 136–155; Capítulo 7, pp. 160–177. Questões originais baseadas nos conceitos listados para o 7º ano." /><SourceCard title="Língua Portuguesa — conteúdo programático" body="PDF da recuperação do 2º trimestre: capítulos 3 a 6, transitividade, gêneros jornalísticos, coordenação, argumentação, referenciação e concordâncias nominal e verbal. Textos-base e questões foram criados exclusivamente para esta revisão; o livro não foi reproduzido. O reforço direcionado usa questões novas e dá mais peso aos tópicos com mais erros na primeira rodada completa." /><SourceCard title="Retratos históricos" body="Martinho Lutero (Lucas Cranach, 1529), João Calvino e Luís XIV (Hyacinthe Rigaud). Reproduções de obras em domínio público." links={[{ label: "Lutero — Wikimedia Commons", href: "https://commons.wikimedia.org/wiki/File:Martin_Luther,_1529.jpg" }, { label: "Calvino — Wikimedia Commons", href: "https://commons.wikimedia.org/wiki/File:Portrait_john_calvin.jpg" }, { label: "Luís XIV — Wikimedia Commons", href: "https://commons.wikimedia.org/wiki/File:Louis_XIV_of_France.jpg" }]} /></div>
    </section></main>;
}

function SourceCard({ title, body, links = [] }: { title: string; body: string; links?: { label: string; href: string }[] }) {
  return <article className="rounded-3xl border border-[#d6bd93] bg-[#fffaf0] p-5"><h2 className="font-serif text-xl font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-[#674a36]">{body}</p>{links.length > 0 && <ul className="mt-4 space-y-2">{links.map((link) => <li key={link.href}><a href={link.href} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#6f2232] underline decoration-[#c79d65] underline-offset-4">{link.label}</a></li>)}</ul>}</article>;
}
