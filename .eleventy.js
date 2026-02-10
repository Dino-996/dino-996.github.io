import slugify from "slugify";

export default function(eleventyConfig) {
  // Copia assets
  eleventyConfig.addPassthroughCopy("src/assets");

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

  // Collection tags
  eleventyConfig.addCollection("tagsList", collection => {
    const tagsSet = new Set();
    collection.getAll().forEach(item => {
      if ("tags" in item.data) {
        item.data.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    return [...tagsSet].sort();
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes"
    }
  };
};