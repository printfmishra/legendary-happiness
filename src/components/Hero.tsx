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
    { name: 'LLM & Generative AI', enabled: true },
    { name: 'AI / ML Engineering', enabled: true },
    { name: 'Computer Vision & Predictive Modeling', enabled: true },
    { name: 'Cloud Architecture', enabled: true },
  ];

  const skillsDetailed = [
    { category: 'Network Technologies', items: ['Cisco', 'SD-WAN', 'VPN', 'Firewall'] },
    { category: 'DevOps & Automation', items: ['Terraform', 'Ansible', 'Docker', 'Kubernetes'] },
    { category: 'Big Data & Analytics', items: ['Snowflake', 'Databricks', 'Cloudera'] },
    { category: 'Programming', items: ['Python', 'PowerShell', 'SQL', 'JavaScript'] },
    { category: 'LLMs/RAG', items: ['LangChain', 'LangGraph', 'AutoGen', 'RAG', 'Prompt Engineering', 'OpenAI APIs', 'Gemini'] },
  ];

  const certifications = [
    {
      category: 'Networking & Cloud',
      items: [
        'AWS Certified Advanced Networking - Specialty',
        'CompTIA Security+',
        'Cisco Certified Network Associate',
      ]
    },
    {
      category: 'AI/ML & Data Science',
      items: [
        'Complete Machine Learning & Data Science Program',
        'Introducing Generative AI with AWS',
        'Certificate of Training - Data Science',
        'Generative AI with Large Language Models',
        'Deep Learning Specialization',
        'Deep Learning Fundamentals Certification',
      ]
    },
    {
      category: 'DevOps & Big Data',
      items: [
        'Docker Foundations Professional Certificate',
        'Big Data with PySpark',
      ]
    },
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Engineering Infrastructure
              <br />
              <span className="text-gradient">
                {typedText}
                <span className="animate-pulse text-primary-copper bg-clip-text" style={{ WebkitTextFillColor: '#DA8753' }}>|</span>
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Expert team delivering innovative solutions | Based in Australia | 
              Specializing in collaborative infrastructure development and secure network architecture
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
                Certified in AWS, DeepLearning.AI & Cisco
              </span>
            </div>
          </motion.div>

          {/* Right Content - Floating Cards */}
          <motion.div
            className="relative"
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

            {/* CTA Buttons */}
            <div className="flex gap-4 mt-6">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 bg-primary-copper text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex-1"
              >
                View Our Work
                <ArrowRight size={20} />
              </Link>
            </div>

            {/* Tech Stack */}
            <div className="mt-8">
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
              Our Professional <span className="text-gradient">Team</span>
            </h2>
          </motion.div>

          {/* Duplicate Section - Second Team Member */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            {/* Hero Box Container */}
            <div className="relative w-full theme-card-bg rounded-[10px] p-4 sm:p-6 md:p-8 overflow-visible flex items-center shadow-card min-h-[160px] sm:min-h-[240px] md:min-h-[320px]">
              {/* Portrait Image - Left Side */}
              <div className="absolute left-2 sm:left-4 md:left-8 bottom-[-15px] sm:bottom-[-20px] md:bottom-[-25px] w-[140px] sm:w-[200px] md:w-[280px]">
                <div className="relative" style={{ transform: 'translateY(-7%)' }}>
                  <Image
                    src="/img/Profile image.png"
                    alt="Atul Mishra - Network and AI/ML Engineer"
                    width={280}
                    height={400}
                    className="object-cover rounded-t-[10px]"
                    priority
                    style={{ 
                      borderTopLeftRadius: '10px', 
                      borderTopRightRadius: '10px',
                      borderBottomLeftRadius: '0',
                      borderBottomRightRadius: '0'
                    }}
                  />
                </div>
              </div>

              {/* Text Content - Right Side */}
              <div className="ml-auto w-[calc(100%-150px)] sm:w-[calc(100%-220px)] md:w-[calc(100%-320px)] pl-2 sm:pl-4 md:pl-8">
                <h2 
                  className="font-bold mb-2 sm:mb-3 md:mb-4 text-primary-copper" 
                  style={{ 
                    fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
                    lineHeight: '1.2'
                  }}
                >
              Hello, I&#39;m Atul
                </h2>
                
                <p 
                  className="mb-4 sm:mb-5 md:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-3 md:line-clamp-none text-base" 
                  style={{ 
                    color: 'var(--text-primary)'
                  }}
                >
                  Network & AI Architect, following the curve of innovation and machine learning. 
                  Specializing in building scalable AI solutions and cloud infrastructure.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 bg-primary-copper text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg text-sm sm:text-base"
                  >
                    Read More
                    <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Two Half-Width Team Member Tiles */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* Team Member 1 - Kamesh */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative w-full theme-card-bg rounded-[10px] p-4 sm:p-6 overflow-visible shadow-card min-h-[300px] sm:min-h-[350px]">
                {/* Portrait Image - Top */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden border border-amber-800/40">
                  <Image
                    src="/img/Suraj profile image.png"
                    alt="Team Member - Professional"
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Text Content */}
                <div className="text-center">
                  <h3 
                    className="font-bold mb-2 text-primary-copper text-xl sm:text-2xl"
                  >
                    Kamesh Dubey
                  </h3>
                  
                  <p className="text-sm sm:text-base text-primary-copper/80 mb-3 font-medium">
                    Data Scientist
                  </p>
                  
                  <p 
                    className="mb-4 leading-relaxed text-sm sm:text-base" 
                    style={{ 
                      color: 'var(--text-primary)'
                    }}
                  >
                    Delivering scalable production-ready AI/ML solutions that turn complex data into clear, actionable insights.
                  </p>
                  
                  <Link
                    href="/team/kamesh-dubey"
                    className="inline-flex items-center gap-2 bg-primary-copper text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg text-sm"
                  >
                    View Profile
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Team Member 2 - Lata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full theme-card-bg rounded-[10px] p-4 sm:p-6 overflow-visible shadow-card min-h-[300px] sm:min-h-[350px]">
                {/* Portrait Image - Top */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden border border-amber-800/40">
                  <Image
                    src="/img/lata profile pic.png"
                    alt="Team Member - Specialist"
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Text Content */}
                <div className="text-center">
                  <h3 
                    className="font-bold mb-2 text-primary-copper text-xl sm:text-2xl"
                  >
                    Lata Mishra
                  </h3>
                  
                  <p className="text-sm sm:text-base text-primary-copper/80 mb-3 font-medium">
                    AI/ML Specialist
                  </p>
                  
                  <p 
                    className="mb-4 leading-relaxed text-sm sm:text-base" 
                    style={{ 
                      color: 'var(--text-primary)'
                    }}
                  >
                    Build and deploy production-ready AI/ML systems, LLM, RAG pipelines, and predictive models that support real business decisions.
                  </p>
                  
                  <Link
                    href="/team/lata-mishra"
                    className="inline-flex items-center gap-2 bg-primary-copper text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg text-sm"
                  >
                    View Profile
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-6 flex flex-col h-full">
              {/* Team Certifications */}
              <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="theme-card-bg p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 flex-grow"
            >
              <div>
              <h3 className="font-semibold text-hero-h4 mb-6">Team Certifications</h3>
              <div className="space-y-10">
                {certifications.map((group, groupIndex) => (
                  <div key={groupIndex} className="space-y-3">
                    {group.items.map((cert, certIndex) => (
                      <div
                        key={certIndex}
                        className="flex items-center gap-3 p-3 theme-card-bg border theme-border rounded-lg"
                      >
                        <div className="w-2 h-2 bg-accent-blue rounded-full" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              </div>
            </motion.div>
            </div>

            {/* Right side - Skills Grid (including Programming) */}
            <div className="space-y-6">
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
      </div>
    </section>
  );
};

export default Hero;
