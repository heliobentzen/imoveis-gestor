import DashboardLayout from "../layouts/DashboardLayout";
import Input from "../components/Input";
import Select from "../components/Select";
import { Link } from "react-router-dom";

export default function MeusEmpreendimentos() {
  const lista = [
    {
      id: 1,
      nome: "Beach World Residences",
      local: "Armação, Penha - SC",
      entrega: "Novembro 2026",
      unidades: 12,
      imagem: "https://via.placeholder.com/600x400",
      status: "Lançamento",
    },
    {
      id: 2,
      nome: "Costal Bliss",
      local: "Armação, Penha - SC",
      entrega: "Novembro 2026",
      unidades: 12,
      imagem: "https://via.placeholder.com/600x400",
      status: "Lançamento",
    },
    {
      id: 3,
      nome: "Residencial Atlantis",
      local: "Armação, Penha - SC",
      entrega: "Novembro 2026",
      unidades: 12,
      imagem: "https://via.placeholder.com/600x400",
      status: "Lançamento",
    },
    {
      id: 4,
      nome: "Residencial Stella Maris",
      local: "Armação, Penha - SC",
      entrega: "Novembro 2026",
      unidades: 12,
      imagem: "https://via.placeholder.com/600x400",
      status: "Lançamento",
    },
    {
      id: 5,
      nome: "Residencial El Dorado",
      local: "Armação, Penha - SC",
      entrega: "Novembro 2026",
      unidades: 12,
      imagem: "https://via.placeholder.com/600x400",
      status: "Lançamento",
    },
  ];

  return (
    <DashboardLayout>

      {/* CABEÇALHO RESPONSIVO */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Meus Empreendimentos</h1>
          <p className="text-gray-600 mt-1">
            Gerencie todos os seus empreendimentos em um só lugar
          </p>
        </div>

        <Link
          to="/cadastrar-empreendimento"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg"
        >
          + Cadastrar Novo Empreendimento
        </Link>
      </div>

      {/* FILTROS */}
      <div className="bg-white rounded-xl p-6 shadow mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {/* Buscar Empreendimento */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Buscar empreendimento
            </label>
            <Input placeholder="Nome do empreendimento ou cidade..." />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Status
            </label>
            <Select
              options={["Todos os status", "Lançamento", "Em obras", "Concluído"]}
            />
          </div>

          {/* Tipo */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Tipo
            </label>
            <Select
              options={["Todos os tipos", "Residencial", "Comercial", "Misto"]}
            />
          </div>

        </div>
      </div>

      {/* LISTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {lista.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow p-3">
            <img
              src={item.imagem}
              alt={item.nome}
              className="w-full h-40 object-cover rounded-lg"
            />

            <div className="mt-3">
              <h2 className="text-xl font-semibold">{item.nome}</h2>

              <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded">
                {item.status}
              </span>

              <p className="text-gray-600 mt-1">{item.local}</p>
              <p className="text-gray-600 text-sm">Entrega: {item.entrega}</p>
              <p className="text-gray-600 text-sm">{item.unidades} unidades</p>

              <div className="flex gap-3 mt-3">
                <Link
                  to="/detalhes-empreendimento"
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
                >
                  Ver Detalhes
                </Link>

                <button className="border px-3 py-2 rounded-lg text-sm hover:bg-gray-100">
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </DashboardLayout>
  );
}
