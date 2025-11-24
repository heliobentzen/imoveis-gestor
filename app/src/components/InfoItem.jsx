export default function InfoItem({ label, value }) {
  return (
    <div>
      <p className="font-semibold">{label}</p>
      <p>{value}</p>
    </div>
  );
}

