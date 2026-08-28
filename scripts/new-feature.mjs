#!/usr/bin/env node
// scripts/new-feature.mjs
// Scaffolda una nuova feature SDD copiando i template da .specify/templates/
// Uso: node scripts/new-feature.mjs nome-feature

import { existsSync, mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const name = process.argv[2];

if (!name) {
  console.error("Uso: node scripts/new-feature.mjs <nome-feature-kebab-case>");
  process.exit(1);
}

if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) {
  console.error("Il nome feature deve essere in kebab-case (es. contact-form-validation)");
  process.exit(1);
}

const featureDir = join("features", name);

if (existsSync(featureDir)) {
  console.error(`La cartella ${featureDir} esiste già.`);
  process.exit(1);
}

mkdirSync(featureDir, { recursive: true });

const files = [
  ["spec_template.md", "spec.md"],
  ["plan_template.md", "plan.md"],
  ["tasks_template.md", "tasks.md"],
];

for (const [src, dest] of files) {
  copyFileSync(join(".specify", "templates", src), join(featureDir, dest));
}

console.log(`✓ Feature "${name}" creata in ${featureDir}/`);
console.log(`  1. Compila ${featureDir}/spec.md (requisiti, no dettagli implementativi)`);
console.log(`  2. Fai approvare/rivedere lo spec, poi compila plan.md`);
console.log(`  3. Solo dopo, compila tasks.md e inizia l'esecuzione`);
