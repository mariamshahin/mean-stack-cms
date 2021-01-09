import { check, body } from 'express-validator';

import User from '../models/user';

export const required = (val) => body(val).trim().not().isEmpty();

export const optionalString = (val) =>
  body(val).if(body(val).not().isEmpty()).isString().trim();

export const minMaxLength = (val, min, max) =>
  body(val)
    .trim()
    .isLength({ min })
    .withMessage(`Characters should be minimum ${min}`)
    .bail()
    .isLength({ min, max })
    .withMessage(`Characters should be maximum ${max}`);

export const registerEmail = (val) =>
  body(val)
    .isEmail()
    .bail()
    .custom((value) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject('email address already exists!');
        }
      });
    })
    .normalizeEmail();

export const requiredEmail = (val) => body(val).isEmail().normalizeEmail();

export const requiredPassword = (val) => body(val).trim().isLength({ min: 6 });

export const confirmPassword = (val) =>
  body(val).custom((value, { req }) => {
    if (value !== req.body.password) throw new Error('Invalid value');
    return value;
  });

export const oneOf = (val, arr) =>
  body(val).trim().not().isEmpty().bail().isIn(arr);

export const checkId = (val) =>
  check(val).custom((value) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) throw new Error('Invalid id');
    return value;
  });

export const checkFile = (val) =>
  check(val).custom((value, { req }) => {
    if (!req.file) throw new Error('Invalid file');
    return true;
  });
