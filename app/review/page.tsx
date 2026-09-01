import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ReviewWorkspace } from './review-workspace';

export const metadata: Metadata = { title: '審查專區｜客家與數位人文期刊', description: '受邀審查人線上閱讀匿名稿件並提交審查意見。' };
export default function ReviewPage() { return <main><SiteHeader /><section className="review-hero"><div><p className="eyebrow">REVIEWER WORKSPACE</p><h1>審查專區</h1><p>您好，審查人。感謝您協助守護跨領域研究的學術品質。</p></div><span><ShieldCheck /> 已通過邀請連結驗證</span></section><section className="review-section"><ReviewWorkspace /></section><SiteFooter /></main>; }
