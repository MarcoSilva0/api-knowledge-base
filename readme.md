# Projeto Backend

## Descrição

Este é o backend da aplicação Knowledge Base, uma API construída com Express para gerenciar conhecimentos. O projeto utiliza um banco de dados PostgreSQL e inclui a documentação da API com Swagger.

## Dependências

Abaixo estão as principais dependências utilizadas no projeto e suas versões:

- **bcrypt-nodejs:** 0.0.3
- **body-parser:** 1.18.3
- **consign:** 0.1.6
- **cors:** 2.8.4
- **express:** 4.16.3
- **jwt-simple:** 0.5.1
- **knex:** 0.15.2
- **moment:** 2.22.2
- **mongoose:** ^8.0.4
- **node-schedule:** 1.3.0
- **passport:** 0.4.0
- **passport-jwt:** 4.0.0
- **pg:** ^8.0.3
- **pm2:** 3.0.4
- **swagger-jsdoc:** ^6.2.8
- **swagger-ui-express:** ^5.0.0

## Instalação

Para executar o projeto localmente, siga os passos abaixo:

1. Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/backend.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd backend
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Configure os bancos de dados PostgreSQL e MongoDB usando Docker:

    ```bash
    docker-compose up -d
    ```

5. Crie o arquivo de ambiente:

    ```bash
    cp env_file .env
    ```

    Abra o arquivo `.env` e ajuste as variáveis conforme necessário.

6. Execute as migrações do banco de dados:

    ```bash
    npx knex migrate:latest
    ```

7. Inicie o servidor:

    ```bash
    npm start
    ```

## Scripts

- `npm start`: Inicia o servidor usando nodemon.
- `npm run production`: Inicia o servidor em modo de produção usando PM2.

## Erros Comuns e Soluções

### Erro: "knex não é um comando reconhecido"

Solução: Instale o knex globalmente.

Comando:

```bash
npm i -g knex
```

---

### Erro: "knex init: No such file or directory"

Solução: Navegue até a pasta do projeto > `versao-inicial` > `backend` > `node_modules` > `knex` > `lib`.

Crie uma nova pasta chamada `migrations` e mova a pasta `migrate` para dentro dela.

---

### Erro: "Knex migrate:make create_table_users: Cannot find module '../migrate'"

Solução: Acesse a pasta `node_modules` (versao-inicial/backend/node_modules), encontre a pasta `knex/lib/util` e abra o arquivo `make-knex.js`.

Localize a linha referente ao `migrate: var _migrate` e corrija para `var _migrate = require('../migrations/migrate');`.

Execute o comando (create_table_users) novamente.

---

### Configuração do Banco de Dados

Utilize Docker para subir um banco de dados PostgreSQL e MongoDB:

```bash
docker-compose up -d
```

---

### Clonar o Arquivo env_file

Clone o arquivo `env_file` base e renomeie para `.env`:

```bash
cp env_file .env
```

Abra o arquivo `.env` e ajuste as variáveis conforme necessário.

---

## Funcionalidades e Rotas

### Articles

API endpoints para gerenciamento de artigos.

#### Listar Todos os Artigos

```http
GET /articles
```

- **Descrição**: Retorna uma lista de todos os artigos com informações de paginação.
- **Parâmetros Query**:
  - `page` (Opcional): Número da página para paginação.
- **Respostas**:
  - `200 OK`: Lista de artigos com informações de paginação.
  - `500 Internal Server Error`: Erro no servidor.

#### Criar um Novo Artigo

```http
POST /articles
```

- **Descrição**: Cria um novo artigo.
- **Corpo da Requisição**:
  - Objeto de artigo conforme especificado no esquema.
- **Respostas**:
  - `204 No Content`: Artigo criado com sucesso.
  - `400 Bad Request`: Dados de entrada inválidos.
  - `500 Internal Server Error`: Erro no servidor.

#### Obter um Artigo por ID

```http
GET /articles/{id}
```

- **Descrição**: Obtém um artigo com base no ID.
- **Parâmetros Path**:
  - `id`: ID do artigo.
- **Respostas**:
  - `200 OK`: Artigo solicitado.
  - `404 Not Found`: Artigo não encontrado.
  - `500 Internal Server Error`: Erro no servidor.

#### Atualizar um Artigo por ID

```http
PUT /articles/{id}
```

- **Descrição**: Atualiza um artigo com base no ID.
- **Parâmetros Path**:
  - `id`: ID do artigo.
- **Corpo da Requisição**:
  - Objeto de artigo conforme especificado no esquema.
- **Respostas**:
  - `204 No Content`: Artigo atualizado com sucesso.
  - `400 Bad Request`: Dados de entrada inválidos.
  - `404 Not Found`: Artigo não encontrado.
  - `500 Internal Server Error`: Erro no servidor.

#### Excluir um Artigo por ID

```http
DELETE /articles/{id}
```

- **Descrição**: Exclui um artigo com base no ID.
- **Parâmetros Path**:
  - `id`: ID do artigo.
- **Respostas**:
  - `204 No Content`: Artigo excluído com sucesso.
  - `400 Bad Request`: Dados de entrada inválidos.
  - `404 Not Found`: Artigo não encontrado.
  - `500 Internal Server Error`: Erro no servidor.

#### Obter Artigos por Categoria

```http
GET /articles/category/{id}
```

- **Descrição**: Obtém uma lista de artigos com base na categoria e informações de paginação.
- **Parâmetros Path**:
  - `id`: ID da categoria.
- **Parâmetros Query**:
  - `page` (Opcional): Número da página para paginação.
