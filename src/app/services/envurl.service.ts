import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvurlService {
  public loginApi = '/auth/login';
  public logoutApi = '/auth/logout';
  public UpdateTempPass = '/auth/update_new_pwd'

  public UserInfo = '/auth/user_info'


  // Superadmin Endpoints

  public createAssociation = '/hoa_admin/create_hoa_admin'
  public AssociationList = '/hoa_admin/list_hoa_admin'
  public getAssociationbyId ='/hoa_admin/list_hoa_admin_byid'
  public getpropertybyAssociation = '/property/property_byhoaid'
  public SuperadminDashboard  = '/dashboard/superadmin_dashboard_details'
  public UpdateAssociation = '/hoa_admin/update_association'



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






  // owner endpoints
  public ownerproperties = '/property/list_owner_property'
  public MaintenanceListinOwner = '/maintenance_invoice/list_maintenance_invoice_owner'
  public RentalInvoicelistinowner = '/rental_invoice/list_rental_invoice'
  public TenantListinOwner = '/property/list_tenant_details'
  public RentalInvoicegeninOwner = '/rental_invoice/create_rental_invoice'





  // Tenant Endpoints
  public TenantMaintenanceList = '/maintenance_invoice/list_maintenance_invoice_tenant'
  public TenantPropertyDatas = '/property/list_tenant_property'
  public TenantRentalInvoiceList = '/rental_invoice/list_rental_invoice_tenant'

}
