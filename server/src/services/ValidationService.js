import { body } from 'express-validator';

import User from '../models/user';

export const required = (val) => body(val).trim().not().isEmpty();

export const optionalString = (val) =>
  body(val).if(body(val).not().isEmpty()).isString().trim();

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

export const loginEmail = (val) => body(val).isEmail().normalizeEmail();

export const requiredPassword = (val) => body(val).trim().isLength({ min: 6 });

export const confirmPassword = (val) =>
  body(val).custom((value, { req, loc, path }) => {
    if (value !== req.body.password) {
      throw new Error('Invalid value');
    } else {
      return value;
    }
  });
