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
import { OnboardingLayoutComponent } from './layouts/onboarding-layout/onboarding-layout.component';
import { AssociationOnboardComponent } from './pages/onboarding/association-onboard/association-onboard.component';
import { AssociationOnboardDocumentsComponent } from './pages/onboarding/association-onboard-documents/association-onboard-documents.component';
import { ProfilePageComponent } from './pages/profile/profile-page/profile-page.component';
import { GlobalInvoiceComponent } from './pages/global-invoice/global-invoice.component';
import { NewInvComponent } from './pages/new-inv/new-inv.component';
import { NewInv1Component } from './pages/new-inv1/new-inv1.component';
import { Announcementcomponent } from './pages/association-pages/announcements/announcements.component';
import { AnnouncementsPageComponent } from './pages/Owner-pages/announcements-page/announcements-page.component';
import { AnnouncementsTenantPageComponent } from './pages/Tenant-pages/announcements-tenant-page/announcements-tenant-page.component';
import { authGuard } from './auth.guard';
import { MaintenanceInvoicePaymentComponent } from './pages/maintenance-invoice-payment/maintenance-invoice-payment.component';
import { InvoiceLayoutComponent } from './layouts/invoice-layout/invoice-layout.component';
import { ListRequestsUserComponent } from './pages/request-management/list-requests-user/list-requests-user.component';
import { ListRequestsAssociationComponent } from './pages/request-management/list-requests-association/list-requests-association.component';
import { ListRequestsAdminComponent } from './pages/request-management/list-requests-admin/list-requests-admin.component';
import { ServiceAdminListComponent } from './pages/request-management/service-admin-list/service-admin-list.component';
import { GenerateQrAssociationComponent } from './pages/visitor-pages/generate-qr-association/generate-qr-association.component';
import { VisitorsListAssociationComponent } from './pages/visitor-pages/visitors-list-association/visitors-list-association.component';
import { VisitorsEntryFormToVisitorComponent } from './pages/visitor-pages/visitors-entry-form-to-visitor/visitors-entry-form-to-visitor.component';
import { VisitorsEntryFormSubmittedComponent } from './pages/visitor-pages/visitors-entry-form-submitted/visitors-entry-form-submitted.component';
import { SigninPageNewComponent } from './pages/auth/signin-page-new/signin-page-new.component';
import { PasswordOtpPageComponent } from './pages/auth/password-otp-page/password-otp-page.component';
import { ChangePasswordNewComponent } from './pages/auth/change-password-new/change-password-new.component';
import { VisitorsExitFormToVisitorComponent } from './pages/visitor-pages/visitors-exit-form-to-visitor/visitors-exit-form-to-visitor.component';
import { DashboardLayoutNewComponent } from './layouts/dashboard-layout-new/dashboard-layout-new.component';

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
    // canActivate: [authGuard],
    children: [
      { path: 'sign-in', component: SigninPageComponent },
      { path: 'user-signin', component: SigninPageNewComponent },
      {
        path: 'user-authentication/:authtype/:authvalue',
        component: PasswordOtpPageComponent,
      },
      // {
      //   path: 'Change-password/:usermail',
      //   component: ChangePasswordComponent,
      // },
      {
        path: 'Change-password/:usermail',
        component: ChangePasswordComponent,
      },
      { path: 'forget-password', component: ForgetPasswordComponent },
    ],
  },

  {
    path: 'onboarding',
    component: OnboardingLayoutComponent,
    children: [
      { path: 'user-data', component: AssociationOnboardComponent },
      {
        path: 'user-document',
        component: AssociationOnboardDocumentsComponent,
      },
    ],
  },

  {
    path: 'Account',
    //  canActivate: [authGuard],
    component: DashboardLayoutNewComponent,
    children: [
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
    ],
  },

  {
    path: 'Superadmin',
    // canActivate: [authGuard],
    component: DashboardLayoutNewComponent,
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
    // canActivate: [authGuard],
    component: DashboardLayoutNewComponent,
    children: [
      { path: 'Dashboard', component: AssociationDashboardComponent },
      { path: 'properties-list', component: PropertyListComponent },
      { path: 'residents-list', component: ResidentsListComponent },
      { path: 'Maintenance-list', component: MaintenanceListComponent },
      {
        path: 'request-management/list',
        component: ListRequestsAssociationComponent,
      },
      {
        path: 'service-admin/list',
        component: ServiceAdminListComponent,
      },
      {
        path: 'view-properties/:propertiesId',
        component: PropertyViewComponent,
      },
      {
        path: 'view-resident/:residentId',
        component: ViewResidentDetailsComponent,
      },
      {
        path: 'announcement',
        component: Announcementcomponent,
      },
    ],
  },

  {
    path: 'Owner',
    // canActivate: [authGuard],
    component: DashboardLayoutNewComponent,
    children: [
      { path: 'Dashboard', component: OwnerDashboardComponent },
      { path: 'properties-list', component: OwnerPropertiesComponent },
      { path: 'tenants-list', component: OwnerTenantsListComponent },
      { path: 'Maintenance-list', component: OwnerMaintenanceListComponent },
      { path: 'Rental-invoice-list', component: OwnerRentalInvoiceComponent },
      { path: 'announcement/owner', component: AnnouncementsPageComponent },
      { path: 'request-management/list', component: ListRequestsUserComponent },
      {
        path: 'view-properties/:propertiesId',
        component: OwnerViewPropertyComponent,
      },
      {
        path: 'view-tenants/:tenantId',
        component: OwnerViewTenantsDetailsComponent,
      },
    ],
  },

  {
    path: 'Tenant',
    // canActivate: [authGuard],
    component: DashboardLayoutNewComponent,
    children: [
      { path: 'Dashboard', component: TenantDashboardComponent },
      {
        path: 'properties-list',
        component: TenantViewPropertyDetailsComponent,
      },
      { path: 'Maintenance-list', component: TenantMaintenanceListComponent },
      { path: 'Rental-invoice-list', component: TenantRentalListComponent },
      { path: 'request-management/list', component: ListRequestsUserComponent },
      {
        path: 'announcement/tenant',
        component: AnnouncementsTenantPageComponent,
      },
      {
        path: 'view-properties/:propertiesId',
        component: TenantViewPropertyDetailsComponent,
      },
    ],
  },

  {
    path: 'Global-invoice',
    component: InvoiceLayoutComponent,
    children: [
      {
        path: ':invoice_id',
        component: GlobalInvoiceComponent,
      },
    ],
  },

  {
    path: 'Service-admin',
    component: DashboardLayoutNewComponent,
    children: [
      {
        path: 'manage-requests',
        component: ListRequestsAdminComponent,
      },
    ],
  },

  {
    path: 'maintenance-invoice',
    component: InvoiceLayoutComponent,
    children: [
      {
        path: ':userType/:invoiceid',
        component: MaintenanceInvoicePaymentComponent,
      },
    ],
  },

  {
    path: 'visitors-management',
    component: DashboardLayoutNewComponent,
    children: [
      {
        path: 'qr-manager',
        component: GenerateQrAssociationComponent,
      },
      {
        path: 'visitors-list',
        component: VisitorsListAssociationComponent,
      },
    ],
  },

  {
    path: 'visitor-entry-form/:associationId',
    component: VisitorsEntryFormToVisitorComponent,
  },
  {
    path: 'visitor-entry-form-submitted',
    component: VisitorsEntryFormSubmittedComponent,
  },
  {
    path: 'visitor-exit-form-submitted',
    component: VisitorsExitFormToVisitorComponent,
  },

  // maintenance-invoice/owner/IN-NYYN-PM-5330?status=paynow

  {
    path: 'dashboard',
    component: DashboardLayoutNewComponent,
    children: [
      { path: 'dashboard', component: SuperadminDashboardComponent },
     
    ],
  }
];
