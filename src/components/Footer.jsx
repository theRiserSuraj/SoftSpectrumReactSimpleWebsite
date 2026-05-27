import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Social icons (keep as placeholders – you can replace with actual URLs)
  const socialLinks = [
    {
      name: 'Twitter',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.3 9 4.5 1.1-3.4 4.2-6 8-5.5 1.5.2 2.6 1 3 2z"/>
        </svg>
      ),
      url: 'https://twitter.com/softspectrum',
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
      url: 'https://linkedin.com/company/softspectrum',
    },
    {
      name: 'GitHub',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
      ),
      url: 'https://github.com/softspectrum',
    },
  ];

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: '#ffffff',
        borderTop: '1px solid rgba(249, 115, 22, 0.1)',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        marginTop: 'auto',
        position: 'relative',
      }}
    >
      {/* Gradient line – updated to orange/red theme */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #f97316, #ef4444, #f59e0b, transparent)', width: '100%' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-base">SS</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
                SoftSpectrum
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-500 max-w-md text-[0.95rem] leading-relaxed"
            >
              <strong className="text-gray-700">SOFTSPECTRUM TECHNOLOGY</strong><br />
              "It's not how many ideas you have, it's how many you implement."
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-gray-500 max-w-md text-[0.85rem] leading-relaxed mt-3"
            >
              UG-13, Radha Krishna Complex, Transport Nagar Main Road,<br />
              Opp. Allahabad Bank, Bhanwar Kuan, Indore, MP
            </motion.p>
            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-4 mt-6"
            >
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Explore Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold text-gray-900 mb-4 text-base tracking-tight">Explore</h4>
            <ul className="space-y-3 text-sm">
              {footerLinks.map(link => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className="text-gray-500 hover:text-orange-500 transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Info – updated with real details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h4 className="font-semibold text-gray-900 mb-4 text-base tracking-tight">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginTop: '2px' }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="break-all">hr@softspectrum.net</span>
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>0731-4032681</span>
              </li>
              <li className="flex items-start gap-2 text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginTop: '2px' }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="3"/>
                </svg>
                <span>UG-13, Radha Krishna Complex, Transport Nagar Main Rd, Opp. Allahabad Bank, Bhanwar Kuan, Indore, MP</span>
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <a href="https://www.softspectrum.net" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
                  www.softspectrum.net
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-gray-100 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400 text-xs tracking-wide">
            © {currentYear} SOFTSPECTRUM TECHNOLOGY. All rights reserved. Designed with <span style={{ color: '#ef4444' }}>❤️</span> for the digital frontier.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;