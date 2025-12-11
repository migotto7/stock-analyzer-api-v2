# Stock Analyzer API

## Descrição
A **Stock Analyzer API** é uma aplicação desenvolvida em TypeScript que fornece informações detalhadas sobre ações, incluindo dados históricos, métricas de mercado e sugestões de ações. A API é construída com Express e utiliza Drizzle ORM para interagir com o banco de dados PostgreSQL.

## Funcionalidades
- **Autenticação JWT**: Protege rotas sensíveis com autenticação baseada em tokens.
- **Gerenciamento de Favoritos**: Permite que usuários salvem ações favoritas.
- **Consulta de Ações**: Fornece dados detalhados de ações, incluindo preços históricos e métricas de mercado.
- **Sugestões de Ações**: Retorna sugestões de ações com base em consultas específicas.

## Tecnologias Utilizadas
- **Node.js**
- **TypeScript**
- **Express**
- **Drizzle ORM**
- **PostgreSQL**
- **Zod** (validação de schemas)
- **JWT** (autenticação)

## Estrutura do Projeto
```
src/
├── app.ts                # Configuração principal do Express
├── server.ts             # Inicialização do servidor
├── controllers/          # Lógica das rotas
├── database/             # Configuração e schema do banco de dados
├── routes/               # Definição das rotas
├── schemas/              # Validação de dados com Zod
├── services/             # Lógica de negócios
├── utils/                # Funções utilitárias
```

## Endpoints

### Autenticação
#### `POST /auth/signin`
- **Descrição**: Realiza login e retorna um token JWT.
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Resposta**:
  ```json
  {
    "token": "<jwt-token>"
  }
  ```

### Favoritos
#### `GET /favorites/:userId`
- **Descrição**: Retorna as ações favoritas de um usuário.
- **Headers**:
  - `Authorization: Bearer <token>`

#### `POST /favorites`
- **Descrição**: Adiciona uma ação aos favoritos do usuário.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "userId": "<user-id>",
    "ticker": "AAPL"
  }
  ```

### Ações
#### `GET /stocks/:ticker`
- **Descrição**: Retorna informações detalhadas sobre uma ação específica.

#### `GET /stocks/search/:query`
- **Descrição**: Retorna sugestões de ações com base em uma consulta.

#### `GET /stocks/search/top`
- **Descrição**: Retorna as 10 ações mais negociadas.

## Configuração
### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
DATABASE_URL=postgres://user:password@host:5432/dbname
JWT_SECRET=your_jwt_secret
BRAPI_KEY=your_brapi_key
PORT=3333
```

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/migotto7/stock-analyzer-api-v2.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o banco de dados e rode as migrations:
   ```bash
   npm run db:migrate
   ```
4. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Testes
Execute os testes com o comando:
```bash
npm test
```

## Licença
Este projeto está licenciado sob a licença ISC.