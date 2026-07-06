"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORY_COLORS, type Category, type PostMeta } from "@/lib/blog-constants";
import NewsletterForm from "@/components/NewsletterForm";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
}

function CategoryBadge({ category }: { category: Category }) {
  const color = CATEGORY_COLORS[category];
  return (
    <span
      className="inline-flex items-center gap-1.5 border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
      style={{ borderColor: `${color}66`, backgroundColor: `${color}1A`, color }}
    >
      {category}
    </span>
  );
}

function BlogCard({ post }: { post: PostMeta }) {
  const color = CATEGORY_COLORS[post.category];
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-nano-teal"
    >
      <div
        className="h-36 w-full"
        style={{ background: `linear-gradient(135deg, ${color}33 0%, #0D1F33 100%)` }}
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <CategoryBadge category={post.category} />
        <h3 className="line-clamp-2 text-lg font-bold text-white group-hover:text-nano-teal">{post.title}</h3>
        <p className="line-clamp-3 flex-1 text-sm text-nano-slate">{post.excerpt}</p>
        <div className="flex items-center gap-2 text-xs text-nano-slate/70">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTimeText}</span>
        </div>
        <span className="text-sm font-semibold text-white group-hover:text-nano-teal">Leggi l&apos;articolo →</span>
      </div>
    </Link>
  );
}

export default function BlogList({
  posts,
  categoriesWithCount,
}: {
  posts: PostMeta[];
  categoriesWithCount: { category: Category; count: number }[];
}) {
  const [activeCategory, setActiveCategory] = useState<Category | "Tutti">("Tutti");

  const filtered = useMemo(
    () => (activeCategory === "Tutti" ? posts : posts.filter((p) => p.category === activeCategory)),
    [posts, activeCategory]
  );

  const featured = useMemo(() => posts.filter((p) => p.featured), [posts]);

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_280px]">
      <div>
        <div className="flex flex-wrap gap-2">
          {(["Tutti", ...categoriesWithCount.map((c) => c.category)] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`border px-4 py-1.5 text-sm transition-colors ${
                activeCategory === cat
                  ? "border-nano-teal bg-nano-teal/10 text-white"
                  : "border-white/15 text-nano-slate hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-nano-slate">Nessun articolo in questa categoria.</p>
        )}
      </div>

      <aside className="hidden flex-col gap-8 lg:flex">
        {featured.length > 0 && (
          <div>
            <p className="mb-3 text-xs nano-tracking-label uppercase text-nano-slate/70">Articoli in evidenza</p>
            <div className="flex flex-col gap-3">
              {featured.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="text-sm text-white hover:text-nano-teal">
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="mb-3 text-xs nano-tracking-label uppercase text-nano-slate/70">Categorie</p>
          <div className="flex flex-col gap-2">
            {categoriesWithCount.map(({ category, count }) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className="flex items-center justify-between text-sm text-nano-slate hover:text-white"
              >
                <span>{category}</span>
                <span className="text-nano-slate/60">{count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border border-white/10 p-5">
          <NewsletterForm />
        </div>
      </aside>
    </div>
  );
}
