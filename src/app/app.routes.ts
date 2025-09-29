import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SuperadminDashboardComponent } from './pages/superadmin-pages/superadmin-dashboard/superadmin-dashboard.component';
import { AssociationListComponent } from './pages/superadmin-pages/association-list/association-list.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SigninPageComponent } from './pages/auth/signin-page/signin-page.component';
import { ViewAssociationComponent } from './pages/superadmin-pages/view-association/view-association.component';
import { AssociationDashboardComponent } from './pages/association-pages/association-dashboard/association-dashboard.component';
import { PropertyListComponent } from './pages/association-pages/property-list/property-list.component';
import { PropertyViewComponent } from './pages/association-pages/property-view/property-view.component';
import { ResidentsListComponent } from './pages/association-pages/residents-list/residents-list.component';
import { ViewResidentDetailsComponent } from './pages/association-pages/view-resident-details/view-resident-details.component';
import { MaintenanceListComponent } from './pages/association-pages/maintenance-list/maintenance-list.component';
import { OwnerDashboardComponent } from './pages/Owner-pages/owner-dashboard/owner-dashboard.component';
import { OwnerPropertiesComponent } from './pages/Owner-pages/owner-properties/owner-properties.component';
import { OwnerTenantsListComponent } from './pages/Owner-pages/owner-tenants-list/owner-tenants-list.component';
import { OwnerMaintenanceListComponent } from './pages/Owner-pages/owner-maintenance-list/owner-maintenance-list.component';
import { OwnerRentalInvoiceComponent } from './pages/Owner-pages/owner-rental-invoice/owner-rental-invoice.component';
import { OwnerViewPropertyComponent } from './pages/Owner-pages/owner-view-property/owner-view-property.component';
import { OwnerViewTenantsDetailsComponent } from './pages/Owner-pages/owner-view-tenants-details/owner-view-tenants-details.component';
import { TenantDashboardComponent } from './pages/Tenant-pages/tenant-dashboard/tenant-dashboard.component';
import { TenantRentalPropertyComponent } from './pages/Tenant-pages/tenant-rental-property/tenant-rental-property.component';
import { TenantMaintenanceListComponent } from './pages/Tenant-pages/tenant-maintenance-list/tenant-maintenance-list.component';
import { TenantRentalListComponent } from './pages/Tenant-pages/tenant-rental-list/tenant-rental-list.component';
import { TenantViewPropertyDetailsComponent } from './pages/Tenant-pages/tenant-view-property-details/tenant-view-property-details.component';
import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';
import { ForgetPasswordComponent } from './pages/auth/forget-password/forget-password.component';

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
    children: [{ path: 'sign-in', component: SigninPageComponent },
      { path: 'Change-passsword', component: ChangePasswordComponent },
      { path: 'forget-password', component: ForgetPasswordComponent }
    ],
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

  {
    path: 'Association',
    component: DashboardLayoutComponent,
    children: [
      { path: 'Dashboard', component: AssociationDashboardComponent },
      { path: 'properties-list', component: PropertyListComponent },
      { path: 'residents-list', component: ResidentsListComponent },
      { path: 'Maintenance-list', component: MaintenanceListComponent },
      { path: 'view-properties/:propertiesId', component: PropertyViewComponent },
      { path: 'view-resident/:residentId', component: ViewResidentDetailsComponent },
    ],
  },

  {
    path: 'Owner',
    component: DashboardLayoutComponent,
    children: [
      { path: 'Dashboard', component: OwnerDashboardComponent },
      { path: 'properties-list', component: OwnerPropertiesComponent },
      { path: 'tenants-list', component: OwnerTenantsListComponent },
      { path: 'Maintenance-list', component: OwnerMaintenanceListComponent },
      { path: 'Rental-invoice-list', component: OwnerRentalInvoiceComponent },
      { path: 'view-properties/:propertiesId', component: OwnerViewPropertyComponent },
      { path: 'view-tenants/:tenantId', component: OwnerViewTenantsDetailsComponent },
    ],
  },

  {
    path: 'Tenant',
    component: DashboardLayoutComponent,
    children: [
      { path: 'Dashboard', component: TenantDashboardComponent },
      { path: 'properties-list', component: TenantViewPropertyDetailsComponent },
      { path: 'Maintenance-list', component: TenantMaintenanceListComponent },
      { path: 'Rental-invoice-list', component: TenantRentalListComponent },
      { path: 'view-properties/:propertiesId', component: TenantViewPropertyDetailsComponent }
    ],
  },
];
