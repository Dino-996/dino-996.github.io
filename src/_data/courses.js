import posts from "./posts.js";

export default async function () {
    const allPosts = await posts();
    const courseMap = {};

    for (const post of allPosts) {
        const name = post.course;
        if (!name) continue;

        if (!courseMap[name]) {
            courseMap[name] = {
                name,
                slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
                description: `Corso su ${name.toLowerCase()}`,
                posts: [],
            };
        }
        courseMap[name].posts.push(post);
    }

    return Object.values(courseMap).map(c => ({
        ...c,
        postCount: c.posts.length,
        posts: c.posts.sort((a, b) => b.date - a.date),
    })).sort((a, b) => a.name.localeCompare(b.name));
}
