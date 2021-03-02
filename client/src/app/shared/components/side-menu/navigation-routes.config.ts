import { RouteInfo } from './side-menu.metadata';
import { Role } from '../../models/data.model';

export const ROUTES: RouteInfo[] = [
  {
    path: '/admin',
    title: 'Dashboard',
    icon: 'ft-home',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [],
    isExact: true,
  },
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
  {
    path: '',
    title: 'Drafts',
    icon: 'ft-archive',
    class: 'dropdown nav-item has-sub',
    isExternalLink: false,
    roles: [Role.admin, Role.editor, Role.author, Role.contributer],
    submenu: [
      {
        path: '/admin/drafts',
        title: 'View Drafts',
        icon: 'ft-arrow-right submenu-icon',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
      },
      {
        path: '/admin/create-draft',
        title: 'Create Draft',
        icon: 'ft-arrow-right submenu-icon',
        class: 'dropdown-item',
        isExternalLink: false,
        submenu: [],
      },
    ],
  },
];
