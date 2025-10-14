'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Briefcase } from 'lucide-react';

const About = () => {
  const skills = [
    { category: 'Network Technologies', items: ['Cisco', 'SD-WAN', 'VPN', 'Firewall'] },
    { category: 'DevOps & Automation', items: ['Terraform', 'Ansible', 'Docker', 'Kubernetes'] },
    { category: 'Programming', items: ['Python', 'PowerShell', 'SQL', 'JavaScript'] },
    { category: 'Frameworks/Tools', items: ['Django', 'FastAPI', 'REST API', 'Hugging Face', 'PyTorch'] },
    { category: 'LLMs/RAG', items: ['LangChain', 'LangGraph', 'AutoGen', 'RAG', 'Prompt Engineering', 'OpenAI APIs', 'Gemini'] },
  ];

  const certifications = [
    'AWS Certified Advanced Networking - Specialty',
    'CompTIA Security+',
    'Cisco Certified Network Associate',
  ];

  return (
    <section id="about" className="py-20 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Passionate about building scalable infrastructure and secure network solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white px-8 pt-8 pb-6 rounded-2xl shadow-card"
          >
            <h3 className="text-2xl font-bold mb-6">Professional Profile</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Atul Mishra</h4>
                  <p className="text-text-secondary">Network and AI/ML Engineer</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold">Education</h4>
                  <p className="text-text-secondary">Master&apos;s Degree in Information Technology</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary" size={24} />
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
                    className="flex items-center gap-3 p-3 bg-accent-green/10 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-accent-green rounded-full" />
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
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-card">
                <h4 className="font-semibold text-lg mb-4">{skillGroup.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-primary-50 text-primary rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
