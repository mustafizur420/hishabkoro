'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { groups, tools, type Tool } from '@/data/tools';
import { bn } from '@/lib/format';
import { TodayCard } from './TodayCard';

const ALL = 'সব';
const num = (n: number) => bn(n, 0).replace(/,/g, '');

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={tool.href} className="tool-card">
      <span className={`tool-icon tone-${tool.tone}`} aria-hidden="true">
        {tool.icon}
      </span>
      <span className="tool-text">
        <h3>{tool.title}</h3>
        <p>{tool.desc}</p>
      </span>
      <span className="tool-go" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

const match = (t: Tool, q: string) => `${t.title} ${t.desc} ${t.keywords}`.toLowerCase().includes(q);

// হিরোর নিচে "জনপ্রিয়" লিংক
const POPULAR = ['/cgpa/', '/prayer-times/', '/land-converter/', '/bijoy-to-unicode/', '/emi-calculator/'];

/** হোম পেজ: হিরো (সার্চ + আজকের কার্ড), টুলের তালিকা, কেন হিসাব করো, আর অনুরোধের ব্যানার */
export function ToolDirectory({ title, highlight, lead, initialIso }: { title: string; highlight: string; lead: string; initialIso: string }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<string>(ALL);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const q = query.trim().toLowerCase();
  const suggestions = useMemo(() => (q ? tools.filter((t) => match(t, q)).slice(0, 6) : []), [q]);
  const shown = useMemo(() => tools.filter((t) => (group === ALL || t.group === group) && (!q || match(t, q))), [q, group]);
  const counts = useMemo(() => Object.fromEntries(groups.map((g) => [g, tools.filter((t) => t.group === g).length])), []);

  // "/" চাপলে সার্চে ফোকাস
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(el.tagName)) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const showList = open && q.length > 0;

  return (
    <>
      <section className="hero">
        <span className="blob a" aria-hidden="true" />
        <span className="blob b" aria-hidden="true" />
        <span className="hero-grid-bg" aria-hidden="true" />
        <div className="wrap hero-split">
          <div className="hero-main">
            <span className="eyebrow">
              <i aria-hidden="true" />
              {num(tools.length)}টি ফ্রি টুল · সম্পূর্ণ বাংলায়
            </span>
            <h1>
              {title} <span className="hl">{highlight}</span>
            </h1>
            <p className="lead">{lead}</p>

            <div className={`search${showList ? ' is-open' : ''}`} role="search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <label htmlFor="tool-search" className="sr-only">
                টুল খুঁজুন
              </label>
              <input
                ref={input}
                id="tool-search"
                type="search"
                autoComplete="off"
                value={query}
                placeholder="কোন হিসাব করবেন? যেমন CGPA, কাঠা, বিজয়"
                role="combobox"
                aria-expanded={showList}
                aria-controls="tool-suggest"
                aria-activedescendant={showList && suggestions[active] ? `sg-${active}` : undefined}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setGroup(ALL);
                  setActive(0);
                  setOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, Math.max(suggestions.length - 1, 0)));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  } else if (e.key === 'Escape') {
                    setOpen(false);
                  } else if (e.key === 'Enter' && suggestions.length > 0) {
                    // Enter চাপলে বাছাই করা (না থাকলে প্রথম) টুলে চলে যায়
                    router.push((suggestions[active] ?? suggestions[0]).href);
                  }
                }}
              />
              <kbd className="search-kbd" aria-hidden="true">
                /
              </kbd>
              {showList ? (
                <ul className="suggest" id="tool-suggest" role="listbox" aria-label="মেলা টুল">
                  {suggestions.length > 0 ? (
                    suggestions.map((t, i) => (
                      <li key={t.href} id={`sg-${i}`} role="option" aria-selected={i === active}>
                        <Link href={t.href} onMouseEnter={() => setActive(i)}>
                          <span className={`tool-icon sm tone-${t.tone}`} aria-hidden="true">
                            {t.icon}
                          </span>
                          <span>
                            <b>{t.title}</b>
                            <small>{t.desc}</small>
                          </span>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="suggest-empty" role="option" aria-selected={false}>
                      কিছু পাওয়া যায়নি। <Link href="/contact/">কোন টুল চান জানান</Link>
                    </li>
                  )}
                </ul>
              ) : null}
            </div>

            <div className="popular">
              <span>জনপ্রিয়:</span>
              {POPULAR.map((href) => tools.find((t) => t.href === href)!).map((t) => (
                <Link key={t.href} href={t.href}>
                  {t.title.replace(/\s*\(.*\)$/, '').replace(' ক্যালকুলেটর', '').replace(' Calculator', '')}
                </Link>
              ))}
            </div>
          </div>

          <TodayCard initialIso={initialIso} />
        </div>

        <div className="wrap">
          <ul className="trust">
            <li>
              <b>{num(tools.length)}টি</b>
              <span>দরকারি টুল</span>
            </li>
            <li>
              <b>৬৪</b>
              <span>জেলার নামাজের সময়</span>
            </li>
            <li>
              <b>০ টাকা</b>
              <span>কোনো চার্জ নেই</span>
            </li>
            <li>
              <b>০</b>
              <span>সাইন-আপ লাগে না</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="directory" id="tools" aria-labelledby="tools-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="kicker">সব টুল</span>
              <h2 id="tools-title">যে হিসাব দরকার, বেছে নিন</h2>
            </div>
            <p className="muted">প্রতিটা টুল ফোনে চলে, ইন্টারনেট ধীর হলেও তাড়াতাড়ি খোলে।</p>
          </div>
          <div className="tabs" role="group" aria-label="ক্যাটাগরি">
            {[ALL, ...groups].map((g) => (
              <button key={g} type="button" className="tab" aria-pressed={group === g} onClick={() => setGroup(g)}>
                {g}
                <span className="tab-count">{num(g === ALL ? tools.length : counts[g])}</span>
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

      <section className="why" aria-labelledby="why-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="kicker">কেন হিসাব করো</span>
              <h2 id="why-title">সহজ, ফ্রি, আর আপনার তথ্য আপনার কাছেই</h2>
            </div>
          </div>
          <ul className="why-grid">
            <li>
              <span className="why-icon tone-green" aria-hidden="true">✓</span>
              <h3>ফ্রি, সাইন-আপ ছাড়া</h3>
              <p>অ্যাকাউন্ট খুলতে হয় না, কোনো লিমিট নেই। খুলুন, সংখ্যা দিন, উত্তর নিন।</p>
            </li>
            <li>
              <span className="why-icon tone-yellow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
              </span>
              <h3>তথ্য আপনার ফোনেই</h3>
              <p>সব হিসাব আপনার ব্রাউজারে হয়। আপনার নম্বর, আয় বা জমির তথ্য কোথাও পাঠানো হয় না।</p>
            </li>
            <li>
              <span className="why-icon tone-orange" aria-hidden="true">৳</span>
              <h3>বাংলাদেশের নিয়মে</h3>
              <p>টাকা, কাঠা-বিঘা, বঙ্গাব্দ আর দেশের প্রচলিত নিয়ম ধরে হিসাব, সব বাংলায়।</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="request">
        <div className="wrap">
          <div className="request-card">
            <div>
              <h2>আপনার দরকারি হিসাবটা এখানে নেই?</h2>
              <p>জানান কোন টুল লাগবে। পরের টুলটা হয়তো সেটাই হবে।</p>
            </div>
            <Link href="/contact/" className="btn">
              টুলের অনুরোধ করুন <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
