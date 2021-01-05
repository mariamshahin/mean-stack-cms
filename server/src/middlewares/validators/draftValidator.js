import { optionalString, minMaxLength, checkId } from '../../utils/validation';

export const createDraftValidator = [
  optionalString('title'),
  minMaxLength('content', 5),
];

export const updateDraftValidator = [checkId('id'), ...createDraftValidator];
