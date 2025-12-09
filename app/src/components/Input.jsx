export default function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
}
