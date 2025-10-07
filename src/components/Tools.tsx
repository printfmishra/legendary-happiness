'use client';

import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const Tools = () => {
  // Tools data hidden for now - coming soon
  const tools = [
    {
      title: 'Cloud Cost Calculator',
      description: 'Interactive tool to estimate and compare cloud infrastructure costs across AWS, Azure, and GCP with detailed breakdowns and optimization suggestions.',
      technologies: ['React', 'TypeScript', 'Chart.js', 'AWS SDK'],
      image: '💰',
      link: '#',
      github: '#',
      category: 'Cloud Tools',
    },
    {
      title: 'Network Topology Visualizer',
      description: 'Real-time network topology mapping and visualization tool with automatic discovery, performance monitoring, and interactive diagrams.',
      technologies: ['D3.js', 'Python', 'WebSocket', 'Network APIs'],
      image: '🗺️',
      link: '#',
      github: '#',
      category: 'Network Tools',
    },
    {
      title: 'Security Audit Automation',
      description: 'Automated security compliance checker for cloud infrastructure, scanning for vulnerabilities, misconfigurations, and generating detailed compliance reports.',
      technologies: ['Python', 'AWS Config', 'Azure Policy', 'Terraform'],
      image: '🔐',
      link: '#',
      github: '#',
      category: 'Security Tools',
    },
    {
      title: 'Infrastructure Monitor Dashboard',
      description: 'Unified monitoring dashboard aggregating metrics from multiple sources with customizable alerts, real-time graphs, and anomaly detection.',
      technologies: ['Grafana', 'Prometheus', 'InfluxDB', 'Node.js'],
      image: '📊',
      link: '#',
      github: '#',
      category: 'Monitoring Tools',
    },
  ];

  return (
    <section id="tools" className="pt-32 pb-20 theme-bg-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Developer <span className="text-gradient">Tools</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Open-source tools and utilities to simplify cloud and network management
          </p>
        </motion.div>

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="theme-card-bg rounded-2xl shadow-card p-12 md:p-16">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-7xl mb-6"
            >
              <Code2 className="w-20 h-20 mx-auto text-primary-copper" />
            </motion.div>
            <h3 className="text-3xl font-bold mb-4 theme-text-primary">
              Coming Soon
            </h3>
            <p className="text-text-secondary text-lg mb-6">
              I&apos;m currently developing some awesome developer tools. Stay tuned for updates!
            </p>
            <div className="flex justify-center gap-2">
              <span className="w-3 h-3 bg-primary-copper rounded-full animate-pulse"></span>
              <span className="w-3 h-3 bg-primary-copper rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-3 h-3 bg-primary-copper rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
