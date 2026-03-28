import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-owner-waiting',
  imports: [CommonModule],
  templateUrl: './owner-waiting.component.html',
  styleUrl: './owner-waiting.component.css'
})
export class OwnerWaitingComponent {
  isRefreshing = false;
  lastChecked: Date = new Date();
  dots = [0, 1, 2];
  statusSteps = [
    { label: 'Request Submitted', done: true },
    { label: 'Under Review', done: true },
    { label: 'Awaiting Approval', done: false, active: true },
    { label: 'Access Granted', done: false },
  ];

  private refreshTimer: ReturnType<typeof setTimeout> | null = null;
  private tickInterval: ReturnType<typeof setInterval> | null = null;
  elapsed = 0; // seconds since last check

  user_type = localStorage.getItem('user_type');
  constructor(
    private apiService: ApiserviceService,
    private router: Router,
    private Toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.startElapsedTick();
  }

  ngOnDestroy(): void {
    if (this.refreshTimer) clearTimeout(this.refreshTimer);
    if (this.tickInterval) clearInterval(this.tickInterval);
  }

  private startElapsedTick(): void {
    this.tickInterval = setInterval(() => {
      this.elapsed++;
    }, 1000);
  }

  get elapsedLabel(): string {
    if (this.elapsed < 60) return `${this.elapsed}s ago`;
    const mins = Math.floor(this.elapsed / 60);
    return `${mins}m ago`;
  }

  onRefresh(): void {
    if (this.isRefreshing) return;
    this.isRefreshing = true;

    this.refreshTimer = setTimeout(() => {
      this.isRefreshing = false;
      this.lastChecked = new Date();
      this.elapsed = 0;
    }, 2000);
  }


  getUserData(role: any): void {
    this.isRefreshing = true; // ✅ START LOADER

    this.apiService.UserInfo<any>(role).subscribe({
      next: (res) => {
        this.isRefreshing = false; // ✅ STOP LOADER

        if (res?.success) {
          const userdata = res.data;

          if (role === 'association' && res.data.document_uploaded === false) {
            this.router.navigateByUrl('/onboarding/associations/get-started');
          }

          localStorage.setItem('userdata', JSON.stringify(userdata));

          const usertype = userdata.user_type;

          // ✅ NEW PRIORITY CHECK (FIRST)
          if ((userdata.property_merge_status !== 'request_sent') && (role === 'owner' || role === 'tenant') ) {
            if(usertype === 'owner'){
              this.router.navigateByUrl('/Owner/Dashboard');
            }
            if(usertype === 'tenant'){
              this.router.navigateByUrl('/Tenant/Dashboard');
            }
            // this.router.navigateByUrl('/Owner/Dashboard');
           
          }

          // // ✅ EXISTING FLOW (UNCHANGED)
          // if (
          //   (role === 'owner' || role === 'tenant') &&
          //   userdata.upi_submit_status === false
          // ) {
          //   // this.openUPIModal();
          // }
        }
      },
      error: () => {
        this.isRefreshing = false; // safety
      },
    });
  }
}
