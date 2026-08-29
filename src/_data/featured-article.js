// src/_data/featured-article.js
// Dati globali per l'articolo principale nella home page

export default () => {
  return {
    // These are example/placeholder values that will be
    // updated dynamically from Strapi or another data source
    title: "Building Modern Web Applications",
    description: "A deep dive into modern web development practices and patterns that help you create scalable, maintainable, and performant web applications.",
    image: "https://images.unsplash.com/photo-1555066931-8a67ce7d1f82?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Developer working on modern web application with multiple screens showing code",
    url: "/blog/building-modern-web-applications",
    tags: ["Web Development", "JavaScript", "Architecture"],
    publishDate: "2024-01-15",
    author: "Davide Sabia",
    strapiTags: "web-development,javascript,architecture"
  };
};