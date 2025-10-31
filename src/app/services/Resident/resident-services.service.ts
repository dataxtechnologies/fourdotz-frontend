import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResidentServicesService {
  constructor() {}

  private TenantSubject = new BehaviorSubject<any>(null);
  TenantStatus$ = this.TenantSubject.asObservable();

  private VehicleSubject = new BehaviorSubject<any>(null);
  VehicleStatus$ = this.VehicleSubject.asObservable();


  private PetSubject = new BehaviorSubject<any>(null);
  PetStatus$ = this.PetSubject.asObservable();

  TriggerTenantServiceinResident(AddTenant: any): void {
    //console.log('addassociation', AddTenant);
    this.TenantSubject.next(AddTenant);
  }


  TriggerVehicleServiceinResident(AddVehicle: any): void {
    //console.log('addassociation', AddVehicle);
    this.VehicleSubject.next(AddVehicle);
  }


  TriggerPetServiceinResident(AddPet: any): void {
    //console.log('Service emitted:', AddPet);
    this.PetSubject.next(AddPet);
  }
}
