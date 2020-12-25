import { validationResult } from 'express-validator';

export default (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    console.log('error emptyyyyyyyyyyy', errors);
    return next();
  }
  console.log('erroooooooooooooooooooors', errors);
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    message: 'validation failed',
    errors: extractedErrors,
  });
};
