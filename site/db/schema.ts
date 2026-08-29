import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const studySessions = sqliteTable("study_sessions", {
  id: text("id").primaryKey(),
  studentId: text("student_id").notNull(),
  moduleId: text("module_id").notNull(),
  source: text("source").notNull().default("live"),
  status: text("status").notNull().default("active"),
  startedAt: text("started_at"),
  lastActivityAt: text("last_activity_at").notNull(),
  endedAt: text("ended_at"),
  totalQuestions: integer("total_questions").notNull(),
  masteredCount: integer("mastered_count").notNull().default(0),
  totalAttempts: integer("total_attempts").notNull().default(0),
  correctAnswers: integer("correct_answers").notNull().default(0),
  directCorrect: integer("direct_correct").notNull().default(0),
});

export const answerAttempts = sqliteTable("answer_attempts", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull().references(() => studySessions.id),
  studentId: text("student_id").notNull(),
  moduleId: text("module_id").notNull(),
  questionId: text("question_id").notNull(),
  topic: text("topic").notNull(),
  selectedOptionId: text("selected_option_id").notNull(),
  correct: integer("correct", { mode: "boolean" }).notNull(),
  attemptNumber: integer("attempt_number").notNull(),
  responseMs: integer("response_ms").notNull().default(0),
  answeredAt: text("answered_at").notNull(),
});
