/**
 * আবাসিক (LT-A) বিদ্যুৎ বিল, BERC-এর জুন ২০২৬ থেকে কার্যকর দর অনুযায়ী।
 * সূত্র: Bonik Barta ও The Daily Star (৪ জুন ২০২৬), BSS (৪ জুন ২০২৬, ৭৫ ইউনিট পর্যন্ত বাড়তি দর প্রত্যাহার)।
 * বিল ধাপে ধাপে (telescopic): প্রতিটা ধাপের দর শুধু সেই ধাপের ইউনিটে।
 */

export const TARIFF_LABEL = 'BERC দর, জুন ২০২৬ থেকে';

/** মাসে মোট ৫০ ইউনিট বা কম হলে সব ইউনিট লাইফলাইন দরে */
export const LIFELINE = { maxUnits: 50, rate: 4.63 };

/** [ধাপের ইউনিট সংখ্যা, টাকা/ইউনিট] */
export const RESIDENTIAL_SLABS: [number, number][] = [
  [75, 5.26],
  [125, 8.5],
  [100, 9.1],
  [100, 9.62],
  [200, 15.01],
  [Infinity, 17.35],
];

export const DEMAND_CHARGE_PER_KW = 42;
export const VAT_RATE = 0.05;

export type BillRow = { from: number; to: number; units: number; rate: number; amount: number };
export type Bill = { rows: BillRow[]; energy: number; demand: number; vat: number; total: number; lifeline: boolean };

export function calcElectricityBill(units: number, loadKw: number): Bill | null {
  if (!Number.isFinite(units) || units < 0 || !Number.isFinite(loadKw) || loadKw <= 0) return null;

  const rows: BillRow[] = [];
  const lifeline = units > 0 && units <= LIFELINE.maxUnits;
  if (lifeline) {
    rows.push({ from: 1, to: units, units, rate: LIFELINE.rate, amount: units * LIFELINE.rate });
  } else {
    let left = units;
    let from = 1;
    for (const [size, rate] of RESIDENTIAL_SLABS) {
      if (left <= 0) break;
      const u = Math.min(left, size);
      rows.push({ from, to: from + u - 1, units: u, rate, amount: u * rate });
      left -= u;
      from += u;
    }
  }

  const energy = rows.reduce((s, r) => s + r.amount, 0);
  const demand = loadKw * DEMAND_CHARGE_PER_KW;
  const vat = (energy + demand) * VAT_RATE;
  return { rows, energy, demand, vat, total: energy + demand + vat, lifeline };
}
