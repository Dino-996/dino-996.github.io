import 'dotenv/config';
import process from "process";

async function fetchWithRetry(url, options, retries = 3, baseDelay = 1500) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, options);
            if (res.ok) return res;
            console.warn(`[posts] Tentativo ${i + 1}/${retries} fallito (${res.status}), riprovo...`);
        } catch (err) {
            if (i === retries - 1) throw err;
            console.warn(`[posts] Tentativo ${i + 1}/${retries} fallito: ${err.message}, riprovo...`);
        }
        await new Promise(r => setTimeout(r, baseDelay * Math.pow(2, i)));
    }
    throw new Error('Tutti i tentativi di connessione a Strapi sono falliti');
}

export default async function () {
    const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
    const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

    try {
        const res = await fetchWithRetry(
            `${STRAPI_URL}/api/posts?locale=it&populate=*`,
            {
                headers: {
                    Authorization: `Bearer ${STRAPI_TOKEN}`,
                    'Content-Type': 'application/json'
                },
            }
        );

        const { data } = await res.json();

        if (!data || data.length === 0) {
            console.warn("[posts] Nessun dato ricevuto da Strapi");
            return [{
                permalink: false,
                title: '',
                description: '',
                tags: [],
                strapiTags: '',
                displayTags: '',
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
            }];
        }

        const data_map = data.map((item) => {
            const a = item;
            const tagsArray = Array.isArray(a.tags) ? a.tags : [];
            const flatTags = tagsArray.flatMap(t => typeof t === "string" ? t.split(",").map(s => s.trim()).filter(Boolean) : [t]);
            const displayFlatTags = flatTags.filter(t => t !== "posts");
            const postDate = (() => {
                if (a.date) return new Date(a.date);
                if (a.publishedAt) return new Date(a.publishedAt);
                return new Date();
            })();

            const courseName = a.course || null;

            return {
                layout: 'layouts/post.njk',
                title: a.title ?? 'Senza Titolo',
                description: a.description ?? '',
                tags: ['posts', ...flatTags],
                strapiTags: displayFlatTags.join(","),
                displayTags: displayFlatTags.join(","),
                course: courseName,
                date: postDate,
                updatedAt: a.updatedAt ? new Date(a.updatedAt) : null,
                excerpt: a.excerpt ?? '',
                slug: a.slug ?? `post-${item.id}`,
                content: a.content ?? '',
                author: a.author ?? 'Davide Sabia',
                authorAvatar: a.authorAvatar?.url
                    ? a.authorAvatar.url
                    : a.authorAvatar?.data?.attributes?.url
                        ? (a.authorAvatar.data.attributes.url.startsWith('http')
                            ? a.authorAvatar.data.attributes.url
                            : `${STRAPI_URL}${a.authorAvatar.data.attributes.url}`)
                        : null,
                image: a.image?.url
                    ? a.image.url
                    : a.image?.data?.attributes?.url
                        ? (a.image.data.attributes.url.startsWith('http')
                            ? a.image.data.attributes.url
                            : `${STRAPI_URL}${a.image.data.attributes.url}`)
                        : null,
                imageAlt: a.imageAlt ?? 'Immagine di copertina',
                url: `/blog/${a.slug ?? item.id}/`,
            };
        }).sort((a, b) => b.date - a.date);

        return data_map;

    } catch (err) {
        console.error('[posts] Fetch fallito:', err.message);
        return [{
            permalink: false,
            title: '',
            description: '',
            tags: [],
            strapiTags: '',
            displayTags: '',
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
        }];
    }
}