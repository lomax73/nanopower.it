import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { CATEGORIES, type Category, type PostMeta } from "@/lib/blog-constants";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function readPostFile(filename: string): { meta: PostMeta; content: string } {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    meta: {
      slug,
      title: data.title,
      date: data.date instanceof Date ? data.date.toISOString() : String(data.date),
      author: data.author || "Fabrizio L.",
      category: data.category,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      tags: data.tags || [],
      featured: Boolean(data.featured),
      readingTimeText: `${Math.max(1, Math.round(stats.minutes))} min di lettura`,
    },
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((f) => readPostFile(f).meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readPostFile(`${slug}.mdx`);
}

export function getRelatedPosts(category: Category, excludeSlug: string, limit = 3): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.category === category && p.slug !== excludeSlug)
    .slice(0, limit);
}

export function getCategoriesWithCount(): { category: Category; count: number }[] {
  const posts = getAllPosts();
  return CATEGORIES.map((category) => ({
    category,
    count: posts.filter((p) => p.category === category).length,
  }));
}
