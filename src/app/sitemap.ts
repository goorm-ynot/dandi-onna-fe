// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dandi-onna-fe.vercel.app',
      lastModified: new Date('2024-06-01'),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://dandi-onna-fe.vercel.app/customer',
      lastModified: new Date('2024-06-01'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
