import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import matter from "gray-matter";
import slugify from "slugify";
import markdownIt from "markdown-it";
import fs from "fs";
import path from "path";

export default function (eleventyConfig) {
  // ============================================
  // = LIQUID CONFIGURATION
  // ============================================
  eleventyConfig.setLiquidOptions({
    jsTruthy: true,
    dynamicPartials: true,
    strictFilters: true
  });

  // ============================================
  // = NUJUCKS CONFIGURATION
  // ============================================
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: false,
    autoescape: true
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
    linkify: true
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
  // = PLUGIN
  // ============================================
  eleventyConfig.addPlugin(syntaxHighlight);

  // ============================================
  // = LINTER
  // ============================================
eleventyConfig.addLinter("valida-post", function (_content, inputPath) {
  if (!inputPath.includes("/posts/")) return;

  const fileContent = fs.readFileSync(inputPath, "utf-8");
  const { data } = matter(fileContent);

  const campiObbligatori = ["title", "description", "date"];
  campiObbligatori.forEach((campo) => {
    if (!data[campo]) {
      console.warn(`⚠️  "${campo}" mancante in ${inputPath}`);
    }
  });
});

  // ============================================
  // = FILTERS
  // ============================================
  eleventyConfig.addFilter("markdown", (content) => {
    return md.renderInline(content);
  });

  eleventyConfig.addFilter("dateIso", (date) => {
    if (!date) return "";
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("dateHuman", (date) => {
    if (!date) return "Data non disponibile.";
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(new Date(date));
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
      trim: true
    });
  });

  // ============================================
  // = COLLECTIONS
  // ============================================
  eleventyConfig.addCollection("posts", (collection) => {
    return collection
      .getFilteredByTag("posts")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("tagsList", (collection) => {
    const tagsSet = new Set();
    collection.getAll().forEach((item) => {
      if ("tags" in item.data) {
        item.data.tags.forEach((tag) => {
          if (tag !== "posts") tagsSet.add(tag);
        });
      }
    });
    return [...tagsSet].sort();
  });

  // ============================================
  // = SEARCH INDEX
  // ============================================
  let searchIndexCache = [];

  eleventyConfig.addCollection("searchIndex", (collection) => {
    searchIndexCache = collection
      .getFilteredByTag("posts")
      .sort((a, b) => b.date - a.date)
      .map((post) => ({
        title: post.data.title ?? "",
        url: post.url,
        description: post.data.description ?? "",
        date: post.date ? post.date.toISOString() : ""
      }));
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
      includes: "_includes"
    }
  };
}