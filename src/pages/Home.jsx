import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

/* ─── Data ─────────────────────────────────────────── */
const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M17 7.5H7m10 4H7m10 4H7M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z"/>
        <path d="M9 3v3m6-3v3"/>
      </svg>
    ),
    label: "01",
    title: "Web Development",
    desc: "High-performance, responsive web apps engineered with modern frameworks and pixel-perfect precision.",
    accent: "#6366f1",
    bg: "rgba(99,102,241,0.07)",
    border: "rgba(99,102,241,0.18)",
    tag: "React · Next.js · Node",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <circle cx="12" cy="12" r="3"/>
        <path d="M6.343 6.343a8 8 0 1 0 11.314 11.314A8 8 0 0 0 6.343 6.343Z"/>
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2"/>
      </svg>
    ),
    label: "02",
    title: "UI/UX Design",
    desc: "Intuitive, human-centric interfaces that guide users effortlessly from first click to conversion.",
    accent: "#8b5cf6",
    bg: "rgba(139,92,246,0.07)",
    border: "rgba(139,92,246,0.18)",
    tag: "Figma · Prototyping · Research",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
        <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"/>
        <path d="M18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"/>
      </svg>
    ),
    label: "03",
    title: "AI Integration",
    desc: "Intelligent automation and data-driven insights that transform how your product thinks and scales.",
    accent: "#06b6d4",
    bg: "rgba(6,182,212,0.07)",
    border: "rgba(6,182,212,0.18)",
    tag: "LLMs · Automation · Analytics",
  },
];

const stats = [
  { value: "150+", label: "Projects Shipped" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "7yrs", label: "Industry Experience" },
  { value: "40+", label: "Global Clients" },
];

/* ─── Floating orb bg ───────────────────────────────── */
const OrbBg = () => (
  <div aria-hidden style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
    <motion.div
      animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position:'absolute', top:'-10%', right:'-5%',
        width:'clamp(300px,45vw,600px)', height:'clamp(300px,45vw,600px)',
        borderRadius:'50%',
        background:'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)',
        filter:'blur(60px)',
      }}
    />
    <motion.div
      animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      style={{
        position:'absolute', bottom:'-5%', left:'-8%',
        width:'clamp(250px,40vw,500px)', height:'clamp(250px,40vw,500px)',
        borderRadius:'50%',
        background:'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
        filter:'blur(60px)',
      }}
    />
    <motion.div
      animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      style={{
        position:'absolute', top:'40%', left:'40%',
        width:'clamp(150px,25vw,350px)', height:'clamp(150px,25vw,350px)',
        borderRadius:'50%',
        background:'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
        filter:'blur(40px)',
      }}
    />
  </div>
);

