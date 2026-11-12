'use client';

import Image from 'next/image';
import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react';

import {
  APP_DOWNLOAD_URL,
  GENERIC_ERROR_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  MIN_CODE_LENGTH,
  SUPPORT_EMAIL,
  redeemErrorMessage,
  sanitizeCode,
  verifyErrorMessage,
} from '@/lib/coupon';
import { redeemCode, verifyEmail } from '@/lib/promoCodeApi';

type EmailStatus =
  | { kind: 'idle' }
  | { kind: 'verifying' }
  | { kind: 'verified'; nickname: string }
  | { kind: 'invalid'; message: string };

type Success = { benefitName: string };

const EMAIL_INPUT_ID = 'account-email';
const EMAIL_MESSAGE_ID = 'account-email-message';
const CODE_INPUT_ID = 'coupon-code';
const CODE_MESSAGE_ID = 'coupon-code-message';

const labelClass = 'text-[20px] font-bold text-light-green';
const fieldBoxClass =
  'flex h-[56px] w-full items-center gap-[10px] rounded-[10px] bg-white/10 px-6 ' +
  'focus-within:ring-2 focus-within:ring-light-green/60';
const inputClass =
  'min-w-0 flex-1 bg-transparent text-[14px] text-neutral-white outline-none ' +
  'placeholder:text-neutral-white/36 [font-variation-settings:"opsz"_9]';
const messageClass = 'pt-2 pl-[2px] font-mono text-[12px] leading-[16px]';

