import rss from '@astrojs/rss';

const postsImport = import.meta.glob('../content/posts/*.md', {
  eager: true
});

export async function GET(context) {
  const posts = Object.entries(postsImport).map(([path, mod]) => ({
    file: path,
    frontmatter: mod.frontmatter || {}
  }));

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.frontmatter.pubDate).getTime() - new Date(a.frontmatter.pubDate).getTime()
  );

  return rss({
    title: "lhy 的笔记",
    description: "lhy 的个人博客，记录技术学习笔记与生活感悟",
    site: context.site || "https://linhongyu3.github.io",
    items: sortedPosts.map((post) => {
      const slug = post.file.split('/').pop().replace('.md', '');
      return {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        pubDate: new Date(post.frontmatter.pubDate),
        link: `/blog/${slug}/`
      };
    }),
    customData: `<language>zh-CN</language>`
  });
}
