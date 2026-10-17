'use client';

import { useEffect, useState } from 'react';
import { BN_MONTHS, EN_MONTHS_BN, REVISED_FROM_YEAR, fromBangla, monthLengths, toBangla } from '@/lib/banglaDate';
import { bn } from '@/lib/format';
import { ResultPanel } from '../ResultPanel';

const todayIso = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka' }).format(new Date());
const bnYear = (n: number) => bn(n, 0).replace(/,/g, '');

/** ইংরেজি ↔ বাংলা তারিখ। initialIso সার্ভার আর ব্রাউজারে একই রাখা হয়, তারপর ব্রাউজারে আজকের তারিখ বসে। */
export function BanglaDateConverter({ initialIso }: { initialIso: string }) {
  const [mode, setMode] = useState<'to-bn' | 'to-en'>('to-bn');
  const [iso, setIso] = useState(initialIso);
  const start = toBangla(initialIso)!;
  const [bDay, setBDay] = useState(String(start.day));
  const [bMonth, setBMonth] = useState(start.month);
  const [bYear, setBYear] = useState(String(start.year));

  useEffect(() => {
    const t = todayIso();
    if (t !== initialIso) {
      setIso(t);
      const b = toBangla(t)!;
      setBDay(String(b.day));
      setBMonth(b.month);
      setBYear(String(b.year));
    }
  }, [initialIso]);

  const bnResult = mode === 'to-bn' ? toBangla(iso) : null;
  const enIso = mode === 'to-en' ? fromBangla(Number(bDay), bMonth, Number(bYear)) : null;
  const enParts = enIso ? enIso.split('-').map(Number) : null;
  const enWeekday = enIso ? toBangla(enIso)?.weekday : undefined;
  const maxDay = Number(bYear) > 0 ? monthLengths(Number(bYear) + 593)[bMonth] : 31;
  const year = mode === 'to-bn' ? Number(iso.slice(0, 4)) : enParts?.[0];

  return (
    <div className="tool-panel">
      <div className="tool-form">
        <div className="seg" role="group" aria-label="রূপান্তরের দিক">
          <button type="button" aria-pressed={mode === 'to-bn'} onClick={() => setMode('to-bn')}>
            ইংরেজি → বাংলা
          </button>
          <button type="button" aria-pressed={mode === 'to-en'} onClick={() => setMode('to-en')}>
            বাংলা → ইংরেজি
          </button>
        </div>

        {mode === 'to-bn' ? (
          <div className="field">
            <label htmlFor="en-date">ইংরেজি তারিখ</label>
            <input id="en-date" type="date" value={iso} onChange={(e) => setIso(e.target.value)} />
          </div>
        ) : (
          <div className="fields three">
            <div className="field">
              <label htmlFor="bn-day">দিন</label>
              <input id="bn-day" inputMode="numeric" value={bDay} onChange={(e) => setBDay(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="bn-month">মাস</label>
              <select id="bn-month" value={bMonth} onChange={(e) => setBMonth(Number(e.target.value))}>
                {BN_MONTHS.map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="bn-year">বঙ্গাব্দ</label>
              <input id="bn-year" inputMode="numeric" value={bYear} onChange={(e) => setBYear(e.target.value)} />
            </div>
          </div>
        )}
        {mode === 'to-en' && !enIso && (
          <p className="error">
            {BN_MONTHS[bMonth]} মাসে ১ থেকে {bn(maxDay)} তারিখ পর্যন্ত হয়। সঠিক দিন আর বছর দিন।
          </p>
        )}
        <div className="chips">
          <button type="button" className="tab" onClick={() => { setMode('to-bn'); setIso(todayIso()); }}>
            আজ
          </button>
          <button type="button" className="tab" onClick={() => { setMode('to-en'); setBDay('1'); setBMonth(0); }}>
            পহেলা বৈশাখ
          </button>
          <button type="button" className="tab" onClick={() => { setMode('to-bn'); setIso(`${new Date().getFullYear()}-02-21`); }}>
            ২১ ফেব্রুয়ারি
          </button>
          <button type="button" className="tab" onClick={() => { setMode('to-bn'); setIso(`${new Date().getFullYear()}-12-16`); }}>
            ১৬ ডিসেম্বর
          </button>
        </div>
        {year !== undefined && year < REVISED_FROM_YEAR && (
          <p className="hint" style={{ marginTop: 12 }}>
            ২০১৯ সালের আগের তারিখে তখনকার পঞ্জিকার সঙ্গে এক দিন পার্থক্য হতে পারে।
          </p>
        )}
      </div>

      {mode === 'to-bn' ? (
        <ResultPanel
          label="বাংলা তারিখ"
          size="medium"
          value={bnResult ? `${bn(bnResult.day)} ${bnResult.monthName} ${bnYear(bnResult.year)}` : null}
          empty="একটা তারিখ বাছুন।"
          sub={bnResult ? bnResult.weekday : undefined}
          rows={bnResult ? [['ঋতু', bnResult.season], ['বঙ্গাব্দ', bnYear(bnResult.year)]] : undefined}
          foot="বাংলা একাডেমির সংশোধিত পঞ্জিকা অনুযায়ী (পহেলা বৈশাখ ১৪ এপ্রিল)।"
        />
      ) : (
        <ResultPanel
          label="ইংরেজি তারিখ"
          size="medium"
          value={enParts ? `${bn(enParts[2])} ${EN_MONTHS_BN[enParts[1] - 1]} ${bnYear(enParts[0])}` : null}
          empty="বাংলা দিন, মাস আর বছর দিন।"
          sub={enWeekday}
          foot="বাংলা একাডেমির সংশোধিত পঞ্জিকা অনুযায়ী (পহেলা বৈশাখ ১৪ এপ্রিল)।"
        />
      )}
    </div>
  );
}
