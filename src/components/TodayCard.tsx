'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EN_MONTHS_BN, toBangla } from '@/lib/banglaDate';
import { bn } from '@/lib/format';
import { PRAYER_LABELS, type PrayerKey, formatTime, prayerTimes } from '@/lib/prayer';
import { DEFAULT_DISTRICT, findDistrict } from '@/data/districts';

const todayIso = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka' }).format(new Date());
const SHOWN: PrayerKey[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
const num = (n: number) => bn(n, 0).replace(/,/g, '');

function left(ms: number) {
  const m = Math.max(1, Math.round(ms / 60000));
  const h = Math.floor(m / 60);
  return h ? `${num(h)} ঘণ্টা ${num(m % 60)} মিনিট` : `${num(m)} মিনিট`;
}

/** হোম পেজের হিরোতে "আজ" কার্ড: বাংলা তারিখ আর ঢাকার নামাজের সময়, পরের ওয়াক্ত চিহ্নিত */
export function TodayCard({ initialIso }: { initialIso: string }) {
  const [iso, setIso] = useState(initialIso);
  const [now, setNow] = useState<number | null>(null); // প্রথম রেন্ডার সার্ভারের সঙ্গে মিলিয়ে রাখতে ঘড়ি পরে বসে

  useEffect(() => {
    const tick = () => {
      setIso(todayIso());
      setNow(Date.now());
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const b = toBangla(iso)!;
  const [y, m, d] = iso.split('-').map(Number);
  const dhaka = findDistrict(DEFAULT_DISTRICT)!;
  const times = prayerTimes(dhaka.lat, dhaka.lon, y, m, d);
  const next = now == null ? null : SHOWN.find((k) => times[k].getTime() > now) ?? null;

  return (
    <div className="today rise-side" aria-label="আজকের তারিখ ও নামাজের সময়">
      <div className="today-date">
        <span className="today-kicker">
          <i aria-hidden="true" />
          আজ {b.weekday}
        </span>
        <p className="today-bn">
          {num(b.day)} {b.monthName} <span>{num(b.year)}</span>
        </p>
        <p className="today-en">
          {num(d)} {EN_MONTHS_BN[m - 1]} {num(y)} · {b.season}কাল
        </p>
        <Link href="/bangla-date/" className="today-link">
          বাংলা তারিখ কনভার্টার <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="today-prayer">
        <div className="today-prayer-head">
          <b>ঢাকায় নামাজের সময়</b>
          {next ? (
            <span className="today-next">
              {PRAYER_LABELS[next]} আর {left(times[next].getTime() - now!)}
            </span>
          ) : now != null ? (
            <span className="today-next">আজকের ওয়াক্ত শেষ</span>
          ) : null}
        </div>
        <ul>
          {SHOWN.map((k) => (
            <li key={k} className={k === next ? 'is-next' : undefined}>
              <span>{PRAYER_LABELS[k]}</span>
              <b>{formatTime(times[k])}</b>
            </li>
          ))}
        </ul>
        <Link href="/prayer-times/" className="today-link">
          ৬৪ জেলার সময় দেখুন <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
