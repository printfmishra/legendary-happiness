'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'theme-card-bg shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src={theme === 'dark' ? '/img/long-logo-white-transparent.png' : '/img/long-logo-black-transparent.png'}
                alt="Atul Mishra Logo" 
                width={150} 
                height={40}
                className="h-10 w-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className={`transition-colors duration-200 ${
                      isActive ? 'text-primary-copper font-semibold' : 'text-text-secondary hover:text-primary-copper'
                    }`}
                  >
                    {link.name}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-copper"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative"
            >
              <Link
                href="/contact"
                className={`px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-white ${
                  pathname === '/contact' 
                    ? 'font-semibold shadow-lg' 
                    : 'bg-primary-copper hover:opacity-90'
                }`}
                style={pathname === '/contact' ? { background: 'linear-gradient(90deg, #DA8753 0%, #C7A27A 50%, #7FA3A7 100%)' } : undefined}
              >
                Let&apos;s Connect
              </Link>
            </motion.div>

            {/* Theme Toggle Button */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-primary-copper/10 hover:bg-primary-copper/20 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="text-primary-copper" size={20} />
              ) : (
                <Moon className="text-primary-copper" size={20} />
              )}
            </motion.button>
          </div>

          {/* Mobile Theme Toggle & Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-primary-copper/10 hover:bg-primary-copper/20 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="text-primary-copper" size={20} />
              ) : (
                <Moon className="text-primary-copper" size={20} />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="text-text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 theme-card-bg rounded-lg shadow-lg px-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block py-2 transition-colors ${
                      isActive ? 'text-primary-copper font-semibold' : 'theme-text-secondary hover:text-primary-copper'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className={`inline-block mt-4 text-white px-6 py-2 rounded-lg transition-colors ${
                  pathname === '/contact' ? 'font-semibold' : 'bg-primary-copper hover:opacity-90'
                }`}
                style={pathname === '/contact' ? { background: 'linear-gradient(90deg, #DA8753 0%, #C7A27A 50%, #7FA3A7 100%)' } : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Let&apos;s Connect
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
