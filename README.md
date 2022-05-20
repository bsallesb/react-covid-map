# Covid Daily Cases

Relatório dinâmico de casos mundiais de variantes de covid.

Demonstração: [https://react-covid-map.netlify.app](https://react-covid-map.netlify.app)

## Tecnologias

- Front-end: [ReactJS](https://reactjs.org) (Typescript)
- Back-end: [Supabase](https://app.supabase.io)

## Instalação

Pré-requisitos:

-   [NodeJS](https://nodejs.org/)
-   [Yarn](https://yarnpkg.com/) (opcional)

Após clonar o projeto e instalar os pré-requisitos, execute a partir da pasta raiz:
```
npm install
```
ou
```
yarn
```

Crie o arquivo `.env` a partir do `.env.example`:
```
cp .env.example .env
```

Preencha as variáveis de ambiente do `.env` com os dados abaixo:
```
REACT_APP_SUPABASE_URL=https://nthzigopvhahnwldzbqo.supabase.co
REACT_APP_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50aHppZ29wdmhhaG53bGR6YnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMwMDk3MDEsImV4cCI6MTk2ODU4NTcwMX0.13p1tzPGNt_TdQMLmKkAl-ojMmteOAO74ks2kZREKGw
REACT_APP_DEFAULT_COUNTRY=Brazil
```

Após a instalação, para rodar o projeto, execute:
```
npm run start
```
ou
```
yarn start
```
