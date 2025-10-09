import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const articles = await getCollection('articles', ({ data }) => {
    // Exclude drafts in production
    return import.meta.env.PROD ? !data.draft : true;
  });

  const searchData = articles.map((article) => ({
    id: article.id.replace('.md', ''),
    title: article.data.title,
    description: article.data.description || '',
    tags: article.data.tags || [],
    content: (article.body || '').substring(0, 500), // First 500 chars
    url: `/articles/${article.id.replace('.md', '')}`,
  }));

  return new Response(JSON.stringify(searchData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
