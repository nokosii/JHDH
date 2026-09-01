import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Download, FileText, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { articles } from '@/lib/journal-data';

export function generateStaticParams() { return articles.map((article) => ({ id: article.id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = articles.find((item) => item.id === id);
  if (!article) return { title: '找不到文章｜客家與數位人文期刊', openGraph: { images: [] }, twitter: { images: [] } };
  return { title: `${article.title}｜客家與數位人文期刊`, description: article.abstract, openGraph: { title: article.title, description: article.abstract, images: [] }, twitter: { card: 'summary', title: article.title, description: article.abstract, images: [] } };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = articles.find((item) => item.id === id);
  if (!article) notFound();
  return (
    <main><SiteHeader />
      <article className="article-page">
        <Link className="back-link" href="/articles"><ArrowLeft /> 返回文章典藏</Link>
        <div className="article-title-block"><p className="article-type">{article.type}</p><h1>{article.title}</h1><p className="article-title-en">{article.titleEn}</p><p className="article-byline">{article.authors}<span>{article.authorsEn}</span></p></div>
        <div className="article-layout">
          <div className="article-content"><section><h2>摘要</h2><p>{article.abstract}</p></section><section><h2>Abstract</h2><p className="abstract-en">{article.abstractEn}</p></section><section><h2>關鍵字</h2><div className="keyword-row">{article.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div></section><div className="citation-box"><Quote /><div><b>引用格式</b><p>{article.authors}（2026）。〈{article.title}〉。《客家與數位人文期刊》，1(1)，{article.pages}。https://doi.org/{article.doi}</p></div></div></div>
          <aside className="article-aside"><p><b>出版資訊</b></p><dl><dt>卷期</dt><dd>第 1 卷第 1 期</dd><dt>出版日期</dt><dd>2026 年 9 月</dd><dt>頁次</dt><dd>{article.pages}</dd><dt>DOI</dt><dd>{article.doi}</dd><dt>授權</dt><dd>CC BY-NC 4.0</dd></dl><Button className="download-button"><Download /> 下載 PDF 全文</Button><Button variant="outline"><FileText /> 匯出引用</Button></aside>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
