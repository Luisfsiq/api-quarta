# 📱 Rede Social - Fullstack

> Sistema completo de rede social desenvolvido com React + Node.js + TypeScript

![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.9-green)
![Vite](https://img.shields.io/badge/Vite-4.4-yellow)
![Express](https://img.shields.io/badge/Express-4.18-lightgrey)
![Prisma](https://img.shields.io/badge/Prisma-5.0-purple)

---

## 📋 Índice

- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Executando a Aplicação](#-executando-a-aplicação)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Endpoints](#-api-endpoints)
- [Scripts](#-scripts)
- [Dados de Teste](#-dados-de-teste)
- [Autor](#-autor)

---

## 🎯 Sobre

Sistema de rede social completo desenvolvido como projeto fullstack, permitindo aos usuários criar posts, interagir através de curtidas e comentários e gerenciar seus perfis.  
Conta com:

- Interface moderna usando **Material-UI**
- API RESTful com **Express + TypeScript**
- Banco de dados **PostgreSQL + Prisma ORM**
- Roteamento protegido; autenticação simples com token de exemplo (sem JWT)

---

## ✨ Funcionalidades

### 🔐 Autenticação
- Cadastro com validação
- Login com token de exemplo (sem JWT)
- Logout
- Proteção de rotas no frontend

### 📝 Posts
- Criação de posts com texto
- Campo de imagem previsto no schema (não implementado no frontend)
- Feed ordenado por data

### ❤️ Interações
- Sistema de curtidas (like/unlike)
- Contador em tempo real
- Comentários completos (criar/listar)

### 👤 Perfis
- Perfil de usuário com avatar, bio e dados
- Alteração de informações

---

## 🛠️ Tecnologias

### **Frontend**
- React 18  
- TypeScript  
- Vite  
- Material-UI  
- Axios  
- React Router  
- Context API  

### **Backend**
- Node.js  
- Express  
- TypeScript  
- Prisma ORM  
- PostgreSQL  
- Zod  
- CORS  

---

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Git instalado
- Docker e Docker Compose (opcional, para rodar PostgreSQL)

---

## 🚀 Instalação

### 1. Clonar o repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd api-fullstack-redesocial
```
2. Backend
```bash
cd backend
npm install
npx prisma generate
```

### 2.1 Banco de Dados (PostgreSQL)

Usamos PostgreSQL com Prisma (igual ao projeto de referência). Você pode rodar via Docker:

```bash
cd backend
docker compose up -d
```

Isso sobe o Postgres em `localhost:5433` com:

- Usuário: `admin`
- Senha: `admin`
- Banco: `redesocial`

Crie o arquivo `.env` no backend (`backend/.env`):

```env
DATABASE_URL="postgresql://admin:admin@localhost:5433/redesocial"
PORT=3000
```

Gere o cliente e aplique migrações/tabelas:

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```
3. Frontend
```bash
cd ../frontend
npm install
```
💻 Executando a Aplicação
📌 Desenvolvimento

Backend (porta 3000)
```bash
cd backend
npm run dev
```

Frontend (porta 5173)
```bash
cd frontend
npm run dev
```
📌 Produção

Backend
```bash
cd backend
npm run build
npm start
```

Frontend
```bash
cd frontend
npm run build
npm run preview
```
🔗 Acesso

Frontend: http://localhost:5173

Frontend (produção): https://redesocial-frontend.onrender.com/login

Backend: http://localhost:3000

Health Check: http://localhost:3000/api/health

---

## 🗄️ Banco de Dados

- Provider: PostgreSQL (`DATABASE_URL` via `.env`)
- Orquestração opcional via `docker-compose` (porta externa `5433` → container `5432`)
- Migrações via Prisma (`prisma/migrations`), inicialize com `npx prisma migrate dev`

Se preferir SQLite para testes rápidos, altere o `datasource` em `schema.prisma` para `sqlite` e use `db push`. Por padrão, o projeto está configurado para PostgreSQL.

---

## 🚀 Deploy na Render

### 1) Banco de Dados
- Crie um serviço PostgreSQL (Render Postgres ou outro provedor) e copie a `DATABASE_URL`.
- Use o formato com SSL quando aplicável: `postgresql://user:pass@host:5432/db?sslmode=require`.

### 2) Backend (Web Service)
- Service Type: `Web Service`
- Root Directory: `backend`
- Build Command: `npm install && npm run build`
- Start Command: `npx prisma migrate deploy && npm run seed && node dist/index.js`
- Health Check Path: `/api/health`
- Environment:
  - `NODE_VERSION=20`
  - `DATABASE_URL` (do passo 1)
  
Migrações são aplicadas pelo `startCommand` acima; o seed roda uma vez no start.

### 3) Frontend (Static Site)
- Service Type: `Static Site`
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment:
  - `VITE_API_URL=https://<SEU_BACKEND>.onrender.com/api` (inclua `/api`)
  - Opcional: `NODE_VERSION=20`
- SPA Rewrites: em "Redirects and Rewrites", adicione `/*` → `/index.html` com ação `Rewrite`.
  - Como fallback, um `frontend/public/404.html` foi adicionado para evitar página em branco (ideal é usar o rewrite acima).

### 4) Verificações pós-deploy
- Backend: `GET /api/health` deve retornar 200; logs devem mostrar migrações aplicadas.
- Frontend: a página deve carregar e, ao dar F5 em rotas internas, continuar funcionando (devido ao rewrite).
- Login/Registro funcionam quando:
  - `VITE_API_URL` aponta para `.../api` corretamente.
  - `DATABASE_URL` está válido e acessível.

---

📁 Estrutura do Projeto
```bash
api-fullstack-redesocial/
├── backend/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── src/
│       ├── index.ts
│       ├── middleware/
│       ├── routes/
│       │   ├── commentRoutes.ts
│       │   ├── postRoutes.ts
│       │   └── userRoutes.ts
│       └── schemas/
├── frontend/
│   ├── index.html
│   ├── public/
│   │   ├── 404.html
│   │   └── index.html
│   ├── package.json
│   └── src/
│       ├── App.tsx
│       ├── components/
│       ├── config/
│       ├── contexts/
│       ├── main.tsx
│       ├── pages/
│       ├── services/
│       ├── types/
│       └── vite-env.d.ts
├── render.yaml
└── package-lock.json
```
🔌 API Endpoints
🔐 Autenticação

POST /api/auth/login

POST /api/auth/register

👥 Usuários

GET /api/users

GET /api/users/:id

PUT /api/users/:id

 (não há endpoint `/api/users/profile` na API atual)

📝 Posts

GET /api/posts

GET /api/posts/:id

POST /api/posts

PUT /api/posts/:id

DELETE /api/posts/:id
PATCH /api/posts/:id/like
 
---

## ☁️ Deploy no Render (Backend + Frontend)

Este repositório inclui um `render.yaml` para provisionar:
- Um banco PostgreSQL (`redesocial-db`, plano free)
- Um serviço web Node para a API (`redesocial-api`)
- Um static site para o frontend (`redesocial-frontend`)

### Passos

1) Faça push do repositório para GitHub/GitLab.

2) No Render, crie via "New +" → "Blueprint" e selecione o repositório. O Render lerá `render.yaml` e criará os recursos.

3) Migrações do Prisma
- O serviço da API executa `npx prisma migrate deploy` automaticamente no `startCommand`.
- Garanta que haja migrações em `backend/prisma/migrations` (se necessário, gere localmente com `npx prisma migrate dev`).

4) Variáveis de ambiente
- `DATABASE_URL` é injetada automaticamente a partir do banco `redesocial-db` pelo `render.yaml`.
- `PORT=3000` já definido no serviço.

5) Frontend
- O static site será construído a partir de `frontend` e publica `dist`.
- Ajuste `VITE_API_URL` do frontend para apontar para a URL pública da API:
  - Vá em `redesocial-frontend` → Environment → Add Variable → `VITE_API_URL=https://<URL-DA-API>/api`
  - A URL da API aparece no dashboard do serviço `redesocial-api`.

6) Teste
- API: `https://<URL-DA-API>/api/health`
- Frontend: `https://<URL-DO-FRONT>/`

