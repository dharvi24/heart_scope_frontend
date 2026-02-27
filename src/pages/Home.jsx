import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  FaUserMd, FaShieldAlt, FaChartLine, FaHeartbeat,
  FaDatabase, FaArrowRight, FaCheckCircle, FaBrain,
  FaFlask, FaStar
} from "react-icons/fa";
import Container from "../components/Container";

/* ── Animated Counter ── */
const AnimatedStat = ({ target, suffix = '', prefix = '', decimals = 0, label, color }) => {
  const [count, setCount] = React.useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (!inView) return;
    let s = 0;
    const dur = 1800; const step = 16;
    const inc = target / (dur / step);
    const t = setInterval(() => {
      s += inc;
      if (s >= target) { setCount(target); clearInterval(t); }
      else setCount(parseFloat(s.toFixed(decimals)));
    }, step);
    return () => clearInterval(t);
  }, [inView, target, decimals]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color }}>
        {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}
      </div>
      <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.3rem', fontWeight: 500 }}>{label}</div>
    </div>
  );
};

const Home = () => {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>

      {/* ══════════════ HERO ══════════════ */}
      <section style={{ padding: "5rem 0 7rem", textAlign: "center", position: "relative", zIndex: 2 }}>
        <Container>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            style={{ maxWidth: "900px", margin: "0 auto" }}>

            {/* Badge */}
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15, duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: 'center', gap: '0.5rem',
                padding: "0.6rem 1.5rem", background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)", borderRadius: "50px",
                marginBottom: "2rem", fontSize: "0.85rem", color: "var(--primary-light)",
                fontWeight: 600, letterSpacing: "0.05em", backdropFilter: "blur(10px)"
              }}>
              <FaStar style={{ color: 'var(--warning)' }} />
              MEDICAL-GRADE AI DIAGNOSTICS
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }}
              style={{
                fontSize: "clamp(2.8rem, 8vw, 6rem)", fontWeight: 800,
                lineHeight: 1.05, marginBottom: "1.5rem", letterSpacing: "-0.03em"
              }}>
              Precision Cardiology
              <br />
              <motion.span className="text-gradient"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}>
                Risk Assessment
              </motion.span>
            </motion.h1>

            {/* Sub */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.8 }}
              style={{
                fontSize: "clamp(1.05rem, 2vw, 1.3rem)", color: "var(--text-secondary)",
                maxWidth: "680px", margin: "0 auto 3rem auto", lineHeight: 1.8
              }}>
              Leveraging advanced machine learning trained on <strong style={{ color: 'var(--text-main)' }}>70,000+</strong> verified
              clinical records to deliver instant, probabilistic cardiovascular risk assessments.
            </motion.p>

            {/* CTA buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
              style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.96 }}>
                <Link to="/predict" className="btn btn-primary glow"
                  style={{ padding: "1.1rem 3rem", fontSize: "1.05rem", fontWeight: 700, borderRadius: '14px', gap: '0.6rem' }}>
                  Start Assessment <FaArrowRight />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.96 }}>
                <Link to="/performance" className="btn btn-secondary"
                  style={{ padding: "1.1rem 2.5rem", fontSize: "1.05rem", borderRadius: '14px' }}>
                  View Metrics
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust badges */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              {[
                { label: '73.1% Accuracy', icon: <FaChartLine /> },
                { label: '79.3% ROC-AUC', icon: <FaBrain /> },
                { label: 'Privacy-first', icon: <FaShieldAlt /> },
              ].map((b, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500
                }}>
                  <span style={{ color: 'var(--success)', fontSize: '0.9rem' }}>{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ══════════════ STATS STRIP ══════════════ */}
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0.5rem', marginBottom: '5rem',
            padding: '2rem 2.5rem', borderRadius: '24px',
            background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)',
            border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-lg)'
          }}>
          {[
            { target: 70000, suffix: '+', label: 'Training Records', color: 'var(--primary)' },
            { target: 73.1, suffix: '%', decimals: 1, label: 'Model Accuracy', color: 'var(--success)' },
            { target: 79.3, suffix: '%', decimals: 1, label: 'ROC-AUC Score', color: 'var(--secondary)' },
            { target: 11, suffix: '', label: 'Clinical Features', color: 'var(--accent-3)' },
            { target: 200, suffix: '', label: 'Forest Estimators', color: 'var(--accent)' },
          ].map((s, i) => (
            <React.Fragment key={i}>
              <AnimatedStat {...s} />
              {i < 4 && <div style={{ width: '1px', background: 'var(--glass-border)', margin: '0 auto', display: 'none' }} />}
            </React.Fragment>
          ))}
        </motion.div>
      </Container>

      {/* ══════════════ FEATURE CARDS ══════════════ */}
      <Container style={{ paddingBottom: "6rem" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
            Why HeartScope?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto' }}>
            Built on robust clinical methodology to assist physicians in early cardiovascular risk detection.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.75rem" }}>
          <FeatureCard
            icon={<FaChartLine size={28} />}
            title="Clinical Accuracy"
            desc="Validated against 70,000+ patient records with 73.1% accuracy and 79.3% ROC-AUC, ensuring reliable screening performance."
            color="var(--primary)"
            delay={0.1}
            link="/performance"
            linkLabel="View Metrics"
          />
          <FeatureCard
            icon={<FaShieldAlt size={28} />}
            title="Secure Processing"
            desc="All computation is done server-side per-request. No patient data is stored or logged — complete data sovereignty."
            color="var(--success)"
            delay={0.2}
            link="/about"
            linkLabel="Learn More"
          />
          <FeatureCard
            icon={<FaUserMd size={28} />}
            title="Physician Support"
            desc="Designed as a decision-support tool to augment clinical triage, not replace it. Always verify with a cardiologist."
            color="var(--secondary)"
            delay={0.3}
            link="/about"
            linkLabel="Methodology"
          />
          <FeatureCard
            icon={<FaDatabase size={28} />}
            title="Rich Dataset"
            desc="Trained on real-world anonymized records spanning demographics, lifestyle factors, and clinical measurements."
            color="var(--accent-3)"
            delay={0.4}
            link="/dataset"
            linkLabel="Explore Data"
          />
          <FeatureCard
            icon={<FaBrain size={28} />}
            title="Random Forest Model"
            desc="200-tree ensemble with balanced class weights and StandardScaler preprocessing — optimised for sensitivity (recall)."
            color="var(--accent)"
            delay={0.5}
            link="/performance"
            linkLabel="Model Details"
          />
          <FeatureCard
            icon={<FaFlask size={28} />}
            title="Open Methodology"
            desc="Built with Python, Scikit-Learn, FastAPI, and React. Fully reproducible training pipeline with 5-fold cross-validation."
            color="var(--warning)"
            delay={0.6}
            link="/about"
            linkLabel="Tech Stack"
          />
        </div>
      </Container>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <Container style={{ paddingBottom: '7rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
            How It Works
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto' }}>
            Three simple steps to get your cardiovascular risk profile.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              step: '01', title: 'Enter Your Vitals',
              desc: 'Input basic demographics, blood pressure readings, cholesterol level, and lifestyle habits.',
              icon: <FaUserMd />, color: 'var(--primary)'
            },
            {
              step: '02', title: 'AI Analysis',
              desc: 'The Random Forest model processes your data through 200 decision trees trained on 70k records.',
              icon: <FaBrain />, color: 'var(--accent-3)'
            },
            {
              step: '03', title: 'Get Your Report',
              desc: 'Receive an instant risk percentage, clinical classification, and personalised health recommendations.',
              icon: <FaHeartbeat />, color: 'var(--danger)'
            },
          ].map((step, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.55 }}
              className="glass-panel"
              style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              {/* Step number watermark */}
              <div style={{
                position: 'absolute', top: '-0.5rem', right: '1rem',
                fontSize: '5rem', fontWeight: 900,
                color: 'var(--text-main)', opacity: 0.05,
                lineHeight: 1, userSelect: 'none'
              }}>{step.step}</div>

              <div style={{
                width: '52px', height: '52px', borderRadius: '16px',
                background: `${step.color}15`, border: `2px solid ${step.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: step.color, fontSize: '1.25rem', marginBottom: '1.25rem',
                boxShadow: `0 4px 16px ${step.color}15`
              }}>{step.icon}</div>

              <div style={{ fontSize: '0.72rem', color: step.color, fontWeight: 800, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>STEP {step.step}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>{step.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* ══════════════ CTA BANNER ══════════════ */}
      <Container style={{ paddingBottom: '5rem' }}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{
            borderRadius: '28px', overflow: 'hidden', position: 'relative',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(59,130,246,0.15))',
            border: '1px solid rgba(99,102,241,0.3)',
            padding: '4rem 3rem', textAlign: 'center',
            backdropFilter: 'blur(20px)',
          }}>
          {/* Glow blobs */}
          <div style={{ position: 'absolute', top: '-30%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(99,102,241,0.2)', filter: 'blur(80px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-30%', right: '10%', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(59,130,246,0.2)', filter: 'blur(80px)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {['73.1% Accurate', '5-Fold Validated', 'Privacy First', 'Open Methodology'].map((b, i) => (
                <span key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.35rem 0.9rem', borderRadius: '99px',
                  background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                  fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500
                }}>
                  <FaCheckCircle style={{ color: 'var(--success)', fontSize: '0.7rem' }} />
                  {b}
                </span>
              ))}
            </div>

            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.2 }}>
              Take control of your <span className="text-gradient">heart health</span> today.
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 2rem' }}>
              Your risk assessment takes under 60 seconds. Early identification saves lives.
            </p>

            <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-block' }}>
              <Link to="/predict" className="btn btn-primary"
                style={{ padding: '1.1rem 3rem', fontSize: '1.05rem', fontWeight: 700, borderRadius: '14px', gap: '0.6rem' }}>
                Start Free Assessment <FaArrowRight />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>

    </div>
  );
};

/* ── Feature Card ── */
const FeatureCard = ({ icon, title, desc, color, delay, link, linkLabel }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -6, transition: { duration: 0.25 } }}
    className="glass-panel"
    style={{ padding: "2.25rem", cursor: "default", display: 'flex', flexDirection: 'column' }}>

    {/* Gradient top border */}
    <div style={{
      position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px',
      background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
      borderRadius: '99px', opacity: 0, transition: 'opacity 0.3s'
    }} className="card-top-line" />

    <motion.div
      whileHover={{ scale: 1.08, rotate: 3 }}
      transition={{ type: "spring", stiffness: 260 }}
      style={{
        width: "60px", height: "60px", borderRadius: "18px",
        background: `linear-gradient(135deg, ${color}20, ${color}08)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: color, marginBottom: "1.5rem",
        border: `2px solid ${color}25`,
        boxShadow: `0 4px 16px ${color}12`
      }}>
      {icon}
    </motion.div>

    <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem", color: "var(--text-main)", fontWeight: 700 }}>
      {title}
    </h3>
    <p style={{ color: "var(--text-muted)", fontSize: "0.93rem", lineHeight: 1.7, flex: 1 }}>
      {desc}
    </p>
    {link && (
      <Link to={link} style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
        marginTop: '1.25rem', fontSize: '0.85rem', fontWeight: 600, color,
        textDecoration: 'none', transition: 'gap 0.2s'
      }}
        onMouseEnter={e => e.currentTarget.style.gap = '0.6rem'}
        onMouseLeave={e => e.currentTarget.style.gap = '0.35rem'}>
        {linkLabel} <FaArrowRight style={{ fontSize: '0.75rem' }} />
      </Link>
    )}
  </motion.div>
);

export default Home;
