export type LandUnit = 'sqft' | 'sqm' | 'ojutangsho' | 'decimal' | 'katha' | 'bigha' | 'acre';

/** প্রতিটা একক কত বর্গফুট। কাঠা ও বিঘা ঢাকাসহ বেশিরভাগ এলাকার প্রচলিত মাপ। */
export const SQFT_PER: Record<LandUnit, number> = {
  sqft: 1,
  sqm: 10.7639104,
  ojutangsho: 4.356, // ১ অযুতাংশ = ০.০১ শতাংশ
  decimal: 435.6, // ১ শতাংশ = ১/১০০ একর
  katha: 720,
  bigha: 14400, // ২০ কাঠা
  acre: 43560,
};

export const UNIT_LABEL: Record<LandUnit, string> = {
  sqft: 'বর্গফুট',
  sqm: 'বর্গমিটার',
  ojutangsho: 'অযুতাংশ',
  decimal: 'শতাংশ (ডেসিমাল)',
  katha: 'কাঠা',
  bigha: 'বিঘা',
  acre: 'একর',
};

export const UNIT_ORDER: LandUnit[] = ['decimal', 'katha', 'bigha', 'acre', 'sqft', 'sqm', 'ojutangsho'];

export function convertLand(value: number, from: LandUnit): Record<LandUnit, number> | null {
  if (!Number.isFinite(value) || value < 0) return null;
  const sqft = value * SQFT_PER[from];
  const out = {} as Record<LandUnit, number>;
  for (const u of UNIT_ORDER) out[u] = sqft / SQFT_PER[u];
  return out;
}
