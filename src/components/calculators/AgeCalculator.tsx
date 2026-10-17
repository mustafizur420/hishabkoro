'use client';

import { useEffect, useState } from 'react';
import { ageOn } from '@/lib/age';
import { bn } from '@/lib/format';
import { ResultPanel } from '../ResultPanel';

// বাংলাদেশ সময় অনুযায়ী আজকের তারিখ
const todayIso = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka' }).format(new Date());

export function AgeCalculator() {
  const [birth, setBirth] = useState('');
  const [on, setOn] = useState('');

  // static বিল্ডে আজকের তারিখ আটকে না যায়, তাই ব্রাউজারে বসানো হয়
  useEffect(() => setOn(todayIso()), []);

  const age = birth && on ? ageOn(birth, on) : null;
  const invalid = Boolean(birth && on && !age);
  const isToday = on === todayIso();

  return (
    <div className="tool-panel">
      <div className="tool-form">
        <div className="fields">
          <div className="field">
            <label htmlFor="birth">জন্মতারিখ</label>
            <input id="birth" type="date" value={birth} max={on || undefined} onChange={(e) => setBirth(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="on">যে তারিখে বয়স জানতে চান</label>
            <input id="on" type="date" value={on} onChange={(e) => setOn(e.target.value)} />
            <span className="hint">
              চাকরির সার্কুলারে যে তারিখ ধরে বয়স গোনা হয়, এখানে সেই তারিখ দিন।{' '}
              {!isToday && (
                <button type="button" className="link-btn" onClick={() => setOn(todayIso())}>
                  আজকের তারিখ দিন
                </button>
              )}
            </span>
          </div>
        </div>
        {invalid && <p className="error">দ্বিতীয় তারিখটা জন্মতারিখের পরে হতে হবে।</p>}
      </div>

      <ResultPanel
        label={isToday ? 'আজ আপনার বয়স' : 'ওই তারিখে বয়স'}
        value={age ? `${bn(age.years)} বছর` : null}
        size="medium"
        empty="জন্মতারিখ দিলেই বয়স এখানে দেখাবে।"
        sub={age ? <>{bn(age.months)} মাস {bn(age.days)} দিন</> : undefined}
        rows={
          age
            ? [
                ['মোট মাস', bn(age.totalMonths, 0)],
                ['মোট দিন', bn(age.totalDays, 0)],
                ['পরের জন্মদিন', age.daysToBirthday === 0 ? 'আজই!' : `${bn(age.daysToBirthday, 0)} দিন পর`],
              ]
            : undefined
        }
      />
    </div>
  );
}
