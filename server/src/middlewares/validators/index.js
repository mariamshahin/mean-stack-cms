import { checkId } from '../../utils/validation';

export const idValidator = (id = 'id') => [checkId(id)];
export { default as validationHandler } from './errorHandler';
export { registerValidator, loginValidator } from './authValidator';
export { createPostValidator } from './postValidator';
