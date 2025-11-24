export default function PageHeader({ title, subtitle, actions }) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex gap-3">
        {actions}
      </div>
    </header>
  );
}
