export type ApiErrorCode =
  | 'ACCOUNT_NOT_FOUND'
  | 'INVALID_CODE'
  | 'EXPIRED_CODE'
  | 'ALREADY_USED'
  | 'ALREADY_HAS_BENEFIT'
  | 'ALREADY_REDEEMED_CAMPAIGN';

export type ApiFailure = {
  ok: false;
  status: number | null;
  errorCode: string | null;
};

export type ApiResult<T> = { ok: true; data: T } | ApiFailure;

export type VerifyResponse = { nickname: string };

export type RedeemResponse = {
  benefitName: string;
  started: string;
  end: string;
};

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/+$/, '');

async function postJson<T>(path: string, body: unknown): Promise<ApiResult<T>> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, status: null, errorCode: null };
  }

  let json: unknown = null;
  try {
    json = await response.json();
  } catch {
    json = null;
  }

  if (response.ok && json !== null && typeof json === 'object') {
    return { ok: true, data: json as T };
  }

  const errorCode =
    json !== null &&
    typeof json === 'object' &&
    'errorCode' in json &&
    typeof json.errorCode === 'string'
      ? json.errorCode
      : null;

  return { ok: false, status: response.status, errorCode };
}

export function verifyEmail(email: string) {
  return postJson<VerifyResponse>('/promo-codes/web/verify', { email: email.trim() });
}

export function redeemCode(email: string, code: string) {
  return postJson<RedeemResponse>('/promo-codes/web/redeem', {
    email: email.trim(),
    code,
  });
}
