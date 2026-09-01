import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SubmissionForm } from './submission-form';

export const metadata: Metadata = { title: '線上投稿｜客家與數位人文期刊', description: '線上提交客家研究、數位人文與人工智慧相關學術稿件。' };

export default function SubmitPage() {
  return <main><SiteHeader /><section className="page-hero submit-hero"><div><p className="eyebrow">ONLINE SUBMISSION</p><h1>線上投稿</h1><p>以數位方法回應客家世界，歡迎跨領域原創研究。</p></div><ul><li><CheckCircle2 /> 全年徵稿</li><li><CheckCircle2 /> 雙向匿名審查</li><li><CheckCircle2 /> 免收投稿與刊登費</li></ul></section><section className="submission-layout"><aside className="submission-guide"><p className="eyebrow">BEFORE YOU START</p><h2>投稿前請準備</h2><ol><li><span>1</span>匿名稿件 PDF 或 DOCX</li><li><span>2</span>中英文題名與摘要</li><li><span>3</span>作者與服務單位資料</li></ol><p className="guide-note">一般研究論文以 8,000–20,000 字為原則，投稿檔案不得包含作者姓名、致謝或其他身分線索。</p></aside><SubmissionForm /></section><SiteFooter /></main>;
}
