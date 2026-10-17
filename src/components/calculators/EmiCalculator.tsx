'use client';

import { useState } from 'react';
import { calcEmi } from '@/lib/emi';
import { bn, parseNum, taka } from '@/lib/format';
import { ResultPanel } from '../ResultPanel';

export function EmiCalculator() {
  const [amount, setAmount] = useState('500000');
  const [rate, setRate] = useState('12');
  const [term, setTerm] = useState('3');
  const [termUnit, setTermUnit] = useState<'years' | 'months'>('years');

  const principal = parseNum(amount);
  const months = Math.round(parseNum(term) * (termUnit === 'years' ? 12 : 1));
  const result = calcEmi(principal, parseNum(rate), months);
  const touched = amount !== '' && rate !== '' && term !== '';
  const interestShare = result ? result.totalInterest / result.totalPayment : 0;

  return (
    <div className="tool-panel">
      <div className="tool-form">
        <div className="fields">
          <div className="field">
            <label htmlFor="amount">লোনের পরিমাণ (টাকা)</label>
            <input id="amount" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} />
            {principal > 0 && <span className="hint">{taka(principal)}</span>}
          </div>
          <div className="fields two">
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
        </div>
        {touched && !result && <p className="error">লোনের পরিমাণ, সুদের হার আর মেয়াদ সঠিক সংখ্যায় দিন।</p>}
      </div>

      <ResultPanel
        label="মাসিক কিস্তি"
        value={result ? taka(result.emi) : null}
        empty="তিনটা ঘর পূরণ করলে কিস্তি এখানে দেখাবে।"
        sub={result ? <>{bn(months)}টি কিস্তিতে</> : undefined}
        rows={
          result
            ? [
                ['মূল লোন', taka(principal)],
                ['মোট সুদ', taka(result.totalInterest)],
                ['মোট পরিশোধ', taka(result.totalPayment)],
              ]
            : undefined
        }
        foot="হ্রাসমান স্থিতি (reducing balance) পদ্ধতিতে হিসাব। ব্যাংকের ফি আলাদা।"
      >
        {result && result.totalInterest > 0 && (
          <div className="split" aria-label={`মোট পরিশোধের ${bn(interestShare * 100, 0)}% সুদ`}>
            <div className="split-bar">
              <span style={{ width: `${(1 - interestShare) * 100}%`, background: 'var(--green)' }} />
              <span style={{ width: `${interestShare * 100}%`, background: 'var(--orange)' }} />
            </div>
            <div className="split-legend">
              <span>
                <i style={{ background: 'var(--green)' }} />
                মূল টাকা {bn((1 - interestShare) * 100, 0)}%
              </span>
              <span>
                <i style={{ background: 'var(--orange)' }} />
                সুদ {bn(interestShare * 100, 0)}%
              </span>
            </div>
          </div>
        )}
      </ResultPanel>
    </div>
  );
}
