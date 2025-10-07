'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function Blog() {
  // Blog data hidden for now - coming soon

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

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="theme-card-bg rounded-2xl shadow-card p-12 md:p-16">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-7xl mb-6"
            >
              <FileText className="w-20 h-20 mx-auto text-primary-copper" />
            </motion.div>
            <h3 className="text-3xl font-bold mb-4 theme-text-primary">
              Coming Soon
            </h3>
            <p className="text-text-secondary text-lg mb-6">
              I&apos;m currently crafting insightful articles on cloud architecture and DevOps. Check back soon for the latest posts!
            </p>
            <div className="flex justify-center gap-2">
              <span className="w-3 h-3 bg-primary-copper rounded-full animate-pulse"></span>
              <span className="w-3 h-3 bg-primary-copper rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-3 h-3 bg-primary-copper rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
