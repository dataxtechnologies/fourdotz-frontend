import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OwnerServiceService {
  constructor() {}

  private modalStatus = new BehaviorSubject<string>('');
  currenmodelStatus = this.modalStatus.asObservable();

  triggerEditData(CashOut: any): void {
    this.modalStatus.next(CashOut);
  }
}
