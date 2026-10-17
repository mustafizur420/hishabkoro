'use client';

import Link from 'next/link';
import { useState } from 'react';
import { bijoyToUnicode, unicodeToBijoy } from '@/lib/bijoy';
import { bn } from '@/lib/format';

type Direction = 'bijoy-to-unicode' | 'unicode-to-bijoy';

const COPY = {
  'bijoy-to-unicode': {
    from: 'বিজয়ে লেখা টেক্সট (SutonnyMJ)',
    to: 'ইউনিকোড বাংলা',
    placeholder: 'Word বা পুরনো ফাইল থেকে বিজয়ে লেখা টেক্সট এখানে পেস্ট করুন, যেমন: Avwg evsjvq Mvb MvB',
    sample: 'Avgvi †mvbvi evsjv, Avwg †Zvgvq fv‡jvevwm|',
    other: { href: '/unicode-to-bijoy/', label: 'উল্টো দিকে: ইউনিকোড থেকে বিজয়' },
  },
  'unicode-to-bijoy': {
    from: 'ইউনিকোড বাংলা',
    to: 'বিজয় (SutonnyMJ) টেক্সট',
    placeholder: 'ফোন, Facebook বা ওয়েবসাইটের বাংলা লেখা এখানে পেস্ট করুন',
    sample: 'আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।',
    other: { href: '/bijoy-to-unicode/', label: 'উল্টো দিকে: বিজয় থেকে ইউনিকোড' },
  },
} as const;

export function BijoyConverter({ direction }: { direction: Direction }) {
  const c = COPY[direction];
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = input ? (direction === 'bijoy-to-unicode' ? bijoyToUnicode(input) : unicodeToBijoy(input)) : '';

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      // পুরনো ব্রাউজারে clipboard API না থাকলে
      const ta = document.getElementById('converter-output') as HTMLTextAreaElement | null;
      ta?.select();
      document.execCommand('copy');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="calc" aria-label="রূপান্তর">
      <div className="converter">
        <div className="field">
          <label htmlFor="converter-input">{c.from}</label>
          <textarea
            id="converter-input"
            value={input}
            placeholder={c.placeholder}
            onChange={(e) => setInput(e.target.value)}
            rows={7}
            spellCheck={false}
            lang={direction === 'bijoy-to-unicode' ? 'en' : 'bn'}
          />
          <div className="converter-bar">
            <span className="small">{bn(input.length, 0)} অক্ষর</span>
            <span className="converter-actions">
              {!input && (
                <button type="button" className="btn-quiet" onClick={() => setInput(c.sample)}>
                  উদাহরণ দিয়ে দেখুন
                </button>
              )}
              {input && (
                <button type="button" className="btn-quiet" onClick={() => setInput('')}>
                  মুছুন
                </button>
              )}
            </span>
          </div>
        </div>

        <div className="field">
          <label htmlFor="converter-output">{c.to}</label>
          <textarea
            id="converter-output"
            value={output}
            readOnly
            rows={7}
            placeholder="রূপান্তর এখানে সঙ্গে সঙ্গে দেখাবে"
            spellCheck={false}
            lang={direction === 'bijoy-to-unicode' ? 'bn' : 'en'}
          />
          <div className="converter-bar">
            <span className="small" aria-live="polite">
              {copied ? 'কপি হয়েছে' : ''}
            </span>
            <button type="button" className="btn" onClick={copy} disabled={!output}>
              কপি করুন
            </button>
          </div>
        </div>
      </div>

      {direction === 'unicode-to-bijoy' && output && (
        <p className="small">
          এখানে লেখাটা অদ্ভুত দেখানোই স্বাভাবিক। Word-এ পেস্ট করে ফন্ট SutonnyMJ (বা অন্য কোনো MJ ফন্ট) দিলে ঠিক বাংলা দেখাবে।
        </p>
      )}
      <p className="small">
        <Link href={c.other.href}>{c.other.label}</Link>
      </p>
    </section>
  );
}
