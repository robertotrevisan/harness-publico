// Branding + taxonomia centralizados. Ponto único de reskin.

// Slug do repositório (owner/repo), usado para montar os comandos `npx skills add`.
const repoSlug = 'robertotrevisan/harness-publico';

export const site = {
  name: 'Harness Público',
  tagline: 'Marketplace público de plugins e skills para o Claude Code',
  // Logo servida de site/public/ (URL na raiz). Troque o arquivo para reskin — sem mudar código.
  logo: '/logo.svg',
  description:
    'Vitrine navegável dos plugins e skills técnicos compartilháveis (spec-driven development, uso geral) — derivada direto dos arquivos do repositório.',
  repo: {
    slug: repoSlug,
    // Instala todas as skills do repo (aninhadas em plugins/*/skills/*) — precisa de --full-depth.
    installAll: `npx skills add ${repoSlug} --full-depth`,
  },
  author: {
    name: 'Roberto Trevisan',
    email: 'trevisan@gmail.com',
  },
} as const;

export type SiteConfig = typeof site;
