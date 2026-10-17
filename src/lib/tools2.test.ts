import { describe, expect, it } from 'vitest';
import { calcIncomeTax } from './tax';
import { calcElectricityBill } from './electricity';
import { calcZakat } from './zakat';
import { fromBangla, toBangla } from './banglaDate';
import { formatTime, prayerTimes } from './prayer';
import { districts, findDistrict } from '@/data/districts';

describe('income tax 2026-27', () => {
  it('is zero up to the threshold', () => {
    expect(calcIncomeTax({ income: 400_000, category: 'general' })?.net).toBe(0);
    expect(calcIncomeTax({ income: 450_000, category: 'woman-senior' })?.net).toBe(0);
  });
  it('applies slabs above the threshold', () => {
    // ৩ লাখে ১০% = ৩০,০০০ + পরের ৩ লাখে ১৫% = ৪৫,০০০
    const r = calcIncomeTax({ income: 1_000_000, category: 'general' })!;
    expect(r.gross).toBe(75_000);
    expect(r.rows.map((x) => x.rate)).toEqual([0, 10, 15]);
  });
  it('gives the lowest of the three rebate limits', () => {
    const r = calcIncomeTax({ income: 1_000_000, category: 'general', investment: 200_000 })!;
    expect(r.rebate).toBe(20_000); // ১০% বিনিয়োগ < ৩% আয় (৩০,০০০)
    expect(r.net).toBe(55_000);
    const big = calcIncomeTax({ income: 1_000_000, category: 'general', investment: 1_000_000 })!;
    expect(big.rebate).toBe(30_000); // ৩% আয়
  });
  it('charges minimum tax once income crosses the threshold', () => {
    const r = calcIncomeTax({ income: 420_000, category: 'general' })!;
    expect(r.gross).toBe(2_000);
    expect(r.net).toBe(5_000);
    expect(r.minTaxApplied).toBe(true);
    expect(calcIncomeTax({ income: 420_000, category: 'general', newTaxpayer: true })?.net).toBe(2_000);
  });
  it('reaches the 30% slab', () => {
    // ৪L করমুক্ত + ৩L(১০%) + ৪L(১৫%) + ৫L(২০%) + ২০L(২৫%) = ৩৬L পর্যন্ত, বাকি ৩০%
    const r = calcIncomeTax({ income: 4_600_000, category: 'general' })!;
    expect(r.gross).toBe(30_000 + 60_000 + 100_000 + 500_000 + 300_000);
  });
  it('adds the parent-of-disabled allowance', () => {
    expect(calcIncomeTax({ income: 450_000, category: 'general', parentOfDisabled: true })?.net).toBe(0);
  });
});

describe('electricity bill', () => {
  it('matches the published 200-unit example', () => {
    // ৭৫ × ৫.২৬ + ১২৫ × ৮.৫০ + ১ kW × ৪২, তারপর ৫% ভ্যাট = ১,৫৭৩.৯৫
    expect(calcElectricityBill(200, 1)?.total).toBeCloseTo(1573.95, 2);
  });
  it('uses the lifeline rate only up to 50 units', () => {
    expect(calcElectricityBill(50, 1)?.lifeline).toBe(true);
    expect(calcElectricityBill(50, 1)?.energy).toBeCloseTo(231.5, 2);
    expect(calcElectricityBill(51, 1)?.lifeline).toBe(false);
    expect(calcElectricityBill(51, 1)?.energy).toBeCloseTo(51 * 5.26, 2);
  });
  it('steps through every slab', () => {
    const b = calcElectricityBill(700, 2)!;
    expect(b.rows.map((r) => r.units)).toEqual([75, 125, 100, 100, 200, 100]);
    expect(b.demand).toBe(84);
  });
});

describe('zakat', () => {
  it('is due only at or above nisab', () => {
    // রুপার নিসাব: ৫২.৫ ভরি × ২,০০০ = ১,০৫,০০০
    expect(calcZakat({ assets: [100_000], debts: 0, basis: 'silver', pricePerVori: 2_000 })?.due).toBe(0);
    const r = calcZakat({ assets: [150_000, 50_000], debts: 20_000, basis: 'silver', pricePerVori: 2_000 })!;
    expect(r.net).toBe(180_000);
    expect(r.due).toBe(4_500);
  });
  it('needs a price to know the nisab', () => {
    expect(calcZakat({ assets: [100], debts: 0, basis: 'gold', pricePerVori: 0 })).toBeNull();
  });
});

