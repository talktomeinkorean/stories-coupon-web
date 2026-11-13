import Image from "next/image";

import bottomBg from "../../public/images/bottom-bg.png";
import storiesLogo from "../../public/images/stories-logo.png";

const POLICY_LINKS = [
  { label: "Privacy Policy", href: "https://ttmikstories.app/policy/privacy" },
  { label: "Terms and Conditions", href: "https://ttmikstories.app/policy/terms" },
];

const COMPANY_INFO = [
  "G9 주식회사 지나인",
  "Business  Number : 110-81-94935",
  "서울시 마포구 월드컵북로 21 6층",
  "E-commerce Registration Number: 2011-서울서대문-0303",
  "CEOs : 선현우, 최경은",
];

const linkClass =
  'text-[17px] leading-none font-semibold whitespace-nowrap text-white hover:underline [font-variation-settings:"opsz"_14]';
const infoTextClass = "text-[14px] leading-[1.4] break-keep text-light-steel";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center bg-midnight pt-[90px]">
      <div className="flex w-full flex-col items-center gap-10 px-6">
        <Image src={storiesLogo} alt="TTMIK Stories" width={91} height={60} />
        <p className='text-center text-[28px] leading-[normal] font-bold text-neutral-white [font-variation-settings:"opsz"_14]'>
          One story can change everything
        </p>
      </div>

      <div className="relative h-[322px] w-full overflow-hidden min-[1140px]:h-[28.25vw]">
        <Image
          src={bottomBg}
          alt=""
          sizes="(min-width: 1140px) 100vw, 1140px"
          className="absolute top-0 left-1/2 h-auto w-[1140px] max-w-none -translate-x-1/2 min-[1140px]:w-full"
        />
      </div>

      <div className="mx-auto flex w-full max-w-[500px] flex-col items-start gap-6 px-6 py-10">
        <nav aria-label="Policies" className="flex items-start gap-6">
          <a href={POLICY_LINKS[0].href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {POLICY_LINKS[0].label}
          </a>
          <span aria-hidden className="flex w-0 items-center justify-center self-stretch">
            <Image
              src="/icons/footer-divider.svg"
              alt=""
              width={17}
              height={1}
              unoptimized
              className="max-w-none shrink-0 rotate-90"
            />
          </span>
          <a href={POLICY_LINKS[1].href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {POLICY_LINKS[1].label}
          </a>
        </nav>

        <ul className="flex w-full flex-wrap items-center gap-x-4 gap-y-[6px]">
          {COMPANY_INFO.map((item) => (
            <li key={item} className={`${infoTextClass} whitespace-pre-wrap`}>
              {item}
            </li>
          ))}
        </ul>

        <p className={infoTextClass}>© 2026 Talk To Me In Korean. All rights reserved.</p>
      </div>
    </footer>
  );
}
