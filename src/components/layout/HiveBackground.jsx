import React, { useMemo } from 'react';

const HiveBackground = ({ isNight }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 8 + 4,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100 + 10}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 8 + 8}s`
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-colors duration-1000 ease-in-out"
         style={{
           backgroundColor: isNight ? '#0a0600' : '#ff9d00',
           backgroundImage: isNight 
             ? 'radial-gradient(circle at 50% 10%, #291a00 0%, #0a0600 60%, #000000 100%)' 
             : 'radial-gradient(circle at 50% 20%, #ffe066 0%, #ff9d00 50%, #cc5500 100%)'
         }}
    >
      <div className="absolute inset-0 opacity-20 mix-blend-overlay"
           style={{
             backgroundImage: `
               linear-gradient(30deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff),
               linear-gradient(150deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff),
               linear-gradient(30deg, transparent 37.5%, #ffffff 37.5%, #ffffff 62.5%, transparent 62.5%),
               linear-gradient(150deg, transparent 37.5%, #ffffff 37.5%, #ffffff 62.5%, transparent 62.5%)
             `,
             backgroundSize: '40px 70px',
             backgroundPosition: '0 0, 0 0, 20px 35px, 20px 35px'
           }}>
      </div>
      {!isNight && (
        <div className="absolute inset-0 top-[-20%] left-[-20%] w-[140%] h-[140%] animate-spin-slow opacity-30"
             style={{ background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.4) 30deg, transparent 60deg, transparent 180deg, rgba(255,255,255,0.4) 210deg, transparent 240deg)' }}>
        </div>
      )}
      {particles.map((p) => (
        <div 
          key={p.id} 
          className="absolute rounded-full animate-float-particle mix-blend-screen" 
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: isNight ? '#ffcc00' : '#ffffff',
            boxShadow: `0 0 ${p.size * 2}px ${isNight ? '#ffaa00' : '#ffffff'}`,
            opacity: 0,
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration
          }}
        />
      ))}
    </div>
  );
};

export default HiveBackground;
