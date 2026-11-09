import { Suspense } from 'react';

import CouponForm from '@/components/CouponForm';
import CouponFormWithQuery from '@/components/CouponFormWithQuery';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowToFindEmail from '@/components/HowToFindEmail';

export default function Home() {
  return (
    <>
      <Hero />
      <main className='mx-auto flex w-full max-w-[720px] flex-col items-start px-6 pt-10'>
        <Suspense fallback={<CouponForm />}>
          <CouponFormWithQuery />
        </Suspense>
        <HowToFindEmail />
      </main>
      <Footer />
    </>
  );
}
