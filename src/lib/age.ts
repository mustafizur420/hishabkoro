export type Age = { years: number; months: number; days: number; totalDays: number };

const parse = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const t = Date.UTC(y, mo - 1, d);
  const check = new Date(t);
  if (check.getUTCFullYear() !== y || check.getUTCMonth() !== mo - 1 || check.getUTCDate() !== d) return null;
  return { y, mo, d, t };
};

const daysInMonth = (y: number, mo: number) => new Date(Date.UTC(y, mo, 0)).getUTCDate();

/** জন্মতারিখ থেকে নির্দিষ্ট তারিখে বয়স (বছর, মাস, দিন)। তারিখ YYYY-MM-DD। */
export function ageOn(birthIso: string, onIso: string): Age | null {
  const b = parse(birthIso);
  const o = parse(onIso);
  if (!b || !o || o.t < b.t) return null;

  // জন্মদিন থেকে পুরো মাস গুনে এগোই; মাসে দিন কম হলে মাসের শেষ দিনে থামি (৩১ জানুয়ারি + ১ মাস = ফেব্রুয়ারির শেষ দিন)
  const addMonths = (n: number) => {
    const total = b.mo - 1 + n;
    const y = b.y + Math.floor(total / 12);
    const mo = (total % 12) + 1;
    return Date.UTC(y, mo - 1, Math.min(b.d, daysInMonth(y, mo)));
  };

  let full = (o.y - b.y) * 12 + (o.mo - b.mo);
  if (addMonths(full) > o.t) full -= 1;

  const days = Math.round((o.t - addMonths(full)) / 86400000);
  return {
    years: Math.floor(full / 12),
    months: full % 12,
    days,
    totalDays: Math.round((o.t - b.t) / 86400000),
  };
}
