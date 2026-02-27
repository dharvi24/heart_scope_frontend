import React from 'react';
import Container from './Container';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid var(--glass-border)',
            padding: '4rem 0 2rem 0',
            marginTop: 'auto'
        }}>
            <Container>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="hs-foot-grad" x1="0" y1="0" x2="34" y2="28" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#818cf8" />
                                    <stop offset="100%" stopColor="#f472b6" />
                                </linearGradient>
                            </defs>
                            <path d="M17 25S3 16.5 3 8.5a6.5 6.5 0 0 1 14-1.8A6.5 6.5 0 0 1 31 8.5C31 16.5 17 25 17 25z" fill="url(#hs-foot-grad)" opacity="0.9" />
                            <polyline points="5,14 9,14 11,8 13,20 15,11 17,14 19,14 21,9 23,19 25,14 29,14" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.92" />
                        </svg>
                        <span style={{ fontWeight: '800', fontSize: '1.5rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #6366f1, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            HeartScope
                        </span>
                    </div>

                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '1rem', maxWidth: '500px', lineHeight: 1.6 }}>
                        Advanced machine learning for cardiovascular health assessment. <br />
                        <span style={{ fontSize: '0.9em', opacity: 0.7 }}>Empowering you with future-ready health insights.</span>
                    </p>

                    <div style={{ width: '100%', height: '1px', background: 'var(--glass-border)', margin: '1rem 0' }}></div>

                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', opacity: 0.8 }}>
                        © {new Date().getFullYear()} HeartScope. All rights reserved.
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
