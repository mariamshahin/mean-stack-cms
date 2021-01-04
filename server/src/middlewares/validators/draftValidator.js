import { optionalString, minLength, checkId } from '../../utils/validation';

export const createDraftValidator = [
  optionalString('title'),
  minLength('content', 5),
];

export const updateDraftValidator = [
  checkId('id'),
  optionalString('title'),
  minLength('content'),
];
