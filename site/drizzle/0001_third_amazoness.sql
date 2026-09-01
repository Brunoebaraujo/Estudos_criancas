CREATE TABLE `pairing_codes` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`code_hash` text NOT NULL,
	`created_at` text NOT NULL,
	`expires_at` text NOT NULL,
	`used_at` text,
	FOREIGN KEY (`student_id`) REFERENCES `student_profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pairing_codes_code_hash_unique` ON `pairing_codes` (`code_hash`);--> statement-breakpoint
CREATE TABLE `student_devices` (
	`id` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`token_hash` text NOT NULL,
	`label` text,
	`created_at` text NOT NULL,
	`last_used_at` text NOT NULL,
	`revoked_at` text,
	FOREIGN KEY (`student_id`) REFERENCES `student_profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `student_devices_token_hash_unique` ON `student_devices` (`token_hash`);--> statement-breakpoint
CREATE TABLE `student_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`school_year` text,
	`avatar` text DEFAULT 'book' NOT NULL,
	`created_at` text NOT NULL,
	`archived_at` text
);
