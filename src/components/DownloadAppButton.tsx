'use client';

import Image from 'next/image';
import type { MouseEvent } from 'react';

import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/coupon';

/** iOS·데스크톱은 App Store, Android는 Play Store로 이동 */
export default function DownloadAppButton() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (/android/i.test(navigator.userAgent)) {
      event.preventDefault();
      window.open(PLAY_STORE_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <a
      href={APP_STORE_URL}
      target='_blank'
      rel='noopener noreferrer'
      onClick={handleClick}
      className='flex shrink-0 items-center justify-center gap-4 rounded-full border border-white bg-midnight px-8 py-[13px] text-[20px] leading-[38px] font-medium text-white'
    >
      Download app
      <Image src='/icons/download.svg' alt='' width={20} height={20} unoptimized />
    </a>
  );
}
