export default function Section({ title, children }) {
  return (
    <section className="mt-10">
      {title && (
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      )}
      <div className="mt-4">
        {children}
      </div>
    </section>
  );
}
