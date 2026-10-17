const BN_DIGITS = '০১২৩৪৫৬৭৮৯';

/** বাংলা অঙ্কে লেখা সংখ্যাও (যেমন "৩.৫") পড়তে পারে। ভুল ইনপুটে NaN ফেরত দেয়। */
export function parseNum(input: string): number {
  const ascii = input
    .trim()
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .replace(/,/g, '');
  if (ascii === '') return NaN;
  return Number(ascii);
}

/** সংখ্যাকে বাংলা অঙ্কে দেখায়, যেমন 1234.5 → "১,২৩৪.৫" */
export function bn(n: number, maxDigits = 2, minDigits = 0): string {
  return new Intl.NumberFormat('bn-BD', {
    maximumFractionDigits: maxDigits,
    minimumFractionDigits: minDigits,
  }).format(n);
}

/** টাকার অঙ্ক, যেমন "৳১২,৫০০" */
export function taka(n: number): string {
  return '৳' + bn(Math.round(n), 0);
}