describe('Bangla date (revised calendar)', () => {
  it('converts fixed national days', () => {
    expect(toBangla('2027-04-14')).toMatchObject({ day: 1, monthName: 'বৈশাখ', year: 1434 });
    expect(toBangla('2026-02-21')).toMatchObject({ day: 8, monthName: 'ফাল্গুন' });
    expect(toBangla('2026-03-26')).toMatchObject({ day: 12, monthName: 'চৈত্র' });
    expect(toBangla('2026-12-16')).toMatchObject({ day: 1, monthName: 'পৌষ', year: 1433 });
    expect(toBangla('2026-10-17')).toMatchObject({ day: 1, monthName: 'কার্তিক', year: 1433, weekday: 'শনিবার', season: 'হেমন্ত' });
  });
  it('gives Falgun 30 days in a leap year', () => {
    expect(toBangla('2028-03-14')).toMatchObject({ day: 30, monthName: 'ফাল্গুন' });
    expect(toBangla('2027-03-14')).toMatchObject({ day: 29, monthName: 'ফাল্গুন' }); // অধিবর্ষ নয়
    // চৈত্র সবসময় ১৫ মার্চ শুরু
    expect(toBangla('2027-03-15')).toMatchObject({ day: 1, monthName: 'চৈত্র' });
    expect(toBangla('2028-03-15')).toMatchObject({ day: 1, monthName: 'চৈত্র' });
  });
  it('round-trips every day of a year', () => {
    for (let t = Date.UTC(2026, 0, 1); t < Date.UTC(2029, 0, 1); t += 86_400_000) {
      const iso = new Date(t).toISOString().slice(0, 10);
      const b = toBangla(iso)!;
      expect(fromBangla(b.day, b.month, b.year)).toBe(iso);
    }
  });
  it('rejects impossible dates', () => {
    expect(fromBangla(31, 6, 1433)).toBeNull(); // কার্তিক ৩০ দিনের
    expect(toBangla('2026-02-30')).toBeNull();
  });
});

describe('prayer times', () => {
  it('has 64 districts with unique slugs inside Bangladesh', () => {
    expect(districts).toHaveLength(64);
    expect(new Set(districts.map((d) => d.slug)).size).toBe(64);
    for (const d of districts) {
      expect(d.lat).toBeGreaterThan(20.5);
      expect(d.lat).toBeLessThan(26.7);
      expect(d.lon).toBeGreaterThan(88);
      expect(d.lon).toBeLessThan(92.7);
    }
  });
  it('orders the day correctly for Dhaka', () => {
    const d = findDistrict('dhaka')!;
    const t = prayerTimes(d.lat, d.lon, 2026, 10, 17);
    const order = [t.fajr, t.sunrise, t.dhuhr, t.asr, t.maghrib, t.isha].map((x) => x.getTime());
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });
  it('matches the Islamic Foundation based Dhaka schedule for 17 Oct 2026 within a minute', () => {
    const d = findDistrict('dhaka')!;
    const t = prayerTimes(d.lat, d.lon, 2026, 10, 17);
    const mins = (x: Date) => {
      const [h, m] = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(x).split(':').map(Number);
      return h * 60 + m;
    };
    const published: [Date, string][] = [
      [t.fajr, '04:43'], [t.dhuhr, '11:47'], [t.asr, '15:53'], [t.maghrib, '17:34'], [t.isha, '18:48'], [t.sunset, '17:31'],
    ];
    for (const [got, want] of published) {
      const [h, m] = want.split(':').map(Number);
      expect(Math.abs(mins(got) - (h * 60 + m))).toBeLessThanOrEqual(1);
    }
    expect(t.sehriEnd.getTime()).toBeLessThan(t.fajr.getTime());
    expect(formatTime(t.maghrib)).toBe('৫:৩৪');
  });
  it('is later in the west (Rajshahi) than the east (Sylhet)', () => {
    const r = findDistrict('rajshahi')!;
    const s = findDistrict('sylhet')!;
    const a = prayerTimes(r.lat, r.lon, 2026, 10, 17).maghrib.getTime();
    const b = prayerTimes(s.lat, s.lon, 2026, 10, 17).maghrib.getTime();
    expect(a - b).toBeGreaterThan(8 * 60_000);
  });
});
