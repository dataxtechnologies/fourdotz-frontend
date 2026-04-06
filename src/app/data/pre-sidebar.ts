export interface PreSidebarItem {
  label: string;
  icon: string;
  route?: string;
  allowedRole: string;
  children?: PreSidebarItem[];
  open?: boolean;
  keywords?: string[];
}

export const PRE_SIDEBAR_ITEMS: PreSidebarItem[] = [
//  
  {
    label: 'Dashboard',
    icon: '/assets/icons/sidebar/Dashboard.png',
    route: '/pre-approval/resident/dashboard',
    allowedRole: 'owner',
    keywords: ['owner', 'dashboard', 'overview', 'stats', 'analytics', 'summary', 'home', 'admin', 'panel', 'metrics', 'report'],
    //activeicon: ''
  },
  {
    label: 'Market Place',
    icon: '/assets/icons/sidebar/market-place.png',
    route: '/pre-approval/resident/market-place',
    allowedRole: 'owner',
    keywords: ['marketplace', 'rent', 'rental', 'apartment', 'property', 'listing', 'search', 'find', 'view', 'details', 'info', 'data',
      'page', 'screen', 'module', 'section', 'panel'],
    //activeicon: ''
  },
  {
    label: 'Dashboard',
    icon: '/assets/icons/sidebar/Dashboard.png',
    route: '/pre-approval/resident/dashboard',
    allowedRole: 'tenant',
    keywords: ['owner', 'dashboard', 'overview', 'stats', 'analytics', 'summary', 'home', 'admin', 'panel', 'metrics', 'report'],
    //activeicon: ''
  },
  {
    label: 'Market Place',
    icon: '/assets/icons/sidebar/market-place.png',
    route: '/pre-approval/resident/market-place',
    allowedRole: 'tenant',
    keywords: ['marketplace', 'rent', 'rental', 'apartment', 'property', 'listing', 'search', 'find', 'view', 'details', 'info', 'data',
      'page', 'screen', 'module', 'section', 'panel'],
    //activeicon: ''
  },
  {
    label: 'Dashboard',
    icon: '/assets/icons/sidebar/Dashboard.png',
    route: '/pre-approval/resident/dashboard',
    allowedRole: 'association',
    keywords: ['owner', 'dashboard', 'overview', 'stats', 'analytics', 'summary', 'home', 'admin', 'panel', 'metrics', 'report'],
    //activeicon: ''
  },
  {
    label: 'Market Place',
    icon: '/assets/icons/sidebar/market-place.png',
    route: '/pre-approval/resident/market-place',
    allowedRole: 'association',
    keywords: ['marketplace', 'rent', 'rental', 'apartment', 'property', 'listing', 'search', 'find', 'view', 'details', 'info', 'data',
      'page', 'screen', 'module', 'section', 'panel'],
    //activeicon: ''
  },

 
];
