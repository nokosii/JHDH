import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ArticleBrowser } from './article-browser';

export const metadata: Metadata = { title: '文章典藏｜客家與數位人文期刊', description: '瀏覽與搜尋客家研究、數位人文與人工智慧相關學術文章。' };

export default function ArticlesPage() {
  return (
    <main><SiteHeader /><section className="page-hero"><p className="eyebrow">OPEN ACCESS ARCHIVE</p><h1>文章典藏</h1><p>跨越地域與學科的客家知識，開放閱讀、持續累積。</p></section><section className="archive-section"><ArticleBrowser /></section><SiteFooter /></main>
  );
}
