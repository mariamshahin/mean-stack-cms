import { body } from 'express-validator';
import {
  required,
  optionalString,
  registerEmail,
  requiredPassword,
  confirmPassword,
  loginEmail,
} from '../../services/ValidationService';

export const registerValidator = [
  required('username'),
  registerEmail('email'),
  requiredPassword('password'),
  confirmPassword('confirm_password'),
  optionalString('first_name'),
  optionalString('last_name'),
  optionalString('summary'),
];

export const loginValidator = [
  loginEmail('email'),
  requiredPassword('password'),
];
