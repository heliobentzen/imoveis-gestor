import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Input from "../components/Input";
import Select from "../components/Select";
import api from "../services/api";

export default function MeusEmpreendimentos() {
  const [empreendimentos, setEmpreendimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Carregar dados reais do db.json
  useEffect(() => {
    async function carregar() {
      try {
        const response = await api.get("/imoveis");
        setEmpreendimentos(response.data);
      } catch (error) {
        console.error("Erro ao carregar empreendimentos:", error);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

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
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Buscar empreendimento
            </label>
            <Input placeholder="Nome do empreendimento ou cidade..." />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Status
            </label>
            <Select
              options={["Todos os status", "Lançamento", "Em obras", "Concluído"]}
            />
          </div>

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

      {/* ---- LISTA REAL ---- */}
      {loading ? (
        <p className="text-center mt-10 text-gray-600">Carregando...</p>
      ) : empreendimentos.length === 0 ? (
        <p className="text-center mt-10 text-gray-600">
          Nenhum empreendimento cadastrado.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {empreendimentos.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-3">
              <img
                src="https://via.placeholder.com/600x400"
                alt={item.nome}
                className="w-full h-40 object-cover rounded-lg"
              />

              <div className="mt-3">
                <h2 className="text-xl font-semibold">{item.nome}</h2>

                <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded">
                  {item.statusProjeto || "Sem status"}
                </span>

                <p className="text-gray-600 mt-1">
                  {item.bairro} — {item.cidade} / {item.estado}
                </p>

                <p className="text-gray-600 text-sm">
                  Entrega: {item.dataEntrega || "Não informado"}
                </p>

                <p className="text-gray-600 text-sm">
                  {item.totalUnidades} unidades
                </p>

                <div className="flex gap-3 mt-3">
                  <Link
                    to={`/detalhes-empreendimento/${item.id}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    Ver Detalhes
                  </Link>

                  <Link
                     to={`/editar-empreendimento/${item.id}`}
                     className="border px-3 py-2 rounded-lg text-sm hover:bg-gray-100"
                  >
                    Editar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
