// eslint.config.js — flat config (ESLint 9+)
// Copre src/assets/js/ (client + script Node di utility) e src/lib/
// (moduli condivisi Eleventy), come richiesto da .specify/constitution.md,
// sezione 3 "Soglie Qualitative".

import globals from "globals";

const sharedRules = {
  "no-unused-vars": "error",
  "no-undef": "error",
  eqeqeq: "error",
  "prefer-const": "error",
  "no-var": "error",
};

export default [
  {
    // Moduli condivisi Eleventy (Node)
    files: ["src/lib/**/*.{js,mjs}", "src/_data/**/*.{js,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: sharedRules,
  },
  {
    // Script di utility Node che vivono sotto assets/js/ (es. cron/worker
    // di manutenzione: cleanup-subscribers.mjs, keep-alive.mjs)
    files: ["src/assets/js/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: sharedRules,
  },
  {
    // Codice eseguito nel browser
    files: ["src/assets/js/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        emailjs: "readonly", // caricato via <script> da CDN EmailJS
      },
    },
    rules: sharedRules,
  },
  {
    // Cloudflare Worker — worker.js
    files: ["src/assets/js/worker.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.serviceworker,
        env: "readonly",     // Cloudflare Workers env parameter
        waitUntil: "readonly", // Cloudflare Workers ctx.waitUntil
      },
    },
    rules: sharedRules,
  },
  {
    ignores: ["dist/**", "node_modules/**"],
  },
];
