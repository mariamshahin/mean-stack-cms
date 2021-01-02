import { required, checkId } from '../../utils/validation';

export const createPostValidator = [
  required('title'),
  required('content'),
  checkId('user_id'),
];

export const updatePostValidator = [
  checkId('id'),
  required('title'),
  required('content'),
  checkId('user_id'),
];
