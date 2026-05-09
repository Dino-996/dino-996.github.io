import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import slugify from "slugify";
import markdownIt from "markdown-it";
import fs from "fs";
import path from "path";
import "dotenv/config";

export default function (eleventyConfig) {
  // ============================================
  // = LIQUID CONFIGURATION
  // ============================================
  eleventyConfig.setLiquidOptions({
    jsTruthy: true,
    dynamicPartials: true,
    strictFilters: true,
  });

  // ============================================
  // = NUNJUCKS CONFIGURATION
  // ============================================
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: false,
    autoescape: true,
  });

  // ============================================
  // = PASSTHROUGH COPY
  // ============================================
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy(".nojekyll");

  // ============================================
  // = MARKDOWN CONFIGURATION
  // ============================================
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).disable("image");

  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const href = tokens[idx].attrGet("href");
    if (href && href.startsWith("http")) {
      tokens[idx].attrSet("target", "_blank");
      tokens[idx].attrSet("rel", "noopener noreferrer");
    }
    return defaultRender(tokens, idx, options, env, self);
  };

  // ============================================
  // = LIBRARY & PLUGINS
  // ============================================
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addPlugin(syntaxHighlight);

  // ============================================
  // = FILTERS
  // ============================================
  eleventyConfig.addFilter("markdown", (content) => md.renderInline(content));

  eleventyConfig.addFilter("markdownBlock", (content) => {
    if (!content) return "";
    return md.render(content);
  });

  eleventyConfig.addFilter("dateIso", (date) => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "" : d.toISOString();
  });

  eleventyConfig.addFilter("dateHuman", (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Data non valida";
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(d);
  });

  eleventyConfig.addFilter("excerpt", (post) => {
    if (post.data?.excerpt) return post.data.excerpt;
    if (!post?.templateContent) return "";
    const content = post.templateContent.replace(/(<([^>]+)>)/gi, "").trim();
    return content.length > 160 ? content.slice(0, 160) + "…" : content;
  });

  eleventyConfig.addFilter("slug", (str) => {
    if (!str) return "";
    return slugify(str, {
      lower: true,
      strict: true,
      locale: "it",
      replacement: "-",
      trim: true,
    });
  });

  eleventyConfig.addFilter("jsonParse", function (str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return [];
    }
  });
  
  // ============================================
  // = COLLECTIONS
  // ============================================
  eleventyConfig.addCollection("tagList", function (api) {
    const tags = new Set();
    api.getAll().forEach(item => {
      const raw = item.data.strapiTags;
      if (!raw) return;
      (typeof raw === "string" ? raw.split(",") : raw)
        .map(t => t.trim())
        .filter(t => t && t !== "posts")
        .forEach(t => tags.add(t));
    });
    return [...tags].sort();
  });

  eleventyConfig.addCollection("postsByTag", function (api) {
    const map = {};
    api.getAll().forEach(item => {
      const raw = item.data.strapiTags;
      if (!raw) return;
      (typeof raw === "string" ? raw.split(",") : raw)
        .map(t => t.trim())
        .filter(t => t && t !== "posts")
        .forEach(tag => {
          if (!map[tag]) map[tag] = [];
          map[tag].push(item);
        });
    });
    return map;
  });

  eleventyConfig.addCollection("posts", (collection) =>
    collection
      .getFilteredByTag("posts")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
  );

  // ============================================
  // = SEARCH INDEX
  // ============================================
  let searchIndexCache = [];

  eleventyConfig.addCollection("searchIndex", (collection) => {
    searchIndexCache = collection
      .getFilteredByTag("posts")
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        url: post.url,
        date: new Date(post.data.date),
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    return searchIndexCache;
  });

  eleventyConfig.on("eleventy.after", () => {
    const outPath = path.join("docs", "search.json");
    fs.writeFileSync(outPath, JSON.stringify(searchIndexCache, null, 2), "utf-8");
    console.log(`[search] Scritti ${searchIndexCache.length} post in ${outPath}`);
  });

  // ============================================
  // = CONFIGURATION
  // ============================================
  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes",
    },
  };
}