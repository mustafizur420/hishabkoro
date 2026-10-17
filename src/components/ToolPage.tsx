import Link from 'next/link';
import { tools } from '@/data/tools';
import { AdSlot } from './AdSlot';
import { Faq, type FaqItem } from './Faq';
import { ToolCard } from './ToolDirectory';

type Props = {
  title: string;
  lead: string;
  path: string;
  calculator: React.ReactNode;
  faq: FaqItem[];
  children: React.ReactNode;
};

/** প্রতিটা টুলের একই কাঠামো: ক্রিম মাথা → টুল প্যানেল → অ্যাড → ব্যাখ্যা → FAQ → আরও টুল */
export function ToolPage({ title, lead, path, calculator, faq, children }: Props) {
  const current = tools.find((t) => path.startsWith(t.href));
  // একই ক্যাটাগরির টুল আগে, তারপর বাকিগুলো
  const others = tools.filter((t) => t !== current);
  const related = [
    ...others.filter((t) => current && t.group === current.group),
    ...others.filter((t) => !current || t.group !== current.group),
  ].slice(0, 3);

  return (
    <article>
      <header className="page-head">
        <span className="blob a" aria-hidden="true" />
        <div className="wrap">
          <ol className="crumbs" aria-label="অবস্থান">
            <li>
              <Link href="/">হোম</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>{current?.group ?? 'টুল'}</li>
          </ol>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
        </div>
      </header>

      <section className="tool-section">
        <div className="wrap">
          {calculator}
          <AdSlot slot="after-result" />
        </div>
      </section>

      <section className="content">
        <div className="wrap narrow prose">{children}</div>
      </section>

      <div className="wrap narrow">
        <Faq items={faq} />
      </div>

      {related.length > 0 && (
        <section className="related" aria-labelledby="related-title">
          <div className="wrap">
            <h2 id="related-title">আরও হিসাব</h2>
            <ul className="tool-grid">
              {related.map((t) => (
                <li key={t.href}>
                  <ToolCard tool={t} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
