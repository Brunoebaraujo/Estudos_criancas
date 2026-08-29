CREATE TABLE `answer_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`student_id` text NOT NULL,
	`module_id` text NOT NULL,
	`question_id` text NOT NULL,
	`topic` text NOT NULL,
	`selected_option_id` text NOT NULL,
	`correct` integer NOT NULL,
	`attempt_number` integer NOT NULL,
	`response_ms` integer DEFAULT 0 NOT NULL,
	`answered_at` text NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `study_sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `study_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`module_id` text NOT NULL,
	`source` text DEFAULT 'live' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`started_at` text,
	`last_activity_at` text NOT NULL,
	`ended_at` text,
	`total_questions` integer NOT NULL,
	`mastered_count` integer DEFAULT 0 NOT NULL,
	`total_attempts` integer DEFAULT 0 NOT NULL,
	`correct_answers` integer DEFAULT 0 NOT NULL,
	`direct_correct` integer DEFAULT 0 NOT NULL
);
