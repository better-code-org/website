import { getCollection } from 'astro:content';

export async function GET(context) {
  const site = (context.site && new URL(context.site).origin) || new URL(context.request.url).origin;

  const entries = await getCollection('articles');
  const posts = entries
    .map((e) => ({ url: e.data.url, ...e.data }))
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const channelTitle = 'Better Code Articles';
  const channelLink = site + '/articles/';
  const channelDesc = 'Latest articles from Better Code Org';
  const lastBuildDate = new Date().toUTCString();

  const items = posts
    .map((p) => {
      const link = site + p.url;
      const pubDate = new Date(p.pubDate).toUTCString();
      const updated = p.updatedDate ? `\n      <atom:updated>${new Date(p.updatedDate).toISOString()}</atom:updated>` : '';
      const description = p.description ? `<![CDATA[${p.description}]]>` : '';
      return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>${updated}
      <description>${description}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${channelLink}</link>
    <description>${escapeXml(channelDesc)}</description>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${site}/articles/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=600',
    },
  });
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
