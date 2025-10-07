'use client';

import { motion } from 'framer-motion';
import { Cloud, Network, Shield, Cog, Server, LineChart } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Cloud,
      title: 'Cloud Migration & Architecture',
      description: 'End-to-end cloud migration services with optimized architecture design for AWS, Azure, and GCP.',
      features: ['Infrastructure Planning', 'Cost Optimization', 'Performance Tuning', 'High Availability'],
    },
    {
      icon: Network,
      title: 'Network Design & Implementation',
      description: 'Enterprise-grade network solutions with modern SD-WAN, security, and scalability built-in.',
      features: ['Network Architecture', 'SD-WAN Implementation', 'Load Balancing', 'VPN Setup'],
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Comprehensive security solutions ensuring compliance with industry standards and best practices.',
      features: ['Security Audits', 'Compliance Frameworks', 'Threat Detection', 'Access Management'],
    },
    {
      icon: Cog,
      title: 'Infrastructure Automation',
      description: 'Automated infrastructure provisioning and configuration management using modern IaC tools.',
      features: ['Terraform', 'Ansible', 'CI/CD Pipelines', 'GitOps'],
    },
    {
      icon: Server,
      title: 'DevOps & Containerization',
      description: 'Modern DevOps practices with containerization and orchestration for scalable applications.',
      features: ['Docker', 'Kubernetes', 'Microservices', 'Container Security'],
    },
    {
      icon: LineChart,
      title: 'Monitoring & Optimization',
      description: 'Comprehensive monitoring solutions with predictive analytics and performance optimization.',
      features: ['Real-time Monitoring', 'Log Analytics', 'Performance Tuning', 'Capacity Planning'],
    },
  ];

  return (
    <section id="services" className="pt-32 pb-20 theme-bg-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Services & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Comprehensive cloud and network solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="theme-card-bg p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="w-14 h-14 theme-card-bg border theme-border rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-copper group-hover:border-primary-copper group-hover:scale-110 transition-all duration-300">
                  <Icon className="text-primary-copper group-hover:text-white transition-colors" size={28} />
                </div>

                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-text-secondary mb-6">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                      <div className="w-1.5 h-1.5 bg-primary-copper rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary-copper to-[#C4906F] rounded-2xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Infrastructure?</h3>
          <p className="text-lg mb-8 opacity-90">
            Let&apos;s discuss how I can help optimize your cloud and network infrastructure
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-primary-copper px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Schedule a Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
