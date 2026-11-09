import Image from 'next/image';

import bottomBg from '../../public/images/bottom-bg.png';
import storiesLogo from '../../public/images/stories-logo.png';

export default function Footer() {
  return (
    <footer className='flex w-full flex-col items-center bg-midnight pt-[150px]'>
      <div className='flex w-full flex-col items-center gap-10 px-6'>
        <Image src={storiesLogo} alt='TTMIK Stories' width={135} height={90} />
        <p className='text-center font-futura text-[36px] leading-[48px] font-bold text-neutral-white'>
          One story can change everything
        </p>
      </div>
      <div className='relative h-[754.286px] w-full overflow-hidden'>
        <Image
          src={bottomBg}
          alt=''
          fill
          sizes='(min-width: 1920px) 100vw, 1920px'
          className='object-cover object-center'
        />
      </div>
    </footer>
  );
}
