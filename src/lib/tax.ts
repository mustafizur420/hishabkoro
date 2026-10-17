/**
 * ব্যক্তিগত আয়কর, আয়বর্ষ ২০২৬-২৭ (জুলাই ২০২৬ – জুন ২০২৭), অর্থ আইন ২০২৬ অনুযায়ী।
 * সূত্র: PwC Worldwide Tax Summaries — Bangladesh (৩১ জুলাই ২০২৬ পর্যালোচিত),
 * The Daily Star (২৯ জুন ২০২৬, অর্থ বিল পাস)। নতুন বাজেটে হার বদলালে শুধু এই ফাইল বদলাতে হবে।
 */

export const TAX_YEAR_LABEL = 'আয়বর্ষ ২০২৬-২৭';

export type TaxCategory = 'general' | 'woman-senior' | 'disabled' | 'third-gender' | 'freedom-fighter';

export const CATEGORIES: { id: TaxCategory; label: string; threshold: number }[] = [
  { id: 'general', label: 'সাধারণ করদাতা', threshold: 400_000 },
  { id: 'woman-senior', label: 'নারী বা ৬৫ বছর ও তার বেশি বয়সী', threshold: 450_000 },
  { id: 'disabled', label: 'প্রতিবন্ধী ব্যক্তি', threshold: 525_000 },
  { id: 'third-gender', label: 'তৃতীয় লিঙ্গের করদাতা', threshold: 525_000 },
  { id: 'freedom-fighter', label: 'যুদ্ধাহত গেজেটভুক্ত মুক্তিযোদ্ধা / আহত জুলাই যোদ্ধা', threshold: 550_000 },
];

/** প্রতিবন্ধী সন্তান বা পোষ্যের পিতা-মাতা বা আইনগত অভিভাবকের অতিরিক্ত করমুক্ত সীমা */
export const PARENT_OF_DISABLED_EXTRA = 50_000;

/** করমুক্ত সীমার পরের ধাপগুলো: [ধাপের আকার, হার %] */
export const SLABS: [number, number][] = [
  [300_000, 10],
  [400_000, 15],
  [500_000, 20],
  [2_000_000, 25],
  [Infinity, 30],
];

export const MIN_TAX = 5_000;
export const MIN_TAX_NEW = 1_000;

/** বিনিয়োগ রেয়াত: করযোগ্য আয়ের ৩%, বিনিয়োগের ১০% আর ৭,৫০,০০০ টাকা — এর মধ্যে সবচেয়ে কম */
export const REBATE = { incomePct: 0.03, investPct: 0.1, cap: 750_000 };

export type TaxInput = {
  income: number;
  category: TaxCategory;
  parentOfDisabled?: boolean;
  investment?: number;
  newTaxpayer?: boolean;
};

export type SlabRow = { from: number; amount: number; rate: number; tax: number };

export type TaxResult = {
  threshold: number;
  rows: SlabRow[];
  gross: number;
  rebate: number;
  minTaxApplied: boolean;
  net: number;
  effectiveRate: number;
};

export function calcIncomeTax(input: TaxInput): TaxResult | null {
  const { income, category } = input;
  if (!Number.isFinite(income) || income < 0) return null;
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) return null;
  const investment = Math.max(0, Number.isFinite(input.investment ?? 0) ? input.investment ?? 0 : 0);

  const threshold = cat.threshold + (input.parentOfDisabled ? PARENT_OF_DISABLED_EXTRA : 0);
  const rows: SlabRow[] = [{ from: 0, amount: Math.min(income, threshold), rate: 0, tax: 0 }];

  let left = Math.max(0, income - threshold);
  let from = threshold;
  for (const [size, rate] of SLABS) {
    if (left <= 0) break;
    const amount = Math.min(left, size);
    rows.push({ from, amount, rate, tax: (amount * rate) / 100 });
    left -= amount;
    from += amount;
  }

  const gross = rows.reduce((s, r) => s + r.tax, 0);
  const rebate = Math.min(gross, income * REBATE.incomePct, investment * REBATE.investPct, REBATE.cap);
  let net = gross - rebate;
  let minTaxApplied = false;
  if (income > threshold) {
    const min = input.newTaxpayer ? MIN_TAX_NEW : MIN_TAX;
    if (net < min) {
      net = min;
      minTaxApplied = true;
    }
  }

  return { threshold, rows, gross, rebate, minTaxApplied, net, effectiveRate: income > 0 ? net / income : 0 };
}
