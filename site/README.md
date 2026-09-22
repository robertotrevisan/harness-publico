# Vitrine — Harness Público

Site Astro que projeta os plugins/skills do repositório pai (`../plugins`) como catálogo navegável, publicado em https://robertotrevisan.github.io/harness-publico/.

Não é uma cópia mantida à parte: `src/content.config.ts` lê `.claude-plugin/marketplace.json` e `plugins/<dominio>/{skills,docs}` diretamente do filesystem em build-time. Editar uma skill no repo pai reflete no site no próximo build — nada aqui precisa ser sincronizado manualmente.

## Comandos

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/ + índice de busca Pagefind
npm run preview    # serve dist/ localmente (necessário para testar a busca)
```

## Reskin

- **Branding/taxonomia:** `src/site.config.ts`
- **Paleta/tipografia:** `src/styles/theme.css`
- **Logo:** `public/logo.svg`
