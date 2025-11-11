export interface SidebarItem {
  label: string;
  icon: string;
  
  route: string;         // always a direct route
  allowedRole: string;   // required for role-based access
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: '/assets/icons/SA-home.svg',
    route: '/Superadmin/Dashboard',
    allowedRole: 'superadmin'
  },
  {
    label: 'Association',
    icon: '/assets/icons/SA-Association.svg',
    route: '/Superadmin/Association-list',
    allowedRole: 'superadmin'
  },
  
  {
    label: 'Dashboard',
    icon: '/assets/icons/grids1.svg',
    route: '/Association/Dashboard',
    allowedRole: 'association'
  },
  {
    label: 'Properties',
    icon: '/assets/icons/house.svg',
    route: '/Association/properties-list',
    allowedRole: 'association'
  },
  {
    label: 'Residents',
    icon: '/assets/icons/ai-users.svg',
    route: '/Association/residents-list',
    allowedRole: 'association'
  }, 
  {
    label: 'Maintenance',
    icon: '/assets/icons/money-recive.svg',
    route: '/Association/Maintenance-list',
    allowedRole: 'association'
  },
  {
    label: 'Announcement',
    icon: '/assets/icons/Announcement.svg',
    route: '/Association/announcement',
    allowedRole: 'association'
  },
  {
    label: 'Dashboard',
    icon: '/assets/icons/grids1.svg',
    route: '/Owner/Dashboard',
    allowedRole: 'owner'
  },
  {
    label: 'Property',
    icon: '/assets/icons/house.svg',
    route: '/Owner/properties-list',
    allowedRole: 'owner'
  },
  {
    label: 'Tenants',
    icon: '/assets/icons/user-tag.svg',
    route: '/Owner/tenants-list',
    allowedRole: 'owner'
  },
  {
    label: 'Maintenance',
    icon: '/assets/icons/money-recive.svg',
    route: '/Owner/Maintenance-list',
    allowedRole: 'owner'
  },
  {
    label: 'Rental Invoice',
    icon: '/assets/icons/receipt-text.svg',
    route: '/Owner/Rental-invoice-list',
    allowedRole: 'owner'
  },
  {
    label: 'Announcement',
    icon: '/assets/icons/Announcement.svg',
    route: '/Owner/announcement/owner',
    allowedRole: 'owner'
  },
  {
    label: 'Dashboard',
    icon: '/assets/icons/grids1.svg',
    route: '/Tenant/Dashboard',
    allowedRole: 'tenant'
  },
  {
    label: 'Rented property',
    icon: '/assets/icons/house-2.svg',
    route: '/Tenant/properties-list',
    allowedRole: 'tenant'
  },
  {
    label: 'Maintenance',
    icon: '/assets/icons/money-recive.svg',
    route: '/Tenant/Maintenance-list',
    allowedRole: 'tenant'
  },
  {
    label: 'Rental Invoice',
    icon: '/assets/icons/receipt-text.svg',
    route: '/Tenant/Rental-invoice-list',
    allowedRole: 'tenant'
  },
  {
    label: 'Announcement',
    icon: '/assets/icons/Announcement.svg',
    route: '/Tenant/announcement/tenant',
    allowedRole: 'tenant'
  },
];
