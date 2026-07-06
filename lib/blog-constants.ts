export const CATEGORIES = [
  "Isolamento",
  "Massetti",
  "Impermeabilizzazione",
  "Normative",
  "Agevolazioni",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_COLORS: Record<Category, string> = {
  Isolamento: "#00A896",
  Massetti: "#3B82F6",
  Impermeabilizzazione: "#8B5CF6",
  Normative: "#94A3B8",
  Agevolazioni: "#FFD166",
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: Category;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  featured: boolean;
  readingTimeText: string;
};
