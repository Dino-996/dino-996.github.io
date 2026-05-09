import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import process from "process";

const CACHE_FILE = ".cache/tldr-cache.json";
const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

function hashContent(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

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

async function fetchStrapiPosts() {
  if (!STRAPI_TOKEN) {
    console.warn("[tldr] STRAPI_TOKEN non trovato, impossibile recuperare i post.");
    return [];
  }

  try {
    const res = await fetch(`${STRAPI_URL}/api/posts?locale=it&populate=*`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("[tldr] Errore Strapi:", res.status);
      return [];
    }

    const { data } = await res.json();
    return data ?? [];
  } catch (err) {
    console.error("[tldr] Fetch Strapi fallito:", err.message);
    return [];
  }
}

export default async function () {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.warn("[tldr] GEMINI_API_KEY non trovata, uso cache esistente.");
    return loadCache();
  }

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

  const cache = loadCache();
  const posts = await fetchStrapiPosts();

  if (posts.length === 0) {
    console.warn("[tldr] Nessun post da Strapi, uso cache esistente.");
    return cache;
  }

  const result = { ...cache };

  for (const item of posts) {
    const title = item.title;
    const content = item.content ?? "";

    if (!title || !content) continue;

    const contentHash = hashContent(content.slice(0, 5000));
    if (cache[title]?.hash === contentHash) continue;

    console.log(`[tldr] Generazione TL;DR per: ${title}`);

    try {
      const prompt = `
      Sei un assistente tecnico. 
      Riassumi questo articolo in 2 frasi concise per un lettore esperto. 
      Rispondi SOLO con le 2 frasi, senza prefissi o etichette.\n\n${content.slice(0, 3000)}`;
      const response = await model.generateContent(prompt);
      const tldr = response.response.text().trim();

      result[title] = { tldr, hash: contentHash };
      console.log(`[tldr] ✓ ${title}`);
    } catch (err) {
      console.error(`[tldr] ✗ Errore per "${title}":`, err.message);
    }
  }

  saveCache(result);
  return result;
}