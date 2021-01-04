import { checkId } from '../../utils/validation';

export const idValidator = (id = 'id') => [checkId(id)];
export { default as validationHandler } from './errorHandler';
export { registerValidator, loginValidator } from './authValidator';
export { createPostValidator, updatePostValidator } from './postValidator';
export { createDraftValidator, updateDraftValidator } from './draftValidator';
