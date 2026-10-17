'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { districts, findDistrict } from '@/data/districts';
import { PRAYER_LABELS, PRAYER_ORDER, formatTime, prayerTimes, todayInDhaka, type PrayerKey } from '@/lib/prayer';
import { bn } from '@/lib/format';
import { EN_MONTHS_BN } from '@/lib/banglaDate';
import { ResultPanel } from '../ResultPanel';

const toIso = ([y, m, d]: [number, number, number]) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
const fromIso = (s: string): [number, number, number] | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
};
const addDays = ([y, m, d]: [number, number, number], n: number): [number, number, number] => {
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return [t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()];
};

function untilText(ms: number) {
  const total = Math.max(0, Math.round(ms / 60_000));
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `আর ${bn(h)} ঘণ্টা ${bn(m)} মিনিট পর` : `আর ${bn(m)} মিনিট পর`;
}

/**
 * জেলা ও তারিখ বেছে নামাজ, সেহরি ও ইফতারের সময়।
 * initialDate সার্ভার আর ব্রাউজারে একই রাখা হয় (বিল্ডের দিন), তারপর ব্রাউজারে আজকের তারিখ বসে।
 */
export function PrayerTimesTool({ slug, initialDate }: { slug: string; initialDate: [number, number, number] }) {
  const router = useRouter();
  const district = findDistrict(slug) ?? districts[0];
  const [date, setDate] = useState(initialDate);
  const [today, setToday] = useState(initialDate);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const t = todayInDhaka();
    setToday(t);
    if (toIso(t) !== toIso(initialDate)) setDate(t);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, [initialDate]);

  const t = prayerTimes(district.lat, district.lon, ...date);
  const isToday = toIso(date) === toIso(today);

  // আজ হলে পরবর্তী ওয়াক্ত (সূর্যোদয় বাদ দিয়ে)
  let next: { key: PrayerKey; at: Date } | null = null;
  if (isToday && now !== null) {
    const keys = PRAYER_ORDER.filter((k) => k !== 'sunrise');
    const found = keys.find((k) => t[k].getTime() > now);
    if (found) next = { key: found, at: t[found] };
  }

  const dateLabel = `${bn(date[2])} ${EN_MONTHS_BN[date[1] - 1]}`;

  return (
    <div className="tool-panel">
      <div className="tool-form">
        <div className="fields two">
          <div className="field">
            <label htmlFor="district">জেলা</label>
            <select id="district" value={district.slug} onChange={(e) => router.push(`/prayer-times/${e.target.value}/`)}>
              {districts.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.bn}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="pdate">তারিখ</label>
            <input
              id="pdate"
              type="date"
              value={toIso(date)}
              onChange={(e) => {
                const v = fromIso(e.target.value);
                if (v) setDate(v);
              }}
            />
          </div>
        </div>
        <div className="chips">
          <button type="button" className="tab" aria-pressed={isToday} onClick={() => setDate(today)}>
            আজ
          </button>
          <button type="button" className="tab" aria-pressed={toIso(date) === toIso(addDays(today, 1))} onClick={() => setDate(addDays(today, 1))}>
            আগামীকাল
          </button>
        </div>
        <div className="big-pair" aria-label="সেহরি ও ইফতার">
          <div>
            <span>সেহরির শেষ সময়</span>
            <b>{formatTime(t.sehriEnd)}</b>
          </div>
          <div>
            <span>ইফতার</span>
            <b>{formatTime(t.iftar)}</b>
          </div>
        </div>
        <p className="hint" style={{ marginTop: 12 }}>
          সতর্কতার জন্য সেহরি কয়েক মিনিট আগেই শেষ করুন। স্থানীয় মসজিদের সময়ের সঙ্গে ১-২ মিনিট পার্থক্য হতে পারে।
        </p>
      </div>

      <ResultPanel
        label={next ? 'পরবর্তী ওয়াক্ত' : `${district.bn}, ${dateLabel}`}
        value={next ? `${PRAYER_LABELS[next.key]} ${formatTime(next.at)}` : `মাগরিব ${formatTime(t.maghrib)}`}
        size="medium"
        empty=""
        sub={next && now !== null ? untilText(next.at.getTime() - now) : isToday ? 'আজকের সব ওয়াক্ত শেষ' : undefined}
        rows={PRAYER_ORDER.map((k) => [PRAYER_LABELS[k], formatTime(t[k])] as [string, string])}
        foot="ফজর ও এশা ১৮°, আসর হানাফি মাজহাব। ইসলামিক ফাউন্ডেশন-ভিত্তিক সময়সূচির মতো কয়েক মিনিট সতর্কতা যোগ করা।"
      />
    </div>
  );
}
