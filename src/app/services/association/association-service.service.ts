import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssociationServiceService {

   private activeSignField!: HTMLElement;

  private signatureSubject = new BehaviorSubject<string | null>(null);
  signature$ = this.signatureSubject.asObservable();

  /* store clicked sign field */
  setActiveField(el: HTMLElement) {
    this.activeSignField = el;
  }

  getActiveField(): HTMLElement {
    return this.activeSignField;
  }

  /* send signature html */
  insertSignature(html: string) {
    this.signatureSubject.next(html);
  }

  
  constructor() {}

  private PropertySubject = new BehaviorSubject<any>(null);
  PropertyStatus$ = this.PropertySubject.asObservable();

  private OwnerSubject = new BehaviorSubject<any>(null);
  OwnerStatus$ = this.OwnerSubject.asObservable();

  private OwnerUpdateSubject = new BehaviorSubject<any>(null);
  OwnerUpdateStatus$ = this.OwnerUpdateSubject.asObservable();

  private PetSubject = new BehaviorSubject<any>(null);
  petStatus$ = this.PetSubject.asObservable();

  private PetSubjectinresident = new BehaviorSubject<any>(null);
  petStatusresident$ = this.PetSubjectinresident.asObservable();

  private VehicleSubject = new BehaviorSubject<any>(null);
  VehicleStatus$ = this.VehicleSubject.asObservable();

  private MaintenanceInvSubject = new BehaviorSubject<any>(null);
  MaintenanceInvStatus$ = this.MaintenanceInvSubject.asObservable();

  private RemoveResidentSubject = new BehaviorSubject<any>(null);
  RemoveResidentStatus$ = this.RemoveResidentSubject.asObservable();

  private AnnouncementCreatedSubject = new BehaviorSubject<any>(null);
  AnnouncementCreatedStatus$ = this.AnnouncementCreatedSubject.asObservable();


  private CreateAdminSubject = new BehaviorSubject<any>(null);
  CreateAdminStatus$ = this.CreateAdminSubject.asObservable();


  private ChangeRequeststatusSubject = new BehaviorSubject<any>(null);
  ChangeRequeststatusStatus$ = this.ChangeRequeststatusSubject.asObservable();

  private GateCreateSubject = new BehaviorSubject<any>(null);
  GateCreateStatus$ = this.GateCreateSubject.asObservable();


  private GateKeeperSubject = new BehaviorSubject<any>(null);
  GateKeeperStatus$ = this.GateKeeperSubject.asObservable();

  private GateKeeperAssignedSubject = new BehaviorSubject<any>(null);
  GateKeeperAssignedStatus$ = this.GateKeeperAssignedSubject.asObservable();


  private AgreementSignedNewSubject = new BehaviorSubject<any>(null);
  NewAgreementSignedStatus$ = this.AgreementSignedNewSubject.asObservable();

  triggerNewAgreementSigned(agreementsigned: any): void {
    //console.log('addassociation', agreementsigned);
    this.AgreementSignedNewSubject.next(agreementsigned);
  }


  triggerGatekeeperAssigned(gatekeeper: any): void {
    //console.log('addassociation', AddProperty);
    this.GateKeeperAssignedSubject.next(gatekeeper);
  }


  triggerGatekeeperAdded(gatekeeper: any): void {
    //console.log('addassociation', AddProperty);
    this.GateKeeperSubject.next(gatekeeper);
  }

  triggerGateCreate(gatecreated: any): void {
    //console.log('addassociation', AddProperty);
    this.GateCreateSubject.next(gatecreated);
  }



  triggerOwnerUpdate(OwnerUpdate: any): void {
    //console.log('addassociation', OwnerUpdate);
    this.OwnerUpdateSubject.next(OwnerUpdate);
  }

  // triggerChangeRequestStatus
  triggerChangeRequestStatus(ChangeRequestStatus: any): void {
    //console.log('addassociation', ChangeRequestStatus);
    this.ChangeRequeststatusSubject.next(ChangeRequestStatus);
  }

  triggerCreateAdmin(CreateAdmin: any): void {
    //console.log('addassociation', CreateAdmin);
    this.CreateAdminSubject.next(CreateAdmin);
  }

  triggerAdminAssociation(AddProperty: any): void {
    //console.log('addassociation', AddProperty);
    this.PropertySubject.next(AddProperty);
  }

  // triggerAssociationOwner
  // triggerAssociationTenant

  triggerAssociationOwner(AddOwner: any): void {
    //console.log('addassociation', AddOwner);
    this.OwnerSubject.next(AddOwner);
  }

  triggerAssociationpet(AddPet: any): void {
    //console.log('addassociation', AddPet);
    this.PetSubject.next(AddPet);
  }

  triggerAssociationpetresident(AddPetres: any): void {
    //console.log('addassociation', AddPetres);
    this.PetSubjectinresident.next(AddPetres);
  }

  triggervehicleAdd(Addvehicle: any): void {
    //console.log('addassociation', Addvehicle);
    this.VehicleSubject.next(Addvehicle);
  }

  triggerMaintenanceInv(GenMaintenanceInv: any): void {
    //console.log('addassociation', GenMaintenanceInv);
    this.MaintenanceInvSubject.next(GenMaintenanceInv);
  }

  triggerRemoveResident(removeresident: any): void {
    //console.log('addassociation', removeresident);
    this.RemoveResidentSubject.next(removeresident);
  }


  triggerAnnouncementCreated(AnnouncementCreated: any): void {
    //console.log('addassociation', removeresident);
    this.AnnouncementCreatedSubject.next(AnnouncementCreated);
  }
}
