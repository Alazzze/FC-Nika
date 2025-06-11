import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
}

const Confetti: React.FC<ConfettiProps> = ({ active, duration = 3000 }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const colors = ['#1e3a8a', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#f97316'];

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    // Створюємо частинки
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 4,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * 360
      });
    }
    setParticles(newParticles);

    // Анімація частинок
    const animationInterval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          rotation: particle.rotation + 5,
          speedY: particle.speedY + 0.1 // Гравітація
        })).filter(particle => particle.y < window.innerHeight + 50)
      );
    }, 16);

    // Очищаємо через duration
    const timeout = setTimeout(() => {
      clearInterval(animationInterval);
      setParticles([]);
    }, duration);

    return () => {
      clearInterval(animationInterval);
      clearTimeout(timeout);
    };
  }, [active, duration, colors]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            transition: 'none'
          }}
        />
      ))}
      
      {/* Додатковий ефект - велике "ПЕРЕМОГА!" */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl font-bold text-yellow-400 animate-bounce drop-shadow-lg">
          🏆 ПЕРЕМОГА! 🏆
        </div>
      </div>
    </div>
  );
};

export default Confetti; 