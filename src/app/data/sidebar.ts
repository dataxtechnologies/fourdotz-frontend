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
    icon: '/assets/icons/sidebar/Dashboard.png',
    route: '/Superadmin/Dashboard',
    allowedRole: 'superadmin',
    //activeicon: ''
  },
  {
    label: 'Association',
    icon: '/assets/icons/sidebar/Association-list.png',
    route: '/Superadmin/Association-list',
    allowedRole: 'superadmin',
    //activeicon: ''
  },


  {
    label: 'Dashboard',
    icon: '/assets/icons/sidebar/Dashboard.png',
    route: '/Association/Dashboard',
    allowedRole: 'association',
    //activeicon: ''
  },
  {
    label: 'Properties',
    icon: '/assets/icons/sidebar/property.png',
    route: '/Association/properties-list',
    allowedRole: 'association',
    //activeicon: ''
  },
  {
    label: 'Residents',
    icon: '/assets/icons/sidebar/resident.png',
    route: '/Association/residents-list',
    allowedRole: 'association',
    //activeicon: ''
  },
  {
    label: 'Maintenance',
    icon: '/assets/icons/sidebar/maintenance.png',
    route: '/Association/Maintenance-list',
    allowedRole: 'association',
    //activeicon: ''
  },
  {
    label: 'Announcement',
    icon: '/assets/icons/sidebar/announcement.png',
    route: '/Association/announcement',
    allowedRole: 'association',
    //activeicon: ''
  },
  {
    label: 'Manage Agreement',
    icon: '/assets/icons/sidebar/Agreement.png',
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
    icon: '/assets/icons/sidebar/helpers.png',
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
    icon: '/assets/icons/sidebar/request.png',
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
    icon: '/assets/icons/sidebar/visitors.png',
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
    icon: '/assets/icons/sidebar/Dashboard.png',
    route: '/Owner/Dashboard',
    allowedRole: 'owner',
    //activeicon: '/assets/icons/Dashboard-outline.svg',
  },
  {
    label: 'Property',
    icon: '/assets/icons/sidebar/property.png',
    route: '/Owner/properties-list',
    allowedRole: 'owner',
    //activeicon: ''
  },
  {
    label: 'Tenants',
    icon: '/assets/icons/sidebar/tenant.png',
    route: '/Owner/tenants-list',
    allowedRole: 'owner',
    //activeicon: ''
  },
  {
    label: 'Maintenance',
    icon: '/assets/icons/sidebar/maintenance.png',
    route: '/Owner/Maintenance-list',
    allowedRole: 'owner',
    //activeicon: ''
  },
  {
    label: 'Rental Invoice',
    icon: '/assets/icons/sidebar/invoice.png',
    route: '/Owner/Rental-invoice-list',
    allowedRole: 'owner',
    //activeicon: ''
  },
  {
    label: 'Announcement',
    icon: '/assets/icons/sidebar/announcement.png',
    route: '/Owner/announcement/owner',
    allowedRole: 'owner',
    //activeicon: ''
  },
  {
    label: 'Manage Agreement',
    icon: '/assets/icons/sidebar/Agreement.png',
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
    icon: '/assets/icons/sidebar/request.png',
    route: '/Owner/request-management/list',
    allowedRole: 'owner',
    //activeicon: ''
  },
  {
    label: 'Pre-Visitor',
    icon: '/assets/icons/sidebar/visitors.png',
    route: '/Owner/pre-visitor/list',
    allowedRole: 'owner',
    //activeicon: ''
  },
  {
    label: 'Dashboard',
    icon: '/assets/icons/sidebar/Dashboard.png',
    route: '/Tenant/Dashboard',
    allowedRole: 'tenant',
    //activeicon: ''
  },
  {
    label: 'Rented property',
    icon: '/assets/icons/sidebar/property.png',
    route: '/Tenant/properties-list',
    allowedRole: 'tenant',
    //activeicon: ''
  },
  {
    label: 'Maintenance',
    icon: '/assets/icons/sidebar/maintenance.png',
    route: '/Tenant/Maintenance-list',
    allowedRole: 'tenant',
    //activeicon: ''
  },
  {
    label: 'Rental Invoice',
    icon: '/assets/icons/sidebar/invoice.png',
    route: '/Tenant/Rental-invoice-list',
    allowedRole: 'tenant',
    //activeicon: ''
  },
  {
    label: 'Announcement',
    icon: '/assets/icons/sidebar/announcement.png',
    route: '/Tenant/announcement/tenant',
    allowedRole: 'tenant',
    //activeicon: ''
  },
   {
        label: 'Sign Agreements',
        icon: '/assets/icons/sidebar/Agreement.png',
        route: '/agreement/owner/list-signing-agreement',
        allowedRole: 'tenant',
      },

  {
    label: 'Manage Request',
    icon: '/assets/icons/sidebar/request.png',
    route: '/Tenant/request-management/list',
    allowedRole: 'tenant',
    //activeicon: ''
  },
   {
    label: 'Pre-Visitor',
    icon: '/assets/icons/sidebar/visitors.png',
    route: '/Tenant/pre-visitor/list',
    allowedRole: 'tenant',
    //activeicon: ''
  },

  {
    label: 'Manage Request',
    icon: '/assets/icons/sidebar/request.png',
    route: '/Service-admin/manage-requests',
    allowedRole: 'service_admin',
    //activeicon: ''
  },
  

  {
    label: 'Manage Visitors',
    icon: '/assets/icons/sidebar/visitors.png',
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
