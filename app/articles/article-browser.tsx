'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { articles } from '@/lib/journal-data';

const types = ['全部', '研究論文', '數位方法', '研究紀要', '評論'];

export function ArticleBrowser() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('全部');
  const filtered = useMemo(() => articles.filter((article) => {
    const matchesType = type === '全部' || article.type.includes(type);
    const text = [article.title, article.titleEn, article.authors, article.authorsEn, ...article.keywords].join(' ').toLowerCase();
    return matchesType && text.includes(query.toLowerCase());
  }), [query, type]);

  return (
    <>
      <div className="archive-tools">
        <label><Search aria-hidden="true" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋題名、作者或關鍵字" aria-label="搜尋文章" /></label>
        <div className="filter-pills" role="group" aria-label="文章類型">
          {types.map((item) => <Button key={item} variant={type === item ? 'default' : 'outline'} onClick={() => setType(item)}>{item}</Button>)}
        </div>
      </div>
      <p className="result-count">共 {filtered.length} 篇文章</p>
      <div className="archive-list">
        {filtered.map((article) => (
          <article className="archive-item" key={article.id}>
            <p className="article-type">{article.type}</p>
            <h2><Link href={`/articles/${article.id}`}>{article.title}</Link></h2>
            <p className="article-en">{article.titleEn}</p>
            <p className="authors">{article.authors}　{article.authorsEn}</p>
            <div className="keyword-row">{article.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
            <p className="archive-meta">{article.pages}　・　DOI: {article.doi}</p>
            <Link className="read-link" href={`/articles/${article.id}`}>閱讀摘要與全文 <ArrowRight /></Link>
          </article>
        ))}
        {!filtered.length && <div className="empty-state"><Search /><h2>找不到相符文章</h2><p>請調整關鍵字或選擇其他文章類型。</p></div>}
      </div>
    </>
  );
}
