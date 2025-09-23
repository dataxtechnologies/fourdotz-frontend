import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SuperadminDashboardComponent } from './pages/superadmin-pages/superadmin-dashboard/superadmin-dashboard.component';
import { AssociationListComponent } from './pages/superadmin-pages/association-list/association-list.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SigninPageComponent } from './pages/auth/signin-page/signin-page.component';
import { ViewAssociationComponent } from './pages/superadmin-pages/view-association/view-association.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/sign-in',
    // redirectTo: 'Superadmin/Dashboard',
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [{ path: 'sign-in', component: SigninPageComponent }],
  },

  {
    path: 'Superadmin',
    component: DashboardLayoutComponent,
    children: [
      { path: 'Dashboard', component: SuperadminDashboardComponent },
      { path: 'Association-list', component: AssociationListComponent },
      {
        path: 'view-association/:associationId',
        component: ViewAssociationComponent,
      },
    ],
  },
];
