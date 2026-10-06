import { defineConfig } from 'vite';
import { cpSync } from 'node:fs';

// overwebs-fonts and overwebs-play-tile load their fonts/images at runtime from
// `window.modulesAssetPath(module)` (node_modules/<module>, see index.html).
// The dev server serves node_modules directly; for the build, copy those assets.
const runtimeAssets = ['overwebs-fonts/fonts', 'overwebs-play-tile/images'];

export default defineConfig({
  plugins: [
    {
      name: 'copy-module-runtime-assets',
      apply: 'build',
      writeBundle({ dir }) {
        for (const asset of runtimeAssets) {
          cpSync(`node_modules/${asset}`, `${dir}/node_modules/${asset}`, { recursive: true });
        }
      },
    },
  ],
});
