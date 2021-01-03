import { required, checkId } from '../../utils/validation';

export const createPostValidator = [required('title'), required('content')];

export const updatePostValidator = [
  checkId('id'),
  required('title'),
  required('content'),
];
