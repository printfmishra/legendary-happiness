import Navbar from '@/components/Navbar';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import { getBlogPosts } from '@/lib/sanity';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Blog posts={posts} />
      <Footer />
    </main>
  );
}
