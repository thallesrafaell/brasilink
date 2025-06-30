# Brasilink - SaaS de Agendamento para Profissionais

Sistema de agendamento online para profissionais brasileiros no exterior, permitindo gerenciar serviços, disponibilidade e receber pagamentos de forma integrada.

## 📋 Visão Geral

O Brasilink é uma plataforma SaaS desenvolvida para permitir que profissionais autônomos, especialmente brasileiros no exterior, possam gerenciar seus agendamentos, serviços e pagamentos de forma simples e eficiente. A plataforma oferece uma página personalizada para cada profissional, onde seus clientes podem visualizar serviços e agendar horários de acordo com a disponibilidade.

## 🚀 Tecnologias

- **Frontend**: Next.js 15, React 19, TailwindCSS 4, shadcn/ui
- **Backend**: Next.js API Routes, Supabase
- **Autenticação**: Supabase Auth
- **Banco de Dados**: PostgreSQL (via Supabase)
- **Estilização**: Tailwind CSS, tw-animate-css
- **UI/UX**: Pacotes Radix UI, Responsive Design
- **Formulários**: React Hook Form, Zod
- **Temas**: Suporte a Temas Claro/Escuro

## 🎯 Status de Implementação

### MVP - Produto Mínimo Viável

#### Cadastro e Configuração do Profissional

- ✅ Registro do Profissional
- ✅ Criação de Perfil Básico
- 🔄 Configuração de Serviços
- 🔄 Configuração de Disponibilidade (Calendário)

#### Página Pública do Profissional

- 🔄 URL Única/Subdomínio
- 🔄 Exibição de Serviços
- 🔄 Seleção de Data e Hora
- 🔄 Formulário de Dados do Cliente

#### Sistema de Notificações Básicas

- 🔄 E-mail de Confirmação de Agendamento
- 🔄 E-mail de Notificação de Novo Agendamento

#### Painel de Controle do Profissional

- ✅ Dashboard básico
- 🔄 Lista de Agendamentos
- 🔄 Detalhes do Agendamento
- 🔄 Ações no Agendamento

#### Sistema de Pagamento

- 🔄 Integração com Gateway de Pagamento
- 🔄 Opção de Pagamento Online
- 🔄 Registro Básico da Transação

#### Painel de Administração

- 🔄 Gerenciamento de Usuários
- 🔄 Status de Assinatura
- 🔄 Relatório Básico de Transações

### Próximas Fases - Melhorias e Expansão

#### Fase 2

- **Melhorias no Perfil do Profissional**: portfólio/galeria, múltiplas moedas, localização detalhada
- **Experiência do Cliente Aprimorada**: reagendamento/cancelamento, SMS, chat, avaliações
- **Funcionalidades de Gestão**: gestão de clientes, relatórios financeiros, integração com calendários externos
- **Modelo de Assinatura**: múltiplos planos, automatização de pagamentos, emissão de notas fiscais

#### Fase 3

- **Recursos de Marketing**: SEO, integração com redes sociais, e-mail marketing
- **Escalabilidade e Performance**: otimização de banco de dados, cache e CDN
- **Suporte e Ajuda**: base de conhecimento, suporte multi-idioma

## 🛠️ Configuração de Desenvolvimento

### Pré-requisitos

- Node.js (versão 20 ou superior)
- Conta no Supabase
- Variáveis de ambiente configuradas

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/username/brasilink.git
cd brasilink
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env.local` na raiz do projeto e adicione:

```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Acesse a aplicação em `http://localhost:3000`

## 📦 Estrutura do Projeto

```
src/
  app/                # Estrutura de páginas do Next.js App Router
    (private)/        # Rotas privadas (Dashboard, Serviços, Configurações)
    actions/          # Server Actions
    auth/             # Autenticação
  components/         # Componentes reutilizáveis
    ui/               # Componentes UI básicos (shadcn)
  lib/                # Funções utilitárias e configurações
    supabase/         # Clientes e helpers do Supabase
  hooks/              # React Hooks personalizados
```

## 🧪 Testes

```bash
# Executar testes unitários (a ser implementado)
npm test

# Executar testes e2e (a ser implementado)
npm run test:e2e
```

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

## 🚀 Deploy

O projeto pode ser facilmente implantado na Vercel, que é otimizada para aplicações Next.js:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/username/brasilink)

---

Desenvolvido com 💙 para profissionais brasileiros no mundo todo.
