'use client';

import { useState } from 'react';
import { CATEGORIES, TAX_YEAR_LABEL, calcIncomeTax, type TaxCategory } from '@/lib/tax';
import { bn, parseNum, taka } from '@/lib/format';
import { ResultPanel } from '../ResultPanel';

export function IncomeTaxCalculator() {
  const [income, setIncome] = useState('80000');
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [category, setCategory] = useState<TaxCategory>('general');
  const [investment, setInvestment] = useState('');
  const [parent, setParent] = useState(false);
  const [newTaxpayer, setNewTaxpayer] = useState(false);

  const raw = parseNum(income);
  const yearly = period === 'monthly' ? raw * 12 : raw;
  const r =
    income !== ''
      ? calcIncomeTax({ income: yearly, category, investment: parseNum(investment || '0'), parentOfDisabled: parent, newTaxpayer })
      : null;

  const slabLabel = (from: number, amount: number, rate: number) =>
    rate === 0 ? `করমুক্ত ${bn(amount, 0)}` : `পরের ${bn(amount, 0)} (${bn(rate)}%)`;

  return (
    <div className="tool-panel">
      <div className="tool-form">
        <div className="fields">
          <div className="field">
            <label htmlFor="income">করযোগ্য আয় (টাকা)</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 8 }}>
              <input id="income" inputMode="numeric" value={income} onChange={(e) => setIncome(e.target.value)} />
              <select aria-label="আয়ের সময়কাল" value={period} onChange={(e) => setPeriod(e.target.value as 'monthly' | 'yearly')}>
                <option value="monthly">মাসিক</option>
                <option value="yearly">বার্ষিক</option>
              </select>
            </div>
            {raw > 0 && period === 'monthly' && <span className="hint">বছরে {taka(yearly)}</span>}
          </div>
          <div className="field">
            <label htmlFor="category">করদাতার ধরন</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value as TaxCategory)}>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label} (করমুক্ত {bn(c.threshold, 0)})
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="investment">বছরে রেয়াতযোগ্য বিনিয়োগ (টাকা, ঐচ্ছিক)</label>
            <input id="investment" inputMode="numeric" placeholder="সঞ্চয়পত্র, DPS, জীবনবিমা, প্রভিডেন্ট ফান্ড" value={investment} onChange={(e) => setInvestment(e.target.value)} />
          </div>
          <label className="check">
            <input type="checkbox" checked={parent} onChange={(e) => setParent(e.target.checked)} />
            প্রতিবন্ধী সন্তান বা পোষ্যের পিতা-মাতা বা অভিভাবক (করমুক্ত সীমা +৫০,০০০)
          </label>
          <label className="check">
            <input type="checkbox" checked={newTaxpayer} onChange={(e) => setNewTaxpayer(e.target.checked)} />
            এবারই প্রথম রিটার্ন দিচ্ছি (ন্যূনতম কর ১,০০০)
          </label>
        </div>
        {income !== '' && !r && <p className="error">আয় সঠিক সংখ্যায় দিন।</p>}
      </div>

      <ResultPanel
        label={`বছরে মোট আয়কর (${TAX_YEAR_LABEL})`}
        value={r ? taka(r.net) : null}
        empty="আয় দিলেই কর কত হবে দেখাবে।"
        sub={r && r.net > 0 ? <>মাসে প্রায় {taka(r.net / 12)}</> : undefined}
        rows={
          r
            ? [
                ...r.rows.map((row) => [slabLabel(row.from, row.amount, row.rate), taka(row.tax)] as [string, string]),
                ...(r.rebate > 0 ? [['বিনিয়োগ রেয়াত', `− ${taka(r.rebate)}`] as [string, string]] : []),
              ]
            : undefined
        }
        verdict={
          r
            ? r.net === 0
              ? { text: 'আপনার আয় করমুক্ত সীমার মধ্যে। তবে TIN থাকলে রিটার্ন জমা দিতে হবে।' }
              : r.minTaxApplied
                ? { text: `হিসাবে কর কম আসায় ন্যূনতম কর ${taka(r.net)} দিতে হবে।`, tone: 'warn' }
                : { text: <>আয়ের {bn(r.effectiveRate * 100, 1)}% কর</> }
            : undefined
        }
        foot="অর্থ আইন ২০২৬ অনুযায়ী। নিট সম্পদ ৪ কোটি টাকার বেশি হলে সারচার্জ আলাদা।"
      />
    </div>
  );
}
