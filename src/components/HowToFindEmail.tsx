import Image from 'next/image';

import DownloadAppButton from '@/components/DownloadAppButton';
import howTo1 from '../../public/images/howto-1.png';
import howTo2 from '../../public/images/howto-2.png';
import howTo3 from '../../public/images/howto-3.png';

const STEPS = [
  { image: howTo1, alt: '1. Go to [My Page] and tap the [Settings icon] in the top right.' },
  { image: howTo2, alt: '2. Tap [Account], then [User Information].' },
  { image: howTo3, alt: '3. Copy your email address.' },
];

export default function HowToFindEmail() {
  return (
    <section
      id='how-to-find-email'
      aria-labelledby='how-to-find-email-title'
      className='flex w-full scroll-mt-6 flex-col items-start gap-[13px] pt-10'
    >
      <h2
        id='how-to-find-email-title'
        className='w-full text-[20px] leading-[33px] font-bold text-lavender-light'
      >
        How to find your account email
      </h2>
      <div className='flex w-full flex-col gap-3'>
        <div className='flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-[20px] bg-white p-6'>
          <p className='w-[296px] max-w-none shrink-0 border border-flamingo bg-apricot p-[10px] text-center text-[14px] leading-[normal] whitespace-nowrap text-midnight'>
            Don’t have an account yet?
            <br />
            Download the app and sign up.
          </p>
          <DownloadAppButton />
        </div>
        {STEPS.map((step) => (
          <Image
            key={step.alt}
            src={step.image}
            alt={step.alt}
            sizes='(min-width: 500px) 452px, calc(100vw - 48px)'
            className='h-auto w-full'
          />
        ))}
      </div>
    </section>
  );
}
