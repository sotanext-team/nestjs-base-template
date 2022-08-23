export const isLocalEnv = () =>
  process.env.APP_ENV === 'local' || !process.env.APP_ENV;

export const isDevEnv = () => process.env.APP_ENV === 'development';

export const isStagingEnv = () => process.env.APP_ENV === 'staging';

export const isSandboxEnv = () => process.env.APP_ENV === 'sandbox';

export const isProdEnv = () => process.env.APP_ENV === 'production';
