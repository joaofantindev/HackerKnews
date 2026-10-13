# Hacker Knews

Jornal de notícias estático que busca as **top 10 histórias do Hacker News** em
tempo real (API pública, sem autenticação) e as apresenta em um layout de jornal
com estética de documento Markdown.

> Projeto-veículo do fluxo **AI-Native Engineers**: contexto → planejamento →
> execução por fases → publicação.

## Demonstração

Abra `index.html` via servidor local (ver abaixo) e as histórias serão carregadas
automaticamente. A página possui três blocos:

1. **Manchete principal** — a história de maior destaque.
2. **Matérias** — as próximas histórias em destaque.
3. **Listagem numerada** — as 10 histórias com pontos e comentários.

## Estrutura de Pastas

```
HackerKnews/
├── index.html                 # Ponto de entrada
├── ROADMAP.md                 # Visão e fases
├── DEV_PLAN.md                # Plano técnico
├── src/
│   ├── js/
│   │   ├── main.js            # Orquestrador (bootstrap)
│   │   ├── api/
│   │   │   └── hackerNewsApi.js
│   │   ├── models/
│   │   │   └── Story.js
│   │   ├── services/
│   │   │   └── newsService.js
│   │   ├── ui/
│   │   │   ├── renderers/
│   │   │   │   ├── mastheadRenderer.js
│   │   │   │   ├── headlineRenderer.js
│   │   │   │   ├── articleRenderer.js
│   │   │   │   └── storyListRenderer.js
│   │   │   ├── components/
│   │   │   │   └── storyMeta.js
│   │   │   └── stateRenderer.js
│   │   └── utils/
│   │       ├── constants.js
│   │       ├── dom.js
│   │       └── formatters.js
│   └── styles/
│       ├── main.css           # Agrega os demais
│       ├── base.css           # Reset e tipografia
│       ├── layout.css         # Estrutura da página
│       └── newspaper.css      # Componentes do jornal
```

## Executar Localmente

Módulos ES exigem um servidor HTTP (não abra via `file://`).

```powershell
# Opção 1 — Python
python -m http.server 8080

# Opção 2 — Node
npx serve .
```

Depois acesse `http://localhost:8080`.

## Publicação (GitHub Pages)

1. Crie o repositório e envie o código:

   ```powershell
   git init
   git add .
   git commit -m "feat: jornal Hacker Knews"
   git branch -M main
   git remote add origin https://github.com/<usuario>/<repo>.git
   git push -u origin main
   ```

2. No GitHub: **Settings → Pages**.
3. Em **Source**, selecione **Deploy from a branch** → branch `main` → pasta `/root`.
4. Salve. O site ficará em `https://<usuario>.github.io/<repo>/`.

## Licença

MIT.
