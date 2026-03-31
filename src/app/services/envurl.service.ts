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
  public SendOTPtoMobile = '/auth/send_otp'
  public sendMobileOTPonOnboard = '/auth/send_mobile_otp'
  public verify_otp = '/auth/verify_otp'
  public MobileVerifyonOnboard = '/auth/verify_mobile_otp'

  public UserInfo = '/auth/user_info'
  public UpdateUPI = '/owner/update_user_upi'
  public SendmailAgain = '/auth/reset_password'


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
  public ownerpropertiesbyhoaId = '/property/list_owner_property'
  public MaintenanceListinOwner = '/maintenance_invoice/list_maintenance_invoice_owner'
  public RentalInvoicelistinowner = '/rental_invoice/list_rental_invoice'
  public TenantListinOwner = '/property/list_tenant_details'
  public RentalInvoicegeninOwner = '/rental_invoice/create_rental_invoice'
  public OwnerUpdateUPI = '/owner/update_upi'
  public UpdateOwnerDetails = '/owner/update_owner_details'
  public RemovePet = '/pet/remove_pet'
  public RemoveVehicle = '/vehicle/remove_vehicle'
  public getpropertydatabyid = '/property/property_byid'


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
  public ExitQRVisitor = '/visitors/visitor_exit_history'


  // gate and gate keeper
  public Listgatekeeper = '/gate_keeper/list_gate_keeper'
  public GateKeeperCreate = '/gate_keeper/create_gate_keeper'
  public CreateGate = '/gate/create_gate'
  public listGate = '/gate/list_gate'
  public listGateKeeper = '/gate/list_gates_gatekeeper'
  public AssignGateKeeper = '/assigned_gatekeeper/assign_gatekeeper'
  public UnassignGateKeeper = '/assigned_gatekeeper/unassign_gatekeeper'
  public GetPropertyData = '/property/list_resident_property_gatekeeper'
  public AddSpotVisitorinGateKeeper = '/visitors/gate_visitors_entry'
  public VisitorExit = '/visitors/visitor_exit'
  public getGatelistinQrformExternal = '/gate/list_gate_by_association_id'
  public DeleteGate = '/gate/delete_gate'
  public AllowVisitor = '/visitors/allow_visitor'
  public ResendVisitorRequest = '/visitors/resend_approve_request'



  // gate Keeper Endpoints
  public ListVisitorinGateKeeper = '/visitors/list_visitors'
  public OwnerLoginPreVisitor = '/visitors/list_created_pre_visitor_entry'



  // Agreements Endpoints
  public ListAgreementTemplates = '/agreement_template/list_agreement_template'
  public CreateAgreementTemplates = '/agreement_template/create_agreement_template'
  public ListCreatedAgreements = '/agreement/list_created_agreement'
  public listagreementTemplatesbyID = '/agreement_template/list_agreement_template_byid'
  public listAgreementbyId = '/agreement_template/list_agreement_template_byid'
  public CreateAgreementtosign = '/agreement/create_agreement'
  public ViewCreatedAgreementbyId = '/agreement/list_agreement_byid'
  public SendOTPforVerifySign = '/agreement/send_otp'
  public VerifyOTPforSign = '/agreement/verify_otp'
  public signAgreement = '/agreement/upload_signature'
  public SendAgreement = '/agreement/generate_agreement'
  public ListAgreementforusers = '/agreement/list_agreement'
  public OwnerListTemplatebyAssociation = '/agreement_template/list_template_by_associationid'



  // Tour Endpoints
  public AddTourdatas = '/webapp_tour/insert_webapp_tour'
  public getTourdatas = '/webapp_tour/list_webapp_tour'



  // Amenities Endpoints
  public getallResourcesinAssociation = '/gated_community/register-resource'
  public getallResourcesinAssociationbyID = '/gated_community/register-resource'
  public CreateResourcesinAssociation =  '/gated_community/register-resource'
  public getResourcebyId = '/gated_community/get_resource_byid'
  public SetSlotRulesCreate = '/gated_community/slot-rule'
  public GetSlotRuleforResourcesId = '/gated_community/slot-rule'
  public GetTimeSlotsByResourceId = '/gated_community/time-slot'
  public GetBookingforResourcesbyId = '/gated_community/book-resource'
  public BookingSlotTodayinAssociation = '/gated_community/time-slot'
  public BookResourceinOwner = '/gated_community/book-resource'



  public GetBookinginOwner = '/gated_community/book-resource'
  public BookingdetailsbyBookingId = '/gated_community/booking_details_by_booking_id'



  // ad space in superadmin
  public CreateanAdSpace = '/advertisement_space/create_advertisement_space'
  public getalladspace = '/advertisement_space/list_advertisement_space'
  public getadspacebyid = '/advertisement_space/list_advertisement_space_byid'
  public deleteadspace = '/advertisement_space/delete_advertisement_space'


  public VisitorAcceptoption = '/visitors/update_entry'

  public DeleteAnnouncement = '/announcements/delete_announcement'
  public ListPropertyNotresidentedbyTenantinOwner = '/property/list_owner_properties_without_tenant'


  public GetAssociationQRforvisitor = '/visitors/list_association_gateentry_qrcode'

  public UploadProfileImage = '/auth/user_profile'



  public gatekeeperQRshow = '/visitors/list_association_gateentry_qrcode'
  public getrequestedresidentdetails = '/request_management/list_request_byid'


  // Self Signup

  public CheckExistingUser = '/signup/check_user_exists'
  public SendOTPtoVerify = '/signup/send_otp'
  public VerifyOTPtoonboardresident = '/signup/verify_otp'
  public ResidentBasicDetails = '/signup/self_signup'
  public fetchAssociationlist = '/hoa_admin/list_all_association'
  public fetchpropertylistforassociation = '/property/list_property_byassociation'
  public fetchnonownerpropertylist = '/property/list_nonowner_property'
  public fetchnontenantpropertylist = '/property/list_nontenant_property'
  public submitpropertyrequest = '/property_merge_request/create_property_merge_request'

  public ApproveRequest = '/property_merge_request/update_property_merge_request'

  public listallresidentrequestlist = '/property_merge_request/get_property_merge_request'
  public listpayoutrequestinSA = '/payout/list_payout_history'
  public listpayoutrequestinAssociation = '/payout/list_payout_history'
  public payoutcardDetailsinAssociation = '/payout/list_payment_payout_details'
  public createpayoutrequestinAssociation = '/payout/create_payout'
  public updatepayoutrequeststatus = '/payout/update_payout'
}
