import { env } from "cloudflare:workers";
import { studyModuleRegistry } from "@/content/registry";

const STUDENT_ID = "maya";
const SAFE_ID = /^[a-zA-Z0-9:_-]{1,180}$/;

type Payload = Record<string, unknown>;

function asId(value: unknown) {
  return typeof value === "string" && SAFE_ID.test(value) ? value : null;
}

function asTime(value: unknown) {
  if (typeof value !== "string") return new Date().toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function asCount(value: unknown, maximum: number) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? Math.max(0, Math.min(maximum, Math.floor(parsed))) : 0;
}

function error(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

function getModule(payload: Payload) {
  const moduleId = asId(payload.moduleId);
  return moduleId ? studyModuleRegistry[moduleId] : undefined;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return error("Origem não autorizada", 403);

  let payload: Payload;
  try {
    payload = await request.json() as Payload;
  } catch {
    return error("JSON inválido");
  }

  const action = typeof payload.action === "string" ? payload.action : "";
  const sessionId = asId(payload.sessionId);
  const studyModule = getModule(payload);
  if (!sessionId || !studyModule) return error("Sessão ou matéria inválida");

  const occurredAt = asTime(payload.occurredAt);
  const totalQuestions = studyModule.questions.length;
  const db = env.DB;
  if (!db) return error("Base de acompanhamento indisponível", 503);

  try {
    if (action === "start") {
      await db.prepare(`
        INSERT INTO study_sessions (
          id, student_id, module_id, source, status, started_at, last_activity_at,
          total_questions, mastered_count, total_attempts, correct_answers, direct_correct
        ) VALUES (?, ?, ?, 'live', 'active', ?, ?, ?, 0, 0, 0, 0)
        ON CONFLICT(id) DO UPDATE SET last_activity_at = excluded.last_activity_at, status = 'active'
      `).bind(sessionId, STUDENT_ID, studyModule.id, occurredAt, occurredAt, totalQuestions).run();
      return Response.json({ ok: true }, { status: 201 });
    }

    if (action === "answer") {
      const eventId = asId(payload.eventId);
      const questionId = asId(payload.questionId);
      const selectedOptionId = asId(payload.selectedOptionId);
      const question = studyModule.questions.find((item) => item.id === questionId);
      const optionExists = question?.options.some((item) => item.id === selectedOptionId);
      if (!eventId || !question || !selectedOptionId || !optionExists) return error("Resposta inválida");

      const duplicate = await db.prepare("SELECT id FROM answer_attempts WHERE id = ? LIMIT 1").bind(eventId).first();
      if (duplicate) return Response.json({ ok: true, duplicate: true });

      await db.prepare(`
        INSERT INTO study_sessions (
          id, student_id, module_id, source, status, started_at, last_activity_at,
          total_questions, mastered_count, total_attempts, correct_answers, direct_correct
        ) VALUES (?, ?, ?, 'live', 'active', ?, ?, ?, 0, 0, 0, 0)
        ON CONFLICT(id) DO NOTHING
      `).bind(sessionId, STUDENT_ID, studyModule.id, occurredAt, occurredAt, totalQuestions).run();

      const prior = await db.prepare(
        "SELECT COUNT(*) AS count FROM answer_attempts WHERE session_id = ? AND question_id = ?"
      ).bind(sessionId, question.id).first<{ count: number }>();
      const attemptNumber = Number(prior?.count ?? 0) + 1;
      const correct = selectedOptionId === question.correctOptionId;
      const directCorrect = correct && attemptNumber === 1 ? 1 : 0;
      const responseMs = asCount(payload.responseMs, 3_600_000);
      const masteredCount = asCount(payload.masteredCount, totalQuestions);

      await db.batch([
        db.prepare(`
          INSERT INTO answer_attempts (
            id, session_id, student_id, module_id, question_id, topic,
            selected_option_id, correct, attempt_number, response_ms, answered_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          eventId, sessionId, STUDENT_ID, studyModule.id, question.id, question.topic,
          selectedOptionId, correct ? 1 : 0, attemptNumber, responseMs, occurredAt
        ),
        db.prepare(`
          UPDATE study_sessions SET
            status = 'active', last_activity_at = ?, total_attempts = total_attempts + 1,
            correct_answers = correct_answers + ?, direct_correct = direct_correct + ?,
            mastered_count = ?
          WHERE id = ?
        `).bind(occurredAt, correct ? 1 : 0, directCorrect, masteredCount, sessionId),
      ]);
      return Response.json({ ok: true, correct, attemptNumber }, { status: 201 });
    }

    if (action === "finish") {
      const status = payload.status === "completed" ? "completed" : "paused";
      const masteredCount = asCount(payload.masteredCount, totalQuestions);
      await db.prepare(`
        UPDATE study_sessions SET status = ?, mastered_count = ?, ended_at = ?, last_activity_at = ?
        WHERE id = ? AND student_id = ?
      `).bind(status, masteredCount, occurredAt, occurredAt, sessionId, STUDENT_ID).run();
      return Response.json({ ok: true });
    }

    if (action === "import") {
      const attempts = payload.attempts && typeof payload.attempts === "object"
        ? payload.attempts as Record<string, unknown>
        : {};
      const masteredInput = Array.isArray(payload.mastered) ? payload.mastered : [];
      const validIds = new Set(studyModule.questions.map((question) => question.id));
      const mastered = [...new Set(masteredInput.filter((id): id is string => typeof id === "string" && validIds.has(id)))];
      const totalAttempts = studyModule.questions.reduce((sum, question) => sum + asCount(attempts[question.id], 100), 0);
      const directCorrect = mastered.filter((id) => asCount(attempts[id], 100) === 1).length;
      const status = payload.completed === true ? "completed" : "paused";

      await db.prepare(`
        INSERT INTO study_sessions (
          id, student_id, module_id, source, status, started_at, last_activity_at, ended_at,
          total_questions, mastered_count, total_attempts, correct_answers, direct_correct
        ) VALUES (?, ?, ?, 'imported', ?, NULL, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO NOTHING
      `).bind(
        sessionId, STUDENT_ID, studyModule.id, status, occurredAt, occurredAt,
        totalQuestions, mastered.length, totalAttempts, mastered.length, directCorrect
      ).run();
      return Response.json({ ok: true }, { status: 201 });
    }

    return error("Ação inválida");
  } catch (caught) {
    const message = caught instanceof Error ? caught.message : "Erro inesperado";
    return error(message.includes("no such table") ? "Base ainda não inicializada" : "Falha ao registrar atividade", 500);
  }
}
