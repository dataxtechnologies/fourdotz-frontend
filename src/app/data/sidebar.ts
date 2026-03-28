export interface SidebarItem {
  label: string;
  icon: string;
  route?: string;
  allowedRole: string;
  children?: SidebarItem[];
  open?: boolean;
  keywords?: string[];
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: '/assets/icons/sidebar/Dashboard.png',
    route: '/Superadmin/Dashboard',
    allowedRole: 'superadmin',
    keywords: ['open', 'go', 'view', 'see', 'check', 'navigate', 'enter', 'access', 'search', 'find',
      'create', 'add', 'new', 'edit', 'update', 'manage', 'list', 'details', 'info', 'data',
      'page', 'screen', 'module', 'section', 'panel',
      'admin', 'association', 'owner', 'tenant', 'user', 'service', 'security',
      'dashboard', 'home', 'main', 'overview', 'dashboard', 'analytics', 'stats', 'report', 'summary', 'performance', 'activity']
    //activeicon: ''
  },
  {
    label: 'Association',
    icon: '/assets/icons/sidebar/Association-list.png',
    route: '/Superadmin/Association-list',
    allowedRole: 'superadmin',
    keywords: ['association', 'society', 'apartment', 'building', 'community', 'hoa',
      'tenant list', 'resident list', 'property association']
    //activeicon: ''
  },

  {
    label: 'Ad Space',
    icon: '/assets/icons/sidebar/ad-space.png',
    route: '/Superadmin/Ad-space/list',
    allowedRole: 'superadmin',
    keywords: ['ad', 'ads', 'advertisement', 'banner', 'promotion', 'marketing',
      'post ad', 'create ad', 'ad campaign']
    //activeicon: ''
  },


  {
    label: 'Dashboard',
    icon: '/assets/icons/sidebar/Dashboard.png',
    route: '/Association/Dashboard',
    allowedRole: 'association',
    keywords: ['property', 'properties', 'flat', 'unit', 'apartment', 'building', 'house', 'rooms',
      'assets', 'real estate', 'homes', 'blocks',
      'add property', 'property list', 'manage property']
    //activeicon: ''
  },
  {
    label: 'Properties',
    icon: '/assets/icons/sidebar/property.png',
    route: '/Association/properties-list',
    allowedRole: 'association',
    keywords: ['property', 'properties', 'flat', 'unit', 'apartment', 'building', 'house', 'rooms',
      'assets', 'real estate', 'homes', 'blocks',
      'add property', 'property list', 'manage property']
    //activeicon: ''
  },
  {
    label: 'Residents',
    icon: '/assets/icons/sidebar/resident.png',
    route: '/Association/residents-list',
    allowedRole: 'association',
    keywords: ['resident', 'residents', 'tenant', 'tenants', 'members', 'people', 'owners',
      'users', 'profiles', 'occupants', 'living',
      'add tenant', 'tenant list', 'resident list', 'member list']
    //activeicon: ''
  },
  {
    label: 'Maintenance',
    icon: '/assets/icons/sidebar/maintenance.png',
    route: '/Association/Maintenance-list',
    allowedRole: 'association',
    keywords: ['maintenance', 'repair', 'complaint', 'issue', 'service', 'services',
      'cleaning', 'inspection', 'support', 'ticket',
      'raise complaint', 'service request', 'maintenance request']
    //activeicon: ''
  },
  {
    label: 'Announcement',
    icon: '/assets/icons/sidebar/announcement.png',
    route: '/Association/announcement',
    allowedRole: 'association',
    keywords: ['announcement', 'news', 'updates', 'notice', 'circular', 'message', 'broadcast']
    //activeicon: ''
  },
  {
    label: 'Agreement Management',
    icon: '/assets/icons/sidebar/Agreement.png',
    route: '/Association/request-management/list',
    allowedRole: 'association',
    keywords: ['agreement', 'contract', 'lease', 'rental agreement', 'legal', 'document',
      'create agreement', 'sign agreement', 'agreement template'],
    children: [
      {
        label: 'Template Library',
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
    label: 'Helper Management',
    icon: '/assets/icons/sidebar/helpers.png',
    route: '/Association/manage-helpers/gate-keeper',
    allowedRole: 'association',
    keywords: ['helper', 'helpers', 'gate', 'gatekeeper', 'gate keeper', 'security', 'guard',
      'staff', 'worker', 'employee', 'service admin',
      'create gate', 'add gate', 'gate create', 'security create'],
    children: [
      {
        label: 'Security Staff',
        icon: '',
        route: '/Association/manage-helpers/gate-keeper',
        allowedRole: 'association',
      },
      {
        label: 'Maintenance Staff',
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
    label: 'Amenities Management',
    icon: '/assets/icons/sidebar/amenities.png',
    route: '/Association/request-management/list',
    allowedRole: 'association',
    keywords: ['amenity', 'amenities', 'facility', 'facilities', 'hall', 'gym', 'pool',
      'clubhouse', 'resources',
      'book hall', 'book amenity', 'amenity booking', 'slot booking', 'reserve'],
    children: [
      {
        label: 'Resource Directory',
        icon: '',
        route: '/Association/manage-amenities/resources',
        allowedRole: 'association',
      },
      {
        label: 'Scheduled Bookings',
        icon: '',
        route: '/Association/manage-amenities/slot-booking',
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
    label: 'Resident Complaints',
    icon: '/assets/icons/sidebar/request.png',
    route: '/Association/request-management/list',
    allowedRole: 'association',
    keywords: ['request', 'requests', 'complaint', 'tickets', 'approval',
      'pending request', 'service request'],
    children: [
      {
        label: 'Resident Requests',
        icon: '',
        route: '/Association/request-management/list',
        allowedRole: 'association',
      },

    ],
    //activeicon: ''
  },

    {
    label: 'Resident Requests',
    icon: '/assets/icons/sidebar/resident-req.png',
    route: '/Association/residents-request-list',
    allowedRole: 'association',
    keywords: ['announcement', 'resident request', 'resident requests', 'request', 'requests', 'complaint', 'tickets', 'approval',
      'pending request', 'service request'],
    //activeicon: ''
  },

  {
    label: 'Visitor Management',
    icon: '/assets/icons/sidebar/visitors.png',
    route: '/visitors-management/visitors-list',
    allowedRole: 'association',
    keywords: ['visitor', 'visitors', 'guest', 'entry', 'checkin', 'security entry',
      'visitor entry', 'qr visitor', 'pre visitor', 'spot visitor',
      'visitor create', 'add visitor'],
    children: [
      {
        label: 'QR Pass',
        icon: '',
        route: '/visitors-management/qr-manager',
        allowedRole: 'association',
      },
      {
        label: 'QR Visitor Logs',
        icon: '',
        route: '/visitors-management/qr-visitors-list',
        allowedRole: 'association',
      },
      {
        label: 'Walk-in Visitors',
        icon: '',
        route: '/visitors-management/spot-visitors-list',
        allowedRole: 'association',
      },
      {
        label: 'Pre-Approved Visitors ',
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
    keywords: ['dashboard, overview, stats, analytics, summary, home, admin, panel, metrics, report'],
    allowedRole: 'owner',
    //activeicon: '/assets/icons/Dashboard-outline.svg',
  },
  {
    label: 'Property',
    icon: '/assets/icons/sidebar/property.png',
    route: '/Owner/properties-list',
    allowedRole: 'owner',
    keywords: ['tenant', 'tenants', 'rent people', 'occupants', 'members',
      'add tenant', 'tenant list', 'manage tenant']
    //activeicon: ''
  },
  {
    label: 'Tenants',
    icon: '/assets/icons/sidebar/tenant.png',
    route: '/Owner/tenants-list',
    allowedRole: 'owner',
    keywords: ['tenant', 'tenants', 'rent people', 'occupants', 'members',
      'add tenant', 'tenant list', 'manage tenant']
    //activeicon: ''
  },
  {
    label: 'Maintenance',
    icon: '/assets/icons/sidebar/maintenance.png',
    route: '/Owner/Maintenance-list',
    allowedRole: 'owner',
    keywords: ['maintenance', 'repair', 'complaint', 'issue', 'service', 'services',
      'cleaning', 'inspection', 'support', 'ticket',
      'raise complaint', 'service request', 'maintenance request']
    //activeicon: ''
  },
  {
    label: 'Rental Invoice',
    icon: '/assets/icons/sidebar/invoice.png',
    route: '/Owner/Rental-invoice-list',
    allowedRole: 'owner',
    keywords: ['invoice', 'bill', 'payment', 'rent', 'rent payment',
      'maintenance bill', 'due', 'transaction', 'receipt', 'pay rent']
    //activeicon: ''
  },
  {
    label: 'Announcement',
    icon: '/assets/icons/sidebar/announcement.png',
    route: '/Owner/announcement/owner',
    allowedRole: 'owner',
    keywords: ['agreement', 'contract', 'lease', 'rental agreement', 'legal', 'document',
      'create agreement', 'sign agreement', 'agreement template']
    //activeicon: ''
  },
  {
    label: 'Book Amenities',
    icon: '/assets/icons/sidebar/amenities.png',
    route: '/Owner/amenities/list-book-amenities',
    allowedRole: 'owner',
    keywords: ['amenity', 'amenities', 'facility', 'facilities', 'hall', 'gym', 'pool',
      'clubhouse', 'resources',
      'book hall', 'book amenity', 'amenity booking', 'slot booking', 'reserve']
    //activeicon: ''
  },
  {
    label: 'Manage Agreement',
    icon: '/assets/icons/sidebar/Agreement.png',
    route: '/',
    allowedRole: 'owner',
    keywords: ['agreement', 'contract', 'lease', 'rental agreement', 'legal', 'document',
      'create agreement', 'sign agreement', 'agreement template'],
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
    keywords: ['request', 'requests', 'complaint', 'tickets', 'approval',
      'pending request', 'service request'],
    //activeicon: ''
  },

   

    {
    label: 'Resident Requests',
    icon: '/assets/icons/sidebar/resident-req.png',
    route: '/Owner/tenant-request-list',
    allowedRole: 'owner',
    keywords: ['announcement', 'resident request', 'resident requests', 'request', 'requests', 'complaint', 'tickets', 'approval',
      'pending request', 'service request'],
    //activeicon: ''
  },
  // {
  //   label: 'Pre-Visitor',
  //   icon: '/assets/icons/sidebar/visitors.png',
  //   route: '/Owner/pre-visitor/list',
  //   allowedRole: 'owner',
  //   keywords:['visitor, visitors, dashboard, overview, stats, analytics, summary, home, admin, panel, metrics, report'],
  //   //activeicon: ''
  // },

  {
    label: 'Manage Visitors',
    icon: '/assets/icons/sidebar/visitors.png',
    route: '/',
    allowedRole: 'owner',
    keywords: ['visitor', 'visitors', 'guest', 'entry', 'checkin', 'security entry',
      'visitor entry', 'qr visitor', 'pre visitor', 'spot visitor',
      'visitor create', 'add visitor'],
    children: [
      {
        label: 'Pre-Visitors List',
        icon: '',
        route: '/Owner/pre-visitor/list',
        allowedRole: 'owner',
      },
      {
        label: 'QR-visitors List',
        icon: '',
        route: '/Owner/qr-visitor/list',
        allowedRole: 'owner',
      },
      {
        label: 'spot-visitors List',
        icon: '',
        route: '/Owner/spot-visitor/list',
        allowedRole: 'owner',
      },
    ],
    //activeicon: ''
  },
  {
    label: 'Dashboard',
    icon: '/assets/icons/sidebar/Dashboard.png',
    route: '/Tenant/Dashboard',
    allowedRole: 'tenant',
    keywords: ['dashboard, overview, stats, analytics, summary, home, admin, panel, metrics, report'],
    //activeicon: ''
  },
  {
    label: 'Rented property',
    icon: '/assets/icons/sidebar/property.png',
    route: '/Tenant/properties-list',
    allowedRole: 'tenant',
    keywords: ['rented property', 'my house', 'my flat', 'my unit', 'stay']
    //activeicon: ''
  },
  {
    label: 'Maintenance',
    icon: '/assets/icons/sidebar/maintenance.png',
    route: '/Tenant/Maintenance-list',
    allowedRole: 'tenant',
    keywords: ['maintenance', 'repair', 'complaint', 'issue', 'service', 'services',
      'cleaning', 'inspection', 'support', 'ticket',
      'raise complaint', 'service request', 'maintenance request']
    //activeicon: ''
  },
  {
    label: 'Rental Invoice',
    icon: '/assets/icons/sidebar/invoice.png',
    route: '/Tenant/Rental-invoice-list',
    allowedRole: 'tenant',
    keywords: ['pay rent', 'rent payment', 'invoice', 'bill', 'payment', 'dues']
    //activeicon: ''
  },
  {
    label: 'Announcement',
    icon: '/assets/icons/sidebar/announcement.png',
    route: '/Tenant/announcement/tenant',
    allowedRole: 'tenant',
    keywords: ['announcement', 'news', 'updates', 'notice', 'circular', 'message', 'broadcast']
    //activeicon: ''
  },
  {
    label: 'Book Amenities',
    icon: '/assets/icons/sidebar/amenities.png',
    route: '/Owner/amenities/list-book-amenities',
    allowedRole: 'tenant',
    keywords: ['amenity', 'amenities', 'facility', 'facilities', 'hall', 'gym', 'pool',
      'clubhouse', 'resources',
      'book hall', 'book amenity', 'amenity booking', 'slot booking', 'reserve']
    //activeicon: ''
  },
  {
    label: 'Sign Agreements',
    icon: '/assets/icons/sidebar/Agreement.png',
    route: '/agreement/owner/list-signing-agreement',
    allowedRole: 'tenant',
    keywords: ['agreement', 'contract', 'lease', 'rental agreement', 'legal', 'document',
      'create agreement', 'sign agreement', 'agreement template'],
  },

  {
    label: 'Manage Request',
    icon: '/assets/icons/sidebar/request.png',
    route: '/Tenant/request-management/list',
    allowedRole: 'tenant',
    keywords: ['request', 'requests', 'complaint', 'tickets', 'approval',
      'pending request', 'service request'],
    //activeicon: ''
  },
  // {
  //   label: 'Pre-Visitor',
  //   icon: '/assets/icons/sidebar/visitors.png',
  //   route: '/Tenant/pre-visitor/list',
  //   allowedRole: 'tenant',
  //   keywords: ['visitor', 'visitors', 'guest', 'entry', 'checkin', 'security entry',
  //     'visitor entry', 'qr visitor', 'pre visitor', 'spot visitor',
  //     'visitor create', 'add visitor'],
  //   //activeicon: ''
  // },

  {
    label: 'Manage Visitors',
    icon: '/assets/icons/sidebar/visitors.png',
    route: '/',
    allowedRole: 'tenant',
    keywords: ['visitor', 'visitors', 'guest', 'entry', 'checkin', 'security entry',
      'visitor entry', 'qr visitor', 'pre visitor', 'spot visitor',
      'visitor create', 'add visitor'],
    children: [
      {
        label: 'Pre-Visitors List',
        icon: '',
        route: '/Owner/pre-visitor/list',
        allowedRole: 'tenant',
      },
      {
        label: 'QR-visitors List',
        icon: '',
        route: '/Owner/qr-visitor/list',
        allowedRole: 'tenant',
      },
      {
        label: 'spot-visitors List',
        icon: '',
        route: '/Owner/spot-visitor/list',
        allowedRole: 'tenant',
      },
    ],
    //activeicon: ''
  },

  {
    label: 'Manage Request',
    icon: '/assets/icons/sidebar/request.png',
    route: '/Service-admin/manage-requests',
    allowedRole: 'service_admin',
    keywords: ['service', 'service request', 'manage service', 'tickets', 'complaints'],
    //activeicon: ''
  },


  {
    label: 'Manage Visitors',
    icon: '/assets/icons/sidebar/visitors.png',
    route: '/',
    allowedRole: 'gate_keeper',
    keywords: ['visitor entry', 'gate entry', 'security entry',
      'check visitor', 'guest entry',
      'qr visitor', 'pre visitor', 'spot visitor'],
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

  // {
  //   label: 'Smart Entry',
  //   icon: '/assets/icons/sidebar/smart-entry.png',
  //   route: '/Gate-keeper/smart-entry/list',
  //   allowedRole: 'gate_keeper',
  //   keywords: ['visitor entry', 'gate entry', 'security entry',  'check in', 'check out', 'check visitor', 'guest entry',
  //     'check visitor', 'guest entry',
  //     'qr visitor', 'pre visitor', 'spot visitor', 'qr', 'qr code', 'scan', 'scanner', 'security qr', 'entry qr'],
  //   //activeicon: ''
  // },
  {
    label: 'QR',
    icon: '/assets/icons/sidebar/qr-code.png',
    route: '/Gate-keeper/QR/view-qr',
    allowedRole: 'gate_keeper',
    keywords: ['visitor entry', 'gate entry', 'security entry',
      'check visitor', 'guest entry',
      'qr visitor', 'pre visitor', 'spot visitor', 'qr', 'qr code', 'scan', 'scanner', 'security qr', 'entry qr'],
    //activeicon: ''
  },
];
