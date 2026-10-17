export type EmiResult = { emi: number; totalPayment: number; totalInterest: number };

/** মাসিক কিস্তি। annualRate শতকরা হারে (যেমন ৯% → 9)। */
export function calcEmi(principal: number, annualRate: number, months: number): EmiResult | null {
  if (!(principal > 0) || !(annualRate >= 0) || !(months >= 1) || !Number.isInteger(months)) return null;
  const r = annualRate / 12 / 100;
  const emi = r === 0 ? principal / months : (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1);
  const totalPayment = emi * months;
  return { emi, totalPayment, totalInterest: totalPayment - principal };
}
