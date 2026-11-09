'use client';

import { useSearchParams } from 'next/navigation';

import CouponForm from '@/components/CouponForm';

/** `?code=XXXX` 쿼리로 쿠폰 코드를 미리 채운다 (정제는 CouponForm에서 동일 규칙 적용). */
export default function CouponFormWithQuery() {
  const searchParams = useSearchParams();
  return <CouponForm initialCode={searchParams.get('code') ?? ''} />;
}
