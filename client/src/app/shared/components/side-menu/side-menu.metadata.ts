// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  badge?: string;
  badgeClass?: string;
  isExternalLink: boolean;
  roles?: string[];
  submenu: RouteInfo[];
  isExact?: boolean;
}
