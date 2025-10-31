import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdmindataService {
  constructor() {}

  private AssociationSubject = new BehaviorSubject<any>(null);
  AssociationStatus$ = this.AssociationSubject.asObservable();

  triggerAdminAssociation(addassociation: any): void {
    //console.log('addassociation', addassociation);
    
    this.AssociationSubject.next(addassociation);
  }
}
