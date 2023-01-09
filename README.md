<h2>Descrição do Projeto </h2>

Web app que dissemina a cultura de inclusão dentro da DBServer, com foco na cultura surda. É destinado para todas as pessoas que desejam aprender LIBRAS e enteder um pouco mais sobre inclusão de PCD's na sociedade. O web app aproveita o guia de acessibilidade e a apostila de Libras como fonte de informação de inclusão, assim como utiliza a API VLibras para as funcionalidades específicas.

## Mapa de Tecnologias 📰

A Biblioteca/Framework principal utilizada será ReactJS.

| Nome | Documentação | Links dos pacotes |
| :-: | :-: | :-: |
| Typescript | https://www.typescriptlang.org/docs/ | https://www.npmjs.com/package/typescript |
| Node.js | https://nodejs.org/en/docs/guides/getting-started-guide/ | https://docs.npmjs.com/downloading-and-installing-node-js-and-npm |
| Mongoose | https://mongoosejs.com/docs/ | https://www.npmjs.com/package/mongoose |
| Axios | https://axios-http.com/docs/intro | https://www.npmjs.com/package/axios |
| Jest | https://jestjs.io/docs/getting-started | https://www.npmjs.com/package/jest |
| Express | http://expressjs.com/en/4x/api.html | https://www.npmjs.com/package/express |
| Express Validator | https://express-validator.github.io/docs/ | https://www.npmjs.com/package/express-validator |
| JWT | https://jwt.io/introduction | https://www.npmjs.com/package/jsonwebtoken |
| Multer | https://expressjs.com/en/resources/middleware/multer.html | https://www.npmjs.com/package/multer | 
| Cloudinary | https://cloudinary.com/documentation/cloudinary_get_started | https://www.npmjs.com/~cloudinary
| Firebase | https://cloud.google.com/firestore/docs/client/get-firebase | https://www.npmjs.com/package/firebase |
| Mongo Memory Server| https://github.com/nodkz/mongodb-memory-server | https://www.npmjs.com/package/mongodb-memory-server |


## Executando o Projeto 💻

### Instalando os módulos

```
$ npm install
```

### Configurando as variáveis de ambiente

```
Para configurar as variáveis de ambiente, você precisará criar na raíz do projeto o arquivo .env, configurando variáveis localmente.
```

## Fluxo de versionamento 🖥️

### Clone a branch "main" do repositório

```
$ git clone https://github.com/ProjetosParceiros/dbinclui-backend.git
```
### Acesse a branch remota "develop" e instale o node_modules.

```
$ git checkout develop
$ npm install
```

### Iniciar o uso do Git Flow no projeto na branch "develop"

```
$ git flow init
```

### Certifique-se de que a branch para "production releases" é a main

```
Which branch should be used for bringing forth production releases?
   - develop
   - main
Branch name for production releases: [main]
```

### Certifique-se de que a branch para "next release" (desenvolvimento) é a develop

```
Which branch should be used for integration of the "next release"?
   - develop
Branch name for "next release" development: [develop]  
```

### Aperte "ENTER" em cada input para usar as nomenclaturas padrões das features

```
How to name your supporting branch prefixes?
Feature branches? [feature/]
Bugfix branches? [bugfix/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []
```

### Crie a branch para desenvolvimento baseada no número do seu card no Trello

```
$ git flow feature start DBI-01 <-- Número do card no Trello
```
| Branch | Funcionalidade | 
| :-: | :-: |
| Feature | Branch para desenvolvimento de uma funcionalidade específica. Devem ter o nome iniciado por feature, por exemplo: "feature/sistemacadastral". São criadas sempre a partir da branch "develop".|
| Release | Serve como ponte para fazer o merge da Develop para a Main. Caso haja alguma alteração, também deve ser sincronizada com a Branch "develop".|
| Bugfix | Criada a partir da branch "release" para realizar correções de erros encontrados no sistema em desenvolvimento. Quando concluída, ela é excluída após realizar o merge com a branch "release".|
| Hotfix | Criada a partir da Main para realizar correções encontradas no sistema em produção. Quando concluída, ela é excluída após realizar o merge com a branch "develop" e "main". |

### Seguindo o exemplo de uma branch "feature", publique-a no card do Trello com as mudanças feitas. 💡

```
$ git flow feature publish DBI-01 <- Número do card no Trello.
```

### Para que outros possam acessar a branch referente à tarefa, dentro da branch "develop":

```
$ git pull
$ git checkout feature/DBI-01 <- Número do card da tarefa no Trello.
Switched to a new branch 'feature/DBI-01'
```
### Para finalizar a branch referente à tarefa: 

```
$ git flow feature finish DBI-01
```
<h3>Logo, a Branch será finalizada e você será redirecionado para a "develop", onde deve usar: </h3>

```
$ git push
```
<p> Para atualizar a branch "develop" no repositório. </p>
