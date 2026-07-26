import syntaxhighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownit from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import matter from "gray-matter";
import slugify from "slugify";
import path from "path";
import fs from "fs";
import "dotenv/config";

export default function (eleventyConfig) {
    // =========================================
    // = CONFIGURATION
    // =========================================
    // directory sorgente del progetto
    eleventyConfig.setInputDirectory("src");
    // directory di output della build
    eleventyConfig.setOutputDirectory("dist");
    // copia file statici non processati
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy(".nojekill");
    // cartella dei layout/template riutilizzabili
    eleventyConfig.setLayoutsDirectory("_layouts");
    // cartella degli include/parziali
    eleventyConfig.setIncludesDirectory("_includes");
    // cartella dei dati globali
    eleventyConfig.setDataDirectory("_data");
    // formati di template processati da Eleventy
    eleventyConfig.setTemplateFormats(["njk", "html", "md"]);
    // mostra i log di Eleventy durante la build
    eleventyConfig.setQuietMode(true); // Disabilita in produzione
    // configurazione del modello nunjucks
    eleventyConfig.setNunjucksEnvironmentOptions({
        throwOnUndefined: false, // il rendering fallisce se una variabile è indefinita
        autoescape: true, // abilita l'escape automatico per prevenire XSS (solo testo, non JS)
    });

    eleventyConfig.addGlobalData('supabaseUrl', () => process.env.SUPABASE_URL || '');
    eleventyConfig.addGlobalData('supabaseAnonKey', () => process.env.SUPABASE_ANON_KEY || '');
    eleventyConfig.addGlobalData('emailjsPublicKey', () => process.env.EMAILJS_PUBLIC_KEY || '');
    eleventyConfig.addGlobalData('emailjsServiceId', () => process.env.EMAILJS_SERVICE_ID || '');
    eleventyConfig.addGlobalData('emailjsTemplateId', () => process.env.EMAILJS_TEMPLATE_ID || '');

    const repositoryName = "dino-996.github.io";

    // =========================================
    // = MARKDOWN CONFIGURATION
    // =========================================
    const md = markdownit({
        html: true,
        breaks: true,
        linkify: true
    }).disable("image");

    md.use(markdownItAnchor, {
        slugify: (s) => slugify(s, { lower: true, strict: true }),
        tabIndex: false,
    });

    const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    }

    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        const href = tokens[idx].attrGet("href");
        if (href && href.startsWith("http")) {
            tokens[idx].attrSet("target", "_blank");
            tokens[idx].attrSet("rel", "noopener noreferer")
        }
        return defaultRender(tokens, idx, options, env, self);
    }

    // =========================================
    // = LIBRARY CONFIGURATION
    // =========================================
    eleventyConfig.setLibrary("md", md);
    eleventyConfig.addPlugin(syntaxhighlight);

    // =========================================
    // = LINTER
    // =========================================
    eleventyConfig.addLinter("valida-post", function (_content, inputPath) {
        if (!inputPath.includes("/posts/") || inputPath.includes("post.njk")) {
            return;
        }

        const fileContent = fs.readFileSync(inputPath, "utf-8");
        const { data } = matter(fileContent);

        const campiObbligatori = ["title", "description", "date"];
        campiObbligatori.forEach((campo) => {
            if (!data[campo]) {
                console.warn(`${campo} mancante in ${inputPath}`)
            }
        });
    });

    // =========================================
    // = FILTERS
    // =========================================
    eleventyConfig.addFilter("markdown", (content) => {
        return md.renderInline(content);
    });

    eleventyConfig.addFilter("markdownBlock", (content) => {
        if (!content) {
            return "";
        }
        return md.render(content);
    });

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

    eleventyConfig.addFilter("excerpt", (post) => {
        if (post.data?.excerpt) {
            return post.data.excerpt;
        }
        if (!post?.templateContent) {
            return "";
        }
        const content = post.templateContent.replace(/(<([^>]+)>)/gi, "").trim();
        return content.length > 160 ? content.slice(0, 160) + "..." : content;
    });

    eleventyConfig.addFilter("slug", (str) => {
        if (!str) {
            return "";
        }
        return slugify(str, {
            lower: true,
            strict: true,
            locale: "it",
            replacement: "-",
            trim: true
        });
    });

    eleventyConfig.addFilter("json", (value) => {
        return JSON.stringify(value);
    });

    eleventyConfig.addFilter("limit", (arr, limit) => {
        if (!Array.isArray(arr)) return [];
        return arr.slice(0, limit);
    });

    eleventyConfig.addFilter("courseForUrl", (courses, url) => {
        if (!Array.isArray(courses)) return null;
        for (const c of courses) {
            if (!Array.isArray(c.posts)) continue;
            for (const p of c.posts) {
                if (p.url === url) return c;
            }
        }
        return null;
    });

    eleventyConfig.addFilter("absoluteImageUrl", (url, baseUrl) => {
        if (!url) return "";
        if (url.startsWith("http")) return url;
        const separator = baseUrl.endsWith("/") ? "" : "/";
        return baseUrl + separator + url.replace(/^\//, "");
    });

    // =========================================
    // = COLLECTIONS
    // =========================================
    eleventyConfig.addCollection("tagList", function (collection) {
        const tagSet = new Set();
        collection.getAll().forEach(item => {
            const eleventyTags = item.data.tags ?? [];
            if (Array.isArray(eleventyTags)) {
                eleventyTags.filter(t => t !== "posts").forEach(t => tagSet.add(t));
            }
            const strapiTags = item.data.strapiTags ?? "";
            if (typeof strapiTags === "string" && strapiTags) {
                strapiTags.split(",").map(t => t.trim()).filter(Boolean).forEach(t => tagSet.add(t));
            }
        });
        return [...tagSet].sort();
    });

    eleventyConfig.addCollection("posts", function (collection) {
        return collection.getFilteredByTag("posts").sort((a, b) => {
            const dateA = a.data.postDate ? new Date(a.data.postDate) : a.date;
            const dateB = b.data.postDate ? new Date(b.data.postDate) : b.date;
            return dateB - dateA;
        });
    });

    let searchIndexCache = [];
    eleventyConfig.addCollection("searchIndex", (collection) => {
        searchIndexCache = collection.getFilteredByTag("posts").map((post) => {
            const postDate = post.data.postDate ? new Date(post.data.postDate) : post.date;
            return {
                title: post.data.title ?? "",
                url: post.url,
                description: post.data.description ?? "",
                date: postDate instanceof Date ? postDate.toISOString() : new Date(postDate).toISOString()
            };
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
        return searchIndexCache;
    });

    // =========================================
    // = TRANSFORMS
    // =========================================
    eleventyConfig.addTransform("minify-css", async (content, outputPath) => {
        if (outputPath && outputPath.endsWith(".css")) {
            return content
                .replace(/\/\*[\s\S]*?\*\//g, "")
                .replace(/\s+/g, " ")
                .replace(/\s*([{}:;,])\s*/g, "$1")
                .replace(/;}/g, "}")
                .trim();
        }
        return content;
    });

    // Demote first <h1> inside .content to <h2> on post pages (fix duplicate h1)
    eleventyConfig.addTransform("fix-heading-hierarchy", (content, outputPath) => {
        if (outputPath && outputPath.includes("/blog/") && outputPath.endsWith(".html") && !outputPath.includes("/page/")) {
            return content.replace(/<section class="content">([\s\S]*?)<\/section>/, (match) => {
                return match.replace(/<h1 /, '<h2 ').replace(/<\/h1>/, '</h2>');
            });
        }
        return content;
    });

    // =========================================
    // = POST-BUILD
    // =========================================
    eleventyConfig.on("eleventy.after", () => {
        // Minify CSS in dist
        const cssDir = path.join("dist", "assets", "css");
        if (fs.existsSync(cssDir)) {
            const files = fs.readdirSync(cssDir).filter(f => f.endsWith(".css"));
            for (const file of files) {
                const filePath = path.join(cssDir, file);
                let content = fs.readFileSync(filePath, "utf-8");
                const minified = content
                    .replace(/\/\*[\s\S]*?\*\//g, "")
                    .replace(/\s+/g, " ")
                    .replace(/\s*([{}:;,])\s*/g, "$1")
                    .replace(/;}/g, "}")
                    .trim();
                fs.writeFileSync(filePath, minified, "utf-8");
                const saved = content.length - minified.length;
                console.log(`[minify] ${file}: ${content.length} → ${minified.length} bytes (-${saved})`);
            }
        }

        const outPath = path.join("dist", "search.json");
        fs.writeFileSync(outPath, JSON.stringify(searchIndexCache, null, 2), "utf-8");
        console.log(`[search] Scritti ${searchIndexCache.length} post in ${outPath}`);
    });

    return {
        dir: {
            // motore del modello markdown
            markdownTemplateEngine: "njk",
            // motore del modello html
            htmlTemplateEngine: "njk",
            // prefisso base degli URL quando il sito è distribuito
            pathPrefix: "",
        }
    }
}