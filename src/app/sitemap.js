import { site } from '@/data/site';

export default function sitemap() {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      // Deep links to the page sections so crawlers can discover anchor destinations too.
      alternates: {
        languages: {
          'en-IN': site.url,
        },
      },
    },
  ];
}
