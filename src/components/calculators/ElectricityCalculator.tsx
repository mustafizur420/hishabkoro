'use client';

import { useState } from 'react';
import { calcElectricityBill, TARIFF_LABEL } from '@/lib/electricity';
import { bn, parseNum } from '@/lib/format';
import { ResultPanel } from '../ResultPanel';

const tk = (n: number) => '৳' + bn(n, 2, 2);

export function ElectricityCalculator() {
  const [units, setUnits] = useState('200');
  const [load, setLoad] = useState('2');

  const u = Math.round(parseNum(units));
  const bill = units !== '' ? calcElectricityBill(u, parseNum(load)) : null;

  return (
    <div className="tool-panel">
      <div className="tool-form">
        <div className="fields two">
          <div className="field">
            <label htmlFor="units">এই মাসে কত ইউনিট</label>
            <input id="units" inputMode="numeric" value={units} onChange={(e) => setUnits(e.target.value)} />
            <span className="hint">মিটারের বর্তমান রিডিং − আগের মাসের রিডিং</span>
          </div>
          <div className="field">
            <label htmlFor="load">অনুমোদিত লোড (কিলোওয়াট)</label>
            <input id="load" inputMode="decimal" value={load} onChange={(e) => setLoad(e.target.value)} />
            <span className="hint">বিলের কাগজে লেখা থাকে; না জানলে ২ রাখুন</span>
          </div>
        </div>
        <div className="chips" role="group" aria-label="দ্রুত ইউনিট বাছুন">
          {[50, 100, 200, 300, 500].map((n) => (
            <button key={n} type="button" className="tab" aria-pressed={u === n} onClick={() => setUnits(String(n))}>
              {bn(n)} ইউনিট
            </button>
          ))}
        </div>
        {units !== '' && !bill && <p className="error">ইউনিট আর লোড সঠিক সংখ্যায় দিন।</p>}
      </div>

      <ResultPanel
        label="মোট বিল (ভ্যাটসহ)"
        value={bill ? '৳' + bn(Math.round(bill.total), 0) : null}
        empty="ইউনিট দিলেই বিল দেখাবে।"
        sub={bill && u > 0 ? <>গড়ে প্রতি ইউনিট {tk(bill.total / u)}</> : undefined}
        rows={
          bill
            ? [
                ...bill.rows.map(
                  (r) =>
                    [
                      bill.lifeline ? `লাইফলাইন ${bn(r.units)} ইউনিট × ${bn(r.rate, 2, 2)}` : `${bn(r.from)}–${bn(r.to)} ইউনিট × ${bn(r.rate, 2, 2)}`,
                      tk(r.amount),
                    ] as [string, string],
                ),
                ['ডিমান্ড চার্জ', tk(bill.demand)],
                ['ভ্যাট ৫%', tk(bill.vat)],
              ]
            : undefined
        }
        verdict={bill?.lifeline ? { text: '৫০ ইউনিটের মধ্যে থাকায় সব ইউনিট সবচেয়ে কম লাইফলাইন দরে।' } : undefined}
        foot={`${TARIFF_LABEL}। মিটার ভাড়া ও প্রিপেইড রিবেট কোম্পানিভেদে আলাদা, এখানে ধরা হয়নি।`}
      />
    </div>
  );
}
