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
    label: 'Manage Agreement',
    icon: '/assets/icons/agreement.svg',
    route: '/Association/request-management/list',
    allowedRole: 'association',
    children: [
      {
        label: 'Templates',
        icon: '',
        route: '/agreement/association/list-template',
        allowedRole: 'association',
      },
      {
        label: 'Agreements',
        icon: '',
        route: '/agreement/association/list-agreement',
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
  // {
  //   label: ' Template',
  //   icon: '/assets/icons/.svg',
  //   route: '/agreement/association/list-template',
  //   allowedRole: 'association',
  //   //activeicon: ''
  // },

  {
    label: 'Manage Helpers',
    icon: '/assets/icons/manage-users1.svg',
    route: '/Association/request-management/list',
    allowedRole: 'association',
    children: [
      {
        label: 'Gate Keeper',
        icon: '',
        route: '/Association/manage-helpers/gate-keeper',
        allowedRole: 'association',
      },
      {
        label: 'Service Admin',
        icon: '',
        route: '/Association/service-admin/list',
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
        icon: '',
        route: '/Association/request-management/list',
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
        icon: '',
        route: '/visitors-management/qr-manager',
        allowedRole: 'association',
      },
      {
        label: 'QR Visitors List',
        icon: '',
        route: '/visitors-management/qr-visitors-list',
        allowedRole: 'association',
      },
      {
        label: 'Spot Visitors List',
        icon: '',
        route: '/visitors-management/spot-visitors-list',
        allowedRole: 'association',
      },
      {
        label: 'Pre-Visitors List',
        icon: '',
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
    label: 'Manage Agreement',
    icon: '/assets/icons/agreement.svg',
    route: '/',
    allowedRole: 'owner',
    children: [
      {
        label: 'Create Agreement',
        icon: '',
        route: '/agreement/owner/list-created-agreement',
        allowedRole: 'association',
      },
      {
        label: 'Sign Agreements',
        icon: '',
        route: '/agreement/owner/list-signing-agreement',
        allowedRole: 'owner',
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
    route: '/Owner/request-management/list',
    allowedRole: 'owner',
    //activeicon: ''
  },
  {
    label: 'Pre-Visitor',
    icon: '/assets/icons/pre-visitor.svg',
    route: '/Owner/pre-visitor/list',
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
        label: 'Sign Agreements',
        icon: '/assets/icons/agreement.svg',
        route: '/agreement/owner/list-signing-agreement',
        allowedRole: 'tenant',
      },

  {
    label: 'Manage Request',
    icon: '/assets/icons/request-manage2.svg',
    route: '/Tenant/request-management/list',
    allowedRole: 'tenant',
    //activeicon: ''
  },
   {
    label: 'Pre-Visitor',
    icon: '/assets/icons/pre-visitor.svg',
    route: '/Tenant/pre-visitor/list',
    allowedRole: 'tenant',
    //activeicon: ''
  },

  {
    label: 'Manage Request',
    icon: '/assets/icons/request-manage2.svg',
    route: '/Service-admin/manage-requests',
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
        icon: '',
        route: '/Gate-keeper/visitors-management/visitors-list',
        allowedRole: 'gate_keeper',
      },
      {
        label: 'Pre-visitors List',
        icon: '',
        route: '/Gate-keeper/visitors-management/pre-visitors-list',
        allowedRole: 'gate_keeper',
      },
      {
        label: 'QR-visitors List',
        icon: '',
        route: '/Gate-keeper/visitors-management/qr-visitors-list',
        allowedRole: 'gate_keeper',
      },
    ],
    //activeicon: ''
  },
];
