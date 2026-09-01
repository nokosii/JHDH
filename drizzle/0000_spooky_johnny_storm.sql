CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`submission_id` text NOT NULL,
	`recommendation` text NOT NULL,
	`confidential_comments` text,
	`author_comments` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`title_en` text,
	`author_name` text NOT NULL,
	`email` text NOT NULL,
	`affiliation` text,
	`category` text NOT NULL,
	`abstract` text NOT NULL,
	`keywords` text,
	`manuscript_key` text NOT NULL,
	`manuscript_name` text NOT NULL,
	`status` text DEFAULT 'submitted' NOT NULL,
	`created_at` integer NOT NULL
);
