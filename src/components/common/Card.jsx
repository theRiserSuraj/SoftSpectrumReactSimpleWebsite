import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, onClick }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : {}}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;