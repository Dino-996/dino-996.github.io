import 'dotenv/config';

async function createPost() {
  const url = process.env.STRAPI_URL;
  const token = process.env.STRAPI_TOKEN;

  const newPost = {
    data: {
      title: "Test Buffer Overflow Locale " + Date.now(),
      slug: "test-buffer-overflow-locale-" + Date.now(),
      description: "Test description",
      excerpt: "Test excerpt",
      date: "2026-03-01",
      author: "Davide Sabia",
      layout: "layouts/post.njk",
      content: "# Test Content",
      tags: ["cybersecurity"]
    }
  };

  const res = await fetch(`${url}/api/posts?locale=it`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(newPost)
  });
  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Body:', text);
}

createPost();
