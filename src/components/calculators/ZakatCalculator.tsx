'use client';

import { useState } from 'react';
import { calcZakat, NISAB_VORI, type NisabBasis } from '@/lib/zakat';
import { bn, parseNum, taka } from '@/lib/format';
import { ResultPanel } from '../ResultPanel';

const ASSETS = [
  { id: 'cash', label: 'নগদ ও ব্যাংকে জমা টাকা' },
  { id: 'gold', label: 'সোনার গয়না/সোনার বর্তমান বিক্রয়মূল্য' },
  { id: 'silver', label: 'রুপার বর্তমান বিক্রয়মূল্য' },
  { id: 'savings', label: 'সঞ্চয়পত্র, শেয়ার, DPS, FDR' },
  { id: 'business', label: 'ব্যবসার পণ্যের মূল্য' },
  { id: 'receivable', label: 'অন্যের কাছে পাওনা (ফেরত পাওয়ার আশা আছে)' },
] as const;

export function ZakatCalculator() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [debts, setDebts] = useState('');
  const [basis, setBasis] = useState<NisabBasis>('silver');
  const [price, setPrice] = useState('');

  const r = calcZakat({
    assets: ASSETS.map((a) => parseNum(values[a.id] ?? '')),
    debts: parseNum(debts || '0'),
    basis,
    pricePerVori: parseNum(price),
  });
  const anyAsset = ASSETS.some((a) => (values[a.id] ?? '') !== '');

  return (
    <div className="tool-panel">
      <div className="tool-form">
        <div className="fields two">
          {ASSETS.map((a) => (
            <div className="field" key={a.id}>
              <label htmlFor={`z-${a.id}`}>{a.label}</label>
              <input
                id={`z-${a.id}`}
                inputMode="numeric"
                placeholder="০"
                value={values[a.id] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [a.id]: e.target.value }))}
              />
            </div>
          ))}
          <div className="field">
            <label htmlFor="z-debts">এখনই শোধ করতে হবে এমন ঋণ</label>
            <input id="z-debts" inputMode="numeric" placeholder="০" value={debts} onChange={(e) => setDebts(e.target.value)} />
          </div>
        </div>

        <div className="extra">
          <p className="label" style={{ fontWeight: 700, fontFamily: 'var(--display)' }}>
            নিসাব কীসের ভিত্তিতে
          </p>
          <div className="seg" role="group" aria-label="নিসাবের ভিত্তি" style={{ marginTop: 10 }}>
            <button type="button" aria-pressed={basis === 'silver'} onClick={() => setBasis('silver')}>
              রুপা (৫২.৫ ভরি)
            </button>
            <button type="button" aria-pressed={basis === 'gold'} onClick={() => setBasis('gold')}>
              সোনা (৭.৫ ভরি)
            </button>
          </div>
          <div className="field">
            <label htmlFor="z-price">আজ প্রতি ভরি {basis === 'silver' ? 'রুপার' : 'সোনার'} দাম (টাকা)</label>
            <input id="z-price" inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="আজকের বাজারদর লিখুন" />
            <span className="hint">বাংলাদেশ জুয়েলার্স সমিতির (BAJUS) ঘোষিত আজকের দাম দেখে লিখুন। দাম ছাড়া নিসাব বোঝা যায় না।</span>
          </div>
        </div>
      </div>

      <ResultPanel
        label="আপনার যাকাত"
        value={r && anyAsset ? taka(r.due) : null}
        empty={!price ? 'সম্পদের পরিমাণ আর আজকের ভরি প্রতি দাম দিলে যাকাত দেখাবে।' : 'সম্পদের পরিমাণ লিখুন।'}
        rows={
          r && anyAsset
            ? [
                ['মোট সম্পদ', taka(r.totalAssets)],
                ['ঋণ বাদে নিট সম্পদ', taka(r.net)],
                [`নিসাব (${bn(NISAB_VORI[basis])} ভরি ${basis === 'silver' ? 'রুপা' : 'সোনা'})`, taka(r.nisab)],
              ]
            : undefined
        }
        verdict={
          r && anyAsset
            ? r.eligible
              ? { text: 'নিট সম্পদ নিসাব ছাড়িয়েছে। এক চান্দ্র বছর পূর্ণ হলে ২.৫% যাকাত ফরজ।' }
              : { text: 'নিট সম্পদ নিসাবের কম, তাই যাকাত ফরজ নয়।', tone: 'warn' }
            : undefined
        }
        foot="হিসাব সাধারণ নিয়মে। বিশেষ পরিস্থিতিতে একজন আলেমের পরামর্শ নিন।"
      />
    </div>
  );
}
