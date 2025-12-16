'use client';

import { motion } from 'framer-motion';
import { Cloud, Network, Shield, Cog, Server, Brain, Workflow, MessageSquare, Database } from 'lucide-react';
import Link from 'next/link';

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Building intelligent, data-driven systems for smarter decisions. We develop scalable, explainable, and high-performing AI models.',
      features: ['Forecasting with LSTM & XGBoost', 'Vision & NLP using Transformers', 'SHAP-based explainability', 'End-to-end MLOps pipelines'],
    },
    {
      icon: Workflow,
      title: 'Automation & DevOps',
      description: 'Delivering efficiency and reliability through automation. We streamline workflows from build to deployment.',
      features: ['CI/CD with GitHub & Docker', 'AWS setup (EC2, S3, Lambda)', 'FastAPI & Django integrations', 'Monitoring & scaling'],
    },
    {
      icon: MessageSquare,
      title: 'Chatbots & AI Agents',
      description: 'Creating conversational systems that truly understand users. We blend language models with logic for context-aware dialogue.',
      features: ['RAG-based chatbots', 'Multi-language interaction', 'API & database integration', 'Memory-enabled intelligent agents'],
    },
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
      description: 'We implement IAM, VPC isolation, encryption, and secure network policies to protect infrastructure.',
      features: ['IAM & Role-Based Access Controls', 'Network Firewalls & VPC Isolation', 'Encryption at Rest & in Transit', 'Security Monitoring'],
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
      icon: Database,
      title: 'Big Data & Analytics',
      description: 'Enterprise data platform solutions with Cloudera, Snowflake, and Databricks for scalable analytics and data engineering.',
      features: ['Cloudera Data Platform', 'Snowflake Data Warehousing', 'Databricks Lakehouse', 'ETL & Data Pipelines'],
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
            Comprehensive network and AI solutions tailored to your business needs
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
            Let&apos;s discuss how we can help optimize your network and AI infrastructure
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-copper px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Schedule a Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
