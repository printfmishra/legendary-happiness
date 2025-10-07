'use client';

import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';

const Projects = () => {
  // Projects data hidden for now - coming soon
  const projects = [
    {
      title: 'Multi-Cloud Infrastructure',
      description: 'Designed and implemented a hybrid cloud solution spanning AWS and Azure with automated failover and disaster recovery.',
      technologies: ['AWS', 'Azure', 'Terraform', 'Kubernetes'],
      image: '🌐',
      link: '#',
      github: '#',
    },
    {
      title: 'Enterprise Network Redesign',
      description: 'Led complete network infrastructure overhaul for 500+ endpoints, implementing SD-WAN and zero-trust security.',
      technologies: ['Cisco', 'SD-WAN', 'Firewall', 'VPN'],
      image: '🔒',
      link: '#',
      github: '#',
    },
    {
      title: 'CI/CD Pipeline Automation',
      description: 'Built automated deployment pipeline reducing deployment time by 70% with comprehensive monitoring and rollback capabilities.',
      technologies: ['Docker', 'Jenkins', 'Ansible', 'AWS'],
      image: '⚡',
      link: '#',
      github: '#',
    },
    {
      title: 'Cloud Cost Optimization',
      description: 'Implemented cost optimization strategies reducing cloud spending by 40% while improving performance and reliability.',
      technologies: ['AWS', 'Python', 'CloudWatch', 'Lambda'],
      image: '💰',
      link: '#',
      github: '#',
    },
    {
      title: 'Security Compliance Framework',
      description: 'Developed comprehensive security framework achieving ISO 27001 and SOC 2 compliance for enterprise infrastructure.',
      technologies: ['Security', 'Compliance', 'Audit', 'AWS'],
      image: '🛡️',
      link: '#',
      github: '#',
    },
    {
      title: 'Infrastructure Monitoring',
      description: 'Deployed centralized monitoring solution with real-time alerting and predictive analytics for 100+ servers.',
      technologies: ['Prometheus', 'Grafana', 'ELK', 'Python'],
      image: '📊',
      link: '#',
      github: '#',
    },
    {
      title: 'Kubernetes Cluster Management',
      description: 'Architected and deployed production-ready Kubernetes clusters with auto-scaling, service mesh, and GitOps workflows.',
      technologies: ['Kubernetes', 'Istio', 'ArgoCD', 'Helm'],
      image: '☸️',
      link: '#',
      github: '#',
    },
    {
      title: 'Serverless Application Platform',
      description: 'Built scalable serverless platform handling 1M+ requests daily with event-driven architecture and microservices.',
      technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'SQS'],
      image: '🚀',
      link: '#',
      github: '#',
    },
    {
      title: 'Network Security Automation',
      description: 'Automated security policy deployment across multi-vendor firewall infrastructure with compliance validation.',
      technologies: ['Python', 'Ansible', 'Palo Alto', 'FortiGate'],
      image: '🔐',
      link: '#',
      github: '#',
    },
    {
      title: 'Disaster Recovery Solution',
      description: 'Implemented cross-region disaster recovery strategy with RPO < 15min and RTO < 1hr for mission-critical systems.',
      technologies: ['AWS', 'Azure', 'Veeam', 'Terraform'],
      image: '🔄',
      link: '#',
      github: '#',
    },
  ];

  return (
    <section id="projects" className="pt-32 pb-20 theme-bg-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Showcasing real-world solutions and enterprise-scale implementations
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
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="text-7xl mb-6"
            >
              <Wrench className="w-20 h-20 mx-auto text-primary-copper" />
            </motion.div>
            <h3 className="text-3xl font-bold mb-4 theme-text-primary">
              Coming Soon
            </h3>
            <p className="text-text-secondary text-lg mb-6">
              I&apos;m currently working on showcasing my latest projects. Check back soon to see my featured work!
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

export default Projects;
