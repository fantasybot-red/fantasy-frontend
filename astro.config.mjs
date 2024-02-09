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
  deadCodeInjectionThreshold: 0.2
};

let obfuscator_plug = obfuscator({
  include: ["**/*.js"],
  exclude: [/manifest/],
  options: obfuscator_config,
  global: true
})

let sentry_plug = sentry({
  dsn: process.env.PUBLIC_SENTRY_DSN,
  sourceMapsUploadOptions: {
    project: "fantasybot",
    authToken: process.env.Sentry_APIKEY,
  },
  environment: import.meta.env.DEV ? "development" : "production",
  sampleRate: 0.5,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  debug: import.meta.env.DEV
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