### Observações
- Em restarts, `migrate deploy` roda novamente mas só aplica migrações pendentes.
- Evite usar Docker no Render aqui; estamos usando o ambiente Node nativo.

PATCH /api/posts/:id/like

💬 Comentários

POST /api/comments

GET /api/comments

📊 Scripts
Backend
```bash
npm run dev      # desenvolvimento (TSX)
npm run build    # compila TypeScript
npm start        # node dist/index.js
npm run seed     # popula dados de exemplo
```
Frontend
```bash
npm run dev      # Vite dev server
npm run build    # tsc + Vite build (via node)
npm run preview  # preview de produção (via node)
```
👤 Dados de Teste
```bash
Usuário padrão:

Email: usuario@exemplo.com  
Senha: 123456  
```
👨‍💻 Autor

Luis F R B Siqueira
GitHub: @Luisfsiq

Projeto: api-fullstack-redesocial

---

## 🔎 Informações Corrigidas

- Nome do repositório correto: `api-fullstack-redesocial` (antes `api-quarta`).
- Autenticação: o backend retorna um token de exemplo; não há JWT/hashing.
- Upload de imagens de post: não implementado no frontend (campo existe no schema).
- Endpoint `/api/users/profile`: não existe na API atual (o frontend tenta usar como fallback).
- Versões de Node: Docker usa Node 18; Render define `NODE_VERSION=20`.
- Build do frontend: scripts executam Vite via Node para evitar erro de permissão em Linux.
- Rewrites de SPA: já configurados via `render.yaml` (`/*` → `/index.html`).
- Avatar: campo salvo na API, mas UI usa apenas a inicial do nome; pode-se ajustar `<Avatar src={...}>`.