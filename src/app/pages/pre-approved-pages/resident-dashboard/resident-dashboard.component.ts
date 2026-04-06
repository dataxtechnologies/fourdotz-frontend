import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resident-dashboard',
  imports: [CommonModule],
  templateUrl: './resident-dashboard.component.html',
  styleUrl: './resident-dashboard.component.css'
})
export class ResidentDashboardComponent {
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
  usertype: any;
  originaluserdata : any
  constructor(
    private apiService: ApiserviceService,
    private router: Router,
    private Toast: ToastrService,
    private ActivatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.startElapsedTick();
    this.getUserData(this.user_type);

    console.log('user_type', this.user_type);

    // this.ActivatedRoute.params.subscribe((params) => {
    //   this.usertype = params['usertype'] || null;
    // });
    
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

          this.originaluserdata = res.data;
          console.log('userdata', this.originaluserdata);
          
          const usertype = this.originaluserdata.user_type;

          // ✅ NEW PRIORITY CHECK (FIRST)
          if(this.originaluserdata.property_merge_status == 'request_approved'  && this.originaluserdata.association_status === true)  {
            console.log(this.originaluserdata.property_merge_status, 'userdata.property_merge_status');
            console.log(usertype, 'usertype');
            
            if(role === 'owner'){
              this.router.navigateByUrl('/Owner/Dashboard');
            }
           else if(role === 'tenant'){
              this.router.navigateByUrl('/Tenant/Dashboard');
            }
            // this.router.navigateByUrl('/Owner/Dashboard');
           
          }

          if((role === 'service_admin' || role === 'gate_keeper') && this.originaluserdata.association_status === false){
            this.router.navigateByUrl('/helper-users/inactivate');

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

gotosupport() {
  window.open('/contact-us/enquiry-now', '_blank');
}
}
