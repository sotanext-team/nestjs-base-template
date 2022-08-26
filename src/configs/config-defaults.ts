import {
  isDevEnv,
  isProdEnv,
  isSandboxEnv,
  isStagingEnv,
} from '@/configs/env.config';

export const bscApiUrlDefaults = () => {
  if (isProdEnv()) {
    return 'https://api.bscscan.com';
  } else {
    // Testnet
    return 'https://api-testnet.bscscan.com';
  }
};

export const authRbacDomainDefaults = () => {
  if (isProdEnv()) {
    return 'fizenpay-production';
  } else if (isSandboxEnv()) {
    return 'fizenpay-sandbox';
  } else if (isStagingEnv()) {
    return 'fizenpay-staging';
  } else if (isDevEnv()) {
    return 'fizenpay-dev';
  } else {
    // Local env
    return 'fizenpay-local';
  }
};