export default function CouponForm({ initialCode = '' }: { initialCode?: string }) {
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<EmailStatus>({ kind: 'idle' });
  const [code, setCode] = useState(() => sanitizeCode(initialCode));
  const [codeError, setCodeError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [success, setSuccess] = useState<Success | null>(null);

  // 비동기 응답 시점에 최신 이메일과 비교하기 위한 ref (응답 도착 전 수정 시 결과 무시)
  const emailRef = useRef(email);
  const applyLockRef = useRef(false);

  const trimmedEmail = email.trim();
  const isVerified = emailStatus.kind === 'verified';
  const canApply = isVerified && code.length >= MIN_CODE_LENGTH && !applying;

  const handleEmailChange = (value: string) => {
    emailRef.current = value;
    setEmail(value);
    setEmailStatus({ kind: 'idle' });
    setSuccess(null);
  };

  const handleVerify = async () => {
    if (!trimmedEmail || emailStatus.kind === 'verifying' || isVerified) {
      return;
    }
    const requestedEmail = trimmedEmail;
    setEmailStatus({ kind: 'verifying' });

    const result = await verifyEmail(requestedEmail);
    if (emailRef.current.trim() !== requestedEmail) {
      return;
    }
    setEmailStatus(
      result.ok
        ? { kind: 'verified', nickname: result.data.nickname }
        : { kind: 'invalid', message: verifyErrorMessage(result.errorCode) },
    );
  };

  const handleEmailKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      void handleVerify();
    }
  };

  const handleCodeChange = (value: string) => {
    setCode(sanitizeCode(value));
    setCodeError(null);
    setSuccess(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canApply || applyLockRef.current || emailStatus.kind !== 'verified') {
      return;
    }
    applyLockRef.current = true;
    setApplying(true);
    setCodeError(null);

    try {
      const result = await redeemCode(trimmedEmail, code);
      if (result.ok) {
        setSuccess({ benefitName: result.data.benefitName });
        emailRef.current = '';
        setEmail('');
        setEmailStatus({ kind: 'idle' });
        setCode('');
        return;
      }
      if (result.errorCode === 'ACCOUNT_NOT_FOUND') {
        setEmailStatus({ kind: 'invalid', message: INVALID_EMAIL_MESSAGE });
        return;
      }
      setCodeError(result.errorCode ? redeemErrorMessage(result.errorCode) : GENERIC_ERROR_MESSAGE);
    } finally {
      applyLockRef.current = false;
      setApplying(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className='flex w-full flex-col items-start [font-variation-settings:"opsz"_14]'
    >
      {/* Account Email */}
      <div className='flex w-full flex-col items-start'>
        <div className='flex w-full flex-wrap items-center justify-between gap-x-1 gap-y-1 pb-[14px]'>
          <label htmlFor={EMAIL_INPUT_ID} className={`${labelClass} leading-[33px]`}>
            Account Email
          </label>
          <a
            href='#how-to-find-email'
            className='flex items-center text-[16px] leading-[normal] font-bold text-neutral-white hover:underline'
          >
            How to find it?
            <Image src='/icons/arrow-next.svg' alt='' width={16} height={16} unoptimized />
          </a>
        </div>
        <div className={fieldBoxClass}>
          <input
            id={EMAIL_INPUT_ID}
            type='email'
            inputMode='email'
            autoComplete='email'
            autoCapitalize='none'
            spellCheck={false}
            placeholder='Enter your email'
            value={email}
            onChange={(event) => handleEmailChange(event.target.value)}
            onKeyDown={handleEmailKeyDown}
            aria-invalid={emailStatus.kind === 'invalid'}
            aria-describedby={EMAIL_MESSAGE_ID}
            className={inputClass}
          />
          {trimmedEmail.length > 0 && (
            <button
              type='button'
              onClick={() => void handleVerify()}
              disabled={emailStatus.kind === 'verifying' || isVerified}
              className='shrink-0 text-[14px] font-semibold text-flamingo uppercase disabled:cursor-default disabled:opacity-50'
            >
              {emailStatus.kind === 'verifying' ? 'Verifying…' : 'Verify'}
            </button>
          )}
        </div>
        <div id={EMAIL_MESSAGE_ID} aria-live='polite' className='w-full'>
          {emailStatus.kind === 'verified' && (
            <p className={`${messageClass} flex items-center gap-[2px] tracking-[-0.24px] text-light-green-200`}>
              <Image src='/icons/check.svg' alt='' width={16} height={16} unoptimized />
              <span>Verified. Your nickname: {emailStatus.nickname}</span>
            </p>
          )}
          {emailStatus.kind === 'invalid' && (
            <p role='alert' className={`${messageClass} text-error`}>
              {emailStatus.message}
            </p>
          )}
        </div>
      </div>

      {/* Coupon Code */}
      <div className='flex w-full flex-col items-start pt-6'>
        <label htmlFor={CODE_INPUT_ID} className={`${labelClass} pb-[13.2px] leading-[normal]`}>
          Coupon Code
        </label>
        <div className={fieldBoxClass}>
          <input
            id={CODE_INPUT_ID}
            type='text'
            autoComplete='off'
            autoCapitalize='characters'
            autoCorrect='off'
            spellCheck={false}
            placeholder='Enter code'
            value={code}
            onChange={(event) => handleCodeChange(event.target.value)}
            aria-invalid={codeError !== null}
            aria-describedby={CODE_MESSAGE_ID}
            className={inputClass}
          />
        </div>
        <div id={CODE_MESSAGE_ID} aria-live='polite' className='w-full'>
          {codeError && (
            <p role='alert' className={`${messageClass} text-error`}>
              {codeError}
            </p>
          )}
        </div>
      </div>

      {/* APPLY */}
      <div className='flex w-full flex-col items-center pt-10'>
        <button
          type='submit'
          disabled={!canApply}
          aria-busy={applying}
          className='flex h-[50px] w-[327px] max-w-full items-center justify-center rounded-full bg-flamingo text-[14px] font-bold text-neutral-white uppercase transition-colors disabled:cursor-not-allowed disabled:bg-basic-gray'
        >
          {applying ? 'Applying…' : 'Apply'}
        </button>
      </div>

      <div aria-live='polite' className='w-full'>
        {success && (
          <div
            role='status'
            className='mt-8 flex w-full flex-col items-center gap-2 rounded-[10px] border border-light-green/60 bg-light-green/10 p-6 text-center'
          >
            <p className='text-[20px] leading-[26px] font-bold text-light-green'>Code applied!</p>
            <p className='text-[14px] leading-[21px] text-neutral-white'>
              You now have {success.benefitName}.
            </p>
            <p className='text-[14px] leading-[21px] text-neutral-white'>
              Open the TTMIK Stories app to start learning.
            </p>
            <div className='flex w-full justify-center pt-3'>
              <a
                href={APP_DOWNLOAD_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-[50px] w-[327px] max-w-full items-center justify-center rounded-full bg-electric-violet text-[14px] leading-[normal] font-bold text-neutral-white uppercase'
              >
                Start reading
              </a>
            </div>
          </div>
        )}
      </div>

      <p className='w-full pt-10 text-center text-[14px] leading-[normal] text-neutral-white'>
        If you have any trouble applying your code,
        <br />
        please contact{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className='underline'>
          {SUPPORT_EMAIL}
        </a>
        .
      </p>
    </form>
  );
}
