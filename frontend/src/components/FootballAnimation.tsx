import React, { useEffect, useState } from 'react';

const FootballAnimation: React.FC = () => {
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(true);
      setPosition(0);
      
      const animateInterval = setInterval(() => {
        setPosition(prev => {
          if (prev >= 100) {
            setVisible(false);
            clearInterval(animateInterval);
            return 0;
          }
          return prev + 1;
        });
      }, 30);

      return () => clearInterval(animateInterval);
    }, 8000); // Кожні 8 секунд

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10 overflow-hidden">
      <div 
        className="absolute transition-all duration-75 ease-linear"
        style={{
          left: `${position}%`,
          top: `${20 + Math.sin(position * 0.1) * 10}%`,
          transform: `rotate(${position * 10}deg)`
        }}
      >
        {/* Футбольний м'яч */}
        <div className="text-4xl">⚽</div>
      </div>
    </div>
  );
};

export default FootballAnimation; 