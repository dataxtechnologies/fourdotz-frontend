export interface SidebarItem {
  label: string;
  icon: string;
  route: string;         // always a direct route
  allowedRole: string;   // required for role-based access
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: 'fa-regular fa-house',
    route: '/Superadmin/Dashboard',
    allowedRole: 'superadmin'
  },
  {
    label: 'Association',
    icon: 'fa-solid fa-plus',
    route: '/Superadmin/Association-list',
    allowedRole: 'superadmin'
  },
  
  {
    label: 'Todo-Lists',
    icon: 'fa-solid fa-list-check',
    route: '/todo',
    allowedRole: 'user'
  },
  {
    label: 'Calendar',
    icon: 'fa-regular fa-calendar',
    route: '/calendar',
    allowedRole: 'association'
  },
  {
    label: 'Profile',
    icon: 'fa-regular fa-user',
    route: '/profile',
    allowedRole: 'user'
  }
];
