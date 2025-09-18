import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SuperadminDashboardComponent } from './pages/superadmin-pages/superadmin-dashboard/superadmin-dashboard.component';
import { AssociationListComponent } from './pages/superadmin-pages/association-list/association-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // redirectTo: 'auth/sign-in',
    redirectTo: 'Superadmin/Dashboard',
  },

  {
    path: 'Superadmin',
    component: DashboardLayoutComponent,
    children: [{ path: 'Dashboard', component: SuperadminDashboardComponent },
        { path: 'Association-list', component: AssociationListComponent }
    ],
  },
];
