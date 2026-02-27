import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaHeart, FaBrain, FaCode, FaFlask, FaDatabase, FaShieldAlt, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';
import Container from '../components/Container';

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const Tag = ({ children, color = 'var(--primary)' }) => (
    <span style={{
        display: 'inline-block', padding: '0.3rem 0.75rem', borderRadius: '99px',
        background: `${color}15`, border: `1px solid ${color}30`,
        color, fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em'
    }}>{children}</span>
);

const About = () => {
    const [activeTab, setActiveTab] = useState('risk');

    const techStack = [
        { name: 'Python 3.11', icon: '🐍', cat: 'Language', color: '#3b82f6' },
        { name: 'Scikit-Learn', icon: '🤖', cat: 'ML Library', color: '#f59e0b' },
        { name: 'FastAPI', icon: '⚡', cat: 'Backend', color: '#10b981' },
        { name: 'React 19', icon: '⚛️', cat: 'Frontend', color: '#61dafb' },
        { name: 'Pandas / NumPy', icon: '🔢', cat: 'Data Ops', color: '#6366f1' },
        { name: 'Framer Motion', icon: '✨', cat: 'Animations', color: '#ec4899' },
        { name: 'Vite', icon: '🚀', cat: 'Build Tool', color: '#9333ea' },
        { name: 'StandardScaler', icon: '⚙️', cat: 'Preprocessing', color: '#14b8a6' },
    ];

    const timeline = [
        { phase: 'Phase 1', label: 'Data Collection', detail: 'Sourced 70k records from the public Kaggle CVD dataset. Verified for completeness and integrity.', color: '#6366f1', icon: <FaDatabase /> },
        { phase: 'Phase 2', label: 'Preprocessing', detail: 'Cleaned outliers, converted age from days to years, applied StandardScaler for numerical features.', color: '#3b82f6', icon: <FaCode /> },
        { phase: 'Phase 3', label: 'Model Training', detail: 'Trained Random Forest with 200 estimators, 5-fold cross-validation. Optimised for recall (min. false negatives).', color: '#8b5cf6', icon: <FaBrain /> },
        { phase: 'Phase 4', label: 'Evaluation', detail: 'Achieved 73.1% accuracy, 79.3% ROC-AUC. Confusion matrix analysed for clinical viability.', color: '#10b981', icon: <FaChartLine /> },
        { phase: 'Phase 5', label: 'Deployment', detail: 'Integrated model into a FastAPI microservice, exposed via REST API and consumed by this React frontend.', color: '#f59e0b', icon: <FaFlask /> },
    ];

    const tabs = [
        { id: 'risk', label: 'Risk Factors' },
        { id: 'method', label: 'Methodology' },
        { id: 'faq', label: 'FAQ' },
    ];

    const faqs = [
        { q: 'How accurate is this tool?', a: 'The model achieves 73.1% accuracy and 79.3% ROC-AUC on a test set of 14,000 records. It is designed for screening, not diagnosis.' },
        { q: 'Is my data stored anywhere?', a: 'No. All processing is done server-side in-memory per request. No patient data is logged or persisted at any point.' },
        { q: 'What is a Random Forest?', a: 'An ensemble method that trains hundreds of decision trees and aggregates their votes. It is robust to overfitting and handles non-linear relationships well.' },
        { q: 'Why is age in "days" in the dataset?', a: 'The original Kaggle dataset stores age in days for precision. The preprocessing pipeline converts this to years before model input.' },
        { q: 'Can this replace a doctor?', a: 'Absolutely not. This is a decision-support tool only. Always consult a licensed cardiologist for any health concern.' },
    ];

    return (
        <div style={{ padding: '4rem 0 6rem', position: 'relative', overflow: 'hidden' }}>
            <Container>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
                    <div style={{
                        display: 'inline-block', padding: '0.4rem 1.2rem', background: 'rgba(244,63,94,0.1)',
                        border: '1px solid rgba(244,63,94,0.3)', borderRadius: '99px', marginBottom: '1.2rem',
                        fontSize: '0.82rem', color: '#fb7185', fontWeight: 600, letterSpacing: '0.08em'
                    }}>
                        <FaHeart style={{ marginRight: '0.4rem' }} />CARDIOVASCULAR AI · RESEARCH PROJECT
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>
                        Understanding HeartScope
                    </h1>
                    <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        A full-stack machine learning application for cardiovascular disease risk screening, built as an academic capstone project at Darshan University.
                    </p>
                </motion.div>

                {/* Tabbed content: Risk Factors / Methodology / FAQ */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    style={{ marginBottom: '3rem' }}>
                    {/* Tab bar */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', padding: '0.4rem', background: 'var(--glass-bg)', borderRadius: '14px', border: '1px solid var(--glass-border)', width: 'fit-content' }}>
                        {tabs.map(t => (
                            <button key={t.id} onClick={() => setActiveTab(t.id)}
                                style={{
                                    padding: '0.55rem 1.4rem', borderRadius: '10px', fontFamily: 'inherit',
                                    fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', border: 'none',
                                    transition: 'all 0.25s ease',
                                    background: activeTab === t.id ? 'linear-gradient(135deg, #6366f1, #3b82f6)' : 'transparent',
                                    color: activeTab === t.id ? '#fff' : 'var(--text-muted)',
                                    boxShadow: activeTab === t.id ? '0 4px 12px rgba(99,102,241,0.35)' : 'none',
                                }}>{t.label}</button>
                        ))}
                    </div>

                    {/* Tab: Risk Factors */}
                    {activeTab === 'risk' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                {/* Objective factors */}
                                {[
                                    {
                                        title: 'Objective Factors', color: 'var(--primary)', subtitle: 'Measured by instruments',
                                        items: [
                                            { name: 'Age', detail: 'Evaluated in years (30–65 range in dataset). One of the strongest predictors.' },
                                            { name: 'Height', detail: 'In centimetres. Used to compute BMI together with weight.' },
                                            { name: 'Weight', detail: 'In kilograms. Higher weight correlated with elevated CVD risk.' },
                                            { name: 'Gender', detail: 'Biological sex. Men show slightly higher CVD prevalence in the dataset (54.3% vs 47.8%).' },
                                        ]
                                    },
                                    {
                                        title: 'Examination Factors', color: 'var(--secondary)', subtitle: 'Clinically assessed values',
                                        items: [
                                            { name: 'Systolic BP', detail: 'Upper blood pressure reading (mmHg). The #1 predictive feature in the model.' },
                                            { name: 'Diastolic BP', detail: 'Lower blood pressure reading (mmHg). Closely linked to systolic risk.' },
                                            { name: 'Cholesterol', detail: 'Scaled 1–3 (Normal / Above / Well Above). Elevated levels double CVD risk.' },
                                            { name: 'Glucose', detail: 'Scaled 1–3. High glucose linked to diabetes complications and CVD.' },
                                        ]
                                    },
                                    {
                                        title: 'Subjective Factors', color: 'var(--success)', subtitle: 'Patient self-reported',
                                        items: [
                                            { name: 'Smoking', detail: 'Active smoker status. Present in 8.8% of dataset; independent risk factor.' },
                                            { name: 'Alcohol', detail: 'Frequent alcohol consumption. Present in 5.4% of dataset.' },
                                            { name: 'Physical Activity', detail: 'Active lifestyle flag. 80.3% of patients report being physically active.' },
                                        ]
                                    }
                                ].map((section, i) => (
                                    <motion.div key={i} className="glass-panel" whileHover={{ y: -4 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: section.color, boxShadow: `0 0 8px ${section.color}` }} />
                                            <div>
                                                <h3 style={{ color: section.color, fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{section.title}</h3>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>{section.subtitle}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                            {section.items.map((item, j) => (
                                                <div key={j} style={{ padding: '0.75rem', background: 'var(--glass-bg)', opacity: 0.9, borderRadius: '10px', borderLeft: `3px solid ${section.color}40` }}>
                                                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.92rem', marginBottom: '0.25rem' }}>{item.name}</div>
                                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>{item.detail}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Tab: Methodology */}
                    {activeTab === 'method' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                            {/* Timeline */}
                            <div style={{ position: 'relative', paddingLeft: '2rem', marginBottom: '2.5rem' }}>
                                <div style={{ position: 'absolute', left: '11px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, #6366f1, #10b981)' }} />
                                {timeline.map((step, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                        style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.75rem', position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '-2rem', width: '22px', height: '22px', borderRadius: '50%', background: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#fff', boxShadow: `0 0 12px ${step.color}60`, flexShrink: 0 }}>
                                            {step.icon}
                                        </div>
                                        <div className="glass-panel" style={{ padding: '1.25rem', flex: 1 }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                                <Tag color={step.color}>{step.phase}</Tag>
                                                <strong style={{ color: 'var(--text-main)', fontSize: '1rem' }}>{step.label}</strong>
                                            </div>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{step.detail}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Tech Stack */}
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.25rem' }}>Tech Stack</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                                {techStack.map((t, i) => (
                                    <motion.div key={i} whileHover={{ y: -4, scale: 1.02 }}
                                        style={{ padding: '1rem', background: 'var(--glass-bg)', borderRadius: '14px', border: `1px solid ${t.color}25`, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>{t.icon}</span>
                                        <div>
                                            <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>{t.name}</div>
                                            <div style={{ fontSize: '0.72rem', color: t.color, fontWeight: 600 }}>{t.cat}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Clinical disclaimer */}
                            <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(245,158,11,0.07)', borderRadius: '14px', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <FaExclamationTriangle style={{ color: 'var(--warning)', fontSize: '1.2rem', flexShrink: 0, marginTop: '0.1rem' }} />
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                                    <strong style={{ color: 'var(--warning)' }}>Clinical Disclaimer:</strong> This application is an academic decision-support tool and does <strong>not</strong> constitute professional medical advice. All results must be interpreted by a qualified healthcare professional. Always consult a cardiologist for definitive diagnosis and treatment.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Tab: FAQ */}
                    {activeTab === 'faq' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px' }}>
                                {faqs.map((f, i) => (
                                    <FAQItem key={i} q={f.q} a={f.a} delay={i * 0.08} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Developer Profile */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.6 }} className="glass-panel">
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.75rem', textAlign: 'center' }}>Developer Profile</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', textAlign: 'center' }}>
                        {/* Avatar */}
                        <div style={{
                            width: '110px', height: '110px', borderRadius: '50%', position: 'relative',
                            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '2.8rem', boxShadow: '0 8px 32px rgba(99,102,241,0.35)'
                        }}>
                            👨‍💻
                            <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '20px', height: '20px', background: 'var(--success)', borderRadius: '50%', border: '2px solid var(--bg-surface)' }} />
                        </div>

                        {/* Info */}
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Dharvi Adthakkar</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                <Tag color="var(--primary)"><FaGraduationCap style={{ marginRight: '0.3rem' }} />B.Tech Computer Science</Tag>
                                <Tag color="var(--secondary)">Darshan University</Tag>
                                <Tag color="var(--accent-3)">Rajkot, Gujarat</Tag>
                            </div>
                        </div>

                        {/* Expertise chips */}
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {['Machine Learning', 'Full-Stack Dev', 'Data Science', 'FastAPI', 'React'].map((skill, i) => (
                                <motion.span key={i} whileHover={{ y: -2 }} style={{
                                    padding: '0.4rem 1rem', borderRadius: '99px',
                                    background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                                    fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500
                                }}>{skill}</motion.span>
                            ))}
                        </div>


                    </div>
                </motion.div>

            </Container>
        </div>
    );
};

/* ── Accordion FAQ item ── */
const FAQItem = ({ q, a, delay = 0 }) => {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.4 }}
            style={{ borderRadius: '14px', overflow: 'hidden', border: `1px solid ${open ? 'rgba(99,102,241,0.4)' : 'var(--glass-border)'}`, transition: 'border-color 0.3s' }}>
            <button onClick={() => setOpen(!open)}
                style={{
                    width: '100%', padding: '1.1rem 1.5rem', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', background: open ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.03)',
                    border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                    color: 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem', gap: '1rem',
                    transition: 'background 0.3s'
                }}>
                <span>{q}</span>
                <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
                    style={{ fontSize: '1.2rem', color: 'var(--primary)', flexShrink: 0 }}>+</motion.span>
            </button>
            {open && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                    style={{ padding: '1rem 1.5rem 1.25rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{a}</p>
                </motion.div>
            )}
        </motion.div>
    );
};

export default About;
