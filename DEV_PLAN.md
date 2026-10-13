# DEV_PLAN — Hacker Knews

Plano de execução técnica. Descreve arquitetura, contratos de dados e o fluxo de
renderização.

## 1. Arquitetura em Camadas

```
main.js                 → orquestra o fluxo (bootstrap)
  └── services/          → regra de negócio (buscar e normalizar notícias)
        └── api/         → acesso HTTP à API do Hacker News
  └── ui/                → renderização de DOM (apresentação pura)
        └── utils/       → formatação e helpers de DOM (sem estado)
```

Regras de dependência:

- `api` não conhece `ui` nem `services`.
- `services` orquestra `api` e produz o modelo `Story`.
- `ui` recebe `Story[]` e devolve elementos DOM. Não faz `fetch`.
- `utils` é agnóstico e reutilizável por qualquer camada.

## 2. Contratos de Dados

### Endpoint de IDs
`GET https://hacker-news.firebaseio.com/v0/topstories.json`

```json
[41978678, 41978512, 41978123]
```

### Endpoint de Item
`GET https://hacker-news.firebaseio.com/v0/item/{id}.json`

```json
{
  "by": "usuario",
  "descendants": 224,
  "id": 41978678,
  "score": 261,
  "time": 1728734400,
  "title": "Gemini 4 Argon",
  "type": "story",
  "url": "https://exemplo.com/post"
}
```

### Modelo interno `Story`

| Campo        | Tipo   | Descrição                                       |
| ------------ | ------ | ----------------------------------------------- |
| `id`         | number | Identificador da história                       |
| `title`      | string | Título                                          |
| `author`     | string | Usuário que publicou                            |
| `score`      | number | Pontos                                          |
| `comments`   | number | Quantidade de comentários (`descendants`)       |
| `publishedAt`| number | Timestamp Unix (segundos)                       |
| `url`        | string | Link externo (fallback para o item do HN)       |
| `rank`       | number | Posição na lista (1..10)                        |

## 3. Fluxo de Renderização

```
DOMContentLoaded
  → renderiza estado "loading"
  → newsService.getTopStories(10)
       → api.fetchTopStoryIds()
       → api.fetchStoryById(id) para cada id   (Promise.all)
       → toStory(item) + filtra inválidos + slice(10)
  → ui.renderNewspaper(root, stories)
       → manchete (stories[0])
       → matérias (stories[1..3])
       → listagem numerada (stories[0..9])
  → ao falhar: renderiza estado "erro" com ação de retry
```

## 4. Decisões Técnicas

- **Módulos ES nativos**: sem bundler, servido direto pelo GitHub Pages.
- **Segurança de DOM**: construir nós via `document.createElement` + `textContent`,
  evitando injeção de HTML (`innerHTML` não é usado com dados da API).
- **Resiliência de fetch**: `AbortController` + timeout e tratamento de falha por item.
- **Estética Markdown**: tipografia de documento, `h1/h2` com borda inferior,
  `<hr>`, blocos mono e links azuis.

## 5. Definição de Pronto (DoD)

- [ ] As 10 histórias aparecem no layout.
- [ ] Estados de loading/erro/vazio funcionam.
- [ ] Sem uso de `innerHTML` com dados externos.
- [ ] `README.md` explica execução local e publicação.
