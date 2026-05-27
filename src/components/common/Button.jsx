import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', to, onClick, className = '', type = 'button' }) => {
  const base = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg hover:scale-105",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:border-indigo-400 hover:text-indigo-600",
    outline: "bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
  };

  // If 'to' is provided, render a Link (for navigation)
  if (to) {
    return (
      <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    );
  }

  // Otherwise render a motion button
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;