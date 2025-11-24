import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Select from "../components/Select";
import UploadBox from "../components/UploadBox";
import DashboardLayout from "../layouts/DashboardLayout";
import Section from "../components/Section";
import Grid from "../components/Grid";

export default function CadastrarEmpreendimento() {
  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-xl p-8 max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold text-gray-800">Cadastrar Novo Empreendimento</h1>
        <p className="text-gray-600 mt-1">
          Preencha as informações do empreendimento que serão reutilizadas no cadastro das unidades.
        </p>

        {/* Identificação */}
        <Section title="Identificação">
          <Grid cols={2}>
            <Input label="Nome do Empreendimento" placeholder="Ex: Beach World Residence" />
            <Select
              label="Tipo de Empreendimento"
              options={["Residencial", "Comercial", "Misto"]}
            />
          </Grid>
        </Section>

        {/* Endereço */}
        <Section title="Endereço">
          <Grid cols={2}>
            <Input label="Rua" />
            <Input label="Número" />
          </Grid>

          <Grid cols={2}>
            <Input label="Bairro" />
            <Input label="Cidade" />
          </Grid>

          <Grid cols={2}>
            <Input label="Estado" />
            <Input label="CEP" />
          </Grid>
        </Section>

        {/* Informações do Projeto */}
        <Section title="Informações do Projeto">
          <textarea
            className="border border-gray-300 rounded-lg w-full p-3 h-24 mt-3"
            placeholder="Breve descrição institucional"
          ></textarea>
        </Section>

        {/* Áreas Comuns */}
        <Section title="Áreas Comuns">

          {/* Lista de opções */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <Checkbox label="Não se aplica" />
            <Checkbox label="Piscina" />
            <Checkbox label="Academia" />
            <Checkbox label="Playground" />
            <Checkbox label="Coworking" />
            <Checkbox label="Lavanderia" />
          </div>

          {/* Linha com 3 campos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <Input label="Número Total de Unidades" />
            <Input label="Data Estimada de Entrega" type="date" />
            <Select
              label="Status do Projeto"
              options={["Lançamento", "Em obras", "Concluído"]}
            />
          </div>
        </Section>

        {/* Detalhamento das Unidades */}
        <Section title="Detalhamento das Unidades">

          <div className="flex flex-col sm:flex-row gap-6 mb-4">
            <Checkbox label="Padrão único" />
            <Checkbox label="Unidades variadas" />
          </div>

          {/* Linha com vários campos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input label="Metragem" />
            <Input label="Nº de Quartos" />
            <Input label="Nº de Suítes" />
            <Input label="Nº de Banheiros" />
            <Input label="Nº de Vagas de Garagem" />
          </div>
        </Section>

        {/* Documentos */}
        <Section title="Documentos">
          <Grid cols={2}>
            <UploadBox label="Clique para enviar imagem" />
            <UploadBox label="Clique para enviar PDF" />
          </Grid>
        </Section>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">
          <button className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400">
            Cancelar
          </button>

          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Salvar Empreendimento
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
