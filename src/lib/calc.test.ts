import { describe, expect, it } from 'vitest';
import { calcGpa, combineCgpa, gradeForMarks } from './cgpa';
import { convertLand } from './land';
import { ageOn } from './age';
import { calcEmi } from './emi';
import { parseNum, bn } from './format';

describe('cgpa', () => {
  it('weights grade points by credit', () => {
    const r = calcGpa([
      { credit: 3, point: 4 },
      { credit: 3, point: 3.5 },
      { credit: 1.5, point: 3 },
    ]);
    // (12 + 10.5 + 4.5) / 7.5 = 3.6
    expect(r).toEqual({ gpa: 3.6, totalCredits: 7.5, totalPoints: 27 });
  });
  it('skips empty or invalid rows', () => {
    expect(calcGpa([{ credit: NaN, point: 4 }, { credit: 3, point: 3 }])?.gpa).toBe(3);
    expect(calcGpa([])).toBeNull();
  });
  it('combines previous CGPA with a new semester', () => {
    expect(combineCgpa(3.5, 60, 3.8, 15)).toBe(3.56);
    expect(combineCgpa(3.5, 60, 3.8, 0)).toBeNull();
  });
  it('maps marks to letter grades at the boundaries', () => {
    expect(gradeForMarks(80)?.letter).toBe('A+');
    expect(gradeForMarks(79.5)?.letter).toBe('A');
    expect(gradeForMarks(40)?.letter).toBe('D');
    expect(gradeForMarks(39)?.letter).toBe('F');
    expect(gradeForMarks(101)).toBeNull();
  });
});

describe('land', () => {
  it('converts between local units', () => {
    const r = convertLand(1, 'bigha')!;
    expect(r.katha).toBeCloseTo(20);
    expect(r.decimal).toBeCloseTo(33.0579, 3);
    expect(convertLand(100, 'decimal')!.acre).toBeCloseTo(1);
    expect(convertLand(1, 'decimal')!.ojutangsho).toBeCloseTo(100);
  });
  it('rejects negative input', () => {
    expect(convertLand(-1, 'katha')).toBeNull();
  });
});

describe('age', () => {
  it('counts years, months and days', () => {
    expect(ageOn('2000-01-15', '2026-10-17')).toMatchObject({ years: 26, months: 9, days: 2 });
  });
  it('borrows days from the previous month', () => {
    expect(ageOn('2000-01-31', '2000-03-01')).toMatchObject({ years: 0, months: 1, days: 1 });
  });
  it('handles leap-day birthdays and bad input', () => {
    // ২৯ ফেব্রুয়ারির জন্মদিন অ-অধিবর্ষে ২৮ ফেব্রুয়ারিতে ধরা হয়
    expect(ageOn('2004-02-29', '2025-02-28')).toMatchObject({ years: 21, months: 0, days: 0 });
    expect(ageOn('2004-02-29', '2025-02-27')).toMatchObject({ years: 20, months: 11, days: 29 });
    expect(ageOn('2026-02-30', '2026-03-01')).toBeNull();
    expect(ageOn('2026-05-01', '2026-04-01')).toBeNull();
  });
});

describe('emi', () => {
  it('matches the standard formula', () => {
    const r = calcEmi(100000, 12, 12)!;
    expect(r.emi).toBeCloseTo(8884.88, 2);
    expect(r.totalInterest).toBeCloseTo(6618.55, 1);
  });
  it('handles zero interest', () => {
    expect(calcEmi(12000, 0, 12)!.emi).toBe(1000);
  });
});

describe('format', () => {
  it('reads Bangla digits', () => {
    expect(parseNum('৩.৫')).toBe(3.5);
    expect(parseNum('১,০০,০০০')).toBe(100000);
    expect(parseNum('')).toBeNaN();
  });
  it('writes Bangla digits', () => {
    expect(bn(3.6, 2, 2)).toBe('৩.৬০');
  });
});
