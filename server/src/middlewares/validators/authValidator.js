import {
  required,
  optionalString,
  emailExist,
  requiredPassword,
  confirmPassword,
  requiredEmail,
  checkFile,
} from '../../utils/validation';

export const registerValidator = [
  required('username'),
  emailExist('email'),
  requiredPassword('password'),
  confirmPassword('confirm_password', 'password'),
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

export const passwordValidator = [
  requiredPassword('old_password'),
  requiredPassword('new_password'),
  confirmPassword('confirm_new_password', 'new_password'),
];

export const imageValidator = [checkFile('image')];
