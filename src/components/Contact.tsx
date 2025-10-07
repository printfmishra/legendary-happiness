'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '0c8ea11e-9f4f-4f98-a777-42586e868712',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="pt-32 pb-20 theme-bg-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Have a project in mind? Let&apos;s discuss how I can help transform your infrastructure
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <p className="text-text-secondary mb-8">
              I&apos;m always interested in hearing about new opportunities and discussing innovative cloud and network solutions.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 theme-card-bg rounded-lg flex items-center justify-center flex-shrink-0 border theme-border">
                  <MapPin className="text-primary-copper" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-text-secondary">Australia</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 theme-card-bg rounded-lg flex items-center justify-center flex-shrink-0 border theme-border">
                  <Mail className="text-primary-copper" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a href="mailto:atul@mishrasolutions.com" className="text-primary-copper hover:opacity-80">
                    atul@mishrasolutions.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 theme-card-bg rounded-lg flex items-center justify-center flex-shrink-0 border theme-border">
                  <Linkedin className="text-primary-copper" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">LinkedIn</h4>
                  <a
                    href="https://www.linkedin.com/in/printfmishra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-copper hover:opacity-80"
                  >
                    linkedin.com/in/printfmishra
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 theme-card-bg rounded-lg flex items-center justify-center flex-shrink-0 border theme-border">
                  <Github className="text-primary-copper" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">GitHub</h4>
                  <a
                    href="https://github.com/printfmishra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-copper hover:opacity-80"
                  >
                    github.com/printfmishra
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="theme-card-bg p-8 rounded-2xl shadow-card"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 theme-card-bg border theme-border rounded-lg focus:ring-2 focus:ring-primary-copper focus:border-transparent transition-all outline-none theme-text-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 theme-card-bg border theme-border rounded-lg focus:ring-2 focus:ring-primary-copper focus:border-transparent transition-all outline-none theme-text-primary"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 theme-card-bg border theme-border rounded-lg focus:ring-2 focus:ring-primary-copper focus:border-transparent transition-all outline-none theme-text-primary"
                  placeholder="How can I help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 theme-card-bg border theme-border rounded-lg focus:ring-2 focus:ring-primary-copper focus:border-transparent transition-all outline-none resize-none theme-text-primary"
                  placeholder="Tell me about your project..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-500 text-green-700 dark:text-green-400 rounded-lg">
                  ✓ Thank you for your message! I&apos;ll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-500 text-red-700 dark:text-red-400 rounded-lg">
                  ✗ Something went wrong. Please try again or email me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-copper text-white px-6 py-4 rounded-lg hover:opacity-90 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
