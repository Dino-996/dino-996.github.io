import { GoogleGenerativeAI } from "@google/generative-ai";
import { createHash } from "node:crypto";
import fs from "fs";
import process from "process";
import path from "path";
import posts from "./posts.js";

const CACHE_FILE = ".cache/tldr-cache.json";
const CONCURRENCY = 3;

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

function contentHash(content) {
  return createHash("sha1").update(content).digest("hex").slice(0, 12);
}

async function generateTldr(model, post) {
  const prompt = `Sei un assistente tecnico. Riassumi questo articolo in 2 frasi concise per un lettore esperto. Rispondi SOLO con le 2 frasi, senza prefissi o etichette.\n\n${post.content.slice(0, 3000)}`;
  const response = await model.generateContent(prompt);
  return response.response.text().trim();
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function run() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

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

  const pending = allPosts
    .filter(post => post.title && post.content)
    .filter(post => cache[post.title]?.hash !== contentHash(post.content));

  await mapWithConcurrency(pending, CONCURRENCY, async (post) => {
    console.log(`[tldr] Generazione TL;DR per: ${post.title}`);
    try {
      const tldr = await generateTldr(model, post);
      result[post.title] = { tldr, hash: contentHash(post.content) };
      console.log(`[tldr] OK ${post.title}`);
    } catch (err) {
      console.error(`[tldr] Errore per "${post.title}":`, err.message);
    }
  });

  if (pending.length > 0) {
    saveCache(result);
  }
  return result;
}
