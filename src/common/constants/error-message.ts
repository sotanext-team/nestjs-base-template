/* eslint-disable @typescript-eslint/naming-convention */
export const UNKNOWN_ERR_CODE = 'APPLICATION.INTERNAL_SERVER_ERROR';
export const VALIDATION_ERR_CODE = 'APPLICATION.VALIDATION_ERROR';
export const UNKNOWN_ERR_DESC = 'Something went wrong. Internal server error.';

export const CustomErrorMessage = {
  'APPLICATION.INTERNAL_SERVER_ERROR': {
    messageCode: UNKNOWN_ERR_CODE,
    description: UNKNOWN_ERR_DESC,
  },
  // Module users
  'USER.USER_NOT_FOUND': {
    messageCode: 'USER.USER_NOT_FOUND',
    description: 'User not found',
  },
};
