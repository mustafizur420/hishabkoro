export type GradeRow = { letter: string; point: number; minMarks: number };

/** বাংলাদেশের প্রচলিত ৪.০০ স্কেল (বেশিরভাগ বিশ্ববিদ্যালয়ে ব্যবহৃত)। */
export const standardScale: GradeRow[] = [
  { letter: 'A+', point: 4.0, minMarks: 80 },
  { letter: 'A', point: 3.75, minMarks: 75 },
  { letter: 'A-', point: 3.5, minMarks: 70 },
  { letter: 'B+', point: 3.25, minMarks: 65 },
  { letter: 'B', point: 3.0, minMarks: 60 },
  { letter: 'B-', point: 2.75, minMarks: 55 },
  { letter: 'C+', point: 2.5, minMarks: 50 },
  { letter: 'C', point: 2.25, minMarks: 45 },
  { letter: 'D', point: 2.0, minMarks: 40 },
  { letter: 'F', point: 0, minMarks: 0 },
];

export type Course = { credit: number; point: number };

export type GpaResult = { gpa: number; totalCredits: number; totalPoints: number };

const round2 = (n: number) => Math.round(n * 100) / 100;

/** কোর্সের ক্রেডিট আর গ্রেড পয়েন্ট থেকে GPA। ভুল বা খালি সারি বাদ পড়ে। */
export function calcGpa(courses: Course[]): GpaResult | null {
  const valid = courses.filter(
    (c) => Number.isFinite(c.credit) && c.credit > 0 && Number.isFinite(c.point) && c.point >= 0,
  );
  const totalCredits = valid.reduce((s, c) => s + c.credit, 0);
  if (totalCredits === 0) return null;
  const totalPoints = valid.reduce((s, c) => s + c.credit * c.point, 0);
  return { gpa: round2(totalPoints / totalCredits), totalCredits, totalPoints: round2(totalPoints) };
}

/** আগের CGPA আর এই সেমিস্টারের GPA মিলিয়ে নতুন CGPA। */
export function combineCgpa(
  prevCgpa: number,
  prevCredits: number,
  semGpa: number,
  semCredits: number,
): number | null {
  const total = prevCredits + semCredits;
  if (!(prevCredits >= 0) || !(semCredits > 0) || !(prevCgpa >= 0) || total <= 0) return null;
  return round2((prevCgpa * prevCredits + semGpa * semCredits) / total);
}

/** নম্বর থেকে লেটার গ্রেড। */
export function gradeForMarks(marks: number, scale: GradeRow[] = standardScale): GradeRow | null {
  if (!Number.isFinite(marks) || marks < 0 || marks > 100) return null;
  return scale.find((g) => marks >= g.minMarks) ?? null;
}
