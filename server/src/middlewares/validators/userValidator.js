import { oneOf, checkId } from '../../utils/validation';
import { roles } from '../../utils/constants';

export const changeRoleValidator = [
  oneOf('role', [
    roles.ADMIN,
    roles.EDITOR,
    roles.AUTHOR,
    roles.CONTRIBUTER,
    roles.SUBSCRIBER,
  ]),
  checkId('id'),
];
