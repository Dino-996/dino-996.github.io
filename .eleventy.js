import slugify from "slugify";
import markdownIt from "markdown-it";

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

  // Link esterni
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const href = tokens[idx].attrGet("href");
    if (href && href.startsWith("http")) {
      tokens[idx].attrSet("target", "_blank");
      tokens[idx].attrSet("rel", "noopener noreferrer"); // sicurezza
    }
    return defaultRender(tokens, idx, options, env, self);
  };

  // ============================================
  // = LINTER
  // ============================================
  eleventyConfig.addLinter("valida-post", function (_content, inputPath) {
    if (!inputPath.includes("/posts/")) return;

    const campiObbligatori = ["title", "description", "date"];
    campiObbligatori.forEach((campo) => {
      if (!this.page?.[campo] && !this.data?.[campo]) {
        console.warn(`⚠️  "${campo}" mancante in ${inputPath}`);
      }
    });
  });

  // ============================================
  // = FILTERS
  // ============================================

  // Markdown inline rendering
  eleventyConfig.addFilter("markdown", (content) => {
    return md.renderInline(content);
  });

  // Date filters
  eleventyConfig.addFilter("dateIso", (date) => {
    if (!date) {
      return "";
    }
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("dateHuman", (date) => {
    if (!date) {
      return "Data non disponibile.";
    }
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(new Date(date));
  });

  // Excerpt filter
  eleventyConfig.addFilter("excerpt", (post) => {

    if (post.data?.excerpt) {
      return post.data.excerpt;
    }
    if (!post) {
      return "";
    }
    if (!post.templateContent) {
      return "";
    }
    const content = post.templateContent.replace(/(<([^>]+)>)/gi, "").trim();
    return content.length > 160 ? content.slice(0, 160) + "…" : content;
  });

  // Safe slug filter
  eleventyConfig.addFilter("slug", (str) => {
    if (!str) return "";
    return slugify(str, {
      lower: true,
      strict: true,
      locale: "it", // gestione accenti italiani
      replacement: "-",
      trim: true // rimuove trattini iniziali / finali
    });
  });

  // ============================================
  // = COLLECTIONS
  // ============================================

  // Posts collection (sorted by date, newest first)
  eleventyConfig.addCollection("posts", (collection) => {
    return collection
      .getFilteredByTag("posts")
      .sort((a, b) => b.date - a.date);
  });

  // Tags collection (exclude "posts" tag)
  eleventyConfig.addCollection("tagsList", (collection) => {
    const tagsSet = new Set();

    collection.getAll().forEach((item) => {
      if ("tags" in item.data) {
        item.data.tags.forEach((tag) => {
          if (tag !== "posts") {
            tagsSet.add(tag);
          }
        });
      }
    });

    return [...tagsSet].sort();
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