- **Respostas**:
  - `200 OK`: Lista de artigos dentro da categoria com informações de paginação.
  - `500 Internal Server Error`: Erro no servidor.

### Authentication

API endpoints para autenticação de usuários.

#### Login

```http
POST /signin
```

- **Descrição**: Faz login para obter um token de autenticação.
- **Corpo da Requisição**:
  - Objeto de requisição de login conforme especificado no esquema.
- **Respostas**:
  - `200 OK`: Login bem-sucedido, retorna o token de autenticação.
  - `400 Bad Request`: Dados de entrada inválidos.
  - `401 Unauthorized`: Email/senha inválidos.

#### Validar Token

```http
POST /validateToken
```

- **Descrição**: Valida um token de autenticação.
- **Corpo da Requisição**:
  - Objeto de requisição com o token a ser validado.
- **Respostas**:
  - `200 OK`: Token é válido.
  - `400 Bad Request`: Token é inválido ou expirou.
  - `500 Internal Server Error`: Erro no servidor.

### Stats

API endpoints para gerenciamento de estatísticas.

#### Obter Estatísticas

```http
GET /stats
```

- **Descrição**: Obtém as estatísticas mais recentes.
- **Respostas**:
  - `200 OK`: Estatísticas mais recentes.
  - `404 Not Found`: Estatísticas não encontradas.
  - `500 Internal Server Error`: Erro no servidor.
```

### Users

API endpoints para gerenciamento de usuários.

#### Listar Todos os Usuários

```http
GET /users
```

- **Descrição**: Retorna uma lista de todos os usuários.
- **Respostas**:
  - `200 OK`: Lista de usuários.
  - `500 Internal Server Error`: Erro no servidor.

#### Criar um Novo Usuário

```http
POST /users
```

- **Descrição**: Cria um novo usuário.
- **Corpo da Requisição**:
  - Objeto de usuário conforme especificado no esquema.
- **Respostas**:
  - `201 Created`: Usuário criado com sucesso.
  - `400 Bad Request`: Dados de entrada inválidos.
  - `500 Internal Server Error`: Erro no servidor.

#### Obter um Usuário por ID

```http
GET /users/{id}
```

- **Descrição**: Obtém um usuário com base no ID.
- **Parâmetros Path**:
  - `id`: ID do usuário.
- **Respostas**:
  - `200 OK`: Usuário solicitado.
  - `404 Not Found`: Usuário não encontrado.
  - `500 Internal Server Error`: Erro no servidor.

#### Atualizar um Usuário por ID

```http
PUT /users/{id}
```

- **Descrição**: Atualiza um usuário com base no ID.
- **Parâmetros Path**:
  - `id`: ID do usuário.
- **Corpo da Requisição**:
  - Objeto de usuário conforme especificado no esquema.
- **Respostas**:
  - `200 OK`: Usuário atualizado com sucesso.
  - `500 Internal Server Error`: Erro no servidor.

#### Excluir um Usuário por ID

```http
DELETE /users/{id}
```

- **Descrição**: Exclui um usuário com base no ID.
- **Parâmetros Path**:
  - `id`: ID do usuário.
- **Respostas**:
  - `204 No Content`: Usuário excluído com sucesso.
  - `500 Internal Server Error`: Erro no servidor.

### Categories

API endpoints para gerenciamento de categorias.

#### Listar Todas as Categorias

```http
GET /categories
```

- **Descrição**: Retorna uma lista de todas as categorias.
- **Respostas**:
  - `200 OK`: Lista de categorias.
  - `500 Internal Server Error`: Erro no servidor.

#### Criar uma Nova Categoria

```http
POST /categories
```

- **Descrição**: Cria uma nova categoria.
- **Corpo da Requisição**:
  - Objeto de categoria conforme especificado no esquema.
- **Respostas**:
  - `201 Created`: Categoria criada com sucesso.
  - `400 Bad Request`: Dados de entrada inválidos.
  - `500 Internal Server Error`: Erro no servidor.

#### Obter uma Categoria por ID

```http
GET /categories/{id}
```

- **Descrição**: Obtém uma categoria com base no ID.
- **Parâmetros Path**:
  - `id`: ID da categoria.
- **Respostas**:
  - `200 OK`: Categoria solicitada.
  - `404 Not Found`: Categoria não encontrada.
  - `500 Internal Server Error`: Erro no servidor.

#### Atualizar uma Categoria por ID

```http
PUT /categories/{id}
```

- **Descrição**: Atualiza uma categoria com base no ID.
- **Parâmetros Path**:
  - `id`: ID da categoria.
- **Corpo da Requisição**:
  - Objeto de categoria conforme especificado no esquema.
- **Respostas**:
  - `200 OK`: Categoria atualizada com sucesso.
  - `400 Bad Request`: Dados de entrada inválidos.
  - `404 Not Found`: Categoria não encontrada.
  - `500 Internal Server Error`: Erro no servidor.

#### Excluir uma Categoria por ID

```http
DELETE /categories/{id}
```

- **Descrição**: Exclui uma categoria com base no ID.
- **Parâmetros Path**:
  - `id`: ID da categoria.
- **Respostas**:
  - `204 No Content`: Categoria excluída com sucesso.
  - `404 Not Found`: Categoria não encontrada.
  - `500 Internal Server Error`: Erro no servidor.

#### Obter Categorias em uma Estrutura de Árvore

```http
GET /categories/tree
```

- **Descrição**: Obtém categorias em uma estrutura de árvore.
- **Respostas**:
  - `200 OK`: Estrutura de árvore de categorias.
  - `500 Internal Server Error`: Erro no servidor.
