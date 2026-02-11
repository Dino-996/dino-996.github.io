import slugify from "slugify";
import markdownIt from "markdown-it";

export default function (eleventyConfig) {
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
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("dateHuman", (date) => {
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(new Date(date));
  });

  // Excerpt filter
  eleventyConfig.addFilter("excerpt", (post) => {
    if (post.data.excerpt) return post.data.excerpt;
    const content = post.templateContent.replace(/(<([^>]+)>)/gi, "").trim();
    return content.length > 160 ? content.slice(0, 160) + "…" : content;
  });

  // Safe slug filter
  eleventyConfig.addFilter("slug", (str) => {
    if (!str) return "";
    return slugify(str, { lower: true, strict: true });
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