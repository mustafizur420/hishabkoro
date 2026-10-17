import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="plain wrap narrow prose">
      <h1>এই পেজটা পাওয়া যায়নি</h1>
      <p className="lead">লিংকটা পুরনো বা ভুল হতে পারে।</p>
      <p>
        <Link href="/">সব টুলের তালিকায় যান</Link>
      </p>
    </div>
  );
}
