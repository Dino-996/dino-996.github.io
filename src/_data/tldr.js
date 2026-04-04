import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CACHE_FILE = ".cache/tldr-cache.json";

function loadCache() {
  if (fs.existsSync(CACHE_FILE)) {
    return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
  }
  return {};
}

function saveCache(cache) {
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), "utf-8");
}

console.log("[DEBUG SYSTEM] Il file tldr.js è stato caricato da Eleventy!");

export default async function () {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.warn("[tldr] GEMINI_API_KEY non trovata, skip generazione TL;DR.");
    return {};
  }

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const cache = loadCache();
  const postsDir = "src/posts";
  const result = { ...cache };

  // Raccoglie tutti i file .md ricorsivamente
  const files = fs.readdirSync(postsDir, { recursive: true })
    .filter(f => String(f).endsWith(".md"))
    .map(f => path.join(postsDir, String(f)));

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    if (!data.title) continue;

    // Usa il titolo come chiave cache — rigenera solo se il contenuto cambia
    const cacheKey = data.title;
    const contentHash = content.length.toString(); // hash semplice

    if (cache[cacheKey]?.hash === contentHash) continue;

    console.log(`[tldr] Generazione TL;DR per: ${data.title}`);

    try {
      const prompt = `Sei un assistente tecnico. Riassumi questo articolo in 2 frasi concise per un lettore esperto. Rispondi SOLO con le 2 frasi, senza prefissi o etichette.\n\n${content.slice(0, 3000)}`;
      const response = await model.generateContent(prompt);
      const tldr = response.response.text().trim();

      result[cacheKey] = { tldr, hash: contentHash };
      console.log(`[tldr] ✓ ${data.title}`);
    } catch (err) {
      console.error(`[tldr] ✗ Errore per "${data.title}":`, err.message);
    }
  }

  saveCache(result);
  return result;
}