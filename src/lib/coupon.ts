export const MIN_CODE_LENGTH = 6;
export const MAX_CODE_LENGTH = 16;

export const SUPPORT_EMAIL = 'help@talktomeinkorean.com';

/** AppsFlyer OneLink — 기기(iOS·Android)에 맞는 스토어로 알아서 이동 */
export const APP_DOWNLOAD_URL = 'https://ttmikstories.onelink.me/Mj4f/9vdngjvq';

export const INVALID_EMAIL_MESSAGE = 'Please enter a valid one.';
export const GENERIC_ERROR_MESSAGE = 'Something went wrong. Please try again.';
export const TOO_MANY_REQUESTS_MESSAGE = 'Too many attempts. Please try again in a minute.';

/** 대문자 변환 → 영문·숫자 외 제거 → 최대 16자 */
export function sanitizeCode(raw: string): string {
  return raw
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, MAX_CODE_LENGTH);
}

const REDEEM_ERROR_MESSAGES: Record<string, string> = {
  INVALID_CODE: "This code isn't valid. Please check and try again.",
  EXPIRED_CODE: 'This code has expired.',
  ALREADY_USED: 'This code is already used.',
  ALREADY_HAS_BENEFIT:
    'You already have an active subscription, so this code can’t be applied.',
  ALREADY_REDEEMED_CAMPAIGN: 'You’ve already received this offer through this campaign.',
  TOO_MANY_REQUESTS: TOO_MANY_REQUESTS_MESSAGE,
};

/** 이메일 확인 실패 문구. 요청 제한(429)만 따로 안내하고 나머지는 기존처럼 이메일 확인 요청. */
export function verifyErrorMessage(errorCode: string | null): string {
  return errorCode === 'TOO_MANY_REQUESTS' ? TOO_MANY_REQUESTS_MESSAGE : INVALID_EMAIL_MESSAGE;
}

/** 코드 입력란 아래에 표시할 문구. ACCOUNT_NOT_FOUND는 호출부에서 이메일 란으로 별도 처리. */
export function redeemErrorMessage(errorCode: string | null): string {
  return (errorCode && REDEEM_ERROR_MESSAGES[errorCode]) || GENERIC_ERROR_MESSAGE;
}
