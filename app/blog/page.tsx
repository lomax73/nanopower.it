import type { Metadata } from "next";
import { getAllPosts, getCategoriesWithCount } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog | nanopower.it",
  description:
    "Approfondimenti tecnici su isolamento termico, massetti, impermeabilizzazione e agevolazioni fiscali per l'edilizia.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categoriesWithCount = getCategoriesWithCount();

  return (
    <div className="flex flex-col py-20">
      <div className="mx-auto mb-12 flex w-full max-w-2xl flex-col items-center px-6 text-center">
        <p className="nano-tracking-label text-xs font-light uppercase text-nano-teal">Blog</p>
        <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">Approfondimenti tecnici</h1>
        <p className="mt-4 text-base text-nano-slate">
          Isolamento, massetti, impermeabilizzazione e agevolazioni fiscali spiegati in modo pratico.
        </p>
      </div>

      <BlogList posts={posts} categoriesWithCount={categoriesWithCount} />
    </div>
  );
}
