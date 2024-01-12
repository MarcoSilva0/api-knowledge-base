docker-compose up -d

## Erro no desenvolvimento e suas correções
Erro: knex não é um comando reconhecido
Solução:
Instalar o knex globalmente.

Comando: npm i -g knex

----------------------------------------------------------------

Erro knex init: No such file or directory
Solução:
Basta você ir na pasta do projeto > versao-inicial > backend > node_modules > knex > lib

Quando chegar aí, crie uma nova pasta com o nome migrations e depois mova a pasta migrate para dentro dela.

----------------------------------------------------------------

Erro Knex migrate:make create_table_users: Cannot find module '../migrate'
Solução:
Acessar a pasta node_modules (versao-inicial/backend/node_modules), dentro dela achar a pasta knex/lib/util e abrir o arquivo make-knex.js

Achar a linha referente ao migrate: var _migrate e corrigir para var _migrate = require('../migrations/migrate');

Rodar o comando (create_table_users) novamente.