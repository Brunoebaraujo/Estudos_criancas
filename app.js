import { recHist2Tri26 as studyModule } from "./content.js";

const STORAGE_KEY = "estudos-criancas-static-v1";
const app = document.querySelector("#app");
let screen = "home";
let selected = null;
let feedback = null;
let progress = loadProgress();
let optionOrderKey = "";
let optionOrder = [];

const kindLabels = {
  pista: "Caça à pista",
  "verdadeiro-ou-falso": "Verdadeiro ou falso",
  "linha-do-tempo": "Linha do tempo",
  "quem-sou-eu": "Quem sou eu?",
  conexao: "Faça a conexão",
};

function freshProgress() {
  return { mastered: [], queue: studyModule.questions.map((q) => q.id), attempts: {}, completed: false };
}

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || freshProgress(); }
  catch { return freshProgress(); }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function questionById(id) { return studyModule.questions.find((q) => q.id === id); }
function percent() { return Math.round(progress.mastered.length / studyModule.questions.length * 100); }

function shuffledCopy(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function optionsFor(question) {
  const key = `${question.id}:${progress.attempts[question.id] || 0}`;
  if (optionOrderKey !== key) {
    optionOrderKey = key;
    optionOrder = shuffledCopy(question.options);
  }
  return optionOrder;
}

function go(next) { screen = next; selected = null; render(); window.scrollTo({ top: 0, behavior: "smooth" }); }

function render() {
  if (screen === "home") return renderHome();
  if (screen === "intro") return renderIntro();
  if (screen === "question") return renderQuestion();
  if (screen === "feedback") return renderFeedback();
  if (screen === "review") return renderReview();
  if (screen === "complete") return renderComplete();
  if (screen === "sources") return renderSources();
}

function renderHome() {
  app.innerHTML = `
    <header class="hero"><div class="wrap">
      <div class="top"><div class="brand"><span class="logo">▤</span><div><b>Estudos da Maya</b><small>7º ano</small></div></div><button class="link-button" id="sources">Fontes</button></div>
      <p class="eyebrow">✦ Central de revisão</p><h1>História não é decorar.<br>É ligar as pistas.</h1><p>Resolva os desafios e reveja cada erro até dominar todo o conteúdo.</p>
    </div></header>
    <section class="wrap library"><p class="eyebrow">Biblioteca</p><h2>Matérias disponíveis</h2>
      <article class="module-card"><div class="cover"><img src="${studyModule.coverImage}" alt="${studyModule.coverAlt}"><div><small>História · 2º trimestre</small><h3>${studyModule.title}</h3></div></div>
      <div class="card-body"><p>${studyModule.description}</p><div class="progress-box"><div><b>${progress.completed ? "Concluído" : progress.mastered.length ? "Em andamento" : "Ainda não iniciado"}</b><b>${percent()}%</b></div><progress max="100" value="${percent()}"></progress><small>${progress.mastered.length} de ${studyModule.questions.length} desafios dominados</small></div>
      <button class="primary" id="open">${progress.completed ? "Revisar novamente" : progress.mastered.length ? "Continuar revisão" : "Começar revisão"}</button></div></article>
    </section>`;
  document.querySelector("#open").onclick = () => go("intro");
  document.querySelector("#sources").onclick = () => go("sources");
}

function renderIntro() {
  app.innerHTML = `<section class="page wrap"><button class="back" id="back">← Voltar</button><div class="panel"><p class="eyebrow">${studyModule.subtitle}</p><h1>${studyModule.title}</h1>
    <div class="stats"><span><b>${studyModule.questions.length}</b><small>desafios</small></span><span><b>2</b><small>capítulos</small></span><span><b>100%</b><small>para concluir</small></span></div>
    <div class="how"><h2>💡 Como funciona</h2><ol><li>Acertou? A pergunta fica dominada.</li><li>Errou? Você recebe uma explicação específica.</li><li>A pergunta volta no fim da fila, nunca logo depois.</li><li>A revisão só termina quando todas estiverem certas.</li></ol></div>
    ${progress.mastered.length && !progress.completed ? `<p class="resume">Progresso: ${progress.mastered.length}/${studyModule.questions.length}</p>` : ""}
    <button class="primary" id="begin">${progress.mastered.length && !progress.completed ? "Continuar de onde parei" : "Iniciar os desafios"}</button>
    ${progress.mastered.length ? `<button class="secondary" id="reset">↻ Recomeçar do zero</button>` : ""}</div></section>`;
  document.querySelector("#back").onclick = () => go("home");
  document.querySelector("#begin").onclick = () => { if (progress.completed) { progress = freshProgress(); saveProgress(); } go("question"); };
  document.querySelector("#reset")?.addEventListener("click", () => { progress = freshProgress(); saveProgress(); renderIntro(); });
}

function renderQuestion() {
  const question = questionById(progress.queue[0]);
  if (!question) return go(progress.completed ? "complete" : "home");
  const displayedOptions = optionsFor(question);
  app.innerHTML = `<header class="quiz-head"><div class="wrap row"><button id="exit" aria-label="Voltar ao menu">✕</button><div><small>${progress.mastered.length} dominadas · ${percent()}%</small><progress max="100" value="${percent()}"></progress></div></div></header>
    <section class="page wrap question"><div class="tags"><span>${kindLabels[question.kind]}</span><em>${question.chapter} · ${question.topic}</em></div>
    ${question.image ? `<figure><img src="${question.image.src}" alt="${question.image.alt}"><figcaption>${question.image.credit}</figcaption></figure>` : ""}
    <h1>${question.prompt}</h1><div class="options">${displayedOptions.map((option, index) => `<button data-id="${option.id}"><i>${String.fromCharCode(65 + index)}</i><span>${option.text}</span></button>`).join("")}</div></section>
    <footer class="action"><button class="primary" id="answer" disabled>Confirmar resposta</button></footer>`;
  document.querySelector("#exit").onclick = () => go("home");
  document.querySelectorAll(".options button").forEach((button) => button.onclick = () => {
    selected = button.dataset.id; document.querySelectorAll(".options button").forEach((el) => el.classList.toggle("selected", el === button)); document.querySelector("#answer").disabled = false;
  });
  document.querySelector("#answer").onclick = answerQuestion;
}

function answerQuestion() {
  const question = questionById(progress.queue[0]);
  const correct = selected === question.correctOptionId;
  progress.attempts[question.id] = (progress.attempts[question.id] || 0) + 1;
  const rest = progress.queue.slice(1);
  if (correct) { if (!progress.mastered.includes(question.id)) progress.mastered.push(question.id); progress.queue = rest; }
  else progress.queue = [...rest, question.id];
  progress.completed = correct && progress.queue.length === 0;
  feedback = { questionId: question.id, optionId: selected, correct };
  saveProgress(); go("feedback");
}

function renderFeedback() {
  const question = questionById(feedback.questionId);
  const option = question.options.find((item) => item.id === feedback.optionId);
  app.innerHTML = `<section class="page wrap feedback ${feedback.correct ? "right" : "wrong"}"><div class="result-icon">${feedback.correct ? "✓" : "!"}</div><p class="eyebrow">${feedback.correct ? "Resposta dominada" : "Hora de entender a pista"}</p><h1>${feedback.correct ? "Muito bem!" : "Ainda não — mas agora faz sentido."}</h1>
    <div class="answer-card"><small>Sua escolha</small><b>${option.text}</b><p>${option.feedback}</p></div><div class="keep"><h2>💡 Guarde esta ideia</h2><p>${question.correctExplanation}</p><small>Base: ${question.source}</small></div>
    ${feedback.correct ? "" : `<p class="queue-note">◷ Esta pergunta foi enviada para o fim da fila.</p>`}<button class="primary" id="continue">${feedback.correct ? "Próximo desafio" : "Continuar a revisão"}</button></section>`;
  document.querySelector("#continue").onclick = () => {
    if (feedback.correct && progress.queue.length === 0) return go("complete");
    if (!feedback.correct && progress.queue.length === 1) return go("review");
    feedback = null; go("question");
  };
}

function renderReview() {
  const index = (progress.attempts[feedback.questionId] || 0) % studyModule.reviewFacts.length;
  app.innerHTML = `<section class="center wrap"><div class="panel"><div class="result-icon">🧠</div><p class="eyebrow">Pausa estratégica</p><h1>Antes da pergunta voltar…</h1><p class="fact">${studyModule.reviewFacts[index]}</p><p>A pergunta ficou por último. Leia a pista e só então tente novamente.</p><button class="primary" id="ready">Estou pronta</button></div></section>`;
  document.querySelector("#ready").onclick = () => { feedback = null; go("question"); };
}

function renderComplete() {
  const attempts = Object.values(progress.attempts).reduce((sum, value) => sum + value, 0);
  app.innerHTML = `<section class="center wrap complete"><div class="medal">★</div><p class="eyebrow">Revisão concluída</p><h1>Todas as ${studyModule.questions.length} perguntas foram dominadas.</h1><p>Você entendeu cada erro e acertou quando a pergunta voltou. Isso é aprendizagem.</p><div class="stats"><span><b>${studyModule.questions.length}</b><small>dominadas</small></span><span><b>${Math.max(0, attempts - studyModule.questions.length)}</b><small>reaplicações</small></span></div><button class="primary" id="home">Voltar ao menu</button><button class="secondary" id="again">Refazer do zero</button></section>`;
  document.querySelector("#home").onclick = () => go("home");
  document.querySelector("#again").onclick = () => { progress = freshProgress(); saveProgress(); go("intro"); };
}

function renderSources() {
  app.innerHTML = `<section class="page wrap sources"><button class="back" id="back">← Voltar ao menu</button><p class="eyebrow">Transparência</p><h1>Fontes do módulo</h1><article><h2>Material didático da escola</h2><p>Capítulo 3, pp. 48–53, 56–58, 60 e 62; Capítulo 4, pp. 80–82; anotações e exercícios do caderno enviados em 29/08/2026.</p></article><article><h2>Retratos históricos</h2><p>Reproduções de obras em domínio público.</p><a href="https://commons.wikimedia.org/wiki/File:Martin_Luther,_1529.jpg">Martinho Lutero</a><a href="https://commons.wikimedia.org/wiki/File:Portrait_john_calvin.jpg">João Calvino</a><a href="https://commons.wikimedia.org/wiki/File:Louis_XIV_of_France.jpg">Luís XIV</a></article></section>`;
  document.querySelector("#back").onclick = () => go("home");
}

render();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
