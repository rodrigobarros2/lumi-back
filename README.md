# Lumi Impulsionamos os seus negócios, gerenciando a sua energia - Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.x-4169E1?logo=postgresql)

API backend para o sistema de processamento e análise de faturas de energia elétrica da Lumi.

## 🚀 Configuração e Execução

### Pré-requisitos

- Node.js (v16+)
- Docker e Docker Compose (para o banco de dados PostgreSQL)
- npm ou yarn

### Instalação

Clone o repositório:

```bash
# Clone o projeto
git clone https://github.com/rodrigobarros2/lumi-back.git

# Entre no diretório do projeto
cd lumi-back
```

Instale as dependências:

```bash
yarn install
```

### Configuração do Banco de Dados

Inicie o banco de dados PostgreSQL usando Docker:

```bash
# Inicia os containers definidos no docker-compose.yml
docker-compose up -d
```

> **Nota:** Certifique-se de ter o Docker e o Docker Compose instalados em seu sistema. Esta etapa criará e inicializará o container do PostgreSQL necessário para a aplicação.

### Configuração do Prisma ORM

Configure o banco de dados usando o Prisma:

```bash
# Executa as migrações do banco de dados
npx prisma migrate dev

# Gera o cliente Prisma
npx prisma generate
```

> Estas etapas criarão as tabelas necessárias no banco de dados e gerarão o cliente Prisma para interagir com o banco.

### Executando a Aplicação

Inicie o servidor de desenvolvimento:

```bash
yarn dev
```

O backend estará disponível em [http://localhost:3333](http://localhost:3333) (ou a porta configurada no seu arquivo de ambiente).

## Acesso ao banco remoto
![banco-remoto](https://github.com/user-attachments/assets/5d66054e-0e03-4f31-ba4f-25900ecdc0c8)

## 📋 Endpoints da API

A API fornece os seguintes endpoints principais:

- `GET /clients` - Lista todos os clientes
- `GET /clients/:id` - Obtém um cliente específico
- `GET /invoices` - Lista todas as faturas com opções de filtro
- `GET /invoices/:id` - Obtém detalhes de uma fatura específica
- `POST /invoices/upload` - Faz upload e processa uma nova fatura
- `GET /invoices/:id/download` - Obtém o PDF original da fatura
- `GET /dashboard/stats` - Obtém estatísticas para o dashboard

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Prisma](https://www.prisma.io/) (ORM)
- [PostgreSQL](https://www.postgresql.org/) (Banco de Dados)
- [Docker](https://www.docker.com/) (Containerização)

## 🔍 Variáveis de Ambiente

Coloquei dentro do projeto para facilitar a execução

## 🧪 Testes

Execute os testes:

```bash
# Testes unitários
yarn test
```

## 🔧 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila o projeto para produção |
| `npm run start` | Inicia o servidor em modo produção |
| `npm run lint` | Executa a verificação de linting |
| `npm run test` | Executa os testes unitários |

## Inicie o servidor (`yarn dev`)

