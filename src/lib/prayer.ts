import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from 'adhan';

/**
 * নামাজের সময়: ইসলামিক ফাউন্ডেশন বাংলাদেশের মতো পদ্ধতি — ফজর ও এশা সূর্য দিগন্তের ১৮° নিচে
 * (University of Islamic Sciences, Karachi পদ্ধতি), আসর হানাফি মাজহাব অনুযায়ী।
 * হিসাবের জন্য adhan-js (MIT) লাইব্রেরি।
 */

export type PrayerKey = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export const PRAYER_LABELS: Record<PrayerKey, string> = {
  fajr: 'ফজর',
  sunrise: 'সূর্যোদয়',
  dhuhr: 'যোহর',
  asr: 'আসর',
  maghrib: 'মাগরিব',
  isha: 'এশা',
};

export const PRAYER_ORDER: PrayerKey[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

export type DayTimes = Record<PrayerKey, Date> & {
  /** সেহরির শেষ: হিসাবে আসা সুবহে সাদিক (সতর্কতার মিনিট যোগ ছাড়া, তাই আগের সময়) */
  sehriEnd: Date;
  /** ইফতার: মাগরিবের শুরু (সূর্যাস্ত + সতর্কতার মিনিট) */
  iftar: Date;
  sunset: Date;
};

/**
 * বাংলাদেশের প্রচলিত সময়সূচির মতো সতর্কতার মিনিট (ইহতিয়াত)।
 * ১৭ অক্টোবর ২০২৬ ঢাকার জন্য ইসলামিক ফাউন্ডেশন-ভিত্তিক সময়সূচির সঙ্গে মিলিয়ে ঠিক করা:
 * ফজর ৪:৪৩, যোহর ১১:৪৭, আসর ৩:৫৩, মাগরিব ৫:৩৪ (সূর্যাস্ত ৫:৩১), এশা ৬:৪৮।
 */
export const IHTIYAT_MINUTES = { fajr: 1, sunrise: 0, dhuhr: 2, asr: 0, maghrib: 3, isha: 2 };

const params = () => {
  const p = CalculationMethod.Karachi();
  p.madhab = Madhab.Hanafi;
  return p;
};

/** নির্দিষ্ট তারিখের (বছর, মাস ১-১২, দিন) সময় — ফলাফল আসল মুহূর্ত, দেখানোর সময় Asia/Dhaka ধরে */
export function prayerTimes(lat: number, lon: number, y: number, m: number, d: number): DayTimes {
  const coords = new Coordinates(lat, lon);
  // adhan তারিখের বছর-মাস-দিন অংশ ব্যবহার করে, তাই স্থানীয় সময়ে বানানো তারিখ যেকোনো টাইমজোনে ঠিক থাকে
  const date = new Date(y, m - 1, d);
  const raw = new PrayerTimes(coords, date, params());
  const p = params();
  p.adjustments = { ...IHTIYAT_MINUTES };
  const t = new PrayerTimes(coords, date, p);
  return {
    fajr: t.fajr,
    sunrise: t.sunrise,
    dhuhr: t.dhuhr,
    asr: t.asr,
    maghrib: t.maghrib,
    isha: t.isha,
    sehriEnd: raw.fajr,
    iftar: t.maghrib,
    sunset: raw.maghrib,
  };
}

const BN = '০১২৩৪৫৬৭৮৯';
const toBnDigits = (s: string) => s.replace(/\d/g, (c) => BN[Number(c)]);

/** বাংলাদেশ সময়ে ১২ ঘণ্টার ঘড়িতে, বাংলা অঙ্কে: "৫:৪২" */
export function formatTime(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(date);
  const h = parts.find((p) => p.type === 'hour')?.value ?? '';
  const min = parts.find((p) => p.type === 'minute')?.value ?? '';
  return toBnDigits(`${h}:${min}`);
}

/** বাংলাদেশ সময়ে আজকের তারিখ: [বছর, মাস, দিন] */
export function todayInDhaka(now = new Date()): [number, number, number] {
  const [y, m, d] = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka' }).format(now).split('-').map(Number);
  return [y, m, d];
}
