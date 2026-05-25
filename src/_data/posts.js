import 'dotenv/config';
import process from "process";

export default async function () {
    const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
    const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

    try {
        const res = await fetch(
            `${STRAPI_URL}/api/posts?locale=it&populate=*`,
            {
                headers: {
                    Authorization: `Bearer ${STRAPI_TOKEN}`,
                    'Content-Type': 'application/json'
                },
            }
        );

        if (!res.ok) {
            console.error('[posts] Errore Strapi:', res.status);
            return [];
        }

        const { data } = await res.json();

        if (!data || data.length === 0) {
            console.warn("[posts] Nessun dato ricevuto da Strapi");
            return [];
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

            return {
                layout: 'layouts/post.njk',
                title: a.title ?? 'Senza Titolo',
                description: a.description ?? '',
                tags: ['posts', ...flatTags],
                strapiTags: displayFlatTags.join(","),
                displayTags: displayFlatTags.join(","),
                date: postDate,
                updatedAt: a.updatedAt ? new Date(a.updatedAt) : null,
                excerpt: a.excerpt ?? '',
                slug: a.slug ?? `post-${item.id}`,
                content: a.content ?? '',
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
        return [];
    }
}