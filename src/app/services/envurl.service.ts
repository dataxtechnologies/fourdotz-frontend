import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvurlService {
  public loginApi = '/auth/login';
  public logoutApi = '/auth/logout';
  public UpdateTempPass = '/auth/update_new_pwd'
  public forgetpassword = '/auth/forgot_password_send_otp'
  public updateforgetpassword = '/auth/update_forgot_password'

  public UserInfo = '/auth/user_info'


  // Superadmin Endpoints

  public createAssociation = '/hoa_admin/create_hoa_admin'
  public AssociationList = '/hoa_admin/list_hoa_admin'
  public getAssociationbyId ='/hoa_admin/list_hoa_admin_byid'
  public getpropertybyAssociation = '/property/property_byhoaid'
  public SuperadminDashboard  = '/dashboard/superadmin_dashboard_details'
  public UpdateAssociation = '/hoa_admin/update_association'
  public AmountforAssociation = '/payment/list_payment_byassociation'



  // Association Endpoints 
  public getUserData = '/hoa_admin/list_hoa_admin_byid'
  public AssociationDataOnboard = '/hoa_admin/update_hoa_admin'
  public AssociationDocumentOnboard = '/hoa_admin/upload_hoa_documents'
  public propertiesbyAssociation = '/property/property_byhoaid'
  public AddPropertybyAssociation = '/property/create_property'
  public ViewpropertybyId = '/property/property_byid'
  public createownerinproperty = '/property/add_owner_property'
  public Addpet = '/property/add_pet'
  public AddVehicle = '/property/add_vehicle'
  public createTenantinproperty = '/property/add_tenant_property'
  public ListMaintenanceinAssociation = '/maintenance_invoice/list_maintenance_invoice'
  public generateMaintenanceInvoice = '/maintenance_invoice/create_maintenance_invoice'
  public Dashboarddata = '/dashboard/hoa_dashboard_details'
  public PropertyListinAssociation = '/property/list_property'
  public UpdatePropertyData = '/property/update_property_byid'
  public ResidentedProperty = '/property/list_resident_properties'
  public RemoveOwnerResident = '/property/remove_residents'
  public RemoveTenantResident = '/property/remove_tenant'
  public EditTenantDetails = '/property/update_tenant_details'
  public maintenanceAmountBalance = '/hoa_admin/list_payment_details'
  public SendRemainderforMaintenance = '/maintenance_invoice/send_remainder'


  // owner endpoints
  public ownerproperties = '/property/list_owner_property'
  public MaintenanceListinOwner = '/maintenance_invoice/list_maintenance_invoice_owner'
  public RentalInvoicelistinowner = '/rental_invoice/list_rental_invoice'
  public TenantListinOwner = '/property/list_tenant_details'
  public RentalInvoicegeninOwner = '/rental_invoice/create_rental_invoice'
  public OwnerUpdateUPI = '/owner/update_upi'
  public UpdateOwnerDetails = '/owner/update_owner_details'
  public RemovePet = '/pet/remove_pet'
  public RemoveVehicle = '/vehicle/remove_vehicle'


  // Tenant Endpoints
  public TenantMaintenanceList = '/maintenance_invoice/list_maintenance_invoice_tenant'
  public TenantPropertyDatas = '/property/list_tenant_property'
  public TenantRentalInvoiceList = '/rental_invoice/list_rental_invoice_tenant'


  // Invoices
  public RentalInvoice = '/rental_invoice/get_rent_invoice_invoiceid'
  public RentalinvoiceQR = '/rental_invoice/invoice_payment_qr'
  public ChangeRentalInvoicePaidStatus = '/rental_invoice/rental_payment_status'
  public MaintenanceInvoicegetbyID = '/maintenance_invoice/get_maintenance_invoice_invoiceid'


  // Payment Integration
  public CreatePaymentforInvoiceId = '/payment/create_pay'




  // Announcement 
  public CreateAnnouncement = '/announcements/create_announcements'
  public ListAnnouncementinHOA = '/announcements/list_announcements'
  public pinannouncement = '/announcements/pin_unpin_announcements'
  public listpinannouncement = '/announcements/list_pin_announcements'
  public ListAnnouncementinOwnerTenant = '/announcements/list_association_announcements'


  // Request Management
  public CreateRequestUser = '/request_management/create_request'
  public ListRequestUser = '/request_management/list_request'
  public CommentsAddforRequest = '/request_management_comments/create_comments'
  public listcommentsforrequest = '/request_management_comments/list_comments'
  public StartWorkonRequest = '/request_management/start_work'
  public CompleteWorkonRequest = '/request_management/complete_work'
  public ListAllRequestinAssociation = '/request_management/list_allrequest'

  // Service Admin

  public CreateServiceAdmin = '/service_admin/create_service_admin'
  public ListServiceAdmin = '/service_admin/list_service_admin'
  public ListAllrequestinServiceAdmin = '/request_management/list_serviceadmin_request'


  // visitor
  public GetAssociationQR = '/visitors/list_association_gateentry'
  public SaveQRcodeAssociation = '/visitors/association_gateentry'
  public ListpropertybasedonAssociationIdtoVisitors = '/property/list_all_resident_property'
  public CreateVisitorEntry = '/visitors/create_visitor_entry'
  public ListAllVisitors = '/visitors/list_all_visitor'

}
