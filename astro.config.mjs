import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import obfuscator from 'rollup-plugin-obfuscator';


let obfuscator_config = {
  identifierNamesGenerator: 'mangled',
  stringArrayCallsTransform: true,
  stringArrayEncoding: ['rc4'],
  deadCodeInjection: true
};

let obfuscator_plug = obfuscator({
  include: ["**/*.js"],
  exclude: [/manifest/],
  options: obfuscator_config,
  global: true
})

let vite_config = {
  build: {
    rollupOptions: {
      external: [
        /^node:.*/,
        /sharp\.js/
      ],
      plugins: [
        obfuscator_plug
      ],
      output: {
        entryFileNames: "main.[hash].js"
      }
    },
    minify: 'terser'
  }
};

export default defineConfig({
  output: 'server',
  server: {
    port: import.meta.env.DEV ? 80 : undefined
  },
  build: {
    assets: 'assets',
  },
  vite: vite_config,
  adapter: node({
    mode: 'middleware',
  }),
  trailingSlash: "never"
});