'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Project } from '@/lib/projects';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        console.log('🚀 Fetching projects via API route...');
        
        const response = await fetch('/api/projects', {
          cache: 'no-store',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        console.log('📦 Received projects:', data.length);
        setProjects(data);
      } catch (error) {
        console.error('❌ Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="pt-32 pb-20 theme-bg-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Showcasing real-world solutions and enterprise-scale implementations
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-primary-copper border-t-transparent rounded-full animate-spin"></div>
            <p className="text-text-secondary mt-4">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">No projects available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug.current}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="theme-card-bg rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group cursor-pointer h-full"
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-copper/20 to-primary-copper/5">
                    {project.mainImage ? (
                      <Image
                        src={urlFor(project.mainImage).width(600).height(400).url()}
                        alt={project.mainImage.alt || project.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-6xl">
                        📊
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 theme-text-primary">{project.title}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
