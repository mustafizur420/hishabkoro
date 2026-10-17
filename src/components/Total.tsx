/** খাতার "মোট" লাইন: বাঁয়ে নাম, ডানে হাইলাইট করা ফলাফল, নিচে দুই দাগ */
export function Total({
  label,
  value,
  note,
  empty,
}: {
  label: string;
  value: string | null;
  note?: React.ReactNode;
  empty: string;
}) {
  return (
    <div className="total" aria-live="polite">
      <span className="total-label">{label}</span>
      {value === null ? <span className="total-empty">{empty}</span> : <span className="total-value">{value}</span>}
      {value !== null && note && <span className="total-note">{note}</span>}
    </div>
  );
}
