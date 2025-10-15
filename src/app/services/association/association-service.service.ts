import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssociationServiceService {
  constructor() {}

  private PropertySubject = new BehaviorSubject<any>(null);
  PropertyStatus$ = this.PropertySubject.asObservable();


  private OwnerSubject = new BehaviorSubject<any>(null);
  OwnerStatus$ = this.OwnerSubject.asObservable();


  private PetSubject = new BehaviorSubject<any>(null);
  petStatus$ = this.PetSubject.asObservable();

   private VehicleSubject = new BehaviorSubject<any>(null);
  VehicleStatus$ = this.VehicleSubject.asObservable();

  private MaintenanceInvSubject = new BehaviorSubject<any>(null);
  MaintenanceInvStatus$ = this.MaintenanceInvSubject.asObservable();

  triggerAdminAssociation(AddProperty: any): void {
    console.log('addassociation', AddProperty);
    this.PropertySubject.next(AddProperty);
  }


  triggerAssociationOwner(AddPet: any): void {
    console.log('addassociation', AddPet);
    this.PetSubject.next(AddPet);
  }

    triggervehicleAdd(Addvehicle: any): void {
    console.log('addassociation', Addvehicle);
    this.VehicleSubject.next(Addvehicle);
  }

      triggerMaintenanceInv(GenMaintenanceInv: any): void {
    console.log('addassociation', GenMaintenanceInv);
    this.MaintenanceInvSubject.next(GenMaintenanceInv);
  }
}
