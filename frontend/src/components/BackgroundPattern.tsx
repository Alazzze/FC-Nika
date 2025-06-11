import React from 'react';

const BackgroundPattern: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Основний градієнт */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-100"></div>
      
      {/* Футбольні м'ячі як фонові елементи */}
      <div className="absolute top-10 left-10 w-16 h-16 opacity-5">
        <div className="w-full h-full rounded-full bg-gray-900 relative">
          <div className="absolute inset-2 rounded-full border-2 border-gray-900"></div>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 rotate-45"></div>
        </div>
      </div>
      
      <div className="absolute top-64 right-20 w-20 h-20 opacity-3">
        <div className="w-full h-full rounded-full bg-gray-900 relative">
          <div className="absolute inset-2 rounded-full border-2 border-gray-900"></div>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 rotate-45"></div>
        </div>
      </div>
      
      <div className="absolute bottom-32 left-32 w-12 h-12 opacity-4">
        <div className="w-full h-full rounded-full bg-gray-900 relative">
          <div className="absolute inset-2 rounded-full border-2 border-gray-900"></div>
        </div>
      </div>
      
      {/* Геометричні елементи */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-nika-blue to-nika-gold rounded-full blur-3xl"></div>
      </div>
      
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 opacity-15">
        <div className="w-full h-full bg-gradient-to-tl from-nika-gold to-nika-blue rounded-full blur-3xl"></div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 w-32 h-32 opacity-10">
        <div className="w-full h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-2xl"></div>
      </div>
      
      {/* Футбольне поле лінії */}
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 1000">
        <defs>
          <pattern id="footballField" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footballField)" />
        
        {/* Коло в центрі */}
        <circle cx="500" cy="500" r="80" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.2"/>
        <circle cx="500" cy="500" r="3" fill="#22c55e" opacity="0.3"/>
        
        {/* Центральна лінія */}
        <line x1="0" y1="500" x2="1000" y2="500" stroke="#22c55e" strokeWidth="2" opacity="0.2"/>
      </svg>
      
      {/* Анімовані блискавки */}
      <div className="absolute top-1/3 left-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-nika-gold to-transparent opacity-20 animate-pulse"></div>
      <div className="absolute top-2/3 left-1/3 w-1 h-16 bg-gradient-to-b from-transparent via-nika-blue to-transparent opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-1/3 w-1 h-24 bg-gradient-to-b from-transparent via-nika-gold to-transparent opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  );
};

export default BackgroundPattern; 