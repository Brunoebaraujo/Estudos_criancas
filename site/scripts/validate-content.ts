import assert from "node:assert/strict";
import { studyModuleRegistry } from "../content/registry";
import { shuffledCopy } from "../lib/shuffle";

for (const studyModule of Object.values(studyModuleRegistry)) {
  assert.ok(studyModule.subject.trim(), `${studyModule.id}: matéria vazia`);
  assert.ok(studyModule.period.trim(), `${studyModule.id}: período vazio`);
  assert.ok(studyModule.chapterCount > 0, `${studyModule.id}: número de capítulos inválido`);
  assert.ok(studyModule.questions.length > 0, `${studyModule.id}: módulo vazio`);
  const ids = new Set(studyModule.questions.map((question) => question.id));
  assert.equal(ids.size, studyModule.questions.length, `${studyModule.id}: IDs de perguntas duplicados`);

  for (const question of studyModule.questions) {
    assert.ok(question.prompt.trim(), `${question.id}: enunciado vazio`);
    assert.ok(question.source.trim(), `${question.id}: fonte vazia`);
    assert.ok(question.correctExplanation.trim(), `${question.id}: explicação correta vazia`);
    assert.ok(question.options.length >= 2, `${question.id}: poucas alternativas`);
    assert.ok(question.options.some((option) => option.id === question.correctOptionId), `${question.id}: resposta correta inexistente`);
    assert.equal(new Set(question.options.map((option) => option.id)).size, question.options.length, `${question.id}: alternativas duplicadas`);
    for (const option of question.options) {
      assert.ok(option.text.trim(), `${question.id}/${option.id}: alternativa vazia`);
      assert.ok(option.feedback.trim(), `${question.id}/${option.id}: feedback vazio`);
    }
  }
}

const history = studyModuleRegistry.RecHist2Tri26;
assert.equal(history.questions.length, 36, "RecHist2Tri26 deve ter 36 desafios");
assert.ok(history.questions.some((question) => question.topic.includes("Concílio")), "Concílio de Trento não coberto");
assert.ok(history.questions.some((question) => question.topic.includes("Calvinismo")), "Calvinismo não coberto");
assert.ok(history.questions.some((question) => question.topic.includes("Absolutismo")), "Absolutismo não coberto");
assert.ok(history.questions.some((question) => question.topic.includes("Guerra Civil")), "Guerra Civil Inglesa não coberta");

const math = studyModuleRegistry.RecMat2Tri26;
assert.equal(math.questions.length, 46, "RecMat2Tri26 deve ter 46 desafios");
for (const topic of [
  "Expressões algébricas", "Simplificação", "Equações", "Ideia de ângulo",
  "Minutos e segundos", "Bissetriz", "complementares", "suplementares",
  "opostos pelo vértice", "Paralelas e transversal", "Razão", "Velocidade média",
  "Escala", "Densidade demográfica", "Proporção", "Regra de três", "Porcentagem",
]) {
  assert.ok(math.questions.some((question) => question.topic.toLowerCase().includes(topic.toLowerCase())), `Matemática: tópico não coberto — ${topic}`);
}

const sampleOptions = history.questions[0].options;
const correctId = history.questions[0].correctOptionId;
const sequence = (...values: number[]) => {
  let index = 0;
  return () => values[index++] ?? values.at(-1) ?? 0;
};
const possibleCorrectPositions = new Set([
  shuffledCopy(sampleOptions, () => 0.999).findIndex((option) => option.id === correctId),
  shuffledCopy(sampleOptions, sequence(0.5, 0)).findIndex((option) => option.id === correctId),
  shuffledCopy(sampleOptions, () => 0).findIndex((option) => option.id === correctId),
]);
assert.deepEqual([...possibleCorrectPositions].sort(), [0, 1, 2], "a resposta correta deve poder aparecer em A, B ou C");
assert.deepEqual(sampleOptions, history.questions[0].options, "o embaralhamento não pode alterar o conteúdo original");

const totalQuestions = Object.values(studyModuleRegistry).reduce((sum, module) => sum + module.questions.length, 0);
console.log(`Conteúdo validado: ${Object.keys(studyModuleRegistry).length} módulos, ${totalQuestions} perguntas, respostas aleatórias em A/B/C.`);
