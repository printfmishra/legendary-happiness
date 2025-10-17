
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Briefcase, GraduationCap, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getIntroductionPage } from '@/lib/introductionPage';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import { urlFor } from '@/lib/sanity';
import '../content-pages.css';

export default async function AboutPage() {
  const intro = await getIntroductionPage();

  // Loading animation component
  const Loading = () => (
    <div className="flex flex-col items-center justify-center py-32">
      <svg className="animate-spin h-12 w-12 text-primary-copper mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
      <div className="text-lg text-primary-copper font-semibold">Loading...</div>
    </div>
  );

  return (
    <main className="min-h-screen content-page">
      <Navbar />
      <article className="pt-32 pb-20 theme-bg-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!intro ? (
            <Loading />
          ) : (
            <>
              {/* Back Button */}
              <div className="mb-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-primary-copper hover:opacity-80 transition-opacity duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>

              {/* Header */}
              <div className="mb-12 theme-card-bg rounded-[10px] p-6 md:p-8 shadow-card">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  {intro?.image && (
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-xl mx-auto md:order-2">
                      <Image
                        src={urlFor(intro.image).width(400).height(400).quality(95).url()}
                        alt={intro.image.alt || intro.title}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-1 text-center md:text-left md:order-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-primary-copper mb-4">
                      {intro?.title || 'About Me'}
                    </h1>
                    <p className="text-lg theme-text-secondary italic">
                      {intro?.summary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {intro?.professionalSummary && (
                  <PortableTextRenderer value={intro.professionalSummary} />
                )}
              </div>

              {/* Contact CTA */}
              <div className="mt-12 pt-8 border-t theme-border">
                <div className="theme-card-bg rounded-[10px] p-6 md:p-8 shadow-card text-center">
                  <h3 className="text-2xl font-bold theme-text-primary mb-4">
                Let&#39;s Work Together
                  </h3>
                  <p className="theme-text-secondary mb-6 max-w-2xl mx-auto">
                Interested in collaborating on AI projects or discussing innovative solutions? 
                I&#39;m always open to new opportunities and exciting challenges.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-primary-copper text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg font-semibold"
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>

              {/* Decorative Line */}
              <div className="mt-12 pt-8 border-t theme-border">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-primary-copper hover:opacity-80 font-semibold transition-opacity duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>
            </>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
}
