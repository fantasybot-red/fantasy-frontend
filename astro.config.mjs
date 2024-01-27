import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

let obfuscator_config = {
  identifierNamesGenerator: 'mangled',
  stringArrayCallsTransform: true,
  stringArrayEncoding: ['rc4'],
  deadCodeInjection: true
};

let obfuscator = obfuscatorPlugin({
  include: ["**/*.js", /.*\/hoisted\.js.*/],
  exclude: [],
  apply: "build",
  debugger: true,
  options: obfuscator_config
})

let vite_config = {
  plugins: [obfuscator],
  build: {
    rollupOptions: {
      external: [
        /^node:.*/
      ]
    },
    minify: 'terser'
  }
};

export default defineConfig({
  output: 'server',
  server: {
    port: import.meta.env.DEV ? 80 : undefined
  },
  vite: vite_config,
  adapter: node({
    mode: 'middleware',
  })
});