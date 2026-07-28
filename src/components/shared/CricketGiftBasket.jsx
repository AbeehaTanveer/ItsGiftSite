import basketImage from '../../assets/Bat.png';

export default function CricketGiftBasket({
  name = 'Zameer',
  className = '',
  sizeClassName = 'w-full',
}) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <img
        src={basketImage}
        alt={`Gift basket with a cricket bat inside, for ${name}`}
        className={`${sizeClassName} h-auto object-contain`}
        style={{
          filter: 'drop-shadow(0 10px 12px rgba(0,0,0,0.25))',
        }}
      />
    </div>
  );
}