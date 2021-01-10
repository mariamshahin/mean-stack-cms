import { required, checkId, checkFile } from '../../utils/validation';

export const createPostValidator = [required('title'), required('content')];

export const updatePostValidator = [checkId('id'), ...createPostValidator];
