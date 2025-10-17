import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', // Use current date for API version
  useCdn: false, // Disable CDN for debugging
});

// Image URL builder for Sanity images
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// TypeScript interfaces for Sanity blog posts
export interface SanityBlogPost {
  excerpt?: string;
  summary?: string;
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  desktopImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  mobileImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  categories?: string[];
  publishedAt: string;
  body: any[]; // Portable Text format
  author?: {
    name: string;
    image?: any;
  };
}

// Fetch all blog posts
export async function getBlogPosts(): Promise<SanityBlogPost[]> {
  const query = `*[_type == "post"] {
    _id,
    _createdAt,
    title,
    slug,
    summary,
    excerpt,
    desktopImage,
    mobileImage,
    "categories": categories[]->title,
    publishedAt,
    body
  } | order(_createdAt desc)`;

  try {
    console.log('🔍 Fetching posts from Sanity...');
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
    console.log('Query:', query);
    
    const posts = await client.fetch(query);
    
    console.log(`✅ Fetched ${posts.length} posts from Sanity`);
    if (posts.length > 0) {
      console.log('First post:', posts[0].title);
      console.log('Full first post:', JSON.stringify(posts[0], null, 2));
    } else {
      console.log('⚠️ No posts found. Check:');
      console.log('  1. Posts are published (not drafts)');
      console.log('  2. Document type is "post"');
      console.log('  3. Correct dataset selected');
    }
    
    return posts;
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error);
    console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return [];
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    summary,
    excerpt,
    desktopImage,
    mobileImage,
    "categories": categories[]->title,
    publishedAt,
    body,
    author->{
      name,
      image
    }
  }`;

  try {
    const post = await client.fetch(query, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Calculate read time from body content
export function calculateReadTime(body?: any[]): string {
  if (!body || body.length === 0) return '5 min read';
  
  const text = body
    .filter((block) => block._type === 'block')
    .map((block) => block.children?.map((child: any) => child.text).join('') || '')
    .join(' ');
  
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${minutes} min read`;
}

// Format date to readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
