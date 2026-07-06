import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/blog";
import { CATEGORY_COLORS } from "@/lib/blog-constants";
import { mdxComponents } from "@/components/mdx-components";
import ReadingProgressBar from "@/components/ReadingProgressBar";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.meta.title} | nanopower.it`,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: "article",
      publishedTime: post.meta.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { meta, content } = post;
  const related = getRelatedPosts(meta.category, meta.slug);
  const color = CATEGORY_COLORS[meta.category];
  const siteUrl = "https://nanopower.it";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    author: { "@type": "Person", name: meta.author },
    publisher: { "@type": "Organization", name: "nanopower.it" },
    mainEntityOfPage: `${siteUrl}/blog/${meta.slug}`,
  };

  return (
    <div className="flex flex-col">
      <ReadingProgressBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1fr_280px]">
        <article>
          <div className="flex items-center gap-3 text-xs">
            <span
              className="border px-2.5 py-1 font-semibold uppercase tracking-wide"
              style={{ borderColor: `${color}66`, backgroundColor: `${color}1A`, color }}
            >
              {meta.category}
            </span>
            <span className="text-nano-slate/70">{formatDate(meta.date)}</span>
            <span className="text-nano-slate/70">·</span>
            <span className="text-nano-slate/70">{meta.readingTimeText}</span>
          </div>

          <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">{meta.title}</h1>
          <p className="mt-3 text-base italic text-nano-slate">{meta.excerpt}</p>
          <p className="mt-4 text-sm text-white">di {meta.author}</p>

          <div className="prose prose-invert prose-teal mt-10 max-w-none prose-headings:font-black prose-a:text-nano-teal">
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-4 border border-nano-teal/40 bg-nano-teal/5 p-6">
            <p className="text-sm font-semibold text-white">Hai domande su questo argomento?</p>
            <Link
              href="/richiedi-info"
              className="bg-nano-teal px-4 py-2.5 text-center text-sm font-semibold text-nano-navy transition-opacity hover:opacity-90"
            >
              Parla con un tecnico
            </Link>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-white/10 py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="text-xl font-black text-white sm:text-2xl">Articoli correlati</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group border border-white/10 p-5 transition-colors hover:border-nano-teal"
                >
                  <h3 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-nano-teal">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-xs text-nano-slate/70">{formatDate(r.date)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
