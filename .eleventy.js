import slugify from "slugify";

export default function(eleventyConfig) {
  // Copia assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Copia il file .nojekyll
  eleventyConfig.addPassthroughCopy(".nojekyll");

  // Filtri date
  eleventyConfig.addFilter("dateIso", date => new Date(date).toISOString());
  eleventyConfig.addFilter("dateHuman", date => 
    new Intl.DateTimeFormat("it-IT", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(date))
  );

  // Filtro excerpt
  eleventyConfig.addFilter("excerpt", post => {
    if (post.data.excerpt) return post.data.excerpt;
    const content = post.templateContent.replace(/(<([^>]+)>)/gi, "").trim();
    return content.length > 160 ? content.slice(0,160) + "…" : content;
  });

  // Filtro slug sicuro
  eleventyConfig.addFilter("slug", str => {
    if (!str) return "";
    return slugify(str, { lower: true, strict: true });
  });

  // Collection posts
  eleventyConfig.addCollection("posts", collection => 
    collection.getFilteredByTag("posts").sort((a,b) => b.date - a.date)
  );

  // Collection tags (escludi "posts" dai tag)
  eleventyConfig.addCollection("tagsList", collection => {
    const tagsSet = new Set();
    collection.getAll().forEach(item => {
      if ("tags" in item.data) {
        item.data.tags.forEach(tag => {
          // Escludi "posts" dalla lista dei tag
          if (tag !== "posts") {
            tagsSet.add(tag);
          }
        });
      }
    });
    return [...tagsSet].sort();
  });

  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes"
    }
  };
};