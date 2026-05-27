import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import { projectsData } from '../data/projectsData';

const Portfolio = () => {
  const categories = ['All', ...new Set(projectsData.map(p => p.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? projectsData : projectsData.filter(p => p.category === activeCategory);

  return (
    <div className="py-16 md:py-24 bg-white">
      <Container>
        <SectionHeading
          badge="Our work"
          title="Projects that make a difference"
          subtitle="Real solutions for real challenges – see how we’ve helped businesses grow."
        />
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-6">
                <p className="text-indigo-600 text-xs font-semibold uppercase tracking-wide">{project.category}</p>
                <h3 className="text-xl font-bold mt-1 mb-2">{project.title}</h3>
                <p className="text-gray-500 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.slice(0, 3).map((t, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{t}</span>
                  ))}
                </div>
                <Link to={project.link} className="inline-flex items-center gap-1 text-indigo-600 font-medium mt-4 group-hover:gap-2 transition-all">
                  View case study →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Portfolio;