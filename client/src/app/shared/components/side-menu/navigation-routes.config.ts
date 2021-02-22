import { RouteInfo } from './side-menu.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Users',
    icon: 'ft-users',
    class: 'dropdown nav-item has-sub',
    isExternalLink: false,
    roles: ['admin'],
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
];
