import { EN_MONTHS_BN } from '@/lib/banglaDate';
import { bn } from '@/lib/format';
import { formatTime, prayerTimes } from '@/lib/prayer';
import type { District } from '@/data/districts';

/** পুরো মাসের সময়সূচি — বিল্ডের সময় তৈরি হয় (প্রতিদিন সাইট নতুন করে বিল্ড হয়), তাই Google পুরো টেবিল পড়তে পারে */
export function PrayerMonthTable({ district, year, month, today }: { district: District; year: number; month: number; today: number }) {
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return (
    <>
      <h2>
        {district.bn}: {EN_MONTHS_BN[month - 1]} {bn(year, 0).replace(/,/g, '')} মাসের সময়সূচি
      </h2>
      <div className="table-scroll">
        <table className="month-table">
          <thead>
            <tr>
              <th>তারিখ</th>
              <th>সেহরি শেষ</th>
              <th>ফজর</th>
              <th>যোহর</th>
              <th>আসর</th>
              <th>মাগরিব/ইফতার</th>
              <th>এশা</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: days }, (_, i) => {
              const t = prayerTimes(district.lat, district.lon, year, month, i + 1);
              return (
                <tr key={i} className={i + 1 === today ? 'today' : undefined}>
                  <td>
                    {bn(i + 1)} {EN_MONTHS_BN[month - 1]}
                  </td>
                  <td>{formatTime(t.sehriEnd)}</td>
                  <td>{formatTime(t.fajr)}</td>
                  <td>{formatTime(t.dhuhr)}</td>
                  <td>{formatTime(t.asr)}</td>
                  <td>{formatTime(t.maghrib)}</td>
                  <td>{formatTime(t.isha)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
