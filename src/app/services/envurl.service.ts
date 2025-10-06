import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvurlService {
  public loginApi = '/auth/login';
  public logoutApi = '/auth/logout';
  public UpdateTempPass = '/auth/update_new_pwd'


  // HOA Endpoints

  public createAssociation = '/hoa_admin/create_hoa_admin'
  public AssociationList = '/hoa_admin/list_hoa_admin'
  public getAssociationbyId ='/hoa_admin/list_hoa_admin_byid'
  public getpropertybyAssociation = '/property/property_byhoaid'



  // Association Endpoints 
  public getUserData = '/hoa_admin/list_hoa_admin_byid'
  public AssociationDataOnboard = '/hoa_admin/update_hoa_admin'
  public AssociationDocumentOnboard = '/hoa_admin/upload_hoa_documents'
  public propertiesbyAssociation = '/property/property_byhoaid'
  public AddPropertybyAssociation = '/property/create_property'
  public ViewpropertybyId = '/property/property_byid'
  public createownerinproperty = '/property/add_owner_property'
}
