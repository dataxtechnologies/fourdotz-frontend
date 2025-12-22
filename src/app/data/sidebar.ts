export interface SidebarItem {
  label: string;
  icon: string;
  route?: string;
  allowedRole: string;
  children?: SidebarItem[]; // 👈 add submenu support
  open?: boolean; // 👈 Add this line
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: '/assets/icons/SA-home.svg',
    route: '/Superadmin/Dashboard',
    allowedRole: 'superadmin',
    //activeicon: ''
  },
  {
    label: 'Association',
    icon: '/assets/icons/SA-Association.svg',
    route: '/Superadmin/Association-list',
    allowedRole: 'superadmin',
    //activeicon: ''
  },

  {
    label: 'Dashboard',
    icon: '/assets/icons/grids1.svg',
    route: '/Association/Dashboard',
    allowedRole: 'association',
    //activeicon: ''
  },
  {
    label: 'Properties',
    icon: '/assets/icons/house.svg',
    route: '/Association/properties-list',
    allowedRole: 'association',
    //activeicon: ''
  },
  {
    label: 'Residents',
    icon: '/assets/icons/ai-users.svg',
    route: '/Association/residents-list',
    allowedRole: 'association',
    //activeicon: ''
  },
  {
    label: 'Maintenance',
    icon: '/assets/icons/money-recive.svg',
    route: '/Association/Maintenance-list',
    allowedRole: 'association',
    //activeicon: ''
  },
  {
    label: 'Announcement',
    icon: '/assets/icons/chart-3.svg',
    route: '/Association/announcement',
    allowedRole: 'association',
    //activeicon: ''
  },

  {
    label: 'Manage Helpers',
    icon: '/assets/icons/manage-users1.svg',
    route: '/Association/request-management/list',
    allowedRole: 'association',
    children: [
      {
        label: 'Gate Keeper',
        icon: '/assets/icons/security.svg',
        route: '/Association/manage-helpers/gate-keeper',
        allowedRole: 'association',
      },
      // {
      //   label: 'Service Admin List',
      //   icon: '/assets/icons/ai-users.svg',
      //   route: '/Association/service-admin/list',
      //   allowedRole: 'association',
      // },
    ],
    //activeicon: ''
  },

  {
    label: 'Manage Request',
    icon: '/assets/icons/request-manage2.svg',
    route: '/Association/request-management/list',
    allowedRole: 'association',
    children: [
      {
        label: 'Request List',
        icon: '/assets/icons/request-manage2.svg',
        route: '/Association/request-management/list',
        allowedRole: 'association',
      },
      {
        label: 'Service Admin List',
        icon: '/assets/icons/ai-users1.svg',
        route: '/Association/service-admin/list',
        allowedRole: 'association',
      },
    ],
    //activeicon: ''
  },

  {
    label: 'Manage Visitors',
    icon: '/assets/icons/manage.svg',
    route: '/visitors-management/visitors-list',
    allowedRole: 'association',
    children: [
      {
        label: 'Manage QR',
        icon: '/assets/icons/qr-code.svg',
        route: '/visitors-management/qr-manager',
        allowedRole: 'association',
      },
      {
        label: 'QR Visitors List',
        icon: '/assets/icons/qr-scan.svg',
        route: '/visitors-management/qr-visitors-list',
        allowedRole: 'association',
      },
      {
        label: 'Spot Visitors List',
        icon: '/assets/icons/visitor.svg',
        route: '/visitors-management/spot-visitors-list',
        allowedRole: 'association',
      },
      {
        label: 'Pre-Visitors List',
        icon: '/assets/icons/pre-visitor.svg',
        route: '/visitors-management/pre-visitors-list',
        allowedRole: 'association',
      },
    ],
    //activeicon: ''
  },
  {
    label: 'Dashboard',
    icon: '/assets/icons/grids1.svg',
    route: '/Owner/Dashboard',
    allowedRole: 'owner',
    //activeicon: '/assets/icons/Dashboard-outline.svg',
  },
  {
    label: 'Property',
    icon: '/assets/icons/house.svg',
    route: '/Owner/properties-list',
    allowedRole: 'owner',
    //activeicon: ''
  },
  {
    label: 'Tenants',
    icon: '/assets/icons/user-tag.svg',
    route: '/Owner/tenants-list',
    allowedRole: 'owner',
    //activeicon: ''
  },
  {
    label: 'Maintenance',
    icon: '/assets/icons/money-recive.svg',
    route: '/Owner/Maintenance-list',
    allowedRole: 'owner',
    //activeicon: ''
  },
  {
    label: 'Rental Invoice',
    icon: '/assets/icons/receipt-text.svg',
    route: '/Owner/Rental-invoice-list',
    allowedRole: 'owner',
    //activeicon: ''
  },
  {
    label: 'Announcement',
    icon: '/assets/icons/chart-3.svg',
    route: '/Owner/announcement/owner',
    allowedRole: 'owner',
    //activeicon: ''
  },
  {
    label: 'Manage Request',
    icon: '/assets/icons/request-manage2.svg',
    route: '/Owner/request-management/list',
    allowedRole: 'owner',
    //activeicon: ''
  },
  {
    label: 'Dashboard',
    icon: '/assets/icons/grids1.svg',
    route: '/Tenant/Dashboard',
    allowedRole: 'tenant',
    //activeicon: ''
  },
  {
    label: 'Rented property',
    icon: '/assets/icons/house-2.svg',
    route: '/Tenant/properties-list',
    allowedRole: 'tenant',
    //activeicon: ''
  },
  {
    label: 'Maintenance',
    icon: '/assets/icons/money-recive.svg',
    route: '/Tenant/Maintenance-list',
    allowedRole: 'tenant',
    //activeicon: ''
  },
  {
    label: 'Rental Invoice',
    icon: '/assets/icons/receipt-text.svg',
    route: '/Tenant/Rental-invoice-list',
    allowedRole: 'tenant',
    //activeicon: ''
  },
  {
    label: 'Announcement',
    icon: '/assets/icons/chart-3.svg',
    route: '/Tenant/announcement/tenant',
    allowedRole: 'tenant',
    //activeicon: ''
  },

  {
    label: 'Manage Request',
    icon: '/assets/icons/request-manage2.svg',
    route: '/Tenant/request-management/list',
    allowedRole: 'tenant',
    //activeicon: ''
  },

  {
    label: 'Manage Request',
    icon: '/assets/icons/request-manage2.svg',
    route: '/Association/request-management/list',
    allowedRole: 'service_admin',
    //activeicon: ''
  },

  {
    label: 'Manage Visitors',
    icon: '/assets/icons/personalcard.svg',
    route: '/',
    allowedRole: 'gate_keeper',
    children: [
      {
        label: 'Visitors List',
        icon: '/assets/icons/visitor.svg',
        route: '/Gate-keeper/visitors-management/visitors-list',
        allowedRole: 'gate_keeper',
      },
      {
        label: 'Pre-visitors List',
        icon: '/assets/icons/pre-visitor.svg',
        route: '/Gate-keeper/visitors-management/pre-visitors-list',
        allowedRole: 'gate_keeper',
      },
    ],
    //activeicon: ''
  },
];
