import type { CollectionEntry } from "astro:content";

export interface SearchIndexItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  content: string;
  date: string;
  url: string;
}

/**
 * Generate search index from posts
 */
export function generateSearchIndex(
  posts: CollectionEntry<"articles">[],
  baseUrl: string
): SearchIndexItem[] {
  return posts
    .filter((post) => !post.data.draft)
    .map((post) => {
      // Extract first 500 chars of content for search
      const plainContent = post.body
        ? post.body
            .replace(/```[\s\S]*?```/g, "") // Remove code blocks
            .replace(/#+ /g, "") // Remove heading markers
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Convert links to text
            .slice(0, 500)
        : "";

      return {
        id: post.id.replace(".md", ""),
        title: post.data.title,
        description: post.data.description || "",
        tags: post.data.tags,
        content: plainContent,
        date: post.data.date?.toISOString() || "",
        url: `${baseUrl}/articles/${post.id.replace(".md", "")}`,
      };
    });
}

/**
 * Client-side search configuration for Fuse.js
 */
export const SEARCH_CONFIG = {
  keys: [
    { name: "title", weight: 3 },
    { name: "description", weight: 2 },
    { name: "tags", weight: 2 },
    { name: "content", weight: 1 },
  ],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
};
