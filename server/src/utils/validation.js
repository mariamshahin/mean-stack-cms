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

export const emailExist = (val) =>
  body(val)
    .isEmail()
    .withMessage('Invalid email address')
    .bail()
    .custom((value) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject('Email address already exists!');
        }
      });
    })
    .normalizeEmail();

export const requiredEmail = (val) =>
  body(val).isEmail().withMessage('Invalid email address').normalizeEmail();

export const requiredPassword = (val) =>
  body(val)
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password should be minimum 6 characters');

export const confirmPassword = (val, val1) =>
  body(val).custom((value, { req }) => {
    if (value !== req.body[val1]) throw new Error('Passwords must match');
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
    if (!req.file) throw new Error(`${val} is required`);
    return true;
  });
