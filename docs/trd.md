# TRD — Technical Requirements Document

> Documento técnico global do projeto. Criado e atualizado via skill `escrever-trd`.
> Carregado automaticamente por `preparar-execucao` e `implementar-task` como contexto global.
> Granularidade baixa: cobre o que é global e estável. Regras finas ficam em ADRs.

---

## Stack

| Dimensão | Valor |
|---|---|
| Linguagem principal | TypeScript (config estrita — `astro/tsconfigs/strict`) |
| Runtime / plataforma | Node.js 20 (fixado no workflow de CI) |
| Framework principal | Astro 5 (SSG) + Tailwind CSS 4 (`@tailwindcss/vite`) + Pagefind 1.x (busca estática gerada em build-time) |
| Banco de dados | Nenhum — site 100% estático; dados lidos do filesystem do repo (`marketplace.json` + `plugins/*`) em build-time |
| Ferramentas de build | Vite (via Astro), Pagefind CLI |
| Gerenciador de pacotes | npm (`package-lock.json` commitado, `npm ci` no CI) |

---

## Arquitetura

### Padrão arquitetural

Static Site Generator com **content loader customizado** (Astro Content Layer API). O `site/` não mantém cópia própria dos dados — um loader lê `.claude-plugin/marketplace.json` e `plugins/<dominio>/{skills,docs}` diretamente do filesystem do repo pai em build-time e expõe como coleções Astro (`plugins`, `skills`). O repositório é ao mesmo tempo o **marketplace** (fonte de verdade, consumida pelo Claude Code / `npx skills`) e a fonte da **vitrine** (site derivado, sem duplicação).

### Estrutura de pastas dominante

```
harness-publico/
├── .claude-plugin/marketplace.json   # registro dos plugins — fonte de verdade
├── .github/workflows/deploy-pages.yml  # build + deploy no push em main
├── plugins/<dominio>/                # um plugin por domínio de uso
│   ├── .claude-plugin/plugin.json
│   ├── skills/<skill>/SKILL.md       # definição da skill (consumida pelo Claude Code)
│   └── docs/<skill>.md               # documentação da skill (consumida só pelo site)
└── site/                             # vitrine Astro — projeção pura do repo pai
    └── src/{content.config.ts, site.config.ts, layouts, components, pages}
```

### Módulos / camadas principais

| Módulo | Responsabilidade |
|---|---|
| `site/src/content.config.ts` | Loaders customizados (`pluginsLoader`, `skillsLoader`) que leem o repo pai do filesystem e expõem coleções `plugins`/`skills` |
| `site/src/site.config.ts` | Branding e taxonomia centralizados (nome, tagline, logo, slug do repo) — ponto único de reskin |
| `site/src/components/` | `SkillCard`, `PluginBadge`, `CategoryFilter`, `InstallCommand` — componentes Astro reutilizáveis |
| `site/src/pages/` | `index` (lista + filtro por plugin), `skills/[slug]` (doc renderizado), `plugins/[slug]` (skills do plugin) |
| `.github/workflows/deploy-pages.yml` | CI: `npm ci` + `npm run build` (Astro build + Pagefind) + publish no GitHub Pages a cada push em `main` |

---

## Requisitos Não-Funcionais

| Dimensão | Requisito |
|---|---|
| Performance | Não definido formalmente — site estático servido via CDN do GitHub Pages *(premissa — confirme ou corrija)* |
| Disponibilidade / SLA | Sem SLA próprio; depende inteiramente da disponibilidade do GitHub Pages *(premissa — confirme ou corrija)* |
| Escalabilidade | Não aplicável — conteúdo estático, sem estado por usuário, sem backend |
| Segurança | HTTPS obrigatório (`https_enforced: true`, enforçado pelo GitHub Pages); nenhum dado de usuário ou credencial é armazenado no site |
| Observabilidade | Não definido — sem logging/monitoramento próprio (nenhum runtime server-side) |

---

## Dependências Externas

| Serviço / Sistema | Tipo | Constraint relevante | Dono |
|---|---|---|---|
| GitHub Pages | Hosting estático | Publica `site/dist` em `robertotrevisan.github.io/harness-publico/`; source configurado como `build_type: workflow` | externo — GitHub |
| GitHub Actions | CI/CD | Workflow `deploy-pages.yml` dispara em push para `main` ou `workflow_dispatch`; runner `ubuntu-latest`; requer permissão `pages: write` + `id-token: write` | externo — GitHub |
| Pagefind | Biblioteca de busca estática | Índice gerado em build-time (`pagefind --site dist`) e servido como assets estáticos — sem serviço em runtime | build-time only |
| `npx skills` ([vercel-labs/skills](https://github.com/vercel-labs/skills)) | Instalador de skills via CLI | Consome a estrutura `plugins/*/skills/*` deste repo; skills aninhadas exigem a flag `--full-depth` | externo — não controlado por este projeto |

---

## Padrões

### Testes

| Item | Valor |
|---|---|
| Framework | Não definido — nenhum framework de teste configurado *(premissa — confirme ou corrija)* |
| Comando completo | Não aplicável |
| Cobertura mínima | Não definida |
| Estratégia | Validação manual via `npm run build` bem-sucedido (local e no job `build` do CI) |

### Estilo de código

- **Linter:** Nenhum configurado *(premissa — confirme ou corrija)*
- **Formatter:** Nenhum configurado *(premissa — confirme ou corrija)*
- **Convenções de nomenclatura:** kebab-case para IDs de skill/plugin (usados em URLs e diretórios); PascalCase para componentes Astro *(inferido da estrutura observada no repo)*

### Error handling

Build que falha (exit não-zero) interrompe o job `build` do workflow — o GitHub Actions não publica se `npm run build` falhar. Não há tratamento de erro em runtime, por não haver runtime server-side (site 100% estático).

### Logging

Não aplicável — sem backend/runtime próprio.

### Autenticação / autorização

Não aplicável ao site (público, sem login). Escrita no conteúdo do repositório é controlada pelo próprio GitHub (permissões do repositório).

---

## Decisões Globais (ADRs)

| # | Título | Data | Status | Link |
|---|--------|------|--------|------|
| — | *(nenhum ADR registrado)* | — | — | — |
