'use client';

import { useEffect, useState } from 'react';
import { ageOn } from '@/lib/age';
import { bn } from '@/lib/format';
import { Total } from '../Total';

const todayIso = () => {
  // বাংলাদেশ সময় অনুযায়ী আজকের তারিখ
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka' }).format(new Date());
};

export function AgeCalculator() {
  const [birth, setBirth] = useState('');
  const [on, setOn] = useState('');

  // static বিল্ডে আজকের তারিখ আটকে না যায়, তাই ব্রাউজারে বসানো হয়
  useEffect(() => setOn(todayIso()), []);

  const age = birth && on ? ageOn(birth, on) : null;
  const invalid = Boolean(birth && on && !age);

  return (
    <section className="calc" aria-label="বয়স হিসাব">
      <div className="row row-2">
        <div className="field">
          <label htmlFor="birth">জন্মতারিখ</label>
          <input id="birth" type="date" value={birth} max={on || undefined} onChange={(e) => setBirth(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="on">যে তারিখে বয়স জানতে চান</label>
          <input id="on" type="date" value={on} onChange={(e) => setOn(e.target.value)} />
        </div>
      </div>
      <p className="small">চাকরির সার্কুলারে যে তারিখ ধরে বয়স গোনা হয়, দ্বিতীয় ঘরে সেই তারিখ দিন।</p>
      {invalid && <p className="error">দ্বিতীয় তারিখটা জন্মতারিখের পরে হতে হবে।</p>}

      <Total
        label="বয়স"
        value={age ? `${bn(age.years)} বছর ${bn(age.months)} মাস ${bn(age.days)} দিন` : null}
        empty="জন্মতারিখ দিন"
        note={age && <>মোট {bn(age.totalDays, 0)} দিন</>}
      />
    </section>
  );
}
