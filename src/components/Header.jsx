import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        transition: 'box-shadow 0.3s ease, background 0.3s ease',
        background: scrolled 
          ? 'rgba(255, 255, 255, 0.92)' 
          : 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid',
        borderBottomColor: scrolled ? 'rgba(99, 102, 241, 0.08)' : 'rgba(229, 231, 235, 0.5)',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.02)' : 'none',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md"
          >
            <span className="text-white font-bold text-lg tracking-tight">S</span>
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
            SoftSpectrum
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative font-medium text-[15px] transition-all duration-200 ${
                  isActive 
                    ? 'text-indigo-700 font-semibold' 
                    : 'text-gray-700 hover:text-indigo-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          
          {/* Optional subtle CTA – matches the page's premium style */}
          <NavLink to="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Start a project
            </motion.button>
          </NavLink>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-xl hover:bg-gray-100/60 transition-all duration-200 focus:outline-none"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-0.5 bg-gray-800 rounded-full"
          />
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-0.5 bg-gray-800 rounded-full"
          />
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-0.5 bg-gray-800 rounded-full"
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-white/98 backdrop-blur-xl border-t border-gray-100/80"
          >
            <nav className="flex flex-col px-6 py-7 gap-3">
              {links.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium px-4 py-3 rounded-2xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-3">
                <NavLink to="/contact" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-md">
                    Let's talk
                  </button>
                </NavLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;