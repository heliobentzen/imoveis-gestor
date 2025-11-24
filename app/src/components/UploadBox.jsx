export default function UploadBox({ label, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition">
        <span className="text-sm text-gray-500">Clique para enviar arquivo</span>
        <input type="file" className="hidden" onChange={onChange} />
      </label>
    </div>
  );
}
