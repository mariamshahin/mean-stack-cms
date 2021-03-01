import { RouteInfo } from './side-menu.metadata';
import { Role } from '../../models/data.model';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Users',
    icon: 'ft-users',
    class: 'dropdown nav-item has-sub',
    isExternalLink: false,
    roles: [Role.admin],
    submenu: [
      {
        path: '/admin/users',
        title: 'View Users',
        icon: 'ft-arrow-right submenu-icon',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Posts',
    icon: 'ft-edit',
    class: 'dropdown nav-item has-sub',
    isExternalLink: false,
    roles: [Role.admin, Role.editor, Role.author],
    submenu: [
      {
        path: '/admin/posts',
        title: 'View Posts',
        icon: 'ft-arrow-right submenu-icon',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
      },
      {
        path: '/admin/create-post',
        title: 'Create Post',
        icon: 'ft-arrow-right submenu-icon',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
];
