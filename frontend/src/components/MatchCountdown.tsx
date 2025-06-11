import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const MatchCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Наступний матч (приклад - через 3 дні)
  const nextMatch = new Date();
  nextMatch.setDate(nextMatch.getDate() + 3);
  nextMatch.setHours(15, 30, 0, 0); // 15:30

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const matchTime = nextMatch.getTime();
      const difference = matchTime - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextMatch]);

  return (
    <div className="bg-gradient-to-r from-nika-blue to-nika-darkBlue text-white p-8 rounded-xl shadow-xl h-full min-h-[280px] flex flex-col justify-between">
      <div className="flex items-center justify-center mb-6">
        <Clock className="w-6 h-6 mr-2 text-nika-gold" />
        <h3 className="text-xl font-bold">Наступний матч</h3>
      </div>
      
      <div className="text-center mb-6 flex-grow flex flex-col justify-center">
        <p className="text-nika-lightGold text-lg mb-3">ФК "Ніка" vs "Суперник"</p>
        <div className="flex items-center justify-center">
          <Calendar className="w-4 h-4 mr-1 text-nika-gold" />
          <span className="text-sm">{nextMatch.toLocaleDateString('uk-UA')}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="bg-nika-gold text-nika-darkBlue rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.days}</div>
          <div className="text-xs uppercase">Днів</div>
        </div>
        <div className="bg-nika-gold text-nika-darkBlue rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.hours}</div>
          <div className="text-xs uppercase">Годин</div>
        </div>
        <div className="bg-nika-gold text-nika-darkBlue rounded-lg p-3">
          <div className="text-2xl font-bold">{timeLeft.minutes}</div>
          <div className="text-xs uppercase">Хвилин</div>
        </div>
        <div className="bg-nika-gold text-nika-darkBlue rounded-lg p-3 animate-pulse">
          <div className="text-2xl font-bold">{timeLeft.seconds}</div>
          <div className="text-xs uppercase">Секунд</div>
        </div>
      </div>
    </div>
  );
};

export default MatchCountdown; 