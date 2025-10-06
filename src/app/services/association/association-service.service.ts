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

  triggerAdminAssociation(AddProperty: any): void {
    console.log('addassociation', AddProperty);

    this.PropertySubject.next(AddProperty);
  }


  triggerAssociationOwner(AddOwner: any): void {
    console.log('addassociation', AddOwner);

    this.PropertySubject.next(AddOwner);
  }
}
