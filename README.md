<h1>Documentação BackEnd</h1>

<h2>🧾 Descrição da API – Controle de Estoque</h2>

<span>
  A API de Controle de Estoque foi desenvolvida para gerenciar produtos, entradas, saídas e níveis de estoque de forma eficiente e automatizada.
Ela permite o cadastro, atualização e consulta de produtos, fornecedores e movimentações de inventário, oferecendo uma visão completa e em tempo real dos recursos disponíveis.
</span>

<h3>⚙️ Principais Funcionalidades</h3>
<ul>
  <li><u>Gerenciamento de produtos:</u> criação, listagem, edição e exclusão.</li>
  <li><u>Controle de movimentações:</u> registro de entradas e saídas de estoque.</li>
  <li><u>Integração com sistemas externos:</u> endpoints REST padronizados e prontos para integração.</li>
  <li><u>Histórico e relatórios:</u> acompanhamento detalhado de todas as operações realizadas.</li>
</ul>

<h3>🧩 Tecnologias Utilizadas</h3>
<ul>
  <li><u>Node.js / Express</u> – estrutura principal da API</li>

  <li><u>TypeScript</u> – tipagem estática e código mais seguro</li>

  <li><u>PostgreSQL / Prisma ORM</u> – persistência e modelagem de dados</li>

  <li><u>ZOD</u> – validação de dados de entrada</li>

  <li><u>bcrypt</u> – criptografia de senhas</li>

  <li><u>JWT</u> – autenticação baseada em tokens</li>

  <li><u>Swagger / OpenAPI</u> – documentação dos endpoints</li>
</ul>

<h3>🚀 Objetivo</h3>
<p>Proporcionar um sistema confiável e escalável para organizar, rastrear e otimizar o controle de estoque, reduzindo erros manuais e garantindo maior eficiência operacional.</p>

<h2>🗺️ Mapa do Projeto</h2>
<p>Abaixo segue a estrutura de pastas e suas definições:</p>

```bash
📦 src
 ┣ 📂 controllers            // Controladores responsáveis pelas rotas e regras de negócio
 ┃ ┣ 📜 auth-controller.ts   // Controle de autenticação e login
 ┃ ┣ 📜 category-controller.ts // Controle de categorias de produtos
 ┃ ┣ 📜 product-controller.ts  // Controle de produtos
 ┃ ┣ 📜 sale-controller.ts     // Controle de vendas
 ┃ ┗ 📜 stock-controller.ts    // Controle de estoque
 ┃ ┗ 📜 user-controller.ts     // Controle de usuários

 ┣ 📂 middlewares            // Middlewares de autenticação e validação
 ┃ ┣ 📜 auth-middleware.ts
 ┃ ┗ 📜 validate-request.ts

 ┣ 📂 prisma                 // Configuração do ORM Prisma
 ┃ ┣ 📜 schema.prisma        // Definição do schema do banco de dados
 ┃ ┗ 📂 migrations           // Migrações geradas pelo Prisma

 ┣ 📂 repository             // Camada de repositórios com acesso direto ao banco
 ┣ 📂 services               // Serviços que centralizam a lógica de negócio
 ┣ 📂 types                  // Definições de tipos e interfaces TypeScript
 ┣ 📂 validations            // Schemas e validações de dados com Zod

 ┗ 📜 index.ts               // Ponto de entrada principal da aplicação

```

```bash
  📜 .env                      // Variáveis de ambiente do projeto
  📜 .gitignore                // Configuração de arquivos ignorados pelo Git
  📜 Dockerfile                // Configuração do container Docker
  📜 docker-compose.yml        // Orquestração de containers (API + DB)
  📜 package.json              // Dependências e scripts do projeto
  📜 tsconfig.json             // Configuração do TypeScript
  📜 README.md                 // Documentação do projeto

```

<h1>Rodar o BackEnd</h1>
<p>Instruções para Rodar o BackEnd</p>
<h2>Instalar Bibliotecas</h2>

```bash
  $ npm install
```

<h2>Criar Arquivo .env</h2>

```bash
  DATABASE_URL="postgresql://admin:QWERTY123@localhost:5432/controle?schema=public"
  PORT=3000
```

<h2>Criar Container no Docker</h2>

```bash
  docker compose up
```

<h2>Gerar Tabelas</h2>

```bash
  npx prisma migrate dev
```

<h2>Iniciar API</h2>

```bash
  npm start
```
