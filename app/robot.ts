import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.checkerist.com'
  
  return {
    rules: [
      {
        userAgent: '*', // All crawlers
        disallow: [
          '/api',
          '/admin',
          '/checker',
          '/user',
          '/dashboard',
          '/_next/',
          '/private',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/'],
        disallow: [
          '/api',
          '/admin',
          '/checker',
          '/user',
          '/dashboard',
          '/_next/',
          '/private',
        ],
      },
      // ChatGPT real-time browsing
      {
        userAgent: 'ChatGPT-User',
        allow: ['/'],
        disallow: [
          '/api',
          '/admin',
          '/checker',
          '/user',
          '/dashboard',
          '/_next/',
          '/private',
        ],
      },

      // Perplexity AI
      {
        userAgent: 'PerplexityBot',
        allow: ['/'],
        disallow: [
          '/api',
          '/admin',
          '/checker',
          '/user',
          '/dashboard',
          '/_next/',
          '/private',
        ],
      },

      // Anthropic Claude
      {
        userAgent: 'ClaudeBot',
        allow: ['/'],
        disallow: [
          '/api',
          '/admin',
          '/checker',
          '/user',
          '/dashboard',
          '/_next/',
          '/private',
        ],
      },

      // Google Gemini AI training
      {
        userAgent: 'Google-Extended',
        allow: ['/'],
        disallow: [
          '/api',
          '/admin',
          '/checker',
          '/user',
          '/dashboard',
          '/_next/',
          '/private',
        ],
      },

      // Meta AI (Llama)
      {
        userAgent: 'Meta-ExternalAgent',
        allow: ['/'],
        disallow: [
          '/api',
          '/admin',
          '/checker',
          '/user',
          '/dashboard',
          '/_next/',
          '/private',
        ],
      },

      // Apple Applebot (Siri suggestions)
      {
        userAgent: 'Applebot',
        allow: ['/'],
        disallow: [
          '/api',
          '/admin',
          '/checker',
          '/user',
          '/dashboard',
          '/_next/',
          '/private',
        ],
      },

      // Amazon Alexa / Audible
      {
        userAgent: 'Amazonbot',
        allow: ['/'],
        disallow: [
          '/api',
          '/admin',
          '/checker',
          '/sign-in',
          '/user',
          '/dashboard',
          '/_next/',
          '/private',
        ],
      },
      
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}