import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-6xl mx-auto bg-white p-10 mt-10 rounded-lg shadow">
        {children}
      </main>
    </div>
  );
}
