import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardLayoutService {
  private DashboardTourApiSubject = new BehaviorSubject<any>(null);
  DashboardTourApiStatus$ = this.DashboardTourApiSubject.asObservable();

  triggerTourApiStatusUpdate(TourApi: any): void {
    this.DashboardTourApiSubject.next(TourApi);
  }
}
