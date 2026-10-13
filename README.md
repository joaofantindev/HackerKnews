# Hacker Knews

Jornal de notícias estático que busca as **top 10 histórias do Hacker News** em
tempo real (API pública, sem autenticação) e as apresenta em um layout de jornal
com estética de documento Markdown e tema escuro.

> Projeto-veículo do fluxo **AI-Native Engineers**: contexto → planejamento →
> execução por fases → publicação.

## Sobre este projeto

Este projeto foi construído inteiramente a partir do terminal, com o auxílio de
**CLIs de IA (agentes de código no terminal)** — especificamente o
[opencode](https://opencode.ai) — e faz parte dos meus estudos do movimento
**AI-Native Engineers** proposto em
[ai-native-engineers.com](https://ai-native-engineers.com/).

A ideia não é só entregar o jornal, mas praticar o fluxo de trabalho de um
engenheiro AI-Native: dar **contexto**, **planejar** com `ROADMAP.md` e
`DEV_PLAN.md`, **executar por fases** com apoio do agente e **publicar**.

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
├── AGENTS.md                  # Regras de operação do agente
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

O site é **buildless** (sem passo de build e sem pasta `dist`). O deploy é feito
a partir da branch **`gh-pages`**, que contém os arquivos estáticos
(`index.html`, `src/` e `.nojekyll`) na raiz da branch. A branch `main` mantém o
código-fonte e a documentação.

1. Envie o código-fonte para a `main`:

   ```powershell
   git add .
   git commit -m "feat: jornal Hacker Knews"
   git push origin main
   ```

2. Publique os arquivos estáticos na branch `gh-pages` (worktree temporário, sem
   tocar na `main`):

   ```powershell
   git worktree add --detach ../hk-ghpages main
   git -C ../hk-ghpages switch --orphan gh-pages
   git -C ../hk-ghpages rm -rf --cached .
   Copy-Item index.html ../hk-ghpages/
   Copy-Item src ../hk-ghpages/src -Recurse
   New-Item ../hk-ghpages/.nojekyll -ItemType File
   git -C ../hk-ghpages add index.html src .nojekyll
   git -C ../hk-ghpages commit -m "deploy: Hacker Knews static site"
   git -C ../hk-ghpages push -f origin gh-pages
   git worktree remove --force ../hk-ghpages
   ```

3. No GitHub: **Settings → Pages**.
4. Em **Source**, selecione **Deploy from a branch** → branch `gh-pages` → pasta `/root`.
5. Salve. O site ficará em `https://<usuario>.github.io/<repo>/`.

## Licença

MIT.
