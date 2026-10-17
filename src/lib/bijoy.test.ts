import { describe, expect, it } from 'vitest';
import { bijoyToUnicode, unicodeToBijoy } from './bijoy';

// [বিজয় (SutonnyMJ), ইউনিকোড] — হাতে মেলানো জোড়া
const pairs: [string, string][] = [
  ['Avwg evsjvq Mvb MvB', 'আমি বাংলায় গান গাই'],
  ['evsjv‡`k', 'বাংলাদেশ'],
  ['evsjv‡`‡ki', 'বাংলাদেশের'],
  ['Rb¨', 'জন্য'],
  ['‡Kgb Av‡Qb?', 'কেমন আছেন?'],
  ['cÖ_g', 'প্রথম'],
  ['MÖvg', 'গ্রাম'],
  ['Kg©', 'কর্ম'],
  ['kZ©', 'শর্ত'],
  ['ce©', 'পর্ব'],
  ['Kvh©', 'কার্য'],
  ['e¨vsK', 'ব্যাংক'],
  ['mßvn', 'সপ্তাহ'],
  ['‡KŠkj', 'কৌশল'],
  ['‡Kvb', 'কোন'],
  ['wK', 'কি'],
  ['Avgvi †mvbvi evsjv, Avwg †Zvgvq fv‡jvevwm|', 'আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।'],
  ['1971', '১৯৭১'],
  ['Dc‡`óv', 'উপদেষ্টা'],
  ['wkÿv', 'শিক্ষা'],
  ['cwiev‡ii', 'পরিবারের'],
  ['¯‹zj', 'স্কুল'],
  ['AwaKvi', 'অধিকার'],
  ['wefvM', 'বিভাগ'],
  ['‰`wbK', 'দৈনিক'],
  ['Kw¤úDUvi', 'কম্পিউটার'],
  ['†ZvgvKvi', 'তোমাকার'],
  ['‡MŠZg', 'গৌতম'],
  ['eB c‡o', 'বই পড়ে'],
  ['iƒc', 'রূপ'],
  ['i“wU', 'রুটি'],
];

// বিজয়ে একই চিহ্নের একাধিক রূপ আছে (SutonnyMJ-এ সবগুলো একইভাবে দেখায়), তুলনার আগে এক করি
const sameGlyphs = (s: string) =>
  s
    .replace(/†/g, '‡')
    .replace(/[«ª]/g, 'Ö')
    .replace(/¶/g, 'ÿ')
    .replace(/[zæ“–]/g, 'y');

describe('বিজয় → ইউনিকোড', () => {
  it.each(pairs)('%s', (bijoy, unicode) => {
    expect(bijoyToUnicode(bijoy)).toBe(unicode.normalize('NFC'));
  });

  it('keeps spaces and line breaks as typed', () => {
    expect(bijoyToUnicode('Avwg  \nZzwg')).toBe('আমি  \nতুমি'.normalize('NFC'));
  });
});

describe('ইউনিকোড → বিজয়', () => {
  it.each(pairs)('%s', (bijoy, unicode) => {
    expect(sameGlyphs(unicodeToBijoy(unicode))).toBe(sameGlyphs(bijoy));
  });

  it('accepts both encodings of য়, ড়, ঢ়', () => {
    const composed = 'য়'; // এক অক্ষরের য়
    const split = 'য়'; // য + নুকতা
    expect(unicodeToBijoy(`আমায়${composed}`)).toBe(unicodeToBijoy(`আমায়${split}`));
    expect(unicodeToBijoy('ড়')).toBe('o');
  });

  it('writes word-initial e-kar with †', () => {
    expect(unicodeToBijoy('কেমন')).toBe('†Kgb');
    expect(unicodeToBijoy('আছেন')).toBe('Av‡Qb');
  });

  it('turns quotes and dashes into Bijoy symbols, not letters', () => {
    expect(unicodeToBijoy('“রুটি” — ‘বই’')).toBe('ÒiywUÓ Ñ ÔeBÕ'.replace('iy', 'i“'));
    expect(bijoyToUnicode('ÒiywUÓ Ñ ÔeBÕ')).toBe('“রুটি” — ‘বই’');
  });

  it('leaves English text and symbols alone', () => {
    expect(unicodeToBijoy('Price: 50%')).toBe('Price: 50%');
  });

  it('does not hang on unusual conjuncts', () => {
    expect(() => unicodeToBijoy('ত্ক ঙ্ম ক্ষ্ণ')).not.toThrow();
  });
});

describe('দুই দিকে ঘুরে আসা', () => {
  it('returns the same Unicode paragraph', () => {
    const text =
      'বাংলাদেশের মানুষ প্রতিদিন অনেক হিসাব করে। পরীক্ষার ফলাফল, ব্যাংকের কিস্তি, জমির মাপ — সবই দরকার। কৌশল আর পরিকল্পনা থাকলে কাজ সহজ হয়।';
    expect(bijoyToUnicode(unicodeToBijoy(text))).toBe(text.normalize('NFC'));
  });
});
