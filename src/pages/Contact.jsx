import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNotification } from '../context/NotificationContext';
import { NavLink } from 'react-router-dom';

/* ─── Floating orb background (reused) ───────────────── */
const OrbBg = () => (
  <div aria-hidden style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
    <motion.div
      animate={{ x: [0, 25, 0], y: [0, -18, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position:'absolute', top:'-10%', right:'-5%',
        width:'clamp(280px,40vw,500px)', height:'clamp(280px,40vw,500px)',
        borderRadius:'50%',
        background:'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        filter:'blur(55px)',
      }}
    />
    <motion.div
      animate={{ x: [0, -20, 0], y: [0, 22, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      style={{
        position:'absolute', bottom:'-5%', left:'-8%',
        width:'clamp(250px,35vw,450px)', height:'clamp(250px,35vw,450px)',
        borderRadius:'50%',
        background:'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
        filter:'blur(55px)',
      }}
    />
    <motion.div
      animate={{ x: [0, 15, 0], y: [0, 12, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      style={{
        position:'absolute', top:'50%', left:'30%',
        width:'clamp(200px,30vw,350px)', height:'clamp(200px,30vw,350px)',
        borderRadius:'50%',
        background:'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
        filter:'blur(50px)',
      }}
    />
  </div>
);

/* ─── Contact info items ─────────────────────────────── */
const contactInfo = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="3"/>
      </svg>
    ),
    title: "Visit us",
    detail: "123 Innovation Drive, San Francisco, CA 94103",
    accent: "#6366f1",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    title: "Call us",
    detail: "+1 (555) 342-7890",
    accent: "#8b5cf6",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: "Email us",
    detail: "hello@softspectrum.com",
    accent: "#06b6d4",
  },
];

const faqs = [
  { q: "What's your typical project timeline?", a: "Depending on scope, 4–12 weeks from discovery to launch." },
  { q: "Do you offer support after launch?", a: "Absolutely — we provide maintenance and growth packages." },
  { q: "How do we get started?", a: "Fill out the form, and we'll schedule a free consultation call." },
];

const Contact = () => {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showNotification('Please fill all fields', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      showNotification(`Thanks ${formData.name}! We'll get back soon.`, 'success');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#fafafa', overflowX: 'hidden' }}>
      
      {/* Google Font + responsive overrides */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&display=swap');

        .contact-input {
          transition: all 0.2s ease;
        }
        .contact-input:focus {
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }

        .info-card {
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .info-card:hover {
          transform: translateY(-4px);
        }

        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: clamp(2rem, 7vw, 3.2rem) !important; }
        }
      `}</style>

      {/* ══ HERO SECTION ════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '65vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          padding: 'clamp(4rem, 10vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)',
        }}
      >
        <OrbBg />
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, position: 'relative', zIndex: 1, width: '100%', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '100px',
              padding: '6px 18px',
              marginBottom: '1.8rem',
            }}
          >
            <span style={{ fontSize: '1rem' }}>💬</span>
            <span style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.03em' }}>Start a conversation</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(2.6rem, 6vw, 4rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#0f0f13',
              marginBottom: '1.2rem',
            }}
          >
            Let's bring your <br />
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              vision to life
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#6b7280',
              maxWidth: '550px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Reach out and we'll get back within 24 hours. Let's create something extraordinary together.
          </motion.p>
        </motion.div>
      </section>

      {/* ══ FORM + CONTACT INFO SECTION ═══════════════════ */}
      <section style={{ padding: 'clamp(2rem, 5vw, 3rem) clamp(1.25rem, 5vw, 2.5rem)', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          
          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: '#fff',
              borderRadius: '32px',
              padding: 'clamp(1.8rem, 4vw, 2.5rem)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
              border: '1px solid #f0f0f0',
            }}
          >
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(1.6rem, 3vw, 2rem)',
              marginBottom: '0.5rem',
              color: '#0f0f13',
            }}>
              Send us a message
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '0.9rem' }}>
              We'll respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Name field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#374151' }}>
                  Full name *
                </label>
                <motion.input
                  animate={{ borderColor: focusedField === 'name' ? '#6366f1' : '#e5e7eb' }}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="contact-input"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    border: '1.5px solid',
                    borderColor: focusedField === 'name' ? '#6366f1' : '#e5e7eb',
                    outline: 'none',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s',
                  }}
                />
              </div>

              {/* Email field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#374151' }}>
                  Email address *
                </label>
                <motion.input
                  animate={{ borderColor: focusedField === 'email' ? '#6366f1' : '#e5e7eb' }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="contact-input"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    border: '1.5px solid',
                    borderColor: focusedField === 'email' ? '#6366f1' : '#e5e7eb',
                    outline: 'none',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Message field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#374151' }}>
                  Message *
                </label>
                <motion.textarea
                  animate={{ borderColor: focusedField === 'message' ? '#6366f1' : '#e5e7eb' }}
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    border: '1.5px solid',
                    borderColor: focusedField === 'message' ? '#6366f1' : '#e5e7eb',
                    outline: 'none',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 24px',
                  borderRadius: '100px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.2s',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info Cards Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                className="info-card"
                whileHover={{ y: -4 }}
                style={{
                  background: '#fff',
                  borderRadius: '24px',
                  padding: '1.5rem',
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '18px',
                  background: `linear-gradient(135deg, ${info.accent}10, ${info.accent}05)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: info.accent,
                }}>
                  {info.icon}
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: '0.25rem', color: '#111827' }}>{info.title}</h3>
                  <p style={{ color: '#6b7280' }}>{info.detail}</p>
                </div>
              </motion.div>
            ))}

            {/* Decorative map placeholder */}
            <div style={{
              marginTop: '1rem',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid #f0f0f0',
              background: '#f9f9ff',
              padding: '1rem',
              textAlign: 'center',
            }}>
              <svg width="100%" height="120" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 60 Q100 20 200 60 T400 60" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" fill="none"/>
                <circle cx="200" cy="60" r="6" fill="#6366f1" />
                <circle cx="200" cy="60" r="12" stroke="#6366f1" strokeWidth="1.5" fill="rgba(99,102,241,0.2)" />
                <text x="200" y="90" textAnchor="middle" fill="#6366f1" fontSize="10" fontWeight="500">San Francisco HQ</text>
              </svg>
              <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '8px' }}>Come say hi — coffee's on us ☕</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FAQ SECTION ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(3rem, 7vw, 5rem) clamp(1.25rem, 5vw, 2.5rem)', background: '#fff', marginTop: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '5px 14px', borderRadius: '100px',
              background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)',
              marginBottom: '1rem',
            }}>
              <span style={{ color: '#6366f1', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em' }}>FAQ</span>
            </div>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(1.8rem, 3.8vw, 2.6rem)',
              color: '#0f0f13',
            }}>
              Common questions
            </h2>
          </motion.div>

          <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: '#fafcff',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  border: '1px solid #f0f0f0',
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#111827', fontSize: '1.05rem' }}>{faq.q}</div>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA BANNER ══════════════════════════════ */}
      <section style={{ padding: 'clamp(2rem, 5vw, 3rem) clamp(1.25rem, 5vw, 2.5rem)', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #0f0f13, #1e1b4b)',
            borderRadius: '32px',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div aria-hidden style={{
            position:'absolute', top:'-30%', right:'-10%',
            width:'300px', height:'300px', borderRadius:'50%',
            background:'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
            filter:'blur(50px)',
          }}/>
          <h3 style={{ color: '#fff', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontFamily: "'DM Serif Display'", marginBottom: '0.8rem' }}>
            Prefer a direct call?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.8rem' }}>
            We're available Monday–Friday, 9am–6pm PST.
          </p>
          <NavLink to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: '#fff',
                color: '#4338ca',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '100px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
              }}
            >
              +1 (555) 342-7890
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </NavLink>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;