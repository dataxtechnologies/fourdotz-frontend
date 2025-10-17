import { Component } from '@angular/core';
import { SidebarItem, SIDEBAR_ITEMS } from '../../data/sidebar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  NavigationEnd,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  sidebarItems: SidebarItem[] = SIDEBAR_ITEMS;
  sidebarClosed = true;
  currentRoute = '';
  loadingUserData = false; // flag to control loader visibility


  user_type = sessionStorage.getItem('user_type');
  user_id = sessionStorage.getItem('user_id');
  access_token = sessionStorage.getItem('access_token');

  constructor(
    private router: Router,
    private apiService: ApiserviceService,
    private toastr: ToastrService
  ) {
    // Track the current route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  ngOnInit(): void {
    // Check token before calling API
    if (!this.access_token || !this.user_type) {
      this.clearSessionAndRedirect('Session invalid. Please log in.');
    } else {
      this.getUserData(this.user_type);
    }
  }

  // Toggle sidebar
  toggleSidebar() {
    this.sidebarClosed = !this.sidebarClosed;
  }

  // Profile redirect
  profileredirect() {
    this.router.navigateByUrl('Account/profile');
  }

  // Logout function
  logout(): void {
    this.apiService.logoutApi<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.clearSessionAndRedirect(
            res.message || 'Logged out successfully'
          );
        } else {
          this.toastr.error(res.message || 'Logout failed', 'Failed');
        }
      },
      error: (err: any) => {
        console.error('Logout failed:', err);
        this.toastr.error(
          err?.error?.error?.message || 'Logout failed',
          'Failed'
        );
        this.clearSessionAndRedirect();
      },
    });
  }

  // Get user data with proper token
  getUserData(data: any) {
     if (this.user_type === 'association') {
    this.loadingUserData = true; // show loader before API call
  }
    this.apiService.UserInfo<any>(data).subscribe({
      next: (res: any) => {
      if (res?.success) {
        const userdata = res.data;
        sessionStorage.setItem('userdata', JSON.stringify(userdata));

        if (this.user_type === 'association') {
          if (userdata.document_uploaded === false) {
            this.router.navigateByUrl('/onboarding/user-data');
          } 
        }
      }

      // ✅ hide loader after check completes (success or not)
      this.loadingUserData = false;
    },

      error: (err: any) => {
        console.log('tata');
        // this.tableLoading = false;
        console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  // Clear session and redirect to login
  private clearSessionAndRedirect(message: string = 'Session expired') {
    sessionStorage.clear();
    this.toastr.info(message, 'Info');
    this.router.navigateByUrl('/auth/sign-in');
  }
}
