import React, { useState, useEffect, useRef } from "react";
import { predictCardio, checkBackendHealth } from "../services/api";
import { FaUserMd, FaHeartbeat, FaRunning, FaArrowRight, FaExclamationTriangle, FaCheckCircle, FaNotesMedical, FaStethoscope, FaDownload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import Container from "./Container";
import "./PredictionForm.css";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    age: 50,
    gender: 1,
    height: 165,
    weight: 70,
    ap_hi: 120,
    ap_lo: 80,
    cholesterol: 1,
    gluc: 1,
    smoke: 0,
    alco: 0,
    active: 1,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // UX: Quick scroll for mobile
    setTimeout(() => {
      const resultElement = document.getElementById("results-section");
      if (resultElement && window.innerWidth < 1024) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);

    try {
      // Step 1: Poke the backend to wake it up (Render Free Tier can be slow)
      setIsWakingUp(true);
      await checkBackendHealth();
      setIsWakingUp(false);

      // Step 2: Proceed with prediction
      const data = await predictCardio(formData);
      setResult(data);
    } catch (err) {
      setIsWakingUp(false);
      if (err.message === "CONNECTION_ERROR") {
        setError("backend_connection");
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  const getRiskLevel = (riskPercentage) => {
    if (riskPercentage < 25) return { label: "Optimal Risk", color: "#10b981" };
    if (riskPercentage < 50) return { label: "Moderate Risk", color: "#f59e0b" };
    if (riskPercentage < 80) return { label: "High Risk", color: "#ef4444" };
    return { label: "Critical Risk", color: "#b91c1c" };
  };

  return (
    <Container>
      <div className="prediction-card">
        <div className="header">
          <h1>Clinical Risk Assessment</h1>
          <p>Enter patient vitals and health indicators for a probabilistic cardiovascular risk evaluation.</p>
        </div>

        <div className="prediction-content-wrapper">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-sections">
                <FormSection title="Patient Demographics" icon={<FaUserMd />}>
                  <Input name="age" label="Age (years)" value={formData.age} onChange={handleChange} min="1" max="100" />
                  <Select name="gender" label="Gender" value={formData.gender} onChange={handleChange} options={[
                    { v: 1, l: "Female" }, { v: 2, l: "Male" }
                  ]} />
                  <Input name="height" label="Height (cm)" value={formData.height} onChange={handleChange} min="1" max="250" />
                  <Input name="weight" label="Weight (kg)" value={formData.weight} onChange={handleChange} min="1" max="300" />
                </FormSection>

                <FormSection title="Clinical Vitals" icon={<FaHeartbeat />}>
                  <Input name="ap_hi" label="Systolic BP (mmHg)" value={formData.ap_hi} onChange={handleChange} min="60" max="250" />
                  <Input name="ap_lo" label="Diastolic BP (mmHg)" value={formData.ap_lo} onChange={handleChange} min="40" max="180" />
                  <Select name="cholesterol" label="Cholesterol Level" value={formData.cholesterol} onChange={handleChange} options={[
                    { v: 1, l: "Normal" },
                    { v: 2, l: "Above Normal" },
                    { v: 3, l: "Well Above Normal" }
                  ]} />
                  <Select name="gluc" label="Glucose Level" value={formData.gluc} onChange={handleChange} options={[
                    { v: 1, l: "Normal" },
                    { v: 2, l: "Above Normal" },
                    { v: 3, l: "Well Above Normal" }
                  ]} />
                </FormSection>

                <FormSection title="Lifestyle Determinants" icon={<FaRunning />}>
                  <Select name="smoke" label="Smoking History" value={formData.smoke} onChange={handleChange} options={[
                    { v: 0, l: "Non-smoker" }, { v: 1, l: "Smoker" }
                  ]} />
                  <Select name="alco" label="Alcohol Consumption" value={formData.alco} onChange={handleChange} options={[
                    { v: 0, l: "None / Occasional" }, { v: 1, l: "Frequently" }
                  ]} />
                  <Select name="active" label="Physical Activity" value={formData.active} onChange={handleChange} options={[
                    { v: 0, l: "Inactive" }, { v: 1, l: "Active" }
                  ]} />
                </FormSection>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary submit-btn"
              >
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                      style={{ color: 'white', display: 'flex' }}
                    >
                      <FaHeartbeat />
                    </motion.div>
                    {isWakingUp ? "Waking up server..." : "Calculating Risk..."}
                  </div>
                ) : (
                  <>
                    Calculate Risk Profile <FaArrowRight style={{ marginLeft: "0.5rem" }} />
                  </>
                )}
              </button>
            </form>


            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="error-container"
                style={{ marginTop: '1rem', color: 'var(--danger)', textAlign: 'center' }}
              >
                <p>{error}</p>
              </motion.div>
            )}
          </div>

          <AnimatePresence>
            {result && (
              <div id="results-section" className="results-container">
                <ResultDisplay result={result} riskLevel={getRiskLevel(parseFloat(result.risk_percentage))} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
};

/* ─── Redesigned Result ─── */
const ResultDisplay = ({ result, riskLevel }) => {
  const riskPercent = parseFloat(result.risk_percentage);
  const circumference = 2 * Math.PI * 90;
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const zones = [
    { pct: 25, label: "OPTIMAL", color: "#10b981" },
    { pct: 50, label: "MODERATE", color: "#f59e0b" },
    { pct: 80, label: "HIGH", color: "#ef4444" },
  ];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#13142d", // Ensure dark background in download
        logging: false,
        useCORS: true
      });
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `HeartScope-Report-${new Date().getTime()}.png`;
      link.href = url;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
    setDownloading(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="result-card-refined"
    >
      {/* ── Header bar ── */}
      <div className="result-header" style={{ borderBottom: `2px solid ${riskLevel.color}30` }}>
        <h2>Assessment Result</h2>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="download-btn-mini"
          title="Download as Image"
        >
          {downloading ? "..." : <FaDownload />}
          <span className="btn-text">{downloading ? "Saving..." : "Download Report"}</span>
        </button>
      </div>

      {/* ── Main content ── */}
      <div className="result-content-grid">

        {/* Gauge column */}
        <div className="gauge-section">
          <div className="risk-gauge-container">
            <svg width="220" height="220" viewBox="0 0 220 220">
              <defs>
                <linearGradient id="rg2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Track */}
              <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />

              {/* Zone arcs (subtle background) */}
              {zones.map((z, i) => {
                const prev = i === 0 ? 0 : zones[i - 1].pct;
                const segLen = ((z.pct - prev) / 100) * circumference;
                const offset = circumference - (prev / 100) * circumference;
                return (
                  <circle key={i} cx="110" cy="110" r="90" fill="none"
                    stroke={z.color} strokeWidth="14" strokeOpacity="0.15"
                    strokeDasharray={`${segLen} ${circumference - segLen}`}
                    strokeDashoffset={offset}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '110px 110px' }}
                  />
                );
              })}

              {/* Active arc */}
              <motion.circle cx="110" cy="110" r="90" fill="none"
                stroke={riskLevel.color} strokeWidth="14" strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - (riskPercent / 100) * circumference }}
                transition={{ duration: 2, ease: "easeOut" }}
                filter="url(#glow)"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '110px 110px' }}
              />

              {/* Endpoint dot */}
              <motion.circle r="7" fill="#fff" stroke={riskLevel.color} strokeWidth="3"
                filter="url(#glow)"
                initial={false}
                animate={{
                  cx: 110 + 90 * Math.cos(((riskPercent / 100) * 360 - 90) * Math.PI / 180),
                  cy: 110 + 90 * Math.sin(((riskPercent / 100) * 360 - 90) * Math.PI / 180),
                }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>

            {/* Center HUD */}
            <div className="gauge-center-hud">
              <div className="hud-label">RISK INDEX</div>
              <motion.div className="hud-value" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                {riskPercent.toFixed(1)}<span className="unit">%</span>
              </motion.div>
              <div className="hud-sub" style={{ color: riskLevel.color }}>{riskLevel.label}</div>
            </div>
          </div>

          {/* Zone legend */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
            {[
              { label: 'Optimal', color: '#10b981' },
              { label: 'Moderate', color: '#f59e0b' },
              { label: 'High', color: '#ef4444' },
              { label: 'Critical', color: '#b91c1c' },
            ].map(z => (
              <span key={z.label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: z.color, display: 'inline-block' }} />
                {z.label}
              </span>
            ))}
          </div>
        </div>

        {/* Interpretation column */}
        <div className="interpretation-section">

          {/* Risk badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.55rem 1.25rem', borderRadius: '99px', marginBottom: '1.25rem',
            background: `${riskLevel.color}15`, border: `1px solid ${riskLevel.color}40`,
            color: riskLevel.color, fontWeight: 700, fontSize: '1rem'
          }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: riskLevel.color, boxShadow: `0 0 8px ${riskLevel.color}` }} />
            {riskLevel.label}
          </div>

          {/* Data grid */}
          <div className="diagnostic-summary">
            <h3>Diagnostic Summary</h3>
            <div className="data-grid">
              <div className="data-row">
                <span className="label">Assessment Model:</span>
                <span className="value">Random Forest v2.4</span>
                <span className="status">VALIDATED</span>
              </div>
              <div className="data-row">
                <span className="label">Screening Type:</span>
                <span className="value">Cardiovascular Disease</span>
                <span className="status">ACTIVE</span>
              </div>
              <div className="data-row highlight">
                <span className="label">Calculated Index:</span>
                <span className="value" style={{ color: riskLevel.color }}>{riskPercent.toFixed(1)}%</span>
                <span className="status" style={{ background: `${riskLevel.color}22`, color: riskLevel.color }}>FINAL</span>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="report-text">
            <p>
              The model indicates a <strong style={{ color: riskLevel.color }}>{riskPercent.toFixed(1)}% probability</strong>{" "}
              of underlying cardiovascular conditions based on the provided clinical parameters.
            </p>
            <p style={{ marginTop: '0.85rem', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              {riskPercent < 25 && "Values are within the normal statistical range — indicating strong cardiovascular health markers."}
              {riskPercent >= 25 && riskPercent < 50 && "Some risk factors are present. Preventative lifestyle adjustments may reduce future risk."}
              {riskPercent >= 50 && riskPercent < 80 && "Multiple correlating risk factors detected — clinical attention and diagnostic follow-up are advised."}
              {riskPercent >= 80 && "Critical threshold reached. Immediate clinical correlation is necessary to address high-risk indicators."}
            </p>
          </div>

          {/* Doctor alert - only for high risk */}
          {riskPercent > 50 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="doctor-alert">
              <FaStethoscope size={28} />
              <div>
                <strong>Clinical Action Advised</strong>
                <p>The calculated probability exceeds the standard observational threshold. A formal consultation with a healthcare provider is recommended.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Lifestyle suggestions */}
      <LifestyleSuggestions riskPercent={riskPercent} />

      <div style={{ padding: '1rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        ⚕ This tool is for educational screening purposes only — not a substitute for professional medical diagnosis.
      </div>
    </motion.div>
  );
};

const LifestyleSuggestions = ({ riskPercent }) => {
  const getSuggestions = (pct) => {
    if (pct < 25) return [
      { text: "Maintain 150+ mins/week of moderate aerobic activity.", icon: <FaRunning /> },
      { text: "Continue annual screenings and biometric tracking.", icon: <FaCheckCircle /> },
      { text: "Balanced diet rich in vegetables, legumes, and whole grains.", icon: <FaNotesMedical /> },
      { text: "Monitor sleep quality and stress management.", icon: <FaHeartbeat /> },
    ];
    if (pct < 50) return [
      { text: "Increase aerobic intensity; add resistance training 2×/week.", icon: <FaRunning /> },
      { text: "Schedule a non-urgent lipid profile and fasting glucose test.", icon: <FaStethoscope /> },
      { text: "Limit processed sugars; keep daily sodium under 2,300 mg.", icon: <FaNotesMedical /> },
      { text: "Consider a lifestyle consultation to review cardiovascular habits.", icon: <FaUserMd /> },
    ];
    if (pct < 75) return [
      { text: "Priority consultation with a cardiologist for diagnostic screening.", icon: <FaStethoscope /> },
      { text: "Adopt the DASH or Mediterranean diet strictly.", icon: <FaNotesMedical /> },
      { text: "Begin supervised low-impact cardio (e.g., brisk walking).", icon: <FaRunning /> },
      { text: "Monitor blood pressure daily and maintain a clinical log.", icon: <FaHeartbeat /> },
    ];
    return [
      { text: "Urgent clinical evaluation required to assess acute CAD risks.", icon: <FaExclamationTriangle /> },
      { text: "Doctor-supervised therapeutic lifestyle change (TLC) programme.", icon: <FaStethoscope /> },
      { text: "Strict adherence to clinical protocols and prescribed medications.", icon: <FaNotesMedical /> },
      { text: "Avoid unmonitored high-intensity exercise until medically cleared.", icon: <FaExclamationTriangle /> },
    ];
  };

  return (
    <div className="lifestyle-suggestions">
      <h3>Clinical Recommendations</h3>
      <div className="suggestions-grid">
        {getSuggestions(riskPercent).map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
            className="suggestion-item"
          >
            <div className="suggestion-icon">{s.icon}</div>
            <p>{s.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ── Helper Components ── */
const FormSection = ({ title, icon, children }) => (
  <div className="form-section">
    <h3>{icon} {title}</h3>
    <div className="form-group-row">{children}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type="number" {...props} />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="form-group">
    <label>{label}</label>
    <select {...props}>
      {options.map(o => (
        <option key={o.v} value={o.v}>{o.l}</option>
      ))}
    </select>
  </div>
);

export default PredictionForm;
