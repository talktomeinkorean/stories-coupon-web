import Image from 'next/image';

import heroBg from '../../public/images/hero-bg.png';

/** Figma app icon(65.27×60.08)의 벡터 4개를 원래 좌표대로 배치 */
const APP_ICON_PARTS = [
  { src: '/images/app-icon/top.svg', left: 12.0213, top: 0, width: 36.4026, height: 11.3291 },
  { src: '/images/app-icon/second.svg', left: 0, top: 13.1045, width: 43.922, height: 16.5028 },
  { src: '/images/app-icon/third.svg', left: 5.3354, top: 31.7585, width: 52.4547, height: 16.5028 },
  { src: '/images/app-icon/bottom.svg', left: 10.671, top: 50.2256, width: 54.5985, height: 9.85651 },
];

export default function Hero() {
  return (
    <header className='relative h-[381px] w-full overflow-hidden bg-midnight'>
      <Image
        src={heroBg}
        alt=''
        fill
        priority
        sizes='(min-width: 1920px) 100vw, 1920px'
        className='object-cover object-center'
      />
      <div
        aria-hidden
        className='absolute top-[79px] left-1/2 h-[60.082px] w-[65.269px] -translate-x-1/2'
      >
        {APP_ICON_PARTS.map((part) => (
          <Image
            key={part.src}
            src={part.src}
            alt=''
            width={part.width}
            height={part.height}
            unoptimized
            className='absolute max-w-none'
            style={{ left: part.left, top: part.top, width: part.width, height: part.height }}
          />
        ))}
      </div>
      <h1 className='absolute top-[168.65px] left-1/2 -translate-x-1/2 text-center font-futura text-[48px] leading-[1.4] font-bold whitespace-nowrap text-white'>
        TTMIK Stories
        <br />
        Coupon Page
      </h1>
    </header>
  );
}
