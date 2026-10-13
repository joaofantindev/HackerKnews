# ROADMAP — Hacker Knews

Jornal de notícias estático que consome a API pública do Hacker News em tempo real
e apresenta as 10 principais histórias em um layout de jornal com estética de
documento Markdown.

## 1. Visão do Produto

| Item            | Descrição                                                       |
| --------------- | --------------------------------------------------------------- |
| Problema        | Consumir notícias do HN exige navegar por uma lista simples      |
| Solução         | Renderizar as top 10 histórias como uma página de jornal         |
| Público-alvo    | Desenvolvedores curiosos e leitores de tecnologia               |
| Fonte de dados  | API pública do Hacker News (Firebase), sem autenticação          |
| Distribuição    | GitHub Pages (site 100% estático)                                |

## 2. Objetivos de Aprendizagem

- Fluxo **AI-Native**: contexto → planejamento → execução por fases → publicação.
- Organização de projeto front-end em **camadas** (api, services, ui, utils).
- Consumo de API REST assíncrona com `fetch` + `Promise.all`.
- Renderização segura de DOM sem frameworks e sem `innerHTML` inseguro.
- Publicação estática no GitHub Pages.

## 3. Fases de Entrega

### Fase 0 — Fundação
- [x] Estrutura de pastas.
- [x] Documentação (`README.md`, `ROADMAP.md`, `DEV_PLAN.md`).
- [x] Página base (`index.html`) e estilos globais.

### Fase 1 — Dados
- [x] Camada de API para o Hacker News.
- [x] Modelo de domínio `Story`.
- [x] Serviço que compõe as top 10 histórias.

### Fase 2 — Apresentação
- [x] Utilitários de formatação e de DOM.
- [x] Renderizadores de manchete, matérias e listagem numerada.
- [x] Estilos com estética Markdown.

### Fase 3 — Orquestração e Resiliência
- [x] `main.js` orquestrando o fluxo completo.
- [x] Estados de `loading`, `erro` e `vazio`.

### Fase 4 — Publicação
- [ ] Publicar no GitHub Pages (ver `README.md` → Publicação).

## 4. Fora de Escopo (por enquanto)

- Autenticação e comentários completos.
- Back-end / banco de dados.
- Build step (bundler). O projeto roda como módulos ES nativos.
