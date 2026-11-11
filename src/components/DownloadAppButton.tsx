import Image from 'next/image';

import { APP_DOWNLOAD_URL } from '@/lib/coupon';

export default function DownloadAppButton() {
  return (
    <a
      href={APP_DOWNLOAD_URL}
      target='_blank'
      rel='noopener noreferrer'
      className='flex h-[50px] shrink-0 items-center justify-center gap-4 rounded-full bg-flamingo px-8 text-[16px] leading-[normal] font-bold text-white [font-variation-settings:"opsz"_14]'
    >
      Download app
      <Image src='/icons/download.svg' alt='' width={20} height={20} unoptimized />
    </a>
  );
}
