'use client';

import { motion } from 'framer-motion';
import { Cloud, Network, Shield, Award, ArrowRight, CheckCircle2, GraduationCap, MapPin, Briefcase } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Hero = () => {
  const techLogos = ['AWS', 'Azure', 'GCP', 'Cisco', 'Docker', 'Kubernetes'];
  const [typedText, setTypedText] = useState('');
  const fullText = 'Solutions That Scale';
  
  useEffect(() => {
    let currentIndex = 0;
    let isPaused = false;
    
    const typingInterval = setInterval(() => {
      if (!isPaused && currentIndex <= fullText.length) {
        // Typing forward
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else if (currentIndex > fullText.length && !isPaused) {
        // Pause at the end before restarting
        isPaused = true;
        setTimeout(() => {
          currentIndex = 0;
          isPaused = false;
        }, 2000); // Wait 2 seconds before restarting
      }
    }, 100); // 100ms per character

    return () => clearInterval(typingInterval);
  }, []);
  
  const skills = [
    { name: 'Cloud Architecture', enabled: true },
    { name: 'Network Security', enabled: true },
    { name: 'Infrastructure as Code', enabled: true },
  ];

  const skillsDetailed = [
    { category: 'Cloud Platforms', items: ['AWS', 'Azure', 'Google Cloud Platform'] },
    { category: 'Network Technologies', items: ['Cisco', 'SD-WAN', 'VPN', 'Firewall'] },
    { category: 'DevOps & Automation', items: ['Terraform', 'Ansible', 'Docker', 'Kubernetes'] },
    { category: 'Programming', items: ['Python', 'Bash', 'PowerShell', 'Go'] },
  ];

  const certifications = [
    'AWS Certified Solutions Architect',
    'Azure Administrator',
    'Cisco CCNA',
    'CompTIA Security+',
  ];

  return (
    <section id="home" className="min-h-screen pt-20 theme-bg-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <span className="text-primary-copper font-semibold text-sm uppercase tracking-wider">
                Cloud & Network Engineer
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Engineering Cloud
              <br />
              <span className="bg-gradient-to-r from-primary-copper via-primary-copper to-[#C4906F] bg-clip-text text-transparent">
                {typedText}
                <span className="animate-pulse text-primary-copper bg-clip-text" style={{ WebkitTextFillColor: '#DA8753' }}>|</span>
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Cloud and Network Engineer based in Australia | Master&apos;s in IT | 
              Specializing in scalable infrastructure and secure network design
            </p>

            {/* Trust Indicators */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4915F] to-primary-copper border-2 border-white flex items-center justify-center text-white font-bold"
                  >
                    {i === 1 && <Award size={20} />}
                    {i === 2 && <Shield size={20} />}
                    {i === 3 && <Cloud size={20} />}
                  </div>
                ))}
              </div>
              <span className="text-sm text-text-secondary">
                Certified in AWS, Azure & Cisco
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-primary-copper text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View My Work
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 theme-card-bg text-primary-copper px-8 py-4 rounded-lg border-2 border-primary-copper hover:bg-primary-copper/10 transition-all duration-200"
              >
                Download Resume
              </Link>
            </div>

            {/* Tech Stack */}
            <div className="mt-12">
              <p className="text-sm text-text-secondary mb-4">Trusted by enterprise technologies</p>
              <div className="flex flex-wrap gap-6 items-center">
                {techLogos.map((logo) => (
                  <span
                    key={logo}
                    className="text-text-secondary font-semibold hover:text-primary-copper transition-colors"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Content - Floating Cards */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Skills Card */}
            <motion.div
              className="theme-card-bg p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 mb-6"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 theme-card-bg border theme-border rounded-lg flex items-center justify-center">
                  <Network className="text-primary-copper" size={20} />
                </div>
                <h3 className="font-semibold text-lg">Core Skills</h3>
              </div>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <span className="text-text-secondary">{skill.name}</span>
                    <div
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                        skill.enabled ? 'bg-primary-copper' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          skill.enabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Security Badge Card */}
            <motion.div
              className="theme-card-bg p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 theme-card-bg border theme-border rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="text-accent-blue" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Security & Compliance</h3>
                  <p className="text-sm text-text-secondary">ISO 27001 Certified</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-copper/5 rounded-full blur-3xl" />
          </motion.div>
        </div>

        {/* About/Profile Section - Integrated */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Professional <span className="bg-gradient-to-r from-primary-copper to-[#C4906F] bg-clip-text text-transparent">Profile</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Passionate about building scalable cloud infrastructure and secure network solutions
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="theme-card-bg p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold mb-6">About Me</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 theme-card-bg border theme-border rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="text-primary-copper" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Atul Mishra</h4>
                    <p className="text-text-secondary">Cloud and Network Engineer</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 theme-card-bg border theme-border rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="text-primary-copper" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Education</h4>
                    <p className="text-text-secondary">Master&apos;s Degree in Information Technology</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 theme-card-bg border theme-border rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary-copper" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-text-secondary">Australia</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4">Certifications</h4>
                <div className="grid grid-cols-1 gap-3">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 theme-card-bg border theme-border rounded-lg"
                    >
                      <div className="w-2 h-2 bg-accent-blue rounded-full" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {skillsDetailed.map((skillGroup, index) => (
                <motion.div 
                  key={index} 
                  className="theme-card-bg p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <h4 className="font-semibold text-lg mb-4">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-primary-copper text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
