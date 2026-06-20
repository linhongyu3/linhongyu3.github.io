import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://linhongyu3.github.io',
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true
    }
  }
});
