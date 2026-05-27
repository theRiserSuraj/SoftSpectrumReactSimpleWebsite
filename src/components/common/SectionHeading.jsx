import { motion } from 'framer-motion';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const SectionHeading = ({ badge, title, subtitle, center = true }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wide mb-4">
          {badge}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900">{title}</h2>
      {subtitle && <p className="text-gray-500 mt-3 max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeading;