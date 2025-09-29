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
    icon: 'fa-solid fa-building-user',
    route: '/Superadmin/Association-list',
    allowedRole: 'superadmin'
  },
  
  {
    label: 'Dashboard',
    icon: 'fa-regular fa-house',
    route: '/Association/Dashboard',
    allowedRole: 'association'
  },
  {
    label: 'Properties',
    icon: 'fa-solid fa-building',
    route: '/Association/properties-list',
    allowedRole: 'association'
  },
  {
    label: 'Residents',
    icon: 'fa-solid fa-house-chimney-user',
    route: '/Association/residents-list',
    allowedRole: 'association'
  }, 
  {
    label: 'Maintenance',
    icon: 'fa-solid fa-wallet',
    route: '/Association/Maintenance-list',
    allowedRole: 'association'
  },
  {
    label: 'Dashboard',
    icon: 'fa-regular fa-house',
    route: '/Owner/Dashboard',
    allowedRole: 'Owner'
  },
  {
    label: 'Property',
    icon: 'fa-solid fa-house-chimney-user',
    route: '/Owner/properties-list',
    allowedRole: 'Owner'
  },
  {
    label: 'Tenants',
    icon: 'fa-solid fa-user-group',
    route: '/Owner/tenants-list',
    allowedRole: 'Owner'
  },
  {
    label: 'Maintenance',
    icon: 'fa-solid fa-money-bills',
    route: '/Owner/Maintenance-list',
    allowedRole: 'Owner'
  },
  {
    label: 'Rental Invoice',
    icon: 'fa-solid fa-file-invoice-dollar',
    route: '/Owner/Rental-invoice-list',
    allowedRole: 'Owner'
  },
  {
    label: 'Dashboard',
    icon: 'fa-regular fa-house',
    route: '/Tenant/Dashboard',
    allowedRole: 'Tenant'
  },
  {
    label: 'Rented property',
    icon: 'fa-solid fa-house-user',
    route: '/Tenant/properties-list',
    allowedRole: 'Tenant'
  },
  {
    label: 'Maintenance',
    icon: 'fa-solid fa-money-bills',
    route: '/Tenant/Maintenance-list',
    allowedRole: 'Tenant'
  },
  {
    label: 'Rental Invoice',
    icon: 'fa-solid fa-file-invoice-dollar',
    route: '/Tenant/Rental-invoice-list',
    allowedRole: 'Tenant'
  },
];
