'use client';

import { useState, Suspense } from 'react';
import { ArrowLeft, Mail, Building2, Send, RotateCw, User } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';

function ResumeForm() {
  const searchParams = useSearchParams();
  const memberName = searchParams.get('member');
  
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    memberName: memberName || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '0c8ea11e-9f4f-4f98-a777-42586e868712',
          category: 'New form from Resume Request',
          email: formData.email,
          company: formData.company,
          memberName: formData.memberName,
          subject: `Resume Request${formData.memberName ? ` - ${formData.memberName}` : ''}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitting(false);
        setSubmitStatus('success');
        // Reset form after 1 minute (60000ms)
        setTimeout(() => {
          setFormData({ email: '', company: '', memberName: memberName || '' });
          setSubmitStatus('idle');
        }, 60000);
      } else {
        setIsSubmitting(false);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRefresh = () => {
    setFormData({ email: '', company: '', memberName: memberName || '' });
    setSubmitStatus('idle');
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen theme-bg-gradient">
      <Navbar />
      <section className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Back Navigation */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-copper hover:underline mb-8"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          {/* Header with Refresh Button */}
          <div className="mb-12 relative">
            {submitStatus === 'success' && (
              <div className="absolute top-0 right-0">
                <button
                  onClick={handleRefresh}
                  className="inline-flex items-center gap-2 text-primary-copper hover:bg-primary-copper/10 px-4 py-2 rounded-lg transition-all duration-200 border-2 border-primary-copper"
                  title="Reset form"
                >
                  <RotateCw size={20} />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Request <span className="text-gradient">Resume</span>
            </h1>
            {memberName && (
              <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-primary-copper/10 border-2 border-primary-copper rounded-lg">
                <User size={20} className="text-primary-copper" />
                <span className="text-primary-copper font-semibold">{memberName}</span>
              </div>
            )}
            <p className="text-lg text-text-secondary max-w-2xl">
              Please provide your email address and company name to receive {memberName ? `${memberName}'s` : 'the'} resume.
            </p>
          </div>

          {/* Form Card */}
          <div className="max-w-2xl mx-auto">
            <div className="theme-card-bg rounded-2xl shadow-card p-8 md:p-12 theme-border border">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hidden Member Name Field */}
                {memberName && (
                  <input type="hidden" name="memberName" value={formData.memberName} />
                )}
                
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2 text-text-primary"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={20} className="text-text-secondary" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 theme-border bg-transparent focus:border-primary-copper focus:outline-none transition-colors text-text-primary"
                    />
                  </div>
                </div>

                {/* Company Name Field */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold mb-2 text-text-primary"
                  >
                    Company Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Building2 size={20} className="text-text-secondary" />
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 theme-border bg-transparent focus:border-primary-copper focus:outline-none transition-colors text-text-primary"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-copper to-[#C4906F] text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Submit Request
                      <Send size={20} />
                    </>
                  )}
                </button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border-2 border-green-500 rounded-lg">
                    <p className="text-green-500 text-center font-semibold">
                      Thank you! Your request has been received. The resume will be sent to your email shortly.
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border-2 border-red-500 rounded-lg">
                    <p className="text-red-500 text-center font-semibold">
                      Something went wrong. Please try again later.
                    </p>
                  </div>
                )}
              </form>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t theme-border">
                <p className="text-sm text-text-secondary text-center">
                  Your information will be kept confidential and used only for sending the resume.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function ResumePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen theme-bg-gradient">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-text-primary">Loading...</div>
        </div>
        <Footer />
      </main>
    }>
      <ResumeForm />
    </Suspense>
  );
}
