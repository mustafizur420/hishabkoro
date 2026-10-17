import Link from 'next/link';
import { groups, tools } from '@/data/tools';
import { site } from '@/config/site';

export default function Home() {
  return (
    <>
      <h1>{site.tagline}</h1>
      <p className="lead">
        CGPA, বয়স, লোনের কিস্তি, জমির মাপ। ফ্রি, বাংলায়, ফোনে চলে। কোনো অ্যাকাউন্ট লাগে না, আপনার তথ্য কোথাও যায় না।
      </p>
      {groups.map((g) => {
        const items = tools.filter((t) => t.group === g);
        if (items.length === 0) return null;
        return (
          <section className="index-group" key={g}>
            <h2>{g}</h2>
            <ul className="index-list">
              {items.map((t) => (
                <li key={t.href}>
                  <Link href={t.href}>
                    <span className="index-title">{t.title}</span>
                    <span className="index-desc">{t.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
