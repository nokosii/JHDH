import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><p className="footer-title">客家與數位人文期刊</p><p>Journal of Hakka and Digital Humanities</p></div>
      <div><b>國立聯合大學</b><p>National United University・苗栗市聯大 2 號</p></div>
      <div className="footer-links"><Link href="/articles">文章典藏</Link><Link href="/submit">投稿須知</Link><Link href="/review">審查專區</Link></div>
      <p className="copyright">© 2026 Journal of Hakka and Digital Humanities. Open access under CC BY-NC.</p>
    </footer>
  );
}
