'use client';

import { FormEvent, useState } from 'react';
import { BookOpen, Check, Clock3, Download, FileText, LoaderCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const submissionId = 'JHDH-R1-004';

export function ReviewWorkspace() {
  const [recommendation, setRecommendation] = useState('minor-revision');
  const [saved, setSaved] = useState(false); const [saving, setSaving] = useState(false); const [error, setError] = useState('');
  async function saveReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setError('');
    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/reviews', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ submissionId, recommendation, authorComments: formData.get('authorComments'), confidentialComments: formData.get('confidentialComments') }) });
    const result = await response.json() as { error?: string };
    if (response.ok) setSaved(true); else setError(result.error || '儲存失敗，請稍後再試。');
    setSaving(false);
  }
  if (saved) return <div className="review-success"><span><Check /></span><h2>審查意見已送交編輯部</h2><p>感謝您完成稿件 {submissionId} 的學術審查。系統已保存評定結果與意見。</p><Button onClick={() => setSaved(false)}>返回審查工作台</Button></div>;
  return (
    <Tabs defaultValue="review" className="review-tabs"><TabsList variant="line"><TabsTrigger value="review">進行中（1）</TabsTrigger><TabsTrigger value="completed">已完成（2）</TabsTrigger><TabsTrigger value="guide">審查指引</TabsTrigger></TabsList>
      <TabsContent value="review"><div className="review-grid"><section className="manuscript-card"><div className="review-status"><Clock3 /> 剩餘 8 天</div><p className="article-type">研究論文・匿名稿件</p><h2>以大型語言模型協作建置客語語料庫：資料治理與在地知識的挑戰</h2><p className="article-en">Collaborative Construction of Hakka Corpora with Large Language Models</p><dl><dt>稿件編號</dt><dd>{submissionId}</dd><dt>送審日期</dt><dd>2026 年 8 月 22 日</dd><dt>審查期限</dt><dd>2026 年 9 月 9 日</dd></dl><Button variant="outline"><Download /> 下載匿名稿件 PDF</Button><div className="blind-note"><ShieldCheck /><p><b>雙向匿名審查</b><br />請勿嘗試辨識作者身分，亦請妥善保管稿件內容。</p></div></section>
        <form className="review-form" onSubmit={saveReview}><div className="review-form-head"><FileText /><div><h2>填寫審查意見</h2><p>草稿將保留於本次工作階段，送出後不可自行修改。</p></div></div><fieldset><legend>總體建議 *</legend><div className="recommendations">{[['accept','接受刊登'],['minor-revision','小幅修改'],['major-revision','大幅修改'],['reject','不予刊登']].map(([value,label]) => <label key={value} className={recommendation === value ? 'selected' : ''}><input type="radio" name="recommendation" value={value} checked={recommendation === value} onChange={() => setRecommendation(value)} />{label}</label>)}</div></fieldset><label><span>給作者的審查意見 *</span><Textarea name="authorComments" required minLength={40} placeholder="請就研究問題、方法、論證、資料與貢獻提供具體建議……" /></label><label><span>給編輯部的保密意見</span><Textarea name="confidentialComments" placeholder="此欄內容不會提供作者……" /></label>{error && <p className="form-error">{error}</p>}<div className="review-actions"><Button type="button" variant="outline">儲存草稿</Button><Button type="submit" disabled={saving}>{saving ? <><LoaderCircle className="spin" /> 儲存中</> : '送出審查意見'}</Button></div></form></div></TabsContent>
      <TabsContent value="completed"><div className="completed-list"><article><Check /><div><b>客庄地方知識圖譜的建置與應用</b><p>2026-07-18 完成・建議：小幅修改</p></div></article><article><Check /><div><b>數位典藏中的客家女性記憶</b><p>2026-05-02 完成・建議：接受刊登</p></div></article></div></TabsContent>
      <TabsContent value="guide"><div className="review-guide"><BookOpen /><h2>審查重點</h2><p>請綜合評估原創性、研究方法、論證完整度、資料倫理與對客家研究或數位人文領域的貢獻。審查意見應具體、尊重且能協助作者改善稿件。</p></div></TabsContent>
    </Tabs>
  );
}
