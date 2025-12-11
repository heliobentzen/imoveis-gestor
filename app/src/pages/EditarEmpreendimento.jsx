import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Select from "../components/Select";
import DashboardLayout from "../layouts/DashboardLayout";
import Section from "../components/Section";
import Grid from "../components/Grid";
import api from "../services/api";

export default function EditarEmpreendimento() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  // 🔹 Carregar dados do empreendimento
  useEffect(() => {
    async function carregar() {
      try {
        const response = await api.get(`/imoveis/${id}`);
        setForm(response.data);
      } catch (error) {
        console.error("Erro ao carregar empreendimento:", error);
      }
    }

    carregar();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleCheckbox(e) {
    const { name, checked } = e.target;
    setForm({ ...form, [name]: checked });
  }

  function toggleArea(area) {
    setForm((prev) => {
      const jaTem = prev.areasComuns.includes(area);
      return {
        ...prev,
        areasComuns: jaTem
          ? prev.areasComuns.filter((a) => a !== area)
          : [...prev.areasComuns, area],
      };
    });
  }

  async function salvarEdicao() {
    try {
      await api.put(`/imoveis/${id}`, form);

      alert("Empreendimento atualizado com sucesso!");
      navigate("/meus-empreendimentos");

    } catch (error) {
      alert("Erro ao atualizar empreendimento.");
      console.error(error);
    }
  }

  if (!form) return <p className="text-center mt-10">Carregando dados...</p>;

  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-xl p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">
          Editar Empreendimento
        </h1>
        <p className="text-gray-600 mt-1">
          Atualize as informações do empreendimento.
        </p>

        {/* IDENTIFICAÇÃO */}
        <Section title="Identificação">
          <Grid cols={2}>
            <Input
              label="Nome do Empreendimento"
              name="nome"
              value={form.nome}
              onChange={handleChange}
            />

            <Select
              label="Tipo de Empreendimento"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              options={["Residencial", "Comercial", "Misto"]}
            />
          </Grid>
        </Section>

        {/* ENDEREÇO */}
        <Section title="Endereço">
          <Grid cols={2}>
            <Input label="Rua" name="rua" value={form.rua} onChange={handleChange} />
            <Input label="Número" name="numero" value={form.numero} onChange={handleChange} />
          </Grid>

          <Grid cols={2}>
            <Input label="Bairro" name="bairro" value={form.bairro} onChange={handleChange} />
            <Input label="Cidade" name="cidade" value={form.cidade} onChange={handleChange} />
          </Grid>

          <Grid cols={2}>
            <Input label="Estado" name="estado" value={form.estado} onChange={handleChange} />
            <Input label="CEP" name="cep" value={form.cep} onChange={handleChange} />
          </Grid>
        </Section>

        {/* DESCRIÇÃO */}
        <Section title="Informações do Projeto">
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg w-full p-3 h-24 mt-3"
          />
        </Section>

        {/* ÁREAS COMUNS */}
        <Section title="Áreas Comuns">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {["Piscina", "Academia", "Playground", "Coworking", "Lavanderia"].map((area) => (
              <Checkbox
                key={area}
                label={area}
                checked={form.areasComuns.includes(area)}
                onChange={() => toggleArea(area)}
              />
            ))}
          </div>

          <Grid cols={3}>
            <Input
              label="Número Total de Unidades"
              name="totalUnidades"
              value={form.totalUnidades}
              onChange={handleChange}
            />

            <Input
              label="Data Estimada de Entrega"
              type="date"
              name="dataEntrega"
              value={form.dataEntrega}
              onChange={handleChange}
            />

            <Select
              label="Status do Projeto"
              name="statusProjeto"
              value={form.statusProjeto}
              onChange={handleChange}
              options={["Lançamento", "Em obras", "Concluído"]}
            />
          </Grid>
        </Section>

        {/* UNIDADES */}
        <Section title="Detalhamento das Unidades">
          <div className="flex gap-6 mb-4">
            <Checkbox
              label="Padrão único"
              name="padraoUnico"
              checked={form.padraoUnico}
              onChange={handleCheckbox}
            />

            <Checkbox
              label="Unidades variadas"
              name="unidadesVariadas"
              checked={form.unidadesVariadas}
              onChange={handleCheckbox}
            />
          </div>

          <Grid cols={3}>
            <Input label="Metragem" name="metragem" value={form.metragem} onChange={handleChange} />
            <Input label="Nº de Quartos" name="quartos" value={form.quartos} onChange={handleChange} />
            <Input label="Nº de Suítes" name="suites" value={form.suites} onChange={handleChange} />
            <Input label="Nº de Banheiros" name="banheiros" value={form.banheiros} onChange={handleChange} />
            <Input label="Nº de Vagas de Garagem" name="vagasGaragem" value={form.vagasGaragem} onChange={handleChange} />
          </Grid>
        </Section>

        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={() => navigate("/meus-empreendimentos")}
            className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>

          <button
            onClick={salvarEdicao}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
