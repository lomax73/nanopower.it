import type { MDXComponents } from "mdx/types";

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 border-l-4 border-nano-teal bg-nano-teal/5 px-5 py-4 text-sm text-white">
      {children}
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  Callout,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-nano-teal/40 pl-4 italic text-nano-slate" {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
};
