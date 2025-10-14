// Type definitions for Sanity integration

export interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

export interface SanityImage {
  asset: SanityImageAsset;
  alt?: string;
  caption?: string;
}

export interface SanitySlug {
  current: string;
  _type: 'slug';
}

export interface SanityAuthor {
  name: string;
  image?: SanityImage;
  bio?: string;
}

export interface SanityBlogPost {
  _id: string;
  _createdAt: string;
  _updatedAt?: string;
  _type: 'post';
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  mainImage?: SanityImage;
  categories?: string[];
  publishedAt: string;
  body?: SanityBlock[];
  author?: SanityAuthor;
}

export interface SanityBlock {
  _type: string;
  _key: string;
  [key: string]: any;
}

export interface SanityBlockContent {
  _type: 'block';
  _key: string;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
  children: SanitySpan[];
  markDefs?: SanityMarkDef[];
  level?: number;
  listItem?: 'bullet' | 'number';
}

export interface SanitySpan {
  _type: 'span';
  _key: string;
  text: string;
  marks?: string[];
}

export interface SanityMarkDef {
  _type: string;
  _key: string;
  href?: string;
  [key: string]: any;
}

export interface SanityImageBlock {
  _type: 'image';
  _key: string;
  asset: SanityImageAsset;
  alt?: string;
  caption?: string;
}

export interface SanityCodeBlock {
  _type: 'code';
  _key: string;
  code: string;
  language?: string;
  filename?: string;
}
