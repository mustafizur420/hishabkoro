import Link from 'next/link';
import { tools } from '@/data/tools';
import { AdSlot } from './AdSlot';
import { Faq, type FaqItem } from './Faq';

type Props = {
  title: string;
  lead: string;
  path: string;
  calculator: React.ReactNode;
  faq: FaqItem[];
  children: React.ReactNode;
};

/** প্রতিটা টুলের একই কাঠামো: শিরোনাম → টুল → অ্যাড → ব্যাখ্যা → FAQ → সম্পর্কিত টুল */
export function ToolPage({ title, lead, path, calculator, faq, children }: Props) {
  const related = tools.filter((t) => t.href !== path && !path.startsWith(t.href));
  return (
    <article>
      <h1>{title}</h1>
      <p className="lead">{lead}</p>
      {calculator}
      <AdSlot slot="after-result" />
      <div className="prose">{children}</div>
      <Faq items={faq} />
      {related.length > 0 && (
        <section>
          <h2>আরও হিসাব</h2>
          <ul className="related">
            {related.map((t) => (
              <li key={t.href}>
                <Link href={t.href}>{t.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
