export default function Select({ label, options = [], value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="">Selecione...</option>

        {options.map((opt, index) => (
          <option key={index} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
}
