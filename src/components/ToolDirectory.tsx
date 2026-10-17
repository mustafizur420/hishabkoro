'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { groups, tools, type Tool } from '@/data/tools';

const ALL = 'সব';

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={tool.href} className="tool-card">
      <span className={`tool-icon tone-${tool.tone}`} aria-hidden="true">
        {tool.icon}
      </span>
      <span>
        <h3>{tool.title}</h3>
        <p>{tool.desc}</p>
      </span>
    </Link>
  );
}

/** হোম পেজের হিরো (সার্চসহ) আর টুলের তালিকা — সার্চ আর ক্যাটাগরি একসঙ্গে কাজ করে */
export function ToolDirectory({ title, lead }: { title: string; lead: string }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<string>(ALL);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter(
      (t) =>
        (group === ALL || t.group === group) &&
        (!q || `${t.title} ${t.desc} ${t.keywords}`.toLowerCase().includes(q)),
    );
  }, [query, group]);

  return (
    <>
      <section className="hero">
        <span className="blob a" aria-hidden="true" />
        <span className="blob b" aria-hidden="true" />
        <div className="wrap">
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          <div className="search" role="search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <label htmlFor="tool-search" className="sr-only">
              টুল খুঁজুন
            </label>
            <input
              id="tool-search"
              type="search"
              value={query}
              placeholder="কোন হিসাব করবেন? যেমন CGPA, কাঠা, বিজয়"
              onChange={(e) => {
                setQuery(e.target.value);
                setGroup(ALL);
              }}
              onKeyDown={(e) => {
                // Enter চাপলে প্রথম মেলা টুলে চলে যায়
                if (e.key === 'Enter' && query.trim() && shown.length > 0) router.push(shown[0].href);
              }}
            />
          </div>
          <ul className="promises">
            <li>
              <i aria-hidden="true">✓</i>একদম ফ্রি
            </li>
            <li>
              <i aria-hidden="true">✓</i>অ্যাকাউন্ট লাগে না
            </li>
            <li>
              <i aria-hidden="true">✓</i>তথ্য আপনার ফোনেই থাকে
            </li>
          </ul>
        </div>
      </section>

      <section className="directory" id="tools" aria-labelledby="tools-title">
        <div className="wrap">
          <h2 id="tools-title" className="sr-only">
            সব টুল
          </h2>
          <div className="tabs" role="group" aria-label="ক্যাটাগরি">
            {[ALL, ...groups].map((g) => (
              <button key={g} type="button" className="tab" aria-pressed={group === g} onClick={() => setGroup(g)}>
                {g}
              </button>
            ))}
          </div>
          {shown.length > 0 ? (
            <ul className="tool-grid">
              {shown.map((t) => (
                <li key={t.href}>
                  <ToolCard tool={t} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">
              “{query}” নামে কোনো টুল পাওয়া যায়নি। অন্য শব্দে খুঁজুন, অথবা{' '}
              <Link href="/contact/">আমাদের জানান</Link> কোন টুল চান।
            </p>
          )}
        </div>
      </section>
    </>
  );
}
