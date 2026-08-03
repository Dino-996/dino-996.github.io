import test from "node:test";
import assert from "node:assert/strict";
import eleventyConfigFn from "../eleventy.config.js";

function loadConfig() {
    const registrations = { filters: {}, collections: {} };
    const eleventyConfig = new Proxy({}, {
        get(target, prop) {
            if (prop === "addFilter") return (name, fn) => { registrations.filters[name] = fn; };
            if (prop === "addCollection") return (name, fn) => { registrations.collections[name] = fn; };
            return () => {};
        }
    });
    eleventyConfigFn(eleventyConfig);
    return registrations;
}

test("il config esporta una funzione Eleventy valida", () => {
    assert.equal(typeof eleventyConfigFn, "function");
});

test("i filtri registrati rispettano i contratti", () => {
    const { filters } = loadConfig();

    assert.equal(filters.dateIso(undefined), "");
    assert.equal(filters.dateIso("2026-01-05"), "2026-01-05T00:00:00.000Z");
    assert.match(filters.dateHuman("2026-01-05"), /gennaio/);

    const site = "https://dino-996.github.io";
    assert.equal(filters.absoluteImageUrl("https://res.cloudinary.com/x.png", site), "https://res.cloudinary.com/x.png");
    assert.equal(filters.absoluteImageUrl("/img.png", site), "https://dino-996.github.io/img.png");
    assert.equal(filters.absoluteImageUrl("", site), "");

    assert.equal(filters.slug("Sistemi Operativi"), "sistemi-operativi");
    assert.deepEqual(filters.limit([1, 2, 3], 2), [1, 2]);
    assert.deepEqual(filters.limit("not-array", 2), []);

    assert.equal(filters.markdown("**ciao**"), "<strong>ciao</strong>");
    assert.equal(filters.markdownBlock(""), "");
});

test("courseForUrl trova il corso per URL del post", () => {
    const { filters } = loadConfig();
    const courses = [
        { name: "Sistemi Operativi", posts: [{ url: "/blog/a/" }, { url: "/blog/b/" }] },
        { name: "Reti", posts: [{ url: "/blog/c/" }] },
    ];
    assert.equal(filters.courseForUrl(courses, "/blog/b/").name, "Sistemi Operativi");
    assert.equal(filters.courseForUrl(courses, "/blog/nope/"), null);
    assert.equal(filters.courseForUrl(null, "/blog/a/"), null);
});
