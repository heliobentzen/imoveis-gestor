export default function Grid({ cols = 2, children }) {
  const colClasses = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  return (
    <div className={`grid grid-cols-1 ${colClasses[cols]} gap-6`}>
      {children}
    </div>
  );
}
