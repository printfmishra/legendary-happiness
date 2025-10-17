import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import { getBlogPosts, getBlogPostBySlug, formatDate, calculateReadTime, urlFor } from '@/lib/sanity';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import '../../content-pages.css';

// Revalidate this page every 60 seconds
export const revalidate = 60;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen content-page">
      <Navbar />
      
      <article className="pt-32 pb-20 theme-bg-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button and Category Badge */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-copper hover:opacity-80 transition-opacity duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category Badges */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((cat) => (
                  <div key={cat} className="bg-primary-copper/10 text-primary-copper px-4 py-2 rounded-full text-sm font-semibold">
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold theme-text-primary mb-6">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 theme-text-secondary mb-8 pb-8 border-b theme-border">
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <div className="text-xl theme-text-secondary italic mb-8 pb-8 border-b theme-border">
              {post.excerpt}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <PortableTextRenderer value={post.body} />
          </div>

          {/* Decorative Line */}
          <div className="mt-12 pt-8 border-t theme-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-copper hover:opacity-80 font-semibold transition-opacity duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              View All Posts
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
