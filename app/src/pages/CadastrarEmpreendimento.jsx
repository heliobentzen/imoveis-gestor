import { useState } from "react";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Select from "../components/Select";
import UploadBox from "../components/UploadBox";
import DashboardLayout from "../layouts/DashboardLayout";
import Section from "../components/Section";
import Grid from "../components/Grid";

export default function CadastrarEmpreendimento() {
  const [formData, setFormData] = useState({
    nome: "",
    tipo: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    descricao: "",
    areasComuns: [],
    totalUnidades: "",
    dataEntrega: "",
    statusProjeto: "",
    padraoUnico: false,
    unidadesVariadas: false,
    metragem: "",
    quartos: "",
    suites: "",
    banheiros: "",
    vagasGaragem: ""
  });

  const handleCheckbox = (label, field = "areasComuns") => {
    const newValues = formData[field].includes(label)
      ? formData[field].filter((a) => a !== label)
      : [...formData[field], label];
    setFormData({ ...formData, [field]: newValues });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/imoveis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("Empreendimento salvo com sucesso!");
        // Resetar formulário
        setFormData({
          nome: "",
          tipo: "",
          rua: "",
          numero: "",
          bairro: "",
          cidade: "",
          estado: "",
          cep: "",
          descricao: "",
          areasComuns: [],
          totalUnidades: "",
          dataEntrega: "",
          statusProjeto: "",
          padraoUnico: false,
          unidadesVariadas: false,
          metragem: "",
          quartos: "",
          suites: "",
          banheiros: "",
          vagasGaragem: ""
        });
      } else {
        alert("Erro ao salvar empreendimento.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar empreendimento.");
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-xl p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">
          Cadastrar Novo Empreendimento
        </h1>
        <p className="text-gray-600 mt-1">
          Preencha as informações do empreendimento que serão reutilizadas no cadastro das unidades.
        </p>

        {/* Identificação */}
        <Section title="Identificação">
          <Grid cols={2}>
            <Input
              label="Nome do Empreendimento"
              placeholder="Ex: Beach World Residence"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
            <Select
              label="Tipo de Empreendimento"
              options={["Residencial", "Comercial", "Misto"]}
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
            />
          </Grid>
        </Section>

        {/* Endereço */}
        <Section title="Endereço">
          <Grid cols={2}>
            <Input
              label="Rua"
              value={formData.rua}
              onChange={(e) => setFormData({ ...formData, rua: e.target.value })}
            />
            <Input
              label="Número"
              value={formData.numero}
              onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
            />
          </Grid>
          <Grid cols={2}>
            <Input
              label="Bairro"
              value={formData.bairro}
              onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
            />
            <Input
              label="Cidade"
              value={formData.cidade}
              onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
            />
          </Grid>
          <Grid cols={2}>
            <Input
              label="Estado"
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            />
            <Input
              label="CEP"
              value={formData.cep}
              onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
            />
          </Grid>
        </Section>

        {/* Informações do Projeto */}
        <Section title="Informações do Projeto">
          <textarea
            className="border border-gray-300 rounded-lg w-full p-3 h-24 mt-3"
            placeholder="Breve descrição institucional"
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          ></textarea>
        </Section>

        {/* Áreas Comuns */}
        <Section title="Áreas Comuns">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {["Não se aplica","Piscina","Academia","Playground","Coworking","Lavanderia"].map((label) => (
              <Checkbox
                key={label}
                label={label}
                checked={formData.areasComuns.includes(label)}
                onChange={() => handleCheckbox(label)}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <Input
              label="Número Total de Unidades"
              value={formData.totalUnidades}
              onChange={(e) => setFormData({ ...formData, totalUnidades: e.target.value })}
            />
            <Input
              label="Data Estimada de Entrega"
              type="date"
              value={formData.dataEntrega}
              onChange={(e) => setFormData({ ...formData, dataEntrega: e.target.value })}
            />
            <Select
              label="Status do Projeto"
              options={["Lançamento","Em obras","Concluído"]}
              value={formData.statusProjeto}
              onChange={(e) => setFormData({ ...formData, statusProjeto: e.target.value })}
            />
          </div>
        </Section>

        {/* Detalhamento das Unidades */}
        <Section title="Detalhamento das Unidades">
          <div className="flex flex-col sm:flex-row gap-6 mb-4">
            <Checkbox
              label="Padrão único"
              checked={formData.padraoUnico}
              onChange={() => setFormData({ ...formData, padraoUnico: !formData.padraoUnico })}
            />
            <Checkbox
              label="Unidades variadas"
              checked={formData.unidadesVariadas}
              onChange={() => setFormData({ ...formData, unidadesVariadas: !formData.unidadesVariadas })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input
              label="Metragem"
              value={formData.metragem}
              onChange={(e) => setFormData({ ...formData, metragem: e.target.value })}
            />
            <Input
              label="Nº de Quartos"
              value={formData.quartos}
              onChange={(e) => setFormData({ ...formData, quartos: e.target.value })}
            />
            <Input
              label="Nº de Suítes"
              value={formData.suites}
              onChange={(e) => setFormData({ ...formData, suites: e.target.value })}
            />
            <Input
              label="Nº de Banheiros"
              value={formData.banheiros}
              onChange={(e) => setFormData({ ...formData, banheiros: e.target.value })}
            />
            <Input
              label="Nº de Vagas de Garagem"
              value={formData.vagasGaragem}
              onChange={(e) => setFormData({ ...formData, vagasGaragem: e.target.value })}
            />
          </div>
        </Section>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">
          <button
            className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={() =>
              setFormData({
                nome: "",
                tipo: "",
                rua: "",
                numero: "",
                bairro: "",
                cidade: "",
                estado: "",
                cep: "",
                descricao: "",
                areasComuns: [],
                totalUnidades: "",
                dataEntrega: "",
                statusProjeto: "",
                padraoUnico: false,
                unidadesVariadas: false,
                metragem: "",
                quartos: "",
                suites: "",
                banheiros: "",
                vagasGaragem: ""
              })
            }
          >
            Cancelar
          </button>
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={handleSubmit}
          >
            Salvar Empreendimento
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
