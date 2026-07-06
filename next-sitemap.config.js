const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const BLOG_DIR = path.join(__dirname, "content/blog");

function getBlogPostDates() {
  const dates = {};
  if (!fs.existsSync(BLOG_DIR)) return dates;
  for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))) {
    const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
    const slug = file.replace(/\.mdx$/, "");
    dates[slug] = data.date instanceof Date ? data.date.toISOString() : String(data.date);
  }
  return dates;
}

const blogPostDates = getBlogPostDates();

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://nanopower.it",
  generateRobotsTxt: false,
  exclude: ["/area-tecnici"],
  transform: async (config, url) => {
    const slugMatch = url.match(/^\/blog\/(.+)$/);
    if (slugMatch && blogPostDates[slugMatch[1]]) {
      return {
        loc: url,
        lastmod: blogPostDates[slugMatch[1]],
        changefreq: "monthly",
        priority: 0.7,
      };
    }
    return {
      loc: url,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
