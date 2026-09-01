CREATE INDEX `idx_reviews_submission_id` ON `reviews` (`submission_id`);--> statement-breakpoint
CREATE INDEX `idx_submissions_status_created` ON `submissions` (`status`,`created_at`);