import Navbar from '@/components/Navbar';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import { getBlogPosts } from '@/lib/sanity';
import '../content-pages.css';

// Revalidate this page every 60 seconds
export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen content-page">
      <Navbar />
      <Blog posts={posts} />
      <Footer />
    </main>
  );
}
