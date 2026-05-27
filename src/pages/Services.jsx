import { motion } from 'framer-motion';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Card from '../components/common/Card';
import { servicesData } from '../data/servicesData';

const Services = () => {
  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-white to-indigo-50/20">
      <Container>
        <SectionHeading
          badge="What we offer"
          title="End‑to‑end IT solutions"
          subtitle="From ideation to deployment, we cover the full spectrum of modern technology."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-1 text-sm text-gray-500">
                {service.features.map((f, i) => <li key={i}>✓ {f}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Services;