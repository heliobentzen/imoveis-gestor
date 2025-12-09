export default function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-blue-600"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
