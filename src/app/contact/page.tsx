import type { Metadata } from 'next';
import { site } from '@/config/site';

export const metadata: Metadata = { title: 'যোগাযোগ', alternates: { canonical: '/contact/' } };

export default function Contact() {
  return (
    <div className="prose">
      <h1>যোগাযোগ</h1>
      <p className="lead">হিসাবে ভুল, নতুন টুলের অনুরোধ বা অন্য যেকোনো বিষয়ে ইমেইল করুন।</p>
      <p>
        ইমেইল: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
      </p>
      <p>ভুল জানালে কোন পেজে, কী ইনপুট দিয়েছিলেন আর কী ফলাফল আশা করেছিলেন লিখলে দ্রুত ঠিক করা যায়।</p>
    </div>
  );
}