/* ─── Animated counter ───────────────────────────────── */
const Counter = ({ value }) => {
  const [display, setDisplay] = useState('0');
  const numMatch = value.match(/[\d.]+/);
  const num = numMatch ? parseFloat(numMatch[0]) : 0;
  const suffix = value.replace(/[\d.]+/, '');

  useEffect(() => {
    let start = 0;
    const end = num;
    const dur = 1800;
    const step = 16;
    const inc = end / (dur / step);
    const timer = setInterval(() => {
      start += inc;
      if (start >= end) { setDisplay(value); clearInterval(timer); }
      else {
        const disp = Number.isInteger(num) ? Math.floor(start) : start.toFixed(1);
        setDisplay(`${disp}${suffix}`);
      }
    }, step);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{display}</span>;
};

/* ─── Main Component ─────────────────────────────────── */
const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [countersVisible, setCountersVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCountersVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#fafafa', overflowX: 'hidden' }}>

      {/* ── Google font ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hero-grid-bg {
          background-image:
            linear-gradient(rgba(99,102,241,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.045) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .service-card {
          position: relative;
          background: #fff;
          border-radius: 20px;
          padding: 2rem;
          cursor: default;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease;
          will-change: transform;
        }
        .service-card:hover {
          transform: translateY(-6px);
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          border: none;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 12px 40px rgba(99,102,241,0.35);
          text-decoration: none;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #818cf8, #a78bfa);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .cta-btn:hover::before { opacity: 1; }
        .cta-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 20px 50px rgba(99,102,241,0.45); }
        .cta-btn:active { transform: scale(0.98); }
        .cta-btn span { position: relative; z-index: 1; }

        .ghost-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: transparent;
          color: #4b5563;
          border: 1.5px solid #e5e7eb;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s;
        }
        .ghost-btn:hover {
          border-color: #6366f1;
          color: #6366f1;
          background: rgba(99,102,241,0.04);
          transform: translateY(-1px);
        }

        .stat-card {
          background: #fff;
          border-radius: 16px;
          padding: 1.5rem 1.75rem;
          border: 1px solid #f0f0f0;
          box-shadow: 0 2px 20px rgba(0,0,0,0.04);
        }

        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: clamp(2.2rem, 8vw, 3.5rem) !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-buttons { flex-direction: column; align-items: center; }
          .hero-buttons a, .hero-buttons button { width: 100%; justify-content: center; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .service-card { padding: 1.5rem; }
        }
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="hero-grid-bg"
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          padding: 'clamp(5rem, 12vw, 9rem) clamp(1.25rem, 5vw, 2.5rem)',
        }}
      >
        <OrbBg />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hero-content"
          sx={{ position:'relative', zIndex:1, width:'100%', maxWidth:'900px', margin:'0 auto', textAlign:'center' }}
          style={{ position:'relative', zIndex:1, width:'100%', maxWidth:'900px', margin:'0 auto', textAlign:'center' }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '100px',
              padding: '7px 18px',
              marginBottom: '2rem',
            }}
          >
            <motion.span
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
              style={{ fontSize: '1rem' }}
            >✦</motion.span>
            <span style={{ color: '#6366f1', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.02em' }}>
              Digital Craftsmanship Studio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#0f0f13',
              marginBottom: '1.5rem',
            }}
          >
            Where ideas become{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                spectrum
              </span>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.9, ease: 'easeOut' }}
                viewBox="0 0 220 14" fill="none"
                style={{ position:'absolute', bottom:'-6px', left:0, width:'100%', height:'14px' }}
              >
                <motion.path
                  d="M4 9 C 40 2, 80 13, 120 6 S 185 2, 216 7"
                  stroke="url(#underline-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.9 }}
                />
                <defs>
                  <linearGradient id="underline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1"/>
                    <stop offset="100%" stopColor="#06b6d4"/>
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              color: '#6b7280',
              lineHeight: 1.75,
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
            }}
          >
            We build future-ready digital experiences that blend innovation,
            design, and engineering excellence — from concept to launch.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'1rem' }}
          >
            <NavLink to="/contact">
              <button className="cta-btn">
                <span>Let's Work Together</span>
                <span style={{ position:'relative', zIndex:1 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </button>
            </NavLink>
            <NavLink to="/work">
              <button className="ghost-btn">
                See Our Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </button>
            </NavLink>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            style={{ marginTop: '4rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}
          >
            <span style={{ fontSize: '0.72rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#9ca3af', fontWeight:500 }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '1px', height: '40px',
                background: 'linear-gradient(to bottom, #9ca3af, transparent)',
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════ */}
      <section
        ref={statsRef}
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
          padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.25rem, 5vw, 2.5rem)',
        }}
      >
        <div
          className="stats-grid"
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center' }}
            >
                
              <div style={{
                fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
                fontFamily: "'DM Serif Display', serif",
                color: '#fff',
                lineHeight: 1,
                marginBottom: '6px',
              }}>
                {countersVisible ? <Counter value={s.value} /> : '0'}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ SERVICES ════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 10vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '100px',
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.15)',
            marginBottom: '1.25rem',
          }}>
            <span style={{ color: '#6366f1', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform:'uppercase' }}>
              What We Deliver
            </span>
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            color: '#0f0f13',
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            marginBottom: '1rem',
          }}>
            End-to-end digital solutions
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Tailored to your vision — from blueprint to breakthrough.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(1rem, 2.5vw, 1.75rem)',
          }}
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="service-card"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                border: `1px solid ${hoveredCard === i ? s.border : '#f0f0f0'}`,
                boxShadow: hoveredCard === i
                  ? `0 20px 60px ${s.accent}18, 0 2px 12px rgba(0,0,0,0.05)`
                  : '0 2px 20px rgba(0,0,0,0.04)',
                transition: 'all 0.35s cubic-bezier(.22,1,.36,1)',
                transform: hoveredCard === i ? 'translateY(-6px)' : 'none',
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <motion.div
                  animate={hoveredCard === i ? { scale: 1.12, rotate: -5 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '52px', height: '52px',
                    borderRadius: '14px',
                    background: s.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: s.accent,
                  }}
                >
                  {s.icon}
                </motion.div>
                <span style={{ color: '#d1d5db', fontFamily: "'DM Serif Display', serif", fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
                  {s.label}
                </span>
              </div>

              <h3 style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '0.75rem',
                letterSpacing: '-0.02em',
              }}>
                {s.title}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {s.desc}
              </p>

              {/* Tag + Arrow */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <span
                  className="tag-pill"
                  style={{ background: s.bg, color: s.accent }}
                >
                  {s.tag}
                </span>
                <motion.div
                  animate={hoveredCard === i ? { x: 4, opacity: 1 } : { x: 0, opacity: 0.4 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: s.accent }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.div>
              </div>

              {/* Hover accent line */}
              <motion.div
                animate={hoveredCard === i ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                initial={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: 0, left: '10%',
                  width: '80%', height: '3px',
                  background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
                  borderRadius: '2px',
                  transformOrigin: 'center',
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ CTA BANNER ═══════════════════════════════════ */}
      <section style={{ padding: 'clamp(1rem, 3vw, 2.5rem) clamp(1.25rem, 5vw, 2.5rem)', marginBottom: 'clamp(3rem, 7vw, 5rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #0f0f13 0%, #1e1b4b 100%)',
            borderRadius: '28px',
            padding: 'clamp(2.5rem, 6vw, 4rem) clamp(2rem, 6vw, 4rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* bg orb */}
          <div aria-hidden style={{
            position:'absolute', top:'-30%', right:'-5%',
            width:'400px', height:'400px', borderRadius:'50%',
            background:'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 65%)',
            filter:'blur(40px)', pointerEvents:'none',
          }}/>

          <div style={{ position:'relative', zIndex:1 }}>
            <p style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.82rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'0.75rem' }}>
              Ready to launch?
            </p>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              color: '#fff',
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
            }}>
              Let's build something<br/>
              <em style={{ color:'#a5b4fc', fontStyle:'normal' }}>extraordinary together.</em>
            </h2>
          </div>

          <NavLink to="/contact" style={{ position:'relative', zIndex:1, flexShrink:0 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display:'inline-flex', alignItems:'center', gap:'10px',
                padding:'14px 30px',
                background:'#fff',
                color:'#4338ca',
                border:'none',
                borderRadius:'100px',
                fontFamily:"'DM Sans', sans-serif",
                fontSize:'1rem',
                fontWeight:700,
                cursor:'pointer',
                boxShadow:'0 8px 30px rgba(0,0,0,0.25)',
                whiteSpace:'nowrap',
              }}
            >
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </NavLink>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
