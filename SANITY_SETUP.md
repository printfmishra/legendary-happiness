# Sanity.io Integration Guide

This document explains how to use Sanity.io as the content management system for the blog section of your portfolio.

## 📋 Overview

The portfolio is now integrated with Sanity.io to fetch and display blog posts dynamically. This allows you to manage your blog content through Sanity Studio without needing to modify code.

## 🔧 Configuration

### Environment Variables

Your `.env.local` file contains the following Sanity configuration:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="pqbv3g6w"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="sk4GPXx2bYxvq9nhKIFGgcjSfjUZKGag5zIWkt2y08RXkbaX7dQZkBXniEY9wz73JmoraKC9UdMUXzouJ3gKPVXCZklzLO0ewz3FNFY5TExxNzLHyqlVT7lvo8I9m54IDceLREv84fph1kpC1W0MpgdiGSVnrIfNpPaTLmyJBQscrgUBTDA6"
```

**Important Notes:**
- `NEXT_PUBLIC_*` variables are accessible on the client-side
- `SANITY_API_TOKEN` is server-side only and should never be exposed to the browser
- Never commit `.env.local` to version control

## 📁 Project Structure

### New Files Created

```
src/
├── lib/
│   └── sanity.ts                          # Sanity client configuration & helper functions
└── components/
    └── PortableTextRenderer.tsx           # Renders Sanity's rich text content
```

### Modified Files

```
src/
├── components/
│   └── Blog.tsx                           # Updated to accept Sanity posts as props
└── app/
    └── blog/
        ├── page.tsx                       # Fetches posts from Sanity
        └── [slug]/
            └── page.tsx                   # Fetches individual post from Sanity
```

## 🛠️ Sanity Client (`src/lib/sanity.ts`)

### Configuration

```typescript
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});
```

**Why CDN is enabled:**
- Faster response times
- Caching of content
- Lower costs
- Perfect for production

**Disable CDN when:**
- You need real-time updates
- Working in preview mode
- Content changes frequently

### Key Functions

#### 1. `getBlogPosts()`
Fetches all blog posts ordered by publish date.

```typescript
const posts = await getBlogPosts();
```

**Returns:**
```typescript
SanityBlogPost[] // Array of blog posts
```

**Query:**
```groq
*[_type == "post"] | order(publishedAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  excerpt,
  mainImage,
  category,
  publishedAt,
  author->{name, image}
}
```

#### 2. `getBlogPostBySlug(slug)`
Fetches a single blog post by its slug.

```typescript
const post = await getBlogPostBySlug('my-blog-post');
```

**Parameters:**
- `slug` (string): The URL-friendly identifier for the post

**Returns:**
```typescript
SanityBlogPost | null
```

**Query:**
```groq
*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  slug,
  excerpt,
  mainImage,
  category,
  publishedAt,
  body,
  author->{name, image}
}
```

#### 3. `urlFor(source)`
Generates optimized image URLs from Sanity image references.

```typescript
const imageUrl = urlFor(post.mainImage).width(800).height(600).url();
```

**Methods:**
- `.width(px)`: Set image width
- `.height(px)`: Set image height
- `.quality(0-100)`: Set JPEG quality
- `.format('webp' | 'png' | 'jpg')`: Set image format
- `.url()`: Get the final URL

#### 4. `calculateReadTime(body)`
Calculates estimated reading time from Portable Text content.

```typescript
const readTime = calculateReadTime(post.body); // "5 min read"
```

#### 5. `formatDate(dateString)`
Formats ISO date strings to readable format.

```typescript
const formatted = formatDate('2024-01-15T00:00:00Z'); // "January 15, 2024"
```

## 📝 Content Schema

### Expected Sanity Schema

Your Sanity project should have a `post` document type with these fields:

```javascript
// schemas/post.js
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
        }
      ]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Cloud Computing', value: 'Cloud Computing' },
          { title: 'Network Security', value: 'Network Security' },
          { title: 'DevOps', value: 'DevOps' },
          { title: 'Infrastructure', value: 'Infrastructure' },
          { title: 'AWS', value: 'AWS' },
          { title: 'Azure', value: 'Azure' },
          { title: 'Kubernetes', value: 'Kubernetes' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text'
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            }
          ]
        },
        {
          type: 'code',
          options: {
            language: 'javascript'
          }
        }
      ]
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const { author } = selection;
      return {
        ...selection,
        subtitle: author && `by ${author}`
      };
    }
  }
}
```

## 🎨 Portable Text Renderer

The `PortableTextRenderer` component handles rich text content from Sanity.

### Supported Elements

#### Text Blocks
- **Headings**: H1, H2, H3, H4
- **Paragraphs**: Normal text with proper spacing
- **Blockquotes**: Styled with left border and background

#### Lists
- **Bullet lists**: Unordered lists with disc markers
- **Numbered lists**: Ordered lists with numbers

#### Text Formatting
- **Bold**: Strong emphasis
- **Italic**: Emphasized text
- **Inline Code**: Monospace with background
- **Links**: External links with hover effects

#### Media
- **Images**: Optimized with Next.js Image component
- **Code Blocks**: Syntax highlighted blocks

### Custom Styling

All elements use theme-aware classes:
- `theme-text-primary`: Primary text color
- `theme-text-secondary`: Secondary text color
- `theme-border`: Border colors
- `text-primary-copper`: Accent color

## 🔄 Data Flow

### Blog List Page (`/blog`)

```
1. User visits /blog
2. page.tsx calls getBlogPosts()
3. Sanity returns array of posts
4. Posts passed to Blog component as props
5. Blog component renders posts with animations
6. Images loaded via urlFor() helper
```

### Individual Post Page (`/blog/[slug]`)

```
1. User clicks "Read More"
2. Next.js routes to /blog/[slug]
3. page.tsx calls getBlogPostBySlug(slug)
4. Sanity returns full post with body content
5. PortableTextRenderer renders rich text
6. Images optimized and loaded
```

## 🚀 Usage Examples

### Creating a New Blog Post

1. **Open Sanity Studio**
   ```bash
   # In your Sanity project
   cd sanity-studio
   npm run dev
   ```

2. **Create New Post**
   - Click "+ New document"
   - Select "Blog Post"
   - Fill in all required fields:
     - Title
     - Slug (auto-generated from title)
     - Excerpt (max 200 characters)
     - Main Image (optional but recommended)
     - Category
     - Published Date
     - Body (rich text content)
     - Author (optional)

3. **Publish**
   - Click "Publish"
   - Content immediately available on your site (with CDN caching)

### Updating Existing Post

1. Find post in Sanity Studio
2. Make changes
3. Click "Publish" to save
4. Changes appear on site (may take a few seconds with CDN)

### Customizing Categories

Update the category icons in `Blog.tsx`:

```typescript
const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: string } = {
    'Cloud Computing': '☁️',
    'Network Security': '🔐',
    'DevOps': '⚙️',
    'Infrastructure': '🏗️',
    'Your New Category': '🚀', // Add new category
  };
  return icons[category] || '📝';
};
```

## 🎯 Performance Optimization

### Image Optimization

Sanity images are automatically optimized:

```typescript
// List view - smaller images
urlFor(post.mainImage).width(400).height(400).url()

