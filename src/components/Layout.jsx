import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Container from './Container';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaNotesMedical } from 'react-icons/fa';

const Layout = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            position: 'relative',
            width: '100%',
            overflowX: 'hidden'
        }}>
            {/* Premium Bio-Network Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}
            >
                {/* 2. Hyper-Vibrant Glow Orbs (Layered) */}
                <div className="bio-orb orb-primary"></div>
                <div className="bio-orb orb-secondary"></div>
                <div className="bio-orb orb-accent"></div>

                {/* 4. Floating Medical Hearts - Exclusively */}
                {[...Array(35)].map((_, i) => {
                    const size = Math.random() * 22 + 8;
                    const duration = Math.random() * 12 + 15;
                    const delay = Math.random() * -30;
                    return (
                        <div
                            key={i}
                            className="bio-particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${size}px`,
                                height: `${size}px`,
                                animationDuration: `${duration}s`,
                                animationDelay: `${delay}s`,
                                opacity: Math.random() * 0.35 + 0.1,
                                color: i % 2 === 0 ? 'var(--primary-light)' : 'var(--accent)'
                            }}
                        >
                            <FaHeartbeat style={{ fontSize: size }} />
                        </div>
                    );
                })}

                {/* 5. High-Density Twinkling Nodes */}
                <div className="starfield"></div>
            </motion.div>

            <Navbar />

            <main style={{
                flex: 1,
                position: 'relative',
                zIndex: 1,
                zIndex: 1,
                paddingTop: '4rem',
                width: '100%',
                minHeight: 'calc(100vh - 200px)'
            }}>
                <Container>
                    <Outlet />
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
