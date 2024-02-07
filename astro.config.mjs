import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import obfuscator from 'rollup-plugin-obfuscator';
import sentry from "@sentry/astro";


let obfuscator_config = {
  identifierNamesGenerator: 'mangled',
  stringArrayCallsTransform: true,
  stringArrayEncoding: ['base64', 'rc4'],
  splitStrings: true,
  stringArray: true,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 1
};

let obfuscator_plug = obfuscator({
  include: ["**/*.js"],
  exclude: [/manifest/],
  options: obfuscator_config,
  global: true
})

let sentry_plug = sentry({
  dsn: "https://b0b31aaf38de4cfaa4e02a717b357fac@o1329236.ingest.sentry.io/4504730069762048",
  sourceMapsUploadOptions: {
    project: "fantasybot",
    authToken: "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",
  },
});

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
  integrations: [sentry_plug],
  trailingSlash: "never"
});