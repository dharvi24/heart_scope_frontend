import React from 'react';

const Container = ({ children, className = '', style, ...props }) => {
    return (
        <div
            className={`container ${className}`}
            style={{
                width: '100%',
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '0 clamp(1rem, 4vw, 2rem)',
                ...style
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Container;
