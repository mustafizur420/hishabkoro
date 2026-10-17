'use client';

import { useMemo, useState } from 'react';
import { calcGpa, combineCgpa, type GradeRow } from '@/lib/cgpa';
import { bn, parseNum } from '@/lib/format';
import { ResultPanel } from '../ResultPanel';

type Row = { id: number; name: string; credit: string; grade: string };

let nextId = 5;
const blank = (id: number): Row => ({ id, name: '', credit: '3', grade: '' });

export function CgpaCalculator({ scale }: { scale: GradeRow[] }) {
  const [rows, setRows] = useState<Row[]>([blank(1), blank(2), blank(3), blank(4)]);
  const [prevCgpa, setPrevCgpa] = useState('');
  const [prevCredits, setPrevCredits] = useState('');

  const pointOf = (letter: string) => scale.find((g) => g.letter === letter)?.point ?? NaN;

  const semester = useMemo(
    () => calcGpa(rows.filter((r) => r.grade).map((r) => ({ credit: parseNum(r.credit), point: pointOf(r.grade) }))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rows, scale],
  );

  const pc = parseNum(prevCgpa);
  const pcr = parseNum(prevCredits);
  const hasPrev = prevCgpa !== '' || prevCredits !== '';
  const prevInvalid = hasPrev && !(pc >= 0 && pc <= 4 && pcr > 0);
  const overall = semester && hasPrev && !prevInvalid ? combineCgpa(pc, pcr, semester.gpa, semester.totalCredits) : null;

  // GPA কোন লেটার গ্রেডের সমান (স্কেলে যে গ্রেডের পয়েন্ট GPA-র সমান বা কম, তার সবচেয়ে বড়টা)
  const letterFor = (gpa: number) => scale.find((g) => g.point <= gpa + 1e-9)?.letter ?? 'F';

  const update = (id: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <div className="tool-panel">
      <div className="tool-form">
        <div className="course-head" aria-hidden="true">
          <span>কোর্স</span>
          <span>ক্রেডিট</span>
          <span>গ্রেড</span>
          <span />
        </div>
        <div className="courses">
          {rows.map((r, i) => (
            <div className="course" key={r.id}>
              <div className="course-name">
                <label htmlFor={`name-${r.id}`} className="sr-only">
                  কোর্স {bn(i + 1)}-এর নাম
                </label>
                <input
                  id={`name-${r.id}`}
                  value={r.name}
                  placeholder={`কোর্স ${bn(i + 1)} (নাম ঐচ্ছিক)`}
                  onChange={(e) => update(r.id, { name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor={`credit-${r.id}`} className="sr-only">
                  কোর্স {bn(i + 1)}-এর ক্রেডিট
                </label>
                <input
                  id={`credit-${r.id}`}
                  inputMode="decimal"
                  value={r.credit}
                  onChange={(e) => update(r.id, { credit: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor={`grade-${r.id}`} className="sr-only">
                  কোর্স {bn(i + 1)}-এর গ্রেড
                </label>
                <select id={`grade-${r.id}`} value={r.grade} onChange={(e) => update(r.id, { grade: e.target.value })}>
                  <option value="">গ্রেড বাছুন</option>
                  {scale.map((g) => (
                    <option key={g.letter} value={g.letter}>
                      {g.letter} ({bn(g.point, 2, 2)})
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="btn-remove"
                aria-label={`কোর্স ${bn(i + 1)} মুছুন`}
                onClick={() => setRows((rs) => (rs.length > 1 ? rs.filter((x) => x.id !== r.id) : rs))}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="add-row" onClick={() => setRows((rs) => [...rs, blank(nextId++)])}>
          + আরেকটা কোর্স যোগ করুন
        </button>

        <details className="extra" open={hasPrev}>
          <summary>আগের সেমিস্টারসহ মোট CGPA বের করুন</summary>
          <div className="fields two">
            <div className="field">
              <label htmlFor="prev-cgpa">এখন পর্যন্ত CGPA</label>
              <input id="prev-cgpa" inputMode="decimal" placeholder="যেমন ৩.৪৫" value={prevCgpa} onChange={(e) => setPrevCgpa(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="prev-credits">এখন পর্যন্ত মোট ক্রেডিট</label>
              <input id="prev-credits" inputMode="decimal" placeholder="যেমন ৬০" value={prevCredits} onChange={(e) => setPrevCredits(e.target.value)} />
            </div>
          </div>
          {prevInvalid && <p className="error">CGPA ০ থেকে ৪-এর মধ্যে আর ক্রেডিট ০-এর বেশি দিন।</p>}
        </details>
      </div>

      <ResultPanel
        label="এই সেমিস্টারের GPA"
        value={semester ? bn(semester.gpa, 2, 2) : null}
        empty="বাঁ পাশে কোর্সের গ্রেড বাছলেই এখানে GPA দেখাবে।"
        rows={
          semester
            ? [
                ['মোট ক্রেডিট', bn(semester.totalCredits)],
                ['মোট গ্রেড পয়েন্ট', bn(semester.totalPoints)],
              ]
            : undefined
        }
        verdict={semester ? { text: <>গড়ে {letterFor(semester.gpa)} গ্রেডের সমান</> } : undefined}
        foot="GPA = (গ্রেড পয়েন্ট × ক্রেডিট)-এর যোগফল ÷ মোট ক্রেডিট"
      >
        {overall !== null && semester && (
          <div className="out-block">
            <span className="out-label">নতুন মোট CGPA</span>
            <div className="out-main medium">{bn(overall, 2, 2)}</div>
            <div className="small" style={{ color: 'var(--muted-dark)' }}>
              মোট ক্রেডিট হবে {bn(pcr + semester.totalCredits)}
            </div>
          </div>
        )}
      </ResultPanel>
    </div>
  );
}
