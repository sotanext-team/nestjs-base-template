import crypto from 'crypto';

export const generateHmac = (secretKey: string, payload: string) => {
  return crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
};
