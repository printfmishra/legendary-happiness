'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SanityBlogPost, urlFor, calculateReadTime, formatDate } from '@/lib/sanity';

interface BlogProps {
  posts: SanityBlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  // Sad animation for empty state
  const SadFace = () => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
      className="flex flex-col items-center justify-center py-24"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-7xl mb-4"
      >
        😔
      </motion.div>
      <div className="text-2xl font-semibold text-text-secondary">No blog posts found</div>
    </motion.div>
  );
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Icon mapping for categories
  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Cloud Computing': '☁️',
      'Network Security': '🔐',
      'DevOps': '⚙️',
      'Infrastructure': '🏗️',
      'AWS': '☁️',
      'Azure': '☁️',
      'GCP': '☁️',
      'Kubernetes': '⚓',
      'Docker': '🐳',
    };
    return icons[category] || '📝';
  };

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const displayedPosts = posts.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of blog section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-20 theme-bg-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Latest <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Exploring cloud architecture, network engineering, and DevOps best practices
          </p>
        </motion.div>

        {displayedPosts.length === 0 ? (
          <SadFace />
        ) : (
          <>
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {displayedPosts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index < 5 ? index * 0.1 : (index - 5) * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="theme-card-bg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
              <div className="flex flex-col md:grid md:grid-cols-[280px,1fr] gap-0">
                {/* Left Side - Image or Icon */}
                <div className="relative theme-card-bg flex items-center justify-center p-1 h-48 md:h-auto">
                  {(post.desktopImage || post.mobileImage) ? (
                    <>
                      {/* Mobile Image - 16:9 aspect ratio */}
                      {post.mobileImage && (
                        <div className="relative w-full h-full bg-neutral-50 rounded-lg overflow-hidden shadow-sm md:hidden">
                          <Image
                            src={urlFor(post.mobileImage).width(800).fit('max').url()}
                            alt={post.mobileImage.alt || post.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {/* Desktop Image - 1:1 aspect ratio */}
                      {post.desktopImage && (
                        <div className="relative w-full h-full bg-neutral-50 rounded-lg overflow-hidden shadow-sm hidden md:block">
                          <Image
                            src={urlFor(post.desktopImage).width(1200).fit('max').url()}
                            alt={post.desktopImage.alt || post.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {/* Fallback: Show desktop image on mobile if no mobile image */}
                      {!post.mobileImage && post.desktopImage && (
                        <div className="relative w-full h-full bg-neutral-50 rounded-lg overflow-hidden shadow-sm md:hidden">
                          <Image
                            src={urlFor(post.desktopImage).width(800).fit('max').url()}
                            alt={post.desktopImage.alt || post.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-8xl md:text-9xl filter drop-shadow-lg"
                    >
                      {getCategoryIcon(
                        post.categories && post.categories.length > 0
                          ? post.categories[0]
                          : 'General'
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Right Side - Content */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3 group-hover:text-primary-copper transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-text-secondary mb-4 line-clamp-3 leading-relaxed text-sm md:text-base">
                    {post.summary || post.excerpt || 'Click to read more...'}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    {post.categories && post.categories.length > 0 && post.categories.map((cat) => (
                      <div key={cat} className="inline-block bg-primary-copper/10 text-primary-copper px-3 py-1 rounded-full text-xs font-semibold mr-1 mb-1">
                        {cat}
                      </div>
                    ))}
                  </div>

                  {/* Read More Button */}
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="inline-flex items-center justify-center gap-2 bg-primary-copper text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg w-full md:w-auto"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex justify-center items-center gap-2 mt-12"
              >
                {/* Previous Button */}
                <motion.button
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
              whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                currentPage === 1
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-copper text-white hover:opacity-90 shadow-md hover:shadow-lg'
              }`}
            >
              Previous
            </motion.button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {getPageNumbers().map((page, index) => (
                <motion.button
                  key={index}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  whileHover={typeof page === 'number' ? { scale: 1.1 } : {}}
                  whileTap={typeof page === 'number' ? { scale: 0.9 } : {}}
                  disabled={typeof page !== 'number'}
                  className={`min-w-[40px] h-10 rounded-lg font-semibold transition-all duration-300 ${
                    page === currentPage
                      ? 'bg-primary-copper text-white shadow-lg'
                      : typeof page === 'number'
                      ? 'bg-gray-700 text-text-secondary hover:bg-gray-600 hover:text-white'
                      : 'bg-transparent text-text-secondary cursor-default'
                  }`}
                >
                  {page}
                </motion.button>
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
              whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-copper text-white hover:opacity-90 shadow-md hover:shadow-lg'
              }`}
            >
              Next
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
