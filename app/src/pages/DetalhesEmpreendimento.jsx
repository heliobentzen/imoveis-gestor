import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import InfoItem from "../components/InfoItem";
import StatBar from "../components/StatBar";
import Section from "../components/Section";
import Grid from "../components/Grid";

export default function DetalhesEmpreendimento() {
  const agora = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-gray-100">
      
      <Navbar />

      <div className="max-w-6xl mx-auto bg-white p-6 md:p-10 mt-6 md:mt-10 rounded-xl shadow">

        {/* --- Header --- */}
        <PageHeader
          title="Beach World Residences"
          subtitle="Empreendimento residencial de alto padrão"
          actions={
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <button className="text-blue-600 hover:underline">
                Editar Empreendimento
              </button>

              <Link
                to="/cadastrar-empreendimento"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center"
              >
                + Cadastrar Unidade
              </Link>

              <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
                Gerar PDF
              </button>
            </div>
          }
        />

        {/* --- Informações Gerais --- */}
        <Section title="Informações Gerais">
          <Grid cols={2}>
            <InfoItem label="Tipo de Empreendimento" value="Residencial" />
            <InfoItem label="Construtora / Incorporadora" value="Hogrefe Construtora" />
            <InfoItem label="Endereço" value="R. Dr. Paulo Mayerle, 237 — Armação, Penha - SC" />
            <InfoItem label="Previsão de Entrega" value="Novembro 2026" />
            <InfoItem label="Total de Unidades" value="12 unidades" />
            <InfoItem label="Unidades Cadastradas" value="8 unidades (66%)" />
          </Grid>

          <p className="mt-4 text-gray-700 leading-relaxed">
            Empreendimento residencial de alto padrão localizado na melhor região de Armação.
            Com vista para o mar e acabamentos de primeira qualidade, oferece o melhor em conforto
            e sofisticação para toda a família.
          </p>
        </Section>

        {/* --- Documentos e Mídias --- */}
        <Section title="Documentos e Mídias">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Imagem Principal */}
            <div>
              <p className="font-semibold mb-2">Imagem Principal</p>
              <div className="w-full h-40 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Galeria */}
            <div>
              <p className="font-semibold mb-2">Galeria de Imagens</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Documentos */}
            <div>
              <p className="font-semibold mb-2">Documentos</p>
              <ul className="text-blue-600 text-sm space-y-1">
                <li className="hover:underline cursor-pointer">• Memorial Descritivo.pdf</li>
                <li className="hover:underline cursor-pointer">• Planta Técnica.pdf</li>
                <li className="hover:underline cursor-pointer">• Planta Baixa.pdf</li>
              </ul>

              <div className="flex justify-start md:justify-end">
                <Link
                  to="/modelos-de-landing-pages"
                  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg block"
                >
                  Gerar landing page
                </Link>
              </div>
            </div>

          </div>
        </Section>

        {/* --- Áreas Comuns --- */}
        <Section title="Áreas Comuns">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-sm">
            <div>Piscina</div>
            <div>Academia</div>
            <div>Sala de Festas</div>
            <div>Brinquedoteca</div>
            <div>Garagem</div>
            <div>Wi-Fi</div>
          </div>
        </Section>

        {/* --- Unidades --- */}
        <Section title="Unidades Habitacionais">
          <div className="space-y-3 mt-4">

            {[
              { numero: "101", status: "Disponível", cor: "text-green-600" },
              { numero: "102", status: "Reservado", cor: "text-yellow-600" },
              { numero: "201", status: "Vendido", cor: "text-red-600" },
            ].map((u, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg gap-2">
                <p className="font-semibold">{u.numero} — Apartamento {u.numero} (Torre A)</p>
                <span className={u.cor}>{u.status}</span>
                <button className="text-blue-600 hover:underline text-sm">
                  Ver detalhes
                </button>
              </div>
            ))}

          </div>
        </Section>

        {/* --- Estatísticas --- */}
        <Section title="Estatísticas">
          <div className="space-y-3">
            <StatBar label="Unidades Cadastradas" percentage={66} color="#3b82f6" />
            <StatBar label="Unidades Vendidas" percentage={33} color="#22c55e" />
            <StatBar label="Unidades Reservadas" percentage={15} color="#facc15" />

            <p className="text-xs text-gray-500 mt-2">
              Última atualização: {agora}
            </p>
          </div>
        </Section>

      </div>
    </div>
  );
}
