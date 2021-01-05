import {
  required,
  requiredEmail,
  minMaxLength,
  checkId,
} from '../../utils/validation';

export const createCommentValidator = [
  required('name'),
  requiredEmail('email'),
  minMaxLength('comment', 5, 150),
  checkId('post_id'),
];