// Post header - larger, high quality
urlFor(post.mainImage).width(1200).height(600).url()
```

### Caching Strategy

- **CDN enabled**: Content cached at edge locations
- **Static Generation**: Posts pre-rendered at build time
- **ISR (Incremental Static Regeneration)**: Can be enabled for auto-updates

To enable ISR, add to blog pages:

```typescript
export const revalidate = 3600; // Revalidate every hour
```

## 🐛 Troubleshooting

### Posts Not Showing

**Check:**
1. Environment variables are set correctly
2. Sanity project ID matches
3. Posts are published (not drafts)
4. Dataset name is correct

**Debug:**
```typescript
// Add to getBlogPosts()
console.log('Fetching from:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('Posts:', posts);
```

### Images Not Loading

**Check:**
1. Image has `asset._ref`
2. Image is uploaded to Sanity
3. `mainImage` field exists in query

**Debug:**
```typescript
console.log('Image ref:', post.mainImage?.asset?._ref);
console.log('Image URL:', urlFor(post.mainImage).url());
```

### Portable Text Not Rendering

**Check:**
1. `body` field contains array of blocks
2. Block types match component definitions
3. No missing custom block types

**Debug:**
```typescript
console.log('Body content:', JSON.stringify(post.body, null, 2));
```

## 🔒 Security

### API Token Security

- **Never** commit `.env.local`
- **Never** expose `SANITY_API_TOKEN` to client
- Use `NEXT_PUBLIC_` only for public data

### Content Security

- Validate slugs to prevent injection
- Sanitize external links
- Use Next.js Image for security

## 📚 Additional Resources

### Sanity Documentation
- [Sanity Client](https://www.sanity.io/docs/js-client)
- [Image URLs](https://www.sanity.io/docs/image-url)
- [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- [GROQ Queries](https://www.sanity.io/docs/groq)

### Next.js Integration
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

## 🎓 Learning Path

1. **Basic Usage**
   - Create and publish posts
   - Add images
   - Update content

2. **Advanced Features**
   - Custom block types
   - Rich media embeds
   - SEO optimization

3. **Performance**
   - ISR setup
   - Cache strategies
   - Image optimization

## 🔄 Migration from Static Data

The old `blogData.ts` file is no longer used. To migrate:

1. Copy post content from `blogData.ts`
2. Create posts in Sanity Studio
3. Verify all posts appear on site
4. Remove `blogData.ts` (optional)

---

**Last Updated**: October 14, 2025
**Version**: 1.0.0
