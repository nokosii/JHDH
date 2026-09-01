import Link from 'next/link';
import { ArrowRight, BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { articles } from '@/lib/journal-data';

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">創刊號・2026 秋季號 · Volume 1, Issue 1</p>
          <h1>讓數位方法，<br /><em>打開客家研究的新視野。</em></h1>
          <p className="intro">一份連結客家研究、數位人文與人工智慧的開放取用學術期刊。從苗栗客庄出發，匯聚跨領域方法與在地知識。</p>
          <div className="hero-actions"><Button nativeButton={false} render={<Link href="#current" />} size="lg"><BookOpen /> 閱讀創刊號</Button><Button nativeButton={false} render={<Link href="/submit" />} size="lg" variant="outline">投稿須知 <ArrowRight /></Button></div>
        </div>
        <aside className="issue-card" aria-label="創刊號封面">
          <span className="issue-no">創刊號<br /><i>VOL. 01</i></span>
          <div className="woven-mark" aria-hidden="true"><span>人</span><span>文</span><span>AI</span></div>
          <div><p>專題</p><h2>AI 時代的<br />客家知識</h2><small>Hakka Knowledge<br />in the Age of AI</small></div>
        </aside>
      </section>

      <section className="search-strip" aria-label="文章搜尋">
        <div><Search aria-hidden="true" /><span>搜尋文章題名、作者、關鍵字⋯</span></div><Button variant="secondary">搜尋期刊</Button>
        <p><b>本期關鍵字</b>　客語復振　人工智慧　資料主權　CARE原則　家庭語言政策</p>
      </section>

      <section className="current-issue" id="current">
        <div className="section-heading"><div><p className="eyebrow">CURRENT ISSUE</p><h2>創刊號｜AI 時代的客家知識</h2></div><Link href="/articles">瀏覽全部文章 <ArrowRight /></Link></div>
        <div className="article-list">
          {articles.map((article, index) => (
            <article className="article-row" key={article.title}>
              <span className="article-index">0{index + 1}</span><div><p className="article-type">{article.type}</p><h3>{article.title}</h3>{article.titleEn && <p className="article-en">{article.titleEn}</p>}<p className="authors">{article.authors}　{article.affiliation}</p></div><span className="pages">{article.pages}</span><Link aria-label={`閱讀文章：${article.title}`} href={`/articles/${article.id}`}><ArrowRight /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mission" id="about"><p className="eyebrow">OUR MISSION</p><blockquote>「科技不取代地方知識，<br />而是讓更多人能聽見它。」</blockquote><p>國立聯合大學發行・半年刊・開放取用・雙向匿名審查</p></section>
      <SiteFooter />
    </main>
  );
}
