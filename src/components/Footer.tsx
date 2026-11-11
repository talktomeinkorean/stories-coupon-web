import Image from "next/image";

import bottomBg from "../../public/images/bottom-bg.png";
import storiesLogo from "../../public/images/stories-logo.png";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center bg-midnight pt-[90px]">
      <div className="flex w-full flex-col items-center gap-10 px-6">
        <Image src={storiesLogo} alt="TTMIK Stories" width={91} height={60} />
        <p className='text-center text-[28px] leading-[normal] font-bold text-neutral-white [font-variation-settings:"opsz"_14]'>
          One story can change everything
        </p>
      </div>
      {/* 1140px 폭 기준 상단 322px 노출, 더 넓은 화면에서는 같은 비율로 확대 */}
      <div className="relative h-[322px] w-full overflow-hidden min-[1140px]:h-[28.25vw]">
        <Image
          src={bottomBg}
          alt=""
          sizes="(min-width: 1140px) 100vw, 1140px"
          className="absolute top-0 left-1/2 h-auto w-[1140px] max-w-none -translate-x-1/2 min-[1140px]:w-full"
        />
      </div>
    </footer>
  );
}
