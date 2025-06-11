import React, { useState, useEffect } from 'react';

interface AnimatedScoreProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  isLive?: boolean;
}

const AnimatedScore: React.FC<AnimatedScoreProps> = ({ 
  homeTeam, 
  awayTeam, 
  homeScore, 
  awayScore, 
  isLive = false 
}) => {
  const [animatedHomeScore, setAnimatedHomeScore] = useState(0);
  const [animatedAwayScore, setAnimatedAwayScore] = useState(0);
  const [showGoal, setShowGoal] = useState(false);

  useEffect(() => {
    // Анімація рахунку домашньої команди
    const homeInterval = setInterval(() => {
      setAnimatedHomeScore(prev => {
        if (prev < homeScore) return prev + 1;
        clearInterval(homeInterval);
        return prev;
      });
    }, 200);

    // Анімація рахунку гостьової команди
    const awayInterval = setInterval(() => {
      setAnimatedAwayScore(prev => {
        if (prev < awayScore) return prev + 1;
        clearInterval(awayInterval);
        return prev;
      });
    }, 250);

    return () => {
      clearInterval(homeInterval);
      clearInterval(awayInterval);
    };
  }, [homeScore, awayScore]);

  // Показ "ГОООООЛ!" при зміні рахунку
  useEffect(() => {
    if (animatedHomeScore > 0 || animatedAwayScore > 0) {
      setShowGoal(true);
      setTimeout(() => setShowGoal(false), 2000);
    }
  }, [animatedHomeScore, animatedAwayScore]);

  return (
    <div className="relative bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-xl shadow-xl overflow-hidden h-full min-h-[280px] flex flex-col justify-between">
      {/* Live індикатор */}
      {isLive && (
        <div className="absolute top-4 right-4 flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
          <span className="text-xs font-bold">LIVE</span>
        </div>
      )}

      {/* ГОООООЛ! анімація */}
      {showGoal && (
        <div className="absolute inset-0 flex items-center justify-center bg-yellow-400 bg-opacity-90 z-10 animate-bounce">
          <div className="text-4xl font-bold text-red-600 transform rotate-12">
            ⚽ ГОООООЛ! ⚽
          </div>
        </div>
      )}

      {/* Заголовок */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-yellow-300">Останній результат</h3>
      </div>

      {/* Основний контент */}
      <div className="flex items-center justify-between flex-grow">
        {/* Домашня команда */}
        <div className="text-center flex-1">
          <div className="text-base font-bold mb-4">{homeTeam}</div>
          <div className="text-5xl font-bold text-yellow-300 transition-all duration-500 transform hover:scale-110">
            {animatedHomeScore}
          </div>
        </div>

        {/* VS розділювач */}
        <div className="px-4">
          <div className="text-2xl font-bold text-yellow-300">VS</div>
        </div>

        {/* Гостьова команда */}
        <div className="text-center flex-1">
          <div className="text-base font-bold mb-4">{awayTeam}</div>
          <div className="text-5xl font-bold text-yellow-300 transition-all duration-500 transform hover:scale-110">
            {animatedAwayScore}
          </div>
        </div>
      </div>

      {/* Футбольне поле фон */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-800">
        <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
      </div>
    </div>
  );
};

export default AnimatedScore; 