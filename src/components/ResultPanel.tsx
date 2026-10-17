'use client';

import { useEffect, useRef, useState } from 'react';

type Row = [label: string, value: React.ReactNode];

type Props = {
  label: string;
  value: string | null;
  empty: string;
  /** মূল উত্তরের নিচে ছোট লাইন */
  sub?: React.ReactNode;
  rows?: Row[];
  verdict?: { text: React.ReactNode; tone?: 'good' | 'warn' };
  foot?: React.ReactNode;
  /** লম্বা উত্তরের জন্য (যেমন "২৬ বছর") একটু ছোট অক্ষর */
  size?: 'large' | 'medium';
  children?: React.ReactNode;
};

/**
 * কালো ফলাফল প্যানেল: উত্তর বড় কমলা অক্ষরে।
 * মোবাইলে প্যানেল চোখের আড়ালে গেলে নিচে ছোট বারে উত্তর দেখায়, চাপলে প্যানেলে নিয়ে যায়।
 */
export function ResultPanel({ label, value, empty, sub, rows, verdict, foot, size = 'large', children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setHidden(!entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="tool-out" ref={ref} aria-live="polite">
        <div className="out-block">
          <span className="out-label">{label}</span>
          {value === null ? (
            <p className="out-empty">{empty}</p>
          ) : (
            <>
              <div className={size === 'medium' ? 'out-main medium' : 'out-main'}>{value}</div>
              {sub && <div className="out-sub">{sub}</div>}
            </>
          )}
          {value !== null && rows && rows.length > 0 && (
            <ul className="out-rows">
              {rows.map(([k, v]) => (
                <li key={k}>
                  <span>{k}</span>
                  <b>{v}</b>
                </li>
              ))}
            </ul>
          )}
          {value !== null && verdict && (
            <p className={verdict.tone === 'warn' ? 'verdict warn' : 'verdict'}>{verdict.text}</p>
          )}
        </div>
        {children}
        {foot && <p className="out-foot">{foot}</p>}
      </div>

      <button
        type="button"
        className={`sticky-result${hidden && value !== null ? ' show' : ''}`}
        onClick={() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
        aria-hidden={!(hidden && value !== null)}
        tabIndex={hidden && value !== null ? 0 : -1}
      >
        <span>
          <small>{label}</small>
          <br />
          <b>{value}</b>
        </span>
        <span className="go">বিস্তারিত</span>
      </button>
    </>
  );
}
