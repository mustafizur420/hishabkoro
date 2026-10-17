/**
 * বাংলাদেশের সংশোধিত বাংলা পঞ্জিকা (বাংলা একাডেমি, ২০১৯ থেকে কার্যকর):
 * বৈশাখ–আশ্বিন ৩১ দিন, কার্তিক–মাঘ ও চৈত্র ৩০ দিন, ফাল্গুন ২৯ দিন (ইংরেজি অধিবর্ষে ৩০)।
 * পহেলা বৈশাখ সবসময় ১৪ এপ্রিল।
 */

export const BN_MONTHS = ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'];
export const BN_SEASONS = ['গ্রীষ্ম', 'বর্ষা', 'শরৎ', 'হেমন্ত', 'শীত', 'বসন্ত'];
export const BN_WEEKDAYS = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
export const EN_MONTHS_BN = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

/** এই পঞ্জিকা যে বছর থেকে কার্যকর — এর আগের তারিখে ১ দিন পার্থক্য হতে পারে */
export const REVISED_FROM_YEAR = 2019;

const DAY = 86_400_000;
const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

/** যে বাংলা বছর এপ্রিল startYear-এ শুরু, তার মাসগুলোর দৈর্ঘ্য (ফাল্গুন পরের ইংরেজি বছরের ফেব্রুয়ারিতে পড়ে) */
export function monthLengths(startYear: number): number[] {
  return [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, isLeap(startYear + 1) ? 30 : 29, 30];
}

export type BanglaDate = { day: number; month: number; year: number; monthName: string; season: string; weekday: string };

const parseIso = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const t = Date.UTC(y, mo - 1, d);
  const c = new Date(t);
  if (c.getUTCFullYear() !== y || c.getUTCMonth() !== mo - 1 || c.getUTCDate() !== d) return null;
  return { y, mo, d, t };
};

/** ইংরেজি তারিখ (YYYY-MM-DD) → বাংলা তারিখ */
export function toBangla(iso: string): BanglaDate | null {
  const g = parseIso(iso);
  if (!g) return null;
  const startYear = g.t >= Date.UTC(g.y, 3, 14) ? g.y : g.y - 1;
  let offset = Math.round((g.t - Date.UTC(startYear, 3, 14)) / DAY);
  const lengths = monthLengths(startYear);
  let month = 0;
  while (offset >= lengths[month]) {
    offset -= lengths[month];
    month += 1;
  }
  return {
    day: offset + 1,
    month,
    year: startYear - 593,
    monthName: BN_MONTHS[month],
    season: BN_SEASONS[Math.floor(month / 2)],
    weekday: BN_WEEKDAYS[new Date(g.t).getUTCDay()],
  };
}

/** বাংলা তারিখ → ইংরেজি তারিখ (YYYY-MM-DD)। month ০ = বৈশাখ। */
export function fromBangla(day: number, month: number, year: number): string | null {
  if (![day, month, year].every(Number.isInteger) || month < 0 || month > 11 || year < 1) return null;
  const startYear = year + 593;
  const lengths = monthLengths(startYear);
  if (day < 1 || day > lengths[month]) return null;
  const offset = lengths.slice(0, month).reduce((s, n) => s + n, 0) + day - 1;
  const t = Date.UTC(startYear, 3, 14) + offset * DAY;
  return new Date(t).toISOString().slice(0, 10);
}
