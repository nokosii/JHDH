import type { Metadata } from 'next';
import './globals.css';

const socialImage = new URL('/og.png', 'https://hakka-digital-humanities-journal.changehakka.chatgpt.site').toString();

export const metadata: Metadata = {
  title: '客家與數位人文期刊｜Journal of Hakka and Digital Humanities',
  description: '連結客家研究、數位人文與人工智慧的開放取用學術期刊。',
  openGraph: {
    title: '客家與數位人文期刊',
    description: 'AI × Hakka Studies × Digital Humanities｜國立聯合大學發行',
    type: 'website',
    locale: 'zh_TW',
    images: [{ url: socialImage, width: 1200, height: 630, alt: '客家與數位人文期刊' }],
  },
  twitter: {
    card: 'summary_large_image', title: '客家與數位人文期刊',
    description: 'AI × Hakka Studies × Digital Humanities｜國立聯合大學發行', images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
