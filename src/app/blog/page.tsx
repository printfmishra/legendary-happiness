import Navbar from '@/components/Navbar';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Blog />
      <Footer />
    </main>
  );
}
