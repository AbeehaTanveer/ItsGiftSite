import { useState } from 'react';
import basketImage from '../../assets/Bat.png';

export default function CricketGiftBasket({
  name = 'Zameer',
  className = '',
  sizeClassName = 'w-full',
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`flex justify-center items-center relative ${className}`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className={`${sizeClassName} h-auto aspect-square max-w-[300px] 
                        bg-blue-200/50 rounded-2xl animate-pulse
                        flex items-center justify-center`}>
          <span className="text-5xl">🏏</span>
        </div>
      )}
      
      <img
        src={basketImage}
        alt={`Gift basket with a cricket bat inside, for ${name}`}
        className={`${sizeClassName} h-auto object-contain transition-opacity duration-500
                    ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          filter: 'drop-shadow(0 10px 12px rgba(0,0,0,0.25))',
        }}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />

    
    </div>

  );
}