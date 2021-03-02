import { required, checkId, checkFile } from '../../utils/validation';

export const createPostValidator = [
  // checkFile('image'),
  required('title'),
  required('content'),
];

export const updatePostValidator = [...createPostValidator, checkId('id')];
