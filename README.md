# 🏆 Projeto FullStack

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Início Rápido](#2-início-rápido)


---

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [ts-jest](https://jestjs.io/pt-BR/docs/expect)
- [supertest](https://github.com/ladjs/supertest)

- [NextJS](https://nextjs.org/)
- [ChakraUi](https://chakra-ui.com/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Nookies](https://www.npmjs.com/package/nookies)
- [HookForms](https://react-hook-form.com/)
- [React](https://react.dev/)


As URL bases da aplicação:
Front - http://localhost:3000/
Back - http://localhost:8000/
---


## 2. Início Rápido


### 2.1. Instalando Dependências Back-End

Clone o projeto em sua máquina, entre no diretório "./backend-m6-s1" e instale as dependências

```shell
yarn
```

### 2.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
(lembre-se que a senha no arquivo .env deve ser uma string!)

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 2.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts

```
Rode o servidor com o comando:

```
yarn dev

```

### 2.4. Instalando Dependências Front-End

Agora, entre no diretório "./front-m6-s1" e instale as dependências

```shell
npm install
```

### 2.5. Rode o app

Execute  o comando:

```
npm run dev
```

---
