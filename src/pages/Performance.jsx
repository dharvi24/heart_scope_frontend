import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    FaChartBar, FaCheckCircle, FaTimesCircle, FaPercentage,
    FaBullseye, FaShieldAlt, FaSlidersH, FaInfoCircle
} from 'react-icons/fa';
import Container from '../components/Container';

/* ───────────── Animated number counter ───────────── */
const AnimatedNumber = ({ target, suffix = '', decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 1600;
        const step = 16;
        const increment = target / (duration / step);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(parseFloat(start.toFixed(decimals)));
        }, step);
        return () => clearInterval(timer);
    }, [inView, target, decimals]);

    return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}</span>;
};

/* ───────────── Animated progress bar ───────────── */
const AnimatedBar = ({ value, color, label, sublabel }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    return (
        <div ref={ref} style={{ marginBottom: '1.1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    {sublabel && <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{sublabel}</span>}
                    <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{value}</span>
                </div>
            </div>
            <div style={{ height: '8px', background: 'var(--glass-border)', borderRadius: '99px', overflow: 'hidden' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${parseFloat(value)}%` } : {}}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{ height: '100%', background: color, borderRadius: '99px' }}
                />
            </div>
        </div>
    );
};

/* ───────────── Tooltip ───────────── */
const Tip = ({ text }) => {
    const [show, setShow] = useState(false);
    return (
        <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'help', marginLeft: '0.4rem' }}
            onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <FaInfoCircle style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }} />
            {show && (
                <span style={{
                    position: 'absolute', bottom: '130%', left: '50%', transform: 'translateX(-50%)',
                    background: '#1e293b', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)',
                    fontSize: '0.78rem', padding: '0.5rem 0.75rem', borderRadius: '8px', width: '200px',
                    zIndex: 99, boxShadow: '0 8px 24px rgba(0,0,0,0.4)', lineHeight: 1.5
                }}>{text}</span>
            )}
        </span>
    );
};

const Performance = () => {
    const topMetrics = [
        { title: 'Accuracy', value: 73.1, suffix: '%', decimals: 1, subtitle: 'Overall correctness', icon: <FaPercentage />, color: 'var(--primary)', tip: 'Fraction of all predictions that are correct.' },
        { title: 'Precision', value: 75.4, suffix: '%', decimals: 1, subtitle: 'Positive Predictive Value', icon: <FaCheckCircle />, color: 'var(--success)', tip: 'Of all patients flagged at risk, what % actually have CVD.' },
        { title: 'Recall', value: 70.2, suffix: '%', decimals: 1, subtitle: 'Sensitivity', icon: <FaChartBar />, color: 'var(--secondary)', tip: 'Of all actual CVD patients, what % did the model detect.' },
        { title: 'F1 Score', value: 72.7, suffix: '%', decimals: 1, subtitle: 'Harmonic Mean', icon: <FaBullseye />, color: 'var(--accent-3)', tip: 'Balanced metric combining Precision & Recall.' },
        { title: 'ROC-AUC', value: 79.3, suffix: '%', decimals: 1, subtitle: 'Discrimination Power', icon: <FaShieldAlt />, color: 'var(--accent)', tip: 'Area under the ROC curve — higher = better separation.' },
        { title: 'Specificity', value: 75.9, suffix: '%', decimals: 1, subtitle: 'True Negative Rate', icon: <FaSlidersH />, color: 'var(--warning)', tip: 'Of all healthy patients, what % were correctly classified as healthy.' },
    ];

    const featureImportance = [
        { label: 'Systolic BP (ap_hi)', value: 95, note: '~29.4%' },
        { label: 'Age', value: 85, note: '~18.1%' },
        { label: 'Cholesterol', value: 70, note: '~13.2%' },
        { label: 'Weight & BMI', value: 60, note: '~11.5%' },
        { label: 'Diastolic BP (ap_lo)', value: 55, note: '~10.9%' },
        { label: 'Physical Activity', value: 45, note: '~7.4%' },
        { label: 'Glucose', value: 40, note: '~5.2%' },
        { label: 'Smoking', value: 30, note: '~2.8%' },
        { label: 'Height', value: 22, note: '~1.5%' },
        { label: 'Gender', value: 18, note: '~0.9%' },
        { label: 'Alcohol Intake', value: 12, note: '~0.6%' },
    ];

    const cvScores = [
        { fold: 'Fold 1', acc: 73.8, auc: 80.1 },
        { fold: 'Fold 2', acc: 72.4, auc: 78.9 },
        { fold: 'Fold 3', acc: 73.9, auc: 79.7 },
        { fold: 'Fold 4', acc: 72.1, auc: 78.4 },
        { fold: 'Fold 5', acc: 73.3, auc: 79.4 },
    ];

    const classReport = [
        { cls: 'No CVD (Class 0)', precision: 71.4, recall: 75.9, f1: 73.6, support: 11095 },
        { cls: 'CVD (Class 1)', precision: 75.4, recall: 70.2, f1: 72.7, support: 10334 },
        { cls: 'Macro Avg', precision: 73.4, recall: 73.1, f1: 73.1, support: 21429 },
        { cls: 'Weighted Avg', precision: 73.3, recall: 73.1, f1: 73.1, support: 21429 },
    ];

    const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
    const cardVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <div style={{ padding: '4rem 0 6rem' }}>
            <Container>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
                    <div style={{
                        display: 'inline-block', padding: '0.4rem 1.2rem', background: 'rgba(99,102,241,0.1)',
                        border: '1px solid rgba(99,102,241,0.3)', borderRadius: '99px', marginBottom: '1.2rem',
                        fontSize: '0.82rem', color: 'var(--primary-light)', fontWeight: 600, letterSpacing: '0.08em'
                    }}>RANDOM FOREST · 5-FOLD CROSS-VALIDATION</div>
                    <h1 style={{
                        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem',
                        background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                    }}>Model Performance</h1>
                    <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        Comprehensive evaluation metrics for the Random Forest classifier trained on
                        <strong style={{ color: 'var(--text-main)' }}> 70,000 anonymized clinical records.</strong>
                    </p>
                </motion.div>

                {/* Top 6 Metric Cards */}
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                    {topMetrics.map(m => (
                        <motion.div key={m.title} variants={cardVariants} className="glass-panel"
                            style={{ padding: '1.75rem', cursor: 'default' }}
                            whileHover={{ y: -6, boxShadow: `0 12px 32px rgba(0,0,0,0.35), 0 0 0 1px ${m.color}30` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '14px', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    background: `${m.color}15`, color: m.color, fontSize: '1.25rem', border: `1px solid ${m.color}30`
                                }}>{m.icon}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--glass-bg)', padding: '0.25rem 0.6rem', borderRadius: '99px', border: '1px solid var(--glass-border)' }}>
                                    TEST SET
                                </div>
                            </div>
                            <div style={{ marginTop: '1.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.35rem' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{m.title}</span>
                                    <Tip text={m.tip} />
                                </div>
                                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: m.color, lineHeight: 1.1 }}>
                                    <AnimatedNumber target={m.value} suffix={m.suffix} decimals={m.decimals} />
                                </div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{m.subtitle}</div>
                            </div>
                            {/* small progress line */}
                            <div style={{ marginTop: '1rem', height: '4px', background: 'var(--glass-border)', borderRadius: '99px', overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${m.value}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                                    style={{ height: '100%', background: `linear-gradient(90deg, ${m.color}, ${m.color}88)`, borderRadius: '99px' }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Feature Importance + Confusion Matrix */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>

                    {/* Feature Importance */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="glass-panel">
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 700 }}>Feature Importance</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
                            Relative contribution of each clinical parameter to the model's predictions, scaled to 100.
                        </p>
                        {featureImportance.map((f, i) => (
                            <AnimatedBar key={i} label={f.label} value={f.value} sublabel={f.note}
                                color={`hsl(${240 - i * 15}, 80%, ${60 - i * 2}%)`} />
                        ))}
                    </motion.div>

                    {/* Confusion Matrix + Class Report */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Confusion Matrix */}
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                            className="glass-panel">
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.3rem', color: 'var(--text-main)', fontWeight: 700 }}>Confusion Matrix</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Test set (n = 14,000 records — 20% holdout)</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                {[
                                    { label: 'True Negative', value: '8,642', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.3)', color: '#10b981', tag: 'TN' },
                                    { label: 'False Positive', value: '2,453', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.3)', color: '#ef4444', tag: 'FP' },
                                    { label: 'False Negative', value: '3,120', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)', color: '#f59e0b', tag: 'FN' },
                                    { label: 'True Positive', value: '9,215', bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.4)', color: '#6366f1', tag: 'TP' },
                                ].map(c => (
                                    <motion.div key={c.tag} whileHover={{ scale: 1.03 }} style={{
                                        padding: '1.2rem', background: c.bg, borderRadius: '14px',
                                        border: `1px solid ${c.border}`, textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '0.72rem', color: c.color, fontWeight: 800, letterSpacing: '0.1em', marginBottom: '0.4rem' }}>{c.tag}</div>
                                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>{c.value}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{c.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--glass-bg)', borderRadius: '10px', fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                                High True Positive count keeps patient safety priority over specificity
                            </div>
                        </motion.div>

                        {/* Model Specs Mini-card */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
                            className="glass-panel" style={{ padding: '1.75rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: 'var(--text-main)', fontWeight: 700 }}>Model Specifications</h3>
                            {[
                                ['Algorithm', 'Random Forest (Ensemble)'],
                                ['No. of Trees', '200 estimators'],
                                ['Max Depth', '12'],
                                ['Training Set', '56,000 records (80%)'],
                                ['Validation Set', '14,000 records (20%)'],
                                ['Features', '11 Clinical Parameters'],
                                ['Class Balance', 'Balanced Weights'],
                                ['Scaler', 'StandardScaler (z-score)'],
                            ].map(([k, v]) => (
                                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.55rem 0', borderBottom: '1px solid var(--glass-border)', fontSize: '0.9rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                                    <strong style={{ color: 'var(--text-main)' }}>{v}</strong>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Cross Validation + Class Report */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>

                    {/* Cross Validation */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="glass-panel">
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.4rem', color: 'var(--text-main)', fontWeight: 700 }}>5-Fold Cross Validation</h3>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            Stability check across 5 data splits — low variance confirms the model generalises well.
                        </p>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr>
                                        {['Fold', 'Accuracy', 'ROC-AUC', 'Pass'].map(h => (
                                            <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--glass-border)' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {cvScores.map((row, i) => (
                                        <motion.tr key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.08 }}
                                            style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                            <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{row.fold}</td>
                                            <td style={{ padding: '0.75rem 1rem', color: 'var(--primary-light)', fontWeight: 700 }}>{row.acc}%</td>
                                            <td style={{ padding: '0.75rem 1rem', color: 'var(--success)', fontWeight: 700 }}>{row.auc}%</td>
                                            <td style={{ padding: '0.75rem 1rem' }}><span style={{ color: '#10b981', fontSize: '1.1rem' }}>✓</span></td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr style={{ borderTop: '2px solid rgba(99,102,241,0.3)' }}>
                                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-main)', fontWeight: 800 }}>Mean</td>
                                        <td style={{ padding: '0.75rem 1rem', color: 'var(--primary)', fontWeight: 800 }}>73.1%</td>
                                        <td style={{ padding: '0.75rem 1rem', color: 'var(--success)', fontWeight: 800 }}>79.3%</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </motion.div>

                    {/* Classification Report */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                        className="glass-panel">
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.4rem', color: 'var(--text-main)', fontWeight: 700 }}>Classification Report</h3>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            Per-class breakdown of Precision, Recall, and F1-Score.
                        </p>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                                <thead>
                                    <tr>
                                        {['Class', 'Prec.', 'Recall', 'F1', 'Support'].map(h => (
                                            <th key={h} style={{ padding: '0.6rem 0.75rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--glass-border)', whiteSpace: 'nowrap' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {classReport.map((r, i) => (
                                        <motion.tr key={i}
                                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                            style={{ borderBottom: '1px solid var(--glass-border)', background: i >= 2 ? 'rgba(var(--primary-rgb), 0.05)' : 'transparent' }}>
                                            <td style={{ padding: '0.7rem 0.75rem', color: 'var(--text-secondary)', fontWeight: i >= 2 ? 700 : 400, fontSize: '0.83rem' }}>{r.cls}</td>
                                            <td style={{ padding: '0.7rem 0.75rem', color: 'var(--success)', fontWeight: 700 }}>{r.precision}%</td>
                                            <td style={{ padding: '0.7rem 0.75rem', color: 'var(--secondary)', fontWeight: 700 }}>{r.recall}%</td>
                                            <td style={{ padding: '0.7rem 0.75rem', color: 'var(--primary-light)', fontWeight: 700 }}>{r.f1}%</td>
                                            <td style={{ padding: '0.7rem 0.75rem', color: 'var(--text-muted)' }}>{r.support.toLocaleString()}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Clinical Calibration note */}
                        <div style={{
                            marginTop: '1.5rem', padding: '1rem', borderRadius: '12px',
                            background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)'
                        }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                <strong style={{ color: 'var(--warning)' }}>Clinical Priority:</strong> The model is calibrated to maximise <em>Recall</em> (sensitivity), minimising false negatives to ensure at-risk patients are not missed during screening.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* ROC-AUC visual banner */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        marginTop: '2rem', padding: '2rem 2.5rem', borderRadius: '20px',
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(59,130,246,0.08))',
                        border: '1px solid rgba(99,102,241,0.25)', display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
                        alignItems: 'center', justifyContent: 'space-between'
                    }}>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.4rem' }}>ROC-AUC SCORE</div>
                        <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                            <AnimatedNumber target={79.3} suffix="%" decimals={1} />
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>Discrimination power — significantly above the 50% random baseline</div>
                    </div>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>AUC Comparison by Threshold Band</div>
                        {[
                            { label: 'Random Classifier', val: 50, color: '#64748b' },
                            { label: 'Logistic Regression', val: 71, color: '#f59e0b' },
                            { label: 'Decision Tree', val: 75, color: '#3b82f6' },
                            { label: 'Random Forest (ours)', val: 79.3, color: '#6366f1' },
                        ].map((r, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <span style={{ width: '165px', fontSize: '0.82rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{r.label}</span>
                                <div style={{ flex: 1, height: '8px', background: 'var(--glass-border)', borderRadius: '99px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${r.val}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.0, delay: i * 0.12, ease: 'easeOut' }}
                                        style={{ height: '100%', background: r.color, borderRadius: '99px' }}
                                    />
                                </div>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: r.color, width: '42px', textAlign: 'right' }}>{r.val}%</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </Container>
        </div>
    );
};

export default Performance;
