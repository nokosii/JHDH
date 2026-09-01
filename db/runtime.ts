import { env } from 'cloudflare:workers';

export async function ensureJournalSchema() {
  const db = env.DB;
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY, title TEXT NOT NULL, title_en TEXT, author_name TEXT NOT NULL,
      email TEXT NOT NULL, affiliation TEXT, category TEXT NOT NULL, abstract TEXT NOT NULL,
      keywords TEXT, manuscript_key TEXT NOT NULL, manuscript_name TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'submitted', created_at INTEGER NOT NULL
    )`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_submissions_status_created ON submissions(status, created_at)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT, submission_id TEXT NOT NULL, recommendation TEXT NOT NULL,
      confidential_comments TEXT, author_comments TEXT NOT NULL, created_at INTEGER NOT NULL
    )`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_reviews_submission_id ON reviews(submission_id)`),
  ]);
  await db.prepare('PRAGMA optimize').run();
}
