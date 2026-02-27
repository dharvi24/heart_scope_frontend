import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaDatabase, FaRulerCombined, FaTint, FaWalking, FaHeartbeat, FaWeight, FaSmoking, FaWineGlass, FaMars, FaVenus } from 'react-icons/fa';
import Container from '../components/Container';

/* ── Animated counter ── */
const AnimatedNumber = ({ target, suffix = '', prefix = '', decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    useEffect(() => {
        if (!inView) return;
        let s = 0;
        const dur = 1600; const step = 16;
        const inc = target / (dur / step);
        const t = setInterval(() => {
            s += inc;
            if (s >= target) { setCount(target); clearInterval(t); }
            else setCount(parseFloat(s.toFixed(decimals)));
        }, step);
        return () => clearInterval(t);
    }, [inView, target, decimals]);
    return <span ref={ref}>{prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}</span>;
};

/* ── Progress bar ── */
const ProgressBar = ({ label, value, pct, color }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    return (
        <div ref={ref} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{value}</span>
            </div>
            <div style={{ height: '7px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : {}}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                    style={{ height: '100%', background: color, borderRadius: '99px' }}
                />
            </div>
        </div>
    );
};

const Dataset = () => {
    const cardVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };
    const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

    const summaryStats = [
        { label: 'Total Records', value: 70000, suffix: '', icon: <FaDatabase />, color: 'var(--primary)' },
        { label: 'Clinical Features', value: 11, suffix: '', icon: <FaRulerCombined />, color: 'var(--secondary)' },
        { label: 'Positive Cases', value: 34979, suffix: '', icon: <FaHeartbeat />, color: 'var(--danger)' },
        { label: 'Negative Cases', value: 35021, suffix: '', icon: <FaHeartbeat />, color: 'var(--success)' },
        { label: 'Avg. Age', value: 53.3, suffix: ' yrs', decimals: 1, icon: <FaDatabase />, color: 'var(--accent-3)' },
        { label: 'Avg. BMI', value: 26.5, suffix: '', decimals: 1, icon: <FaWeight />, color: 'var(--warning)' },
    ];

    const ageData = [
        { range: '30–34', val: 6, color: 'hsl(240,70%,70%)' },
        { range: '35–39', val: 12, color: 'hsl(240,70%,65%)' },
        { range: '40–44', val: 17, color: 'hsl(235,72%,62%)' },
        { range: '45–49', val: 22, color: 'hsl(230,75%,58%)' },
        { range: '50–54', val: 26, color: 'hsl(225,78%,55%)' },
        { range: '55–59', val: 29, color: 'hsl(220,80%,52%)' },
        { range: '60–64', val: 27, color: 'hsl(215,82%,50%)' },
        { range: '65+', val: 18, color: 'hsl(210,84%,47%)' },
    ];
    const maxAge = Math.max(...ageData.map(d => d.val));

    const bpData = [
        { label: 'Normal (<120/80)', pct: 38.2, color: 'var(--success)' },
        { label: 'Elevated (120–129)', pct: 18.5, color: '#22d3ee' },
        { label: 'Stage 1 HBP (130–139)', pct: 22.1, color: 'var(--warning)' },
        { label: 'Stage 2 HBP (≥140)', pct: 21.2, color: 'var(--danger)' },
    ];

    const bmiData = [
        { label: 'Underweight (<18.5)', pct: 3.2, color: '#3b82f6' },
        { label: 'Normal (18.5–24.9)', pct: 38.8, color: 'var(--success)' },
        { label: 'Overweight (25–29.9)', pct: 35.6, color: 'var(--warning)' },
        { label: 'Obese (≥30)', pct: 22.4, color: 'var(--danger)' },
    ];

    const headers = ['ID', 'Age (Y)', 'Gender', 'Ht (cm)', 'Wt (kg)', 'AP_HI', 'AP_LO', 'Chol', 'Gluc', 'Smoke', 'Alco', 'Active', 'Cardio'];
    const rows = [
        [0, 50, 2, 168, 62.0, 110, 80, 1, 1, 0, 0, 1, 0],
        [1, 55, 1, 156, 85.0, 140, 90, 3, 1, 0, 0, 1, 1],
        [2, 51, 1, 165, 64.0, 130, 70, 3, 1, 0, 0, 0, 1],
        [3, 48, 2, 169, 82.0, 150, 100, 1, 1, 0, 0, 1, 1],
        [4, 47, 1, 156, 56.0, 100, 60, 1, 1, 0, 0, 0, 0],
        [5, 57, 2, 175, 90.0, 160, 100, 2, 2, 1, 0, 0, 1],
        [6, 54, 1, 160, 72.0, 120, 75, 1, 1, 0, 0, 1, 0],
        [7, 60, 2, 180, 95.0, 170, 110, 3, 3, 1, 1, 0, 1],
    ];

    return (
        <div style={{ padding: '4rem 0 6rem' }}>
            <Container>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
                    <div style={{
                        display: 'inline-block', padding: '0.4rem 1.2rem', background: 'rgba(59,130,246,0.1)',
                        border: '1px solid rgba(59,130,246,0.3)', borderRadius: '99px', marginBottom: '1.2rem',
                        fontSize: '0.82rem', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.08em'
                    }}>KAGGLE · CARDIOVASCULAR DISEASE DATASET</div>
                    <h1 className="text-gradient" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>
                        Dataset Analytics
                    </h1>
                    <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        Statistical breakdown of the <strong style={{ color: 'var(--text-main)' }}>70,000 anonymized clinical records</strong> used to train the cardiovascular risk model.
                    </p>
                </motion.div>

                {/* Summary stat cards */}
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                    {summaryStats.map((s, i) => (
                        <motion.div key={i} variants={cardVariants} className="glass-panel"
                            style={{ padding: '1.5rem', textAlign: 'center' }}
                            whileHover={{ y: -5 }}>
                            <div style={{ fontSize: '1.4rem', color: s.color, marginBottom: '0.6rem' }}>{s.icon}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>
                                <AnimatedNumber target={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                            </div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{s.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Row 1: Gender + Cholesterol + Glucose */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>

                    {/* Gender */}
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        className="glass-panel">
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Gender Distribution</h3>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            {[
                                { icon: <FaVenus />, label: 'Female', pct: 64.9, color: '#ec4899', count: '45,430' },
                                { icon: <FaMars />, label: 'Male', pct: 35.1, color: '#3b82f6', count: '24,570' },
                            ].map(g => (
                                <div key={g.label} style={{ flex: 1, textAlign: 'center', padding: '1.2rem', background: `${g.color}08`, borderRadius: '14px', border: `1px solid ${g.color}25` }}>
                                    <div style={{ fontSize: '1.5rem', color: g.color, marginBottom: '0.5rem' }}>{g.icon}</div>
                                    <div style={{ fontSize: '2rem', fontWeight: 800, color: g.color }}>{g.pct}%</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{g.label}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>n = {g.count}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden', display: 'flex' }}>
                            <motion.div initial={{ width: 0 }} whileInView={{ width: '64.9%' }} viewport={{ once: true }} transition={{ duration: 1.1, ease: 'easeOut' }}
                                style={{ height: '100%', background: '#ec4899' }} />
                            <motion.div initial={{ width: 0 }} whileInView={{ width: '35.1%' }} viewport={{ once: true }} transition={{ duration: 1.1, ease: 'easeOut', delay: 0.1 }}
                                style={{ height: '100%', background: '#3b82f6' }} />
                        </div>
                    </motion.div>

                    {/* Cholesterol */}
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                        className="glass-panel">
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Cholesterol Levels</h3>
                        <ProgressBar label="Normal (1)" value="74.8%" pct={74.8} color="var(--success)" />
                        <ProgressBar label="Above Normal (2)" value="13.7%" pct={13.7} color="var(--warning)" />
                        <ProgressBar label="Well Above Normal (3)" value="11.5%" pct={11.5} color="var(--danger)" />
                        <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                                Elevated cholesterol (levels 2 & 3) accounts for <strong style={{ color: 'var(--warning)' }}>25.2%</strong> of patients — a key CVD risk factor.
                            </p>
                        </div>
                    </motion.div>

                    {/* Glucose */}
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass-panel">
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Glucose Levels</h3>
                        <ProgressBar label="Normal (1)" value="85.0%" pct={85.0} color="var(--success)" />
                        <ProgressBar label="Above Normal (2)" value="8.2%" pct={8.2} color="var(--warning)" />
                        <ProgressBar label="Well Above Normal (3)" value="6.8%" pct={6.8} color="var(--danger)" />
                        <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                                High glucose (levels 2 & 3) present in <strong style={{ color: 'var(--warning)' }}>15.0%</strong> — associated with pre-diabetes and metabolic syndrome.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Row 2: Age bar chart + Blood Pressure + BMI */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>

                    {/* Age */}
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        className="glass-panel">
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Age Demographics (Years)</h3>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '160px', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                            {ageData.map((d, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>{d.val}%</div>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${(d.val / maxAge) * 130}px` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: i * 0.07, ease: 'easeOut' }}
                                        style={{ width: '70%', background: d.color, borderRadius: '5px 5px 0 0', minHeight: '4px' }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                            {ageData.map((d, i) => (
                                <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '0.6rem', color: 'var(--text-muted)' }}>{d.range}</div>
                            ))}
                        </div>
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                            <span>Min: <strong style={{ color: 'var(--text-secondary)' }}>30</strong></span>
                            <span>Mean: <strong style={{ color: 'var(--primary-light)' }}>53.3</strong></span>
                            <span>Max: <strong style={{ color: 'var(--text-secondary)' }}>65</strong></span>
                        </div>
                    </motion.div>

                    {/* Blood Pressure */}
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                        className="glass-panel">
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>Blood Pressure Distribution</h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.4rem' }}>Systolic BP (American Heart Association classification)</p>
                        {bpData.map((b, i) => (
                            <ProgressBar key={i} label={b.label} value={`${b.pct}%`} pct={b.pct} color={b.color} />
                        ))}
                        <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(239,68,68,0.05)', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.15)' }}>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                                <strong style={{ color: 'var(--danger)' }}>43.3%</strong> of patients have Stage 1 or Stage 2 hypertension — the strongest CVD predictor in the dataset.
                            </p>
                        </div>
                    </motion.div>

                    {/* BMI */}
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass-panel">
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>BMI Distribution</h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.4rem' }}>WHO body mass index classifications</p>
                        {bmiData.map((b, i) => (
                            <ProgressBar key={i} label={b.label} value={`${b.pct}%`} pct={b.pct} color={b.color} />
                        ))}
                        <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(245,158,11,0.05)', borderRadius: '10px', border: '1px solid rgba(245,158,11,0.15)' }}>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                                <strong style={{ color: 'var(--warning)' }}>58%</strong> of patients are overweight or obese — significantly elevating cardiovascular risk.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Lifestyle indicators */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                    className="glass-panel" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Lifestyle & Health Indicators</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                        {[
                            { label: 'Non-Smokers', value: '91.2%', icon: <FaSmoking />, color: 'var(--success)', sub: '63,840 patients' },
                            { label: 'Smokers', value: '8.8%', icon: <FaSmoking />, color: 'var(--danger)', sub: '6,160 patients' },
                            { label: 'No Alcohol', value: '94.6%', icon: <FaWineGlass />, color: 'var(--success)', sub: '66,220 patients' },
                            { label: 'Alcohol Users', value: '5.4%', icon: <FaWineGlass />, color: 'var(--warning)', sub: '3,780 patients' },
                            { label: 'Physically Active', value: '80.3%', icon: <FaWalking />, color: 'var(--primary)', sub: '56,210 patients' },
                            { label: 'Inactive', value: '19.7%', icon: <FaWalking />, color: 'var(--text-muted)', sub: '13,790 patients' },
                        ].map((item, i) => (
                            <motion.div key={i} whileHover={{ y: -4 }}
                                style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                                <div style={{ fontSize: '1.3rem', color: item.color }}>{item.icon}</div>
                                <div>
                                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: item.color }}>{item.value}</div>
                                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{item.label}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.sub}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CVD prevalence by gender */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                    className="glass-panel" style={{ marginBottom: '2rem', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>CVD Prevalence by Subgroup</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Percentage of patients within each subgroup who are positive for cardiovascular disease.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                        {[
                            { label: 'All Patients', pct: 50.0, color: 'var(--primary)' },
                            { label: 'Female Patients', pct: 47.8, color: '#ec4899' },
                            { label: 'Male Patients', pct: 54.3, color: '#3b82f6' },
                            { label: 'Age 50+', pct: 62.1, color: 'var(--accent-3)' },
                            { label: 'Hypertensive', pct: 69.4, color: 'var(--danger)' },
                            { label: 'High Cholesterol (2–3)', pct: 67.8, color: 'var(--warning)' },
                            { label: 'BMI ≥ 30 (Obese)', pct: 58.9, color: '#f97316' },
                            { label: 'Smokers', pct: 53.2, color: '#94a3b8' },
                        ].map((item, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                                    <span style={{ fontWeight: 700, color: item.color }}>{item.pct}%</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${item.pct}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.0, delay: i * 0.06, ease: 'easeOut' }}
                                        style={{ height: '100%', background: item.color, borderRadius: '99px' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* AI Feature Importance Section */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ marginBottom: '3rem' }}>
                    <div className="glass-panel" style={{ padding: '2.5rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Model Intelligence</h2>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Relative weight of features in the Random Forest ensemble (200 trees)</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
                            {/* Importance Bars */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {[
                                    { label: 'Systolic Blood Pressure', weight: 88, color: '#ef4444', desc: 'Primary cardiovascular stress indicator' },
                                    { label: 'Cholesterol Level', weight: 64, color: '#f59e0b', desc: 'Arterial plaque formation factor' },
                                    { label: 'Patient Age', weight: 58, color: '#818cf8', desc: 'Cumulative physiological wear' },
                                    { label: 'Weight / BMI', weight: 42, color: '#c084fc', desc: 'Metabolic load determinant' },
                                    { label: 'Diastolic Blood Pressure', weight: 35, color: '#f472b6', desc: 'Resting arterial pressure' },
                                ].map((feat, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{feat.label}</span>
                                            <span style={{ fontSize: '0.85rem', color: feat.color, fontWeight: 800 }}>Impact: {feat.weight}%</span>
                                        </div>
                                        <div style={{ height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${feat.weight}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
                                                style={{ height: '100%', background: `linear-gradient(90deg, ${feat.color}80, ${feat.color})`, borderRadius: '99px', boxShadow: `0 0 15px ${feat.color}40` }}
                                            />
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem', letterSpacing: '0.02em' }}>{feat.desc}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Info Card */}
                            <div style={{ padding: '2rem', background: 'var(--bg-elevated)', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-glow)' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🧠</div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>How the AI Learns?</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                                    The Random Forest algorithm evaluated these <strong style={{ color: 'var(--text-secondary)' }}>70,000 records</strong> by testing millions of decision paths.
                                    It discovered that <span style={{ color: 'var(--danger)' }}>Systolic BP</span> is the single most defining factor—patients with high readings are <strong style={{ color: 'var(--text-main)' }}>3.4x more likely</strong> to be classified with Cardiovascular Disease.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Data Distribution Comparison Section */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ marginBottom: '2rem' }}>
                    <div className="glass-panel" style={{ padding: '2.5rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Predictive Distributions</h2>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Comparing clinical metrics between Healthy and CVD-Positive groups</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            {[
                                {
                                    title: 'Blood Pressure Shift',
                                    metric: 'Avg. Systolic BP',
                                    healthy: 119,
                                    cvd: 137,
                                    unit: 'mmHg',
                                    icon: <FaHeartbeat />,
                                    color: 'var(--danger)'
                                },
                                {
                                    title: 'Age Concentration',
                                    metric: 'Mean Patient Age',
                                    healthy: 51.7,
                                    cvd: 54.9,
                                    unit: 'Years',
                                    icon: <FaDatabase />,
                                    color: 'var(--primary)'
                                },
                                {
                                    title: 'Metabolic Load',
                                    metric: 'Average BMI',
                                    healthy: 25.6,
                                    cvd: 28.5,
                                    unit: '',
                                    icon: <FaWeight />,
                                    color: 'var(--warning)'
                                }
                            ].map((item, i) => (
                                <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                        <div style={{ padding: '0.5rem', borderRadius: '10px', background: `${item.color}15`, color: item.color }}>{item.icon}</div>
                                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{item.title}</div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                                                <span>Healthy Group</span>
                                                <span>{item.healthy} {item.unit}</span>
                                            </div>
                                            <div style={{ height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', overflow: 'hidden' }}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${(item.healthy / (item.healthy + item.cvd)) * 180}%` }}
                                                    viewport={{ once: true }}
                                                    style={{ height: '100%', background: 'var(--success)', borderRadius: '99px' }}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                                                <span>CVD-Positive Group</span>
                                                <span style={{ color: item.color, fontWeight: 700 }}>{item.cvd} {item.unit}</span>
                                            </div>
                                            <div style={{ height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', overflow: 'hidden' }}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${(item.cvd / (item.healthy + item.cvd)) * 180}%` }}
                                                    viewport={{ once: true }}
                                                    style={{ height: '100%', background: item.color, borderRadius: '99px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '1.25rem', fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
                                        {item.cvd > item.healthy ?
                                            `CVD patients average +${(item.cvd - item.healthy).toFixed(1)} ${item.unit} higher.` :
                                            'Distribution remains consistent across groups.'
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </Container>
        </div>
    );
};

export default Dataset;
