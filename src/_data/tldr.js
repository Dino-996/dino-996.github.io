import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import process from "process";
import path from "path";
import posts from "./posts.js";

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

console.log("[tldr] Il file tldr.js è stato caricato da Eleventy!");

export default async function () {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.warn("[tldr] GEMINI_API_KEY non trovata, skip generazione TL;DR.");
    return {};
  }

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const cache = loadCache();
  const result = { ...cache };

  const allPosts = await posts();
  if (!Array.isArray(allPosts) || allPosts.length === 0) {
    console.warn("[tldr] Nessun post disponibile da posts.js");
    return result;
  }

  for (const post of allPosts) {
    if (!post.title) continue;

    const cacheKey = post.title;
    const content = post.content || "";
    const contentHash = content.length.toString();
    if (cache[cacheKey]?.hash === contentHash) continue;

    console.log(`[tldr] Generazione TL;DR per: ${post.title}`);

    try {
      const prompt = `Sei un assistente tecnico. Riassumi questo articolo in 2 frasi concise per un lettore esperto. Rispondi SOLO con le 2 frasi, senza prefissi o etichette.\n\n${content.slice(0, 3000)}`;
      const response = await model.generateContent(prompt);
      const tldr = response.response.text().trim();

      result[cacheKey] = { tldr, hash: contentHash };
      console.log(`[tldr] ✓ ${post.title}`);
    } catch (err) {
      console.error(`[tldr] ✗ Errore per "${post.title}":`, err.message);
    }
  }

  saveCache(result);
  return result;
}
