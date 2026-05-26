import { motion, useScroll, useTransform } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

/* ─── Data ─────────────────────────────────────────── */
const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: "Radical Creativity",
    desc: "We challenge conventions to craft digital experiences that stand out and resonate.",
    accent: "#6366f1",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
        <path d="M3 12h3l3-9 3 18 3-9h3"/>
      </svg>
    ),
    title: "Uncompromising Quality",
    desc: "Pixel-perfect design, robust code, and obsessive attention to every detail.",
    accent: "#8b5cf6",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
        <path d="M12 2v4M12 22v-4M4 12H2M22 12h-2M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        <circle cx="12" cy="12" r="4"/>
      </svg>
    ),
    title: "Human‑Centered",
    desc: "We design for real people — usability, accessibility, and empathy first.",
    accent: "#06b6d4",
  },
];

const journey = [
  { year: "2023", title: "Founded in San Francisco", desc: "Began with a mission to reshape digital craft." },
  { year: "2024", title: "First Award Win", desc: "Recognized for innovation in UI/UX design." },
  { year: "2025", title: "Global Expansion", desc: "Opened remote hubs across 3 continents." },
];

const teamStats = [
  { value: "15+", label: "Experts" },
  { value: "7", label: "Countries" },
  { value: "100%", label: "Remote-first" },
];

/* ─── Floating orb background ───────────────────────── */
const OrbBg = () => (
  <div aria-hidden style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
    <motion.div
      animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position:'absolute', top:'-10%', right:'-5%',
        width:'clamp(280px,40vw,500px)', height:'clamp(280px,40vw,500px)',
        borderRadius:'50%',
        background:'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        filter:'blur(55px)',
      }}
    />
    <motion.div
      animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
      transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      style={{
        position:'absolute', bottom:'-5%', left:'-8%',
        width:'clamp(250px,35vw,450px)', height:'clamp(250px,35vw,450px)',
        borderRadius:'50%',
        background:'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
        filter:'blur(55px)',
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
    const dur = 1500;
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
const About = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [countersVisible, setCountersVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCountersVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#fafafa', overflowX: 'hidden' }}>

      {/* Google Font + responsive overrides */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&display=swap');

        .value-card {
          background: #fff;
          border-radius: 24px;
          padding: 2rem 1.8rem;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
          cursor: default;
          border: 1px solid #f0f0f0;
          will-change: transform;
        }
        .value-card:hover {
          transform: translateY(-6px);
        }

        .timeline-dot {
          width: 12px;
          height: 12px;
          background: #6366f1;
          border-radius: 50%;
          position: relative;
        }
        .timeline-dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: rgba(99,102,241,0.2);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        @media (max-width: 768px) {
          .values-grid { grid-template-columns: 1fr !important; gap: 1.2rem !important; }
          .journey-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .team-stats { flex-wrap: wrap; justify-content: center; }
          .hero-title { font-size: clamp(2rem, 7vw, 3.2rem) !important; }
        }
      `}</style>

      {/* ══ HERO SECTION ════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          padding: 'clamp(4rem, 10vw, 7rem) clamp(1.25rem, 5vw, 2.5rem)',
        }}
      >
        <OrbBg />
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, position: 'relative', zIndex: 1, width: '100%', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}
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
            <span style={{ fontSize: '1rem' }}>✨</span>
            <span style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.03em' }}>Our Story</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#0f0f13',
              marginBottom: '1.2rem',
            }}
          >
            Crafting digital <br />
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              excellence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#6b7280',
              maxWidth: '620px',
              margin: '0 auto 2rem',
              lineHeight: 1.65,
            }}
          >
            We're a passionate team of designers, engineers, and strategists who believe in the power of thoughtful digital products.
          </motion.p>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, #9ca3af, transparent)' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ══ MISSION BLOCK ════════════════════════════════ */}
      <section style={{ padding: '0 clamp(1.25rem, 5vw, 2.5rem) 3rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
            background: 'rgba(99,102,241,0.02)',
            borderRadius: '40px',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            border: '1px solid rgba(99,102,241,0.08)',
          }}
        >
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🎯</span>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            color: '#0f0f13',
            marginBottom: '1rem',
          }}>
            Our mission: to bridge <br/> beauty & function
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
            Every line of code, every pixel, every interaction is intentional — designed to empower businesses and delight users.
          </p>
        </motion.div>
      </section>

      {/* ══ VALUES ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 2.5rem)', maxWidth: '1200px', margin: '0 auto' }}>
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
            <span style={{ color: '#6366f1', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              What drives us
            </span>
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
            color: '#0f0f13',
            letterSpacing: '-0.02em',
          }}>
            Core values
          </h2>
        </motion.div>

        <div
          className="values-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.8rem',
          }}
        >
          {values.map((v, idx) => (
            <motion.div
              key={idx}
              className="value-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredValue(idx)}
              onMouseLeave={() => setHoveredValue(null)}
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                border: `1px solid ${hoveredValue === idx ? v.accent + '30' : '#f0f0f0'}`,
                boxShadow: hoveredValue === idx ? `0 20px 40px ${v.accent}18` : '0 2px 20px rgba(0,0,0,0.04)',
                transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <motion.div
                animate={hoveredValue === idx ? { scale: 1.1, rotate: 3 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: '54px', height: '54px',
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, ${v.accent}10, ${v.accent}05)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: v.accent,
                  marginBottom: '1.5rem',
                }}
              >
                {v.icon}
              </motion.div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: '#111827' }}>
                {v.title}
              </h3>
              <p style={{ color: '#6b7280', lineHeight: 1.65, fontSize: '0.95rem' }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ JOURNEY TIMELINE ════════════════════════════ */}
      <section style={{ background: '#fff', padding: 'clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 2.5rem)', marginTop: '1rem' }}>
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
              background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)',
              marginBottom: '1rem',
            }}>
              <span style={{ color: '#8b5cf6', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em' }}>
                Our journey
              </span>
            </div>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(1.8rem, 3.8vw, 2.6rem)',
              color: '#0f0f13',
            }}>
              Milestones that define us
            </h2>
          </motion.div>

          <div className="journey-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {journey.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -20 : idx === 2 ? 20 : 0, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center' }}
              >
                <div className="timeline-dot" style={{ margin: '0 auto 1rem' }} />
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#6366f1', fontFamily: "'DM Serif Display'", marginBottom: '0.5rem' }}>
                  {item.year}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.4rem' }}>{item.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEAM STATS + CTA ═════════════════════════════ */}
      <section ref={statsRef} style={{ padding: 'clamp(3rem, 7vw, 5rem) clamp(1.25rem, 5vw, 2.5rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #0f0f13, #1e1b4b)',
            borderRadius: '32px',
            padding: 'clamp(2.5rem, 6vw, 4rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div aria-hidden style={{
            position:'absolute', top:'-30%', left:'-10%',
            width:'300px', height:'300px', borderRadius:'50%',
            background:'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
            filter:'blur(50px)',
          }}/>

          <div className="team-stats" style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2.5rem', position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
            {teamStats.map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontFamily: "'DM Serif Display'", color: '#fff', fontWeight: 600 }}>
                  {countersVisible ? <Counter value={stat.value} /> : '0'}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.04em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ color: '#fff', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontFamily: "'DM Serif Display'", marginBottom: '0.8rem' }}>
            Ready to create something remarkable?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem', maxWidth: '450px', marginLeft: 'auto', marginRight: 'auto' }}>
            Join forces with our team of passionate creators.
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
              Start the conversation
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

export default About;