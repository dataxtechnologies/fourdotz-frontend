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
  sidebarClosed = true; // Sidebar starts closed
  currentRoute = ''; // Track active route

  user_type = sessionStorage.getItem('user_type'); // Owner , superadmin , association , Tenant
  // user_type = 'hoa_admin'; // Owner , super_admin , hoa_admin , Tenant
  user_id = sessionStorage.getItem('user_id'); // Owner , superadmin , association , Tenant

  constructor(private router: Router, private apiService: ApiserviceService) {
    // Track the current route for active menu highlighting
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUserData(this.user_id)
  }

  profileredirect(){
    this.router.navigateByUrl('Account/profile')
  }

  logout(): void {
    this.apiService.logoutApi<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          // ✅ Clear all session storage
          sessionStorage.clear();

          // ✅ Navigate to sign-in
          this.router.navigateByUrl('/auth/sign-in');

          // ✅ Optional: show success toast
          console.log(res.message || 'Logged out successfully');
        } else {
          // ❌ Logout failed
          alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        console.error('Logout failed:', err);
        alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  getUserData(data : any) {
    this.apiService.getUserData<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          const userdata = res.data;
          // if(userdata.document_uploaded === false){
          //   this.router.navigateByUrl('/onboarding/user-data')
          // }
sessionStorage.setItem('userdata', JSON.stringify(userdata));
        } else {
          // this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        // this.tableLoading = false;
        console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  toggleSidebar() {
    this.sidebarClosed = !this.sidebarClosed;
  }
}
