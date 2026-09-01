import { env } from 'cloudflare:workers';
import { ensureJournalSchema } from '@/db/runtime';

export async function POST(request: Request) {
  const body = await request.json() as { submissionId?: string; recommendation?: string; confidentialComments?: string; authorComments?: string };
  if (!body.submissionId || !body.recommendation || !body.authorComments?.trim()) return Response.json({ error: '請完成審查建議與給作者意見。' }, { status: 400 });
  await ensureJournalSchema();
  await env.DB.prepare('INSERT INTO reviews (submission_id, recommendation, confidential_comments, author_comments, created_at) VALUES (?, ?, ?, ?, ?)')
    .bind(body.submissionId, body.recommendation, body.confidentialComments ?? '', body.authorComments, Date.now()).run();
  return Response.json({ saved: true }, { status: 201 });
}
