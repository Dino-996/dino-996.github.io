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

    console.log("\fData di creazione:", Date(JSON.stringify(data[0].date, null, 2)), "\f");
    console.log("--- DEBUG STRAPI DATA (dettaglio) ---");
    if (data && data[0]) {
      console.dir(data[0], { depth: null, colors: true });
    }
    console.log("--------------------------------------");

    if (!data || data.length === 0) {
      console.warn("[posts] Nessun dato ricevuto da Strapi");
      return [];
    }

    const data_map = data.map((item) => {
      const a = item;
      const tagsArray = Array.isArray(a.tags) ? a.tags : [];
      const flatTags = tagsArray.flatMap(t => typeof t === "string" ? t.split(",").map(s => s.trim()).filter(Boolean) : [t]);
      const d = new Date(a.date);

      return {
        layout: 'layouts/post.njk',
        title: a.title || 'Senza titolo',
        description: a.description ?? '',
        tags: ['posts', ...flatTags],
        strapiTags: flatTags.join(","),
        date: (() => {
          // Usa il campo 'date' se esiste e non è vuoto
          if (a.date && typeof a.date === 'string' && a.date.trim() !== '') {
            const d = new Date(a.date);
            console.log(`✅ Data da 'date' per "${a.title}": ${d.toISOString()}`);
            return d;
          }
          if (a.publishedAt) {
            console.log(`⚠️ Data da 'publishedAt' per "${a.title}": ${new Date(a.publishedAt).toISOString()}`);
            return new Date(a.publishedAt);
          }
          if (a.createdAt) {
            console.log(`⚠️ Data da 'createdAt' per "${a.title}": ${new Date(a.createdAt).toISOString()}`);
            return new Date(a.createdAt);
          }
          console.warn(`❌ Nessuna data valida per "${a.title}", uso oggi`);
          return new Date();
        })(),
        excerpt: a.excerpt ?? '',
        slug: a.slug || `post-${item.id}`,
        content: a.content ?? '',
        image: a.image?.url
          ? a.image.url
          : a.image?.data?.attributes?.url
            ? (a.image.data.attributes.url.startsWith('http')
              ? a.image.data.attributes.url
              : `${STRAPI_URL}${a.image.data.attributes.url}`)
            : null,
        imageAlt: a.imageAlt ?? 'Immagine generata con AI',
        authorAvatar: a.authorAvatar.url ? a.authorAvatar.url : (a.authorAvatar.data?.attributes?.url ? `${STRAPI_URL}${a.authorAvatar.data.attributes.url}` : null),
        author: a.author ?? 'Autore sconosciuto',
        url: `/blog/${a.slug || item.id}/`,
      };
    });

    return data_map;

  } catch (err) {
    console.error('[posts] Fetch fallito:', err.message);
    return [];
  }
}