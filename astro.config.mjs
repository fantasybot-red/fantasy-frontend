import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

let obfuscator_config = {
  identifierNamesGenerator: 'mangled',
  stringArrayEncoding: [
    'base64',
    'rc4'
  ],
  stringArrayIndexesType: [
      'hexadecimal-number',
      'hexadecimal-numeric-string'
  ]
};

let obfuscator = obfuscatorPlugin({
  include: ["**/*.js"],
  exclude: ["**/node_modules/*"],
  apply: "build",
  debugger: true,
  options: obfuscator_config
})

let vite_config = {
  plugins: [obfuscator],
  build: {
    rollupOptions: {
      external: [
        /^node:.*/,
      ]
    }
  }
};
export default defineConfig({
  output: 'server',
  vite: vite_config,
  adapter: node({
    mode: 'middleware',
  }),
});