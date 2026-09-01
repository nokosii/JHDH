import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <>
      <div className="topline" />
      <header className="site-header">
        <a className="brand" href="/" aria-label="客家與數位人文期刊首頁">
          <span className="brand-mark" aria-hidden="true"><b>客</b></span>
          <span><strong>客家與數位人文期刊</strong><small>Journal of Hakka and Digital Humanities</small></span>
        </a>
        <nav aria-label="主要導覽"><a href="/articles">文章典藏</a><a href="/#about">關於期刊</a><a href="/submit">線上投稿</a><a href="/review">審查專區</a></nav>
        <Button nativeButton={false} render={<a href="/submit" />} className="header-cta">開始投稿 <ArrowRight /></Button>
      </header>
    </>
  );
}
