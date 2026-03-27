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
import { GateKeeperVisitorListComponent } from './pages/gate-keeper-pages/gate-keeper-visitor-list/gate-keeper-visitor-list.component';
import { GateKeeperPreVisitorComponent } from './pages/gate-keeper-pages/gate-keeper-pre-visitor/gate-keeper-pre-visitor.component';
import { GateKeeperGatesComponent } from './pages/association-pages/manage-helpers/gate-keeper-gates/gate-keeper-gates.component';
import { PreVisitorsComponent } from './pages/association-pages/manage-visitors/pre-visitors/pre-visitors.component';
import { SpotVisitorsComponent } from './pages/association-pages/manage-visitors/spot-visitors/spot-visitors.component';
import { GateKeeperQrVisitorComponent } from './pages/gate-keeper-pages/gate-keeper-qr-visitor/gate-keeper-qr-visitor.component';
import { PreVisitorListComponent } from './pages/Owner-pages/pre-visitor-list/pre-visitor-list.component';
import { VisitorExitedScreenComponent } from './pages/visitor-pages/visitor-exited-screen/visitor-exited-screen.component';
import { CreateTemplateComponent } from './pages/Aggreement/create-template/create-template.component';
import { ViewTemplateComponent } from './pages/Aggreement/view-template/view-template.component';
import { ListTemplateComponent } from './pages/Aggreement/list-template/list-template.component';
import { ListAllTemplatesComponent } from './pages/New-Agreements/list-all-templates/list-all-templates.component';
import { CreateTemplateAssociationComponent } from './pages/New-Agreements/create-template-association/create-template-association.component';
import { ViewSavedAgreementComponent } from './pages/New-Agreements/view-saved-agreement/view-saved-agreement.component';
import { ViewSavedTemplateComponent } from './pages/New-Agreements/view-saved-template/view-saved-template.component';
import { ListSavedAgreementComponent } from './pages/New-Agreements/list-saved-agreement/list-saved-agreement.component';
import { ViewNewAgreementTosendComponent } from './pages/New-Agreements/view-new-agreement-tosend/view-new-agreement-tosend.component';
import { ViewSigningAgreementComponent } from './pages/New-Agreements/view-signing-agreement/view-signing-agreement.component';
import { OwnerSigingAgreementListComponent } from './pages/New-Agreements/owner-siging-agreement-list/owner-siging-agreement-list.component';
import { OwnerViewSigningAgreementComponent } from './pages/New-Agreements/owner-view-signing-agreement/owner-view-signing-agreement.component';
import { OwnerCreatedAgreementListComponent } from './pages/New-Agreements/owner-created-agreement-list/owner-created-agreement-list.component';
import { OwnerViewAgreementToSendComponent } from './pages/New-Agreements/owner-view-agreement-to-send/owner-view-agreement-to-send.component';
import { TableComponent } from './pages/Demo-check/table/table.component';
import { NewAssociationDashboardComponent } from './pages/Dashboards/association-dashboard/association-dashboard.component';
import { AssociationSlotsManagementComponent } from './pages/Amenities/association-slots-management/association-slots-management.component';
import { AssociationManageResourcesComponent } from './pages/Amenities/association-manage-resources/association-manage-resources.component';
import { CreateResourcesInassociationComponent } from './pages/Amenities/create-resources-inassociation/create-resources-inassociation.component';
import { SetSlotRulesForResourcesInassociationComponent } from './pages/Amenities/set-slot-rules-for-resources-inassociation/set-slot-rules-for-resources-inassociation.component';
import { CreateSlotResourcesInassociationComponent } from './pages/Amenities/create-slot-resources-inassociation/create-slot-resources-inassociation.component';
import { ViewResourcesAssociationComponent } from './pages/Amenities/view-resources-association/view-resources-association.component';
import { ListBookingsInOwnerComponent } from './pages/Amenities/list-bookings-in-owner/list-bookings-in-owner.component';
import { BookAmenitiesByownerComponent } from './pages/Amenities/book-amenities-byowner/book-amenities-byowner.component';
import { ViewBookingDetailsComponent } from './pages/Amenities/view-booking-details/view-booking-details.component';
import { BookAmenitiesBytenantComponent } from './pages/Amenities/book-amenities-bytenant/book-amenities-bytenant.component';
import { AdSpaceListComponent } from './pages/superadmin-pages/ad-space-list/ad-space-list.component';
import { ViewQrCodeComponent } from './pages/gate-keeper-pages/view-qr-code/view-qr-code.component';
import { SpotVisitorListComponent } from './pages/Owner-pages/spot-visitor-list/spot-visitor-list.component';
import { QrVisitorListComponent } from './pages/Owner-pages/qr-visitor-list/qr-visitor-list.component';
import { ViewRequestAssociationAdminComponent } from './pages/request-management/view-request-association-admin/view-request-association-admin.component';
import { ViewRequestUsersComponent } from './pages/request-management/view-request-users/view-request-users.component';
import { SmartEntryComponent } from './pages/gate-keeper-pages/smart-entry/smart-entry.component';
import { NoInternetPageComponent } from './pages/no-internet-page/no-internet-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/sign-in',
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    // canActivate: [authGuard],
    children: [
      { path: 'sign-in', component: SigninPageNewComponent },
      // { path: 'user-signin', component: SigninPageNewComponent },
      {
        path: 'user-authentication/:authtype/:authvalue',
        component: PasswordOtpPageComponent,
      },
      // {
      //   path: 'Change-password/:usermail',
      //   component: ChangePasswordComponent,
      // },
      {
        path: 'Change-password/:username',
        component: ChangePasswordNewComponent,
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
    component: DashboardLayoutComponent,
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
    component: DashboardLayoutComponent,
    children: [
      { path: 'Dashboard', component: SuperadminDashboardComponent },
      { path: 'Association-list', component: AssociationListComponent },
      { path: 'Ad-space/list', component: AdSpaceListComponent },
      {
        path: 'view-association/:associationId',
        component: ViewAssociationComponent,
      },
    ],
  },

  {
    path: 'Association',
    // canActivate: [authGuard],
    component: DashboardLayoutComponent,
    children: [
      { path: 'Dashboard', component: NewAssociationDashboardComponent },
      { path: 'properties-list', component: PropertyListComponent },
      { path: 'residents-list', component: ResidentsListComponent },
      { path: 'Maintenance-list', component: MaintenanceListComponent },
      { path: 'manage-amenities/resources', component: AssociationManageResourcesComponent },
      { path: 'manage-amenities/slot-booking', component: AssociationSlotsManagementComponent },
      { path: 'manage-amenities/resources/create-resources', component: CreateResourcesInassociationComponent },
      { path: 'manage-amenities/resources/set-slot-rules/:resource_id', component: SetSlotRulesForResourcesInassociationComponent },
      { path: 'manage-amenities/resources/view-resources-details/:resource_id', component: ViewResourcesAssociationComponent },
      { path: 'manage-amenities/resources/create-slot-resources', component: CreateSlotResourcesInassociationComponent },
      {
        path: 'manage-helpers/gate-keeper',
        component: GateKeeperGatesComponent,
      },
      {
        path: 'request-management/list',
        component: ListRequestsAssociationComponent,
      },
      {
        path: 'request-management/view/:reqId',
        component: ViewRequestAssociationAdminComponent,
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
    component: DashboardLayoutComponent,
    children: [
      { path: 'Dashboard', component: OwnerDashboardComponent },
      { path: 'properties-list', component: OwnerPropertiesComponent },
      { path: 'tenants-list', component: OwnerTenantsListComponent },
      { path: 'Maintenance-list', component: OwnerMaintenanceListComponent },
      { path: 'Rental-invoice-list', component: OwnerRentalInvoiceComponent },
      { path: 'announcement/owner', component: AnnouncementsPageComponent },
      { path: 'request-management/list', component: ListRequestsUserComponent },
      { path: 'pre-visitor/list', component: PreVisitorListComponent },
      { path: 'qr-visitor/list', component: QrVisitorListComponent },
      { path: 'spot-visitor/list', component: SpotVisitorListComponent },
      { path: 'amenities/list-book-amenities', component: ListBookingsInOwnerComponent },
      { path: 'amenities/book-amenities/book-now', component: BookAmenitiesByownerComponent },
      { path: 'amenities/book-amenities/booking-details/:booking_id', component: ViewBookingDetailsComponent },
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
    path: 'Request-management',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'view/:reqId',
        component: ViewRequestUsersComponent,
      },
    ],
  },

  {
    path: 'Tenant',
    // canActivate: [authGuard],
    component: DashboardLayoutComponent,
    children: [
      { path: 'Dashboard', component: TenantDashboardComponent },
      {
        path: 'properties-list',
        component: TenantViewPropertyDetailsComponent,
      },
      { path: 'Maintenance-list', component: TenantMaintenanceListComponent },
      { path: 'Rental-invoice-list', component: TenantRentalListComponent },
      { path: 'request-management/list', component: ListRequestsUserComponent },
      { path: 'pre-visitor/list', component: PreVisitorListComponent },
      { path: 'amenities/book-amenities/book-now', component: BookAmenitiesBytenantComponent },
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
    component: DashboardLayoutComponent,
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
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'qr-manager',
        component: GenerateQrAssociationComponent,
      },
      {
        path: 'pre-visitors-list',
        component: PreVisitorsComponent,
      },
      {
        path: 'spot-visitors-list',
        component: SpotVisitorsComponent,
      },
      {
        path: 'qr-visitors-list',
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
    path: 'exit-form-submitted',
    component: VisitorExitedScreenComponent,
  },
  {
    path: 'visitor-exit-form-submitted/:visitorUniqueId',
    component: VisitorsExitFormToVisitorComponent,
  },

  // maintenance-invoice/owner/IN-NYYN-PM-5330?status=paynow

  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [{ path: 'dashboard', component: SuperadminDashboardComponent }],
  },

  {
    path: 'Gate-keeper',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'visitors-management/visitors-list',
        component: GateKeeperVisitorListComponent,
      },
      {
        path: 'visitors-management/pre-visitors-list',
        component: GateKeeperPreVisitorComponent,
      },
      {
        path: 'visitors-management/qr-visitors-list',
        component: GateKeeperQrVisitorComponent,
      },
      {
        path: 'QR/view-qr',
        component: ViewQrCodeComponent,
      },
      {
        path: 'smart-entry/list',
        component: SmartEntryComponent,
      },
    ],
  },

  {
    path: 'agreement',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'association/create-template',
        component: CreateTemplateAssociationComponent,
      },
      {
        path: 'association/list-template',
        component: ListAllTemplatesComponent,
      },
      {
        path: 'association/view-template',
        component: ViewSavedTemplateComponent,
      },
      {
        path: 'association/list-agreement',
        component: ListSavedAgreementComponent,
      },
      {
        path: 'owner/list-signing-agreement',
        component: OwnerSigingAgreementListComponent,
      },
      {
        path: 'owner/list-created-agreement',
        component: OwnerCreatedAgreementListComponent,
      },
      {
        path: 'association/view-agreement',
        component: ViewSavedAgreementComponent,
      },
      {
        path: 'association/view-new-agreement/:templateId',
        component: ViewNewAgreementTosendComponent,
      },
      {
        path: 'owner/view-new-agreement/:templateId',
        component: OwnerViewAgreementToSendComponent,
      },
      {
        path: 'association/view-signing-agreement/:templateId',
        component: ViewSigningAgreementComponent,
      },
      {
        path: 'owner/owner-view-signing-agreement/:templateId',
        component: OwnerViewSigningAgreementComponent,
      },
    ],
  },

  {
    path: 'Demo-check',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'table',
        component: TableComponent,
      },
    ],
  },


  {
    path: 'no-network',
    component: NoInternetPageComponent,
  },
];
