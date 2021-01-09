import {
  required,
  optionalString,
  registerEmail,
  requiredPassword,
  confirmPassword,
  requiredEmail,
  checkFile,
} from '../../utils/validation';

export const registerValidator = [
  required('username'),
  registerEmail('email'),
  requiredPassword('password'),
  confirmPassword('confirm_password'),
];

export const loginValidator = [
  requiredEmail('email'),
  requiredPassword('password'),
];

export const profileValidator = [
  required('username'),
  requiredEmail('email'),
  optionalString('full_name'),
  optionalString('summary'),
];

export const imageValidator = [checkFile('image')];
