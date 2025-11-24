export default function StatBar({ label, percentage, color = "#3b82f6" }) {
  return (
    <div>
      <p>{label}</p>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className="h-full rounded"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">{percentage}%</p>
    </div>
  );
}
