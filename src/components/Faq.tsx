export type FaqItem = { q: string; a: string };

/** প্রশ্নোত্তর + Google-এর FAQ schema (সার্চ রেজাল্টে প্রশ্ন দেখাতে সাহায্য করে) */
export function Faq({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
  return (
    <section className="faq">
      <h2>সাধারণ প্রশ্ন</h2>
      {items.map((i) => (
        <details key={i.q}>
          <summary>{i.q}</summary>
          <p>{i.a}</p>
        </details>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
