import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/projects';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortableTextRenderer from '@/components/PortableTextRenderer';

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Convert Google Slides /pub URL to /embed URL for iframe
  const embedUrl = project.presentationEmbedUrl?.replace('/pub?', '/embed?');

  console.log('Project data:', {
    title: project.title,
    hasBody: !!project.body,
    bodyLength: project.body?.length,
    body: project.body
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: 'var(--bg-gradient-start)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link 
          href="/#projects"
          className="inline-flex items-center gap-2 text-primary-copper hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Project title */}
        <h1 className="text-4xl md:text-5xl font-bold theme-text-primary mb-8">
          {project.title}
        </h1>

        {/* Project body */}
        {project.body && project.body.length > 0 ? (
          <div className="theme-card-bg rounded-2xl shadow-card p-8 md:p-12 mb-8">
            <div className="space-y-4">
              <PortableTextRenderer value={project.body} />
            </div>

            {project.projectLink && (
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-6 py-3 bg-primary-copper text-white rounded-lg hover:bg-primary-copper/90 transition-colors font-semibold"
              >
                View Project →
              </a>
            )}
          </div>
        ) : (
          <div className="theme-card-bg rounded-2xl shadow-card p-8 md:p-12 mb-8">
            <p className="text-text-secondary">No description available for this project.</p>
          </div>
        )}

        {/* Presentation iframe */}
        {embedUrl && (
          <div className="theme-card-bg rounded-2xl shadow-card p-6">
            <h2 className="text-2xl font-bold theme-text-primary mb-6">Project Presentation</h2>
            <div className="w-full aspect-video">
              <iframe
                src={embedUrl}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allowFullScreen
                allow="autoplay"
              />
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}
