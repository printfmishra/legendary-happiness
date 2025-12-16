import { notFound } from 'next/navigation';
import { getTeamMemberBySlug } from '@/lib/teamMember';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PortableTextRenderer from '@/components/PortableTextRenderer';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../../content-pages.css';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const member = await getTeamMemberBySlug(params.slug);
  
  if (!member) {
    return {
      title: 'Team Member Not Found',
    };
  }
  
  return {
    title: `${member.name} - Team Member | Mishra Solutions`,
    description: member.summary || `Learn more about ${member.name}, team member at Mishra Solutions.`,
  };
}

export default async function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = await getTeamMemberBySlug(params.slug);
  
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

  // Fallback content when no member data
  const FallbackContent = () => (
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
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-xl mx-auto md:order-2 bg-primary-copper/10 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-primary-copper"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="flex-1 text-center md:text-left md:order-1">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-copper mb-4 capitalize">
              {params.slug.replace(/-/g, ' ')}
            </h1>
            <p className="text-lg theme-text-secondary italic">
              Team Member
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="theme-card-bg rounded-[10px] p-6 md:p-8 shadow-card">
          <p className="text-text-secondary mb-4">
            Detailed profile information will be available soon. We&apos;re currently updating our team member profiles.
          </p>
          <p className="text-sm text-text-secondary">
            Please check back later or contact us for more information.
          </p>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mt-12 pt-8 border-t theme-border">
        <div className="theme-card-bg rounded-[10px] p-6 md:p-8 shadow-card text-center">
          <h3 className="text-2xl font-bold theme-text-primary mb-4">
            Let&#39;s Work Together
          </h3>
          <p className="theme-text-secondary mb-6 max-w-2xl mx-auto">
            Interested in collaborating or discussing innovative solutions? 
            We&#39;re always open to new opportunities and exciting challenges.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary-copper text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg font-semibold"
            >
              Get In Touch
            </Link>
            <Link
              href={`/resume?member=${encodeURIComponent(params.slug.replace(/-/g, ' '))}`}
              className="inline-flex items-center gap-2 theme-card-bg text-primary-copper px-6 py-3 rounded-lg border-2 border-primary-copper hover:bg-primary-copper/10 transition-all duration-200 font-semibold"
            >
              Request Resume
            </Link>
          </div>
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
  );
  
  return (
    <main className="min-h-screen content-page">
      <Navbar />
      <article className="pt-32 pb-20 theme-bg-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!member ? (
            <FallbackContent />
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
                  {member.image && (
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-xl mx-auto md:order-2">
                      <Image
                        src={urlFor(member.image).width(400).height(400).quality(95).url()}
                        alt={member.image.alt || member.name}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-1 text-center md:text-left md:order-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-primary-copper mb-4">
                      {member.name}
                    </h1>
                    {member.summary && (
                      <p className="text-lg theme-text-secondary italic">
                        {member.summary}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              {member.professionalSummary && member.professionalSummary.length > 0 && (
                <div className="prose prose-lg max-w-none">
                  <PortableTextRenderer value={member.professionalSummary} />
                </div>
              )}

              {/* Contact CTA */}
              <div className="mt-12 pt-8 border-t theme-border">
                <div className="theme-card-bg rounded-[10px] p-6 md:p-8 shadow-card text-center">
                  <h3 className="text-2xl font-bold theme-text-primary mb-4">
                    Let&#39;s Work Together
                  </h3>
                  <p className="theme-text-secondary mb-6 max-w-2xl mx-auto">
                    Interested in collaborating or discussing innovative solutions? 
                    We&#39;re always open to new opportunities and exciting challenges.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-primary-copper text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg font-semibold"
                    >
                      Get In Touch
                    </Link>
                    <Link
                      href={`/resume?member=${encodeURIComponent(member.name)}`}
                      className="inline-flex items-center gap-2 theme-card-bg text-primary-copper px-6 py-3 rounded-lg border-2 border-primary-copper hover:bg-primary-copper/10 transition-all duration-200 font-semibold"
                    >
                      Request Resume
                    </Link>
                  </div>
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
