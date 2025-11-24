import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full bg-[#060a0a] border-b border-gray-700 h-16 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6">

        {/* ESQUERDA — LOGO */}
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="logo" 
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* DIREITA — LINKS + BADGE */}
        <div className="flex items-center gap-10">
          
          <nav className="flex items-center gap-8 text-white text-sm">
            <Link to="/" className="hover:text-gray-300">Início</Link>
            <Link to="/meus-empreendimentos" className="hover:text-gray-300">Meus Empreendimentos</Link>
            <Link to="/ajuda" className="hover:text-gray-300">Ajuda</Link>
          </nav>

          <div className="flex items-center gap-2 bg-white text-green-700 font-medium px-3 py-1 rounded-full shadow">
            <span className="w-7 h-7 bg-green-700 rounded-full flex items-center justify-center text-white font-semibold">
              H
            </span>
            Hogrefe Construtora
          </div>
        </div>

      </div>
    </header>
  );
}
