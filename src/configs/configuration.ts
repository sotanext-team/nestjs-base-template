import { authRbacDomainDefaults, bscApiUrlDefaults } from './config-defaults';

const configuration = {
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
    encryptSecretKey: process.env.ENCRYPT_SECRET_KEY || 'development',
    appEnv: process.env.APP_ENV,
    authRbacDomain: process.env.AUTH_RBAC_DOMAIN || authRbacDomainDefaults(),
    authRbacUserRole: process.env.AUTH_RBAC_USER_ROLE || 'admin',
  },
  blockchain: {
    masterWallet: {
      publicKey: process.env.MASTER_WALLET_PUBLIC_KEY,
      privateKey: process.env.MASTER_WALLET_PRIVATE_KEY,
    },
    noBlockConfirmation: parseInt(process.env.NO_BLOCK_CONFIRMATION) || 8,
    operatingWallet: {
      minNumberFreeWallet: parseInt(process.env.MIN_NUM_OW_FREE) || 3,
      minNumberActiveWallet: parseInt(process.env.MIN_NUM_OW_ACTIVE) || 5,
      minNumberInactiveWallet: parseInt(process.env.MIN_NUM_OW_INACTIVE) || 5,
    },
    transactionTimeout: parseInt(process.env.TRANSACTION_TIMEOUT) || 18 * 1000, // milliseconds
  },
  cronjob: {
    defaultTimeout: parseInt(process.env.CRONJOB_DEFAULT_TIMEOUT) || 30 * 1000, // 30 secs
    serviceFeeTimeout:
      parseInt(process.env.CRONJOB_SERVICE_FEE_TIMEOUT) || 3 * 1000, // 3 secs
    sendMailInterval:
      parseInt(process.env.CRONJOB_SEND_MAIL_INTERVAL) || 15 * 60 * 1000, // 15 mins
  },
  grpc: {
    host: process.env.GRPC_HOST || '0.0.0.0',
    port: process.env.GRPC_PORT || '50051',
    urls: {
      auth: process.env.GRPC_AUTH_URL,
      eventConsumer: process.env.GRPC_EVENT_CONSUMER_URL,
    },
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL,
  },
  bscscan: {
    apiUrl: process.env.BSCSCAN_API_URL || bscApiUrlDefaults(),
    apiKey: process.env.BSCSCAN_API_KEY,
  },
};
export default configuration;
