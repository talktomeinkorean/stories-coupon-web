import Image from 'next/image';

import heroBg from '../../public/images/hero-bg.png';

/** Figma app icon 원본(65.27×60.08)을 hero 표시 크기(36.93×34)로 축소하는 비율 */
const APP_ICON_SCALE = 34 / 60.082;

/** app icon의 벡터 4개 — 원본 좌표 기준 */
const APP_ICON_PARTS = [
  { src: '/images/app-icon/top.svg', left: 12.0213, top: 0, width: 36.4026, height: 11.3291 },
  { src: '/images/app-icon/second.svg', left: 0, top: 13.1045, width: 43.922, height: 16.5028 },
  { src: '/images/app-icon/third.svg', left: 5.3354, top: 31.7585, width: 52.4547, height: 16.5028 },
  { src: '/images/app-icon/bottom.svg', left: 10.671, top: 50.2256, width: 54.5985, height: 9.85651 },
];

export default function Hero() {
  return (
    <header className='relative h-[240px] w-full overflow-hidden bg-midnight'>
      {/* 배경은 원본 높이(381px) 그대로 두고 상단 240px만 노출 */}
      <div className='absolute inset-x-0 top-0 h-[381px]'>
        <Image
          src={heroBg}
          alt=''
          fill
          priority
          sizes='(min-width: 1920px) 100vw, 1920px'
          className='object-cover object-center'
        />
      </div>
      <div
        aria-hidden
        className='absolute top-[52px] left-1/2 h-[34px] w-[36.93px] -translate-x-1/2'
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
            style={{
              left: part.left * APP_ICON_SCALE,
              top: part.top * APP_ICON_SCALE,
              width: part.width * APP_ICON_SCALE,
              height: part.height * APP_ICON_SCALE,
            }}
          />
        ))}
      </div>
      <h1 className='absolute top-[105px] left-1/2 -translate-x-1/2 text-center text-[32px] leading-[normal] font-bold whitespace-nowrap text-white [font-variation-settings:"opsz"_14]'>
        TTMIK Stories
        <br />
        Coupon Page
      </h1>
    </header>
  );
}
