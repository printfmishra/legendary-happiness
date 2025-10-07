import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogPosts } from '@/lib/blogData';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <article className="pt-32 pb-20 theme-bg-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button and Category Badge */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category Badge */}
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              {post.category}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold theme-text-primary mb-6">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 theme-text-secondary mb-8 pb-8 border-b theme-border">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="theme-text-secondary leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>

          {/* Decorative Line */}
          <div className="mt-12 pt-8 border-t theme-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors duration-300"
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
