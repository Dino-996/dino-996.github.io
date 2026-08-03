import slugify from "slugify";

export function decodeHtml(str) {
    if (!str) return str;
    return str.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

export function slugifyIt(str) {
    if (!str) return "";
    return slugify(str, {
        lower: true,
        strict: true,
        locale: "it",
        replacement: "-",
        trim: true
    });
}

export function emptyPost() {
    return {
        permalink: false,
        title: '',
        description: '',
        tags: [],
        strapiTags: '',
        date: new Date(),
        updatedAt: null,
        excerpt: '',
        slug: '_empty',
        content: '',
        author: '',
        authorAvatar: null,
        image: null,
        imageAlt: '',
        url: '',
    };
}
