import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OwnerServiceService {
  constructor() {}

  private TenantSubject = new BehaviorSubject<any>(null);
  TenantStatus$ = this.TenantSubject.asObservable();

  private petSubject = new BehaviorSubject<any>(null);
  PetStatus$ = this.petSubject.asObservable();


  private VehicleSubject = new BehaviorSubject<any>(null);
  VehicleStatus$ = this.VehicleSubject.asObservable();


  private RentalInvoicePaidStatusSubject = new BehaviorSubject<any>(null);
  RentalPaidStatus$ = this.RentalInvoicePaidStatusSubject.asObservable();


  private OwnerUPIidUpdateSubject = new BehaviorSubject<any>(null);
  OwnerUpiIdUpdatedStatus$ = this.OwnerUPIidUpdateSubject.asObservable();

  triggerTenantAdd(AddTenant: any): void {
    //console.log('addassociation', AddTenant);
    this.TenantSubject.next(AddTenant);
  }

  triggerPetAdd(AddPet: any): void {
    //console.log('addassociation', AddPet);
    this.petSubject.next(AddPet);
  }

    triggerVehicleAdd(AddVehicle: any): void {
    //console.log('addassociation', AddVehicle);
    this.VehicleSubject.next(AddVehicle);
  }


    triggerRentalPaidStatus(AddVehicle: any): void {
    //console.log('addassociation', AddVehicle);
    this.RentalInvoicePaidStatusSubject.next(AddVehicle);
  }


    triggerOwnerUpiIDUpdate(UpdateUPI: any): void {
    //console.log('addassociation', AddVehicle);
    this.OwnerUPIidUpdateSubject.next(UpdateUPI);
  }
}
