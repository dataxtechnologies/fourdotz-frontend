import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdmindataService {
  constructor() { }

  private AssociationSubject = new BehaviorSubject<any>(null);
  AssociationStatus$ = this.AssociationSubject.asObservable();

  triggerAdminAssociation(addassociation: any): void {
    //console.log('addassociation', addassociation);

    this.AssociationSubject.next(addassociation);
  }


  private AdminAdServiceSubject = new BehaviorSubject<any>(null);
  AdminAdServiceStatus$ = this.AdminAdServiceSubject.asObservable();

  triggerAdServiceCreated(adcreated: any): void {
    //console.log('addassociation', addassociation);

    this.AdminAdServiceSubject.next(adcreated);
  }

  private AdminadSpaceDeleteSubject = new BehaviorSubject<any>(null);
  AdminAdSapaceDeleteStatus$ = this.AdminadSpaceDeleteSubject.asObservable();

  triggerAdminAdSpaceDelete(addelete: any): void {
    this.AdminadSpaceDeleteSubject.next(addelete);
  }


  private AdminDeactiveAssociationSubject = new BehaviorSubject<any>(null);
  AdminDeactiveAssociationStatus$ = this.AdminDeactiveAssociationSubject.asObservable();

  triggerAdminDeactiveAssociation(adddeactiveassociation: any): void {
    this.AdminDeactiveAssociationSubject.next(adddeactiveassociation);
  }
}
