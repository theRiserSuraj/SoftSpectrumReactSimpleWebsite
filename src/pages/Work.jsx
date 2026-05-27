import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';

// Sample projects data – replace with your actual case studies
const projectsData = [
  {
    id: 1,
    title: "FinTech Analytics Dashboard",
    category: "Web App",
    image: "https://placehold.co/600x400/f97316/white?text=FinTech+Dashboard",
    description: "Real‑time portfolio analytics for a $500M investment fund.",
    challenge: "Legacy system couldn't handle high‑frequency data.",
    solution: "Built a reactive dashboard with WebSocket streaming and D3 visualizations.",
    results: "40% faster insights, 99.9% uptime during peak hours.",
    tech: ["React", "D3.js", "Node.js", "AWS"],
    link: "/work/fintech-dashboard"
  },
  {
    id: 2,
    title: "E‑commerce Platform Migration",
    category: "Cloud Migration",
    image: "https://placehold.co/600x400/ef4444/white?text=E‑commerce+Migration",
    description: "Migrated a retail giant from on‑prem to AWS with zero downtime.",
    challenge: "High traffic spikes during sales events.",
    solution: "Auto‑scaling microservices architecture on EKS.",
    results: "Scaled to 50k concurrent users, 30% cost reduction.",
    tech: ["AWS", "Terraform", "Kubernetes", "PostgreSQL"],
    link: "/work/ecommerce-migration"
  },
  {
    id: 3,
    title: "Healthcare AI Assistant",
    category: "AI/ML",
    image: "https://placehold.co/600x400/f59e0b/white?text=AI+Assistant",
    description: "LLM‑powered triage tool for a hospital network.",
    challenge: "Patient data privacy and low latency.",
    solution: "On‑prem LLM fine‑tuned with synthetic data + FastAPI backend.",
    results: "Reduced nurse triage time by 60%, 98% patient satisfaction.",
    tech: ["Python", "LangChain", "OpenAI", "FastAPI"],
    link: "/work/ai-assistant"
  },
  {
    id: 4,
    title: "Real Estate CRM",
    category: "Web App",
    image: "https://placehold.co/600x400/ea580c/white?text=Real+Estate+CRM",
    description: "Custom CRM for a property management firm.",
    challenge: "Disconnected tools and manual lead tracking.",
    solution: "Unified platform with automated workflows and reporting.",
    results: "Lead conversion up 25%, saved 20hrs/week admin time.",
    tech: ["Next.js", "PostgreSQL", "Tailwind", "Node.js"],
    link: "/work/real-estate-crm"
  },
  {
    id: 5,
    title: "Cybersecurity Audit Tool",
    category: "Security",
    image: "https://placehold.co/600x400/dc2626/white?text=Security+Tool",
    description: "Automated compliance scanning for SMBs.",
    challenge: "Manual audits were slow and error‑prone.",
    solution: "SaaS platform with scheduled scans and PDF reports.",
    results: "Achieved ISO 27001 readiness in 3 months.",
    tech: ["Python", "React", "MongoDB", "Docker"],
    link: "/work/security-tool"
  }
];

const categories = ['All', ...new Set(projectsData.map(p => p.category))];

const Work = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);
  const filteredProjects = activeCategory === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Container className="py-16 md:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-semibold uppercase tracking-wide mb-4">
            Our work
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-4">
            Real projects,<br />
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              real impact
            </span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Explore how we've helped businesses transform digitally — from concept to launch.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium bg-orange-500/80 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-500 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-gray-400 text-xs">+{project.tech.length - 3}</span>
                  )}
                </div>
                <Link
                  to={project.link}
                  className="inline-flex items-center gap-1 text-orange-600 font-medium hover:gap-2 transition-all"
                >
                  View case study
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Ready to start your own success story?
            </h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Let's discuss how we can bring your vision to life.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start a project →
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Work;