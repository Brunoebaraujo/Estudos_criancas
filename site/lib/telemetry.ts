const PROFILE_ID = "maya";
const LEGACY_SYNC_KEY = "estudos-criancas-analytics-import-v1";

type LegacyProgress = {
  mastered: string[];
  attempts: Record<string, number>;
  completed: boolean;
  updatedAt: string;
};

function makeId(prefix: string) {
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${id}`;
}

async function sendTelemetry(payload: Record<string, unknown>, useBeacon = false) {
  const body = JSON.stringify({ ...payload, studentId: PROFILE_ID });
  try {
    if (useBeacon && navigator.sendBeacon) {
      return navigator.sendBeacon("/api/telemetry", new Blob([body], { type: "application/json" }));
    }
    const response = await fetch("/api/telemetry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    });
    return response.ok;
  } catch {
    return false;
  }
}

export function startStudySession(moduleId: string, totalQuestions: number) {
  const sessionId = makeId("session");
  void sendTelemetry({ action: "start", sessionId, moduleId, totalQuestions, occurredAt: new Date().toISOString() });
  return sessionId;
}

export function recordStudyAttempt(input: {
  sessionId: string;
  moduleId: string;
  questionId: string;
  selectedOptionId: string;
  responseMs: number;
  masteredCount: number;
}) {
  return sendTelemetry({
    action: "answer",
    eventId: makeId("answer"),
    occurredAt: new Date().toISOString(),
    ...input,
  });
}

export function finishStudySession(input: {
  sessionId: string;
  moduleId: string;
  status: "completed" | "paused";
  masteredCount: number;
}, useBeacon = false) {
  return sendTelemetry({ action: "finish", occurredAt: new Date().toISOString(), ...input }, useBeacon);
}

export async function importLegacyProgress(moduleId: string, totalQuestions: number, progress: LegacyProgress) {
  if (!progress.mastered.length && !Object.keys(progress.attempts).length) return;
  const importKey = `${LEGACY_SYNC_KEY}:${moduleId}:${progress.updatedAt}`;
  if (window.localStorage.getItem(importKey)) return;

  const success = await sendTelemetry({
    action: "import",
    sessionId: `import-${moduleId}-${progress.updatedAt.replace(/[^0-9]/g, "")}`,
    moduleId,
    totalQuestions,
    mastered: progress.mastered,
    attempts: progress.attempts,
    completed: progress.completed,
    occurredAt: progress.updatedAt,
  });
  if (success) window.localStorage.setItem(importKey, "1");
}
