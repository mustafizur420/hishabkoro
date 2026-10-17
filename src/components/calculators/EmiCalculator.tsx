'use client';

import { useState } from 'react';
import { calcEmi } from '@/lib/emi';
import { bn, parseNum, taka } from '@/lib/format';
import { Total } from '../Total';

export function EmiCalculator() {
  const [amount, setAmount] = useState('500000');
  const [rate, setRate] = useState('12');
  const [term, setTerm] = useState('3');
  const [termUnit, setTermUnit] = useState<'years' | 'months'>('years');

  const months = Math.round(parseNum(term) * (termUnit === 'years' ? 12 : 1));
  const result = calcEmi(parseNum(amount), parseNum(rate), months);
  const touched = amount !== '' && rate !== '' && term !== '';

  return (
    <section className="calc" aria-label="EMI হিসাব">
      <div className="row row-3">
        <div className="field">
          <label htmlFor="amount">লোনের পরিমাণ (টাকা)</label>
          <input id="amount" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="rate">বার্ষিক সুদের হার (%)</label>
          <input id="rate" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="term">মেয়াদ</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <input id="term" inputMode="decimal" value={term} onChange={(e) => setTerm(e.target.value)} />
            <select aria-label="মেয়াদের একক" value={termUnit} onChange={(e) => setTermUnit(e.target.value as 'years' | 'months')}>
              <option value="years">বছর</option>
              <option value="months">মাস</option>
            </select>
          </div>
        </div>
      </div>
      {touched && !result && <p className="error">লোনের পরিমাণ, সুদের হার আর মেয়াদ সঠিক সংখ্যায় দিন।</p>}

      <Total
        label="মাসিক কিস্তি"
        value={result ? taka(result.emi) : null}
        empty="তিনটা ঘর পূরণ করুন"
        note={result && <>{bn(months)} কিস্তি</>}
      />

      {result && (
        <table style={{ marginTop: 16 }}>
          <tbody>
            <tr>
              <td>মূল লোন</td>
              <td className="num">{taka(parseNum(amount))}</td>
            </tr>
            <tr>
              <td>মোট সুদ</td>
              <td className="num">{taka(result.totalInterest)}</td>
            </tr>
            <tr>
              <td>
                <strong>মোট পরিশোধ</strong>
              </td>
              <td className="num">
                <strong>{taka(result.totalPayment)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </section>
  );
}
