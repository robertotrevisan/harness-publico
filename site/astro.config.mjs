// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Site vitrine do harness-publico. Lê os plugins/skills do repo pai (../) no build.
export default defineConfig({
  site: 'https://robertotrevisan.github.io',
  base: '/harness-publico/',
  vite: {
    plugins: [tailwindcss()],
  },
});
