# ignite-reactjs-blog
[Ignite: React.js] - Chapter III - Desafio: Criando uma aplicação do zero

www.notion.so/desafio-01-criando-um-projeto-do-zero-b1a3645d286b4eec93f5f1f5476d0ff7

## Como executar essa aplicação localmente?

####  Pré-requisitos:
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/). 

Além de um editor de código como o [VSCode](https://code.visualstudio.com/).

Você vai precisar criar uma conta, um repositório e algumas publicações no [Prismic CMC](https://prismic.io/), para posteriormente ter acesso a *API Endpoint* e *Access Token*.

    # Clone o repositório em sua máquina
    $ git clone git@github.com:kaiquezimerer/ignite-reactjs-blog.git
    
    # Acesse a pasta do projeto pelo terminal/cmd
    $ cd ignite-reactjs-blog/
    
    # Instale as dependências
    $ yarn install
    
    # Copie o arquivo .env-sample para .env.local
    $ $ cp .env-sample .env.local

    # Altere o .env.local com os dados do repositório do Prismic CMS (sando nano, vim ou qualquer editor)
    $ nano .env.local

    # Inicialize o projeto em modo de desenvolvimento
    $ yarn dev
    
    # A aplicação iniciará na porta :3000 - acesse http://localhost:3000

 ## Como executar os testes automatizados?
 
    # Na pasta do projeto, execute o comando para rodar todos os testes
    $ yarn test
