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

            return {
                layout: 'layouts/post.njk',
                title: a.title ?? 'Senza Titolo',
                description: a.description ?? '',
                tags: ['posts', ...flatTags],
                strapiTags: flatTags.join(","),
                date: (() => {
                    if (a.date) return new Date(a.date);
                    if (a.publishedAt) return new Date(a.publishedAt);
                    return new Date();
                })(),
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
        });

        return data_map;

    } catch (err) {
        console.error('[posts] Fetch fallito:', err.message);
        return [];
    }
}