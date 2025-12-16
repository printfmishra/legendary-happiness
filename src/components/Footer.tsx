'use client';

import { Github, Linkedin, Mail, Heart, Facebook } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    navigation: [
      { name: 'Home', href: '/' },
      { name: 'Projects', href: '/projects' },
      { name: 'Services', href: '/services' },
      { name: 'Blog', href: '/blog' },
    ],
    social: [
      { name: 'GitHub', href: 'https://github.com/Mishra-solutions', icon: Github },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/company/mishra-solutions/', icon: Linkedin },
      { name: 'Facebook', href: 'https://www.facebook.com/people/Mishra-solutions/61584770594193/', icon: Facebook },
      { name: 'Email', href: 'mailto:support@mishrasolutions.com', icon: Mail },
    ],
  };

  return (
    <footer className="theme-card-bg border-t theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-primary-copper mb-4">Mishra Solutions</h3>
            <p className="theme-text-secondary">
              Our collaborative team delivers innovative infrastructure solutions, combining expertise in cloud architecture, AI/ML, and secure network design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 theme-text-primary">Quick Links</h4>
            <ul className="space-y-2">
              {links.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="theme-text-secondary hover:!text-primary-copper transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 theme-text-primary">Connect</h4>
            <div className="flex gap-4">
              {links.social.map((social) => {
                const Icon = social.icon;
                const isEmail = social.href.startsWith('mailto:');
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    {...(!isEmail && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="w-10 h-10 theme-card-bg rounded-lg flex items-center justify-center hover:bg-primary-copper hover:text-white transition-all duration-200 shadow-sm hover:shadow-md theme-text-primary"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t theme-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="theme-text-secondary text-sm">
            © {currentYear} Atul Mishra. All rights reserved.
          </p>
          <p className="theme-text-secondary text-sm flex items-center gap-1">
            Built with <Heart size={16} className="text-red-500 fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
