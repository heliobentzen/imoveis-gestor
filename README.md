# Imóveis Gestor

Sistema completo de gestão de empreendimentos imobiliários com geração de links personalizados para corretores e dashboard de relatórios para gestores.

## 🎯 Funcionalidades

### Para Corretores
- ✅ Gerar links personalizados de empreendimentos com assinatura (nome + foto)
- ✅ Compartilhar via WhatsApp com um clique
- ✅ Acompanhar visualizações e leads capturados
- ✅ Dashboard com estatísticas pessoais

### Para Clientes (Landing Pages)
- ✅ Páginas responsivas com informações completas do empreendimento
- ✅ Formulário de cadastro integrado
- ✅ Visualização da assinatura do corretor
- ✅ Contato direto via WhatsApp

### Para Gestores
- ✅ Relatórios completos de leads
- ✅ Performance da equipe de corretores
- ✅ Filtros por status de lead
- ✅ Exportação de dados em CSV
- ✅ Taxa de conversão e métricas

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização responsiva
- **SQLite** (better-sqlite3) - Banco de dados
- **React Hook Form** - Gerenciamento de formulários

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 🎨 Páginas

- **/** - Página inicial com links para dashboards
- **/corretor** - Dashboard do corretor
- **/gestor** - Dashboard do gestor
- **/imovel/[token]** - Landing page pública do empreendimento

## 📊 Estrutura do Banco de Dados

- **users** - Corretores e gestores
- **properties** - Empreendimentos imobiliários
- **personalized_links** - Links personalizados gerados
- **leads** - Leads capturados dos formulários

## 🔧 Configuração

O sistema já vem com dados de exemplo:
- 2 corretores de demonstração
- 1 gestor de demonstração
- 3 empreendimentos de exemplo

O banco de dados SQLite é criado automaticamente no primeiro acesso.

## 📱 Responsividade

O sistema é 100% responsivo e funciona perfeitamente em:
- 📱 Celulares
- 📱 Tablets
- 💻 Desktop

## 🔐 Segurança

- Validação de formulários
- Sanitização de inputs
- Foreign keys habilitadas no SQLite

## 📄 Licença

ISC
