'use client';

import { useState } from 'react';
import { convertLand, UNIT_LABEL, UNIT_ORDER, type LandUnit } from '@/lib/land';
import { bn, parseNum } from '@/lib/format';
import { ResultPanel } from '../ResultPanel';

const short = (u: LandUnit) => UNIT_LABEL[u].split(' ')[0];

export function LandConverter() {
  const [value, setValue] = useState('1');
  const [unit, setUnit] = useState<LandUnit>('katha');

  const n = parseNum(value);
  const result = convertLand(n, unit);
  const invalid = value !== '' && !result;
  // কাঠা দিলে শতাংশে, অন্য কিছু দিলে কাঠায় মূল উত্তর দেখাই — দুটোই সবচেয়ে বেশি খোঁজা হয়
  const headline: LandUnit = unit === 'katha' ? 'decimal' : 'katha';

  return (
    <div className="tool-panel">
      <div className="tool-form">
        <div className="fields two">
          <div className="field">
            <label htmlFor="land-value">পরিমাণ</label>
            <input id="land-value" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="land-unit">একক</label>
            <select id="land-unit" value={unit} onChange={(e) => setUnit(e.target.value as LandUnit)}>
              {UNIT_ORDER.map((u) => (
                <option key={u} value={u}>
                  {UNIT_LABEL[u]}
                </option>
              ))}
            </select>
          </div>
        </div>
        {invalid && <p className="error">০ বা তার বেশি একটা সংখ্যা লিখুন।</p>}
        <p className="hint" style={{ marginTop: 14 }}>
          কাঠা ও বিঘা ঢাকাসহ বেশিরভাগ এলাকার প্রচলিত মাপে (১ কাঠা = ৭২০ বর্গফুট)। কিছু অঞ্চলে মাপ আলাদা হতে পারে।
        </p>
      </div>

      <ResultPanel
        label={result ? `${bn(n, 4)} ${short(unit)} সমান` : 'রূপান্তর'}
        value={result ? `${bn(result[headline], 4)} ${short(headline)}` : null}
        size="medium"
        empty="পরিমাণ লিখলেই সব এককে দেখাবে।"
        rows={result ? UNIT_ORDER.filter((u) => u !== unit && u !== headline).map((u) => [UNIT_LABEL[u], bn(result[u], 4)]) : undefined}
      />
    </div>
  );
}
