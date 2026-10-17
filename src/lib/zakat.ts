/** যাকাত: নিসাব পরিমাণ সম্পদ এক বছর থাকলে মোট যাকাতযোগ্য সম্পদের ২.৫%। */

export const ZAKAT_RATE = 0.025;
/** নিসাব: সোনা সাড়ে ৭ ভরি অথবা রুপা সাড়ে ৫২ ভরি (১ ভরি = ১ তোলা = ১১.৬৬৪ গ্রাম) */
export const NISAB_VORI = { gold: 7.5, silver: 52.5 } as const;

export type NisabBasis = keyof typeof NISAB_VORI;

export type ZakatInput = {
  assets: number[];
  debts: number;
  basis: NisabBasis;
  pricePerVori: number;
};

export type ZakatResult = { totalAssets: number; net: number; nisab: number; due: number; eligible: boolean };

export function calcZakat({ assets, debts, basis, pricePerVori }: ZakatInput): ZakatResult | null {
  if (!Number.isFinite(pricePerVori) || pricePerVori <= 0) return null;
  const totalAssets = assets.reduce((s, a) => s + (Number.isFinite(a) && a > 0 ? a : 0), 0);
  const net = totalAssets - (Number.isFinite(debts) && debts > 0 ? debts : 0);
  const nisab = NISAB_VORI[basis] * pricePerVori;
  const eligible = net >= nisab && net > 0;
  return { totalAssets, net, nisab, due: eligible ? net * ZAKAT_RATE : 0, eligible };
}
