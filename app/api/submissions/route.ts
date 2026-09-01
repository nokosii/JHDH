import { env } from 'cloudflare:workers';
import { ensureJournalSchema } from '@/db/runtime';

export async function GET() {
  await ensureJournalSchema();
  const result = await env.DB.prepare('SELECT id, title, author_name AS authorName, category, status, created_at AS createdAt FROM submissions ORDER BY created_at DESC LIMIT 20').all();
  return Response.json(result.results);
}

export async function POST(request: Request) {
  const data = await request.formData();
  const title = String(data.get('title') ?? '').trim(); const titleEn = String(data.get('titleEn') ?? '').trim();
  const authorName = String(data.get('authorName') ?? '').trim(); const email = String(data.get('email') ?? '').trim();
  const affiliation = String(data.get('affiliation') ?? '').trim(); const category = String(data.get('category') ?? '').trim();
  const abstract = String(data.get('abstract') ?? '').trim(); const keywords = String(data.get('keywords') ?? '').trim();
  const manuscript = data.get('manuscript');
  if (!title || !authorName || !email || !category || !abstract || !(manuscript instanceof File) || manuscript.size === 0) return Response.json({ error: '請填寫所有必填欄位並上傳稿件。' }, { status: 400 });
  if (manuscript.size > 20 * 1024 * 1024) return Response.json({ error: '稿件檔案不得超過 20 MB。' }, { status: 400 });
  const extension = manuscript.name.split('.').pop()?.toLowerCase();
  if (!extension || !['pdf', 'doc', 'docx'].includes(extension)) return Response.json({ error: '稿件僅接受 PDF、DOC 或 DOCX。' }, { status: 400 });
  const id = `JHDH-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const safeName = manuscript.name.replace(/[^a-zA-Z0-9._\-\u4e00-\u9fff]/g, '_');
  const manuscriptKey = `submissions/${id}/${safeName}`;
  await env.UPLOADS.put(manuscriptKey, await manuscript.arrayBuffer(), { httpMetadata: { contentType: manuscript.type || 'application/octet-stream' } });
  await ensureJournalSchema();
  await env.DB.prepare(`INSERT INTO submissions
    (id, title, title_en, author_name, email, affiliation, category, abstract, keywords, manuscript_key, manuscript_name, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'submitted', ?)`)
    .bind(id, title, titleEn, authorName, email, affiliation, category, abstract, keywords, manuscriptKey, manuscript.name, Date.now()).run();
  return Response.json({ id, status: 'submitted' }, { status: 201 });
}
