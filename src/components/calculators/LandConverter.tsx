'use client';

import { useState } from 'react';
import { convertLand, UNIT_LABEL, UNIT_ORDER, type LandUnit } from '@/lib/land';
import { bn, parseNum } from '@/lib/format';
import { Total } from '../Total';

export function LandConverter() {
  const [value, setValue] = useState('1');
  const [unit, setUnit] = useState<LandUnit>('katha');

  const n = parseNum(value);
  const result = convertLand(n, unit);
  const invalid = value !== '' && !result;
  const headline: LandUnit = unit === 'decimal' ? 'katha' : 'decimal';

  return (
    <section className="calc" aria-label="জমির মাপ রূপান্তর">
      <div className="row row-2">
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

      <Total
        label={`${bn(n || 0, 4)} ${UNIT_LABEL[unit]} =`}
        value={result ? `${bn(result[headline], 4)} ${UNIT_LABEL[headline].split(' ')[0]}` : null}
        empty="পরিমাণ লিখুন"
      />

      {result && (
        <table style={{ marginTop: 16 }}>
          <caption className="small" style={{ textAlign: 'left', paddingBottom: 4 }}>
            সব এককে
          </caption>
          <tbody>
            {UNIT_ORDER.filter((u) => u !== unit).map((u) => (
              <tr key={u}>
                <td>{UNIT_LABEL[u]}</td>
                <td className="num">{bn(result[u], 4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
