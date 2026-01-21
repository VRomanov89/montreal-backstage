import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/beehiiv'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts(100)
    const baseUrl = process.env.SITE_URL || 'https://montrealbackstage.com'

    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/issue/${post.slug}`,
        lastModified: new Date(post.publish_date * 1000),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/archive`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        ...postUrls,
    ]
}
