import { Component, HostListener } from '@angular/core';
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
import { ModalService } from 'ngx-modal-ease';
import { LogoutModalComponent } from '../../modals/logout-modal/logout-modal.component';
import { AddUPIIdComponent } from '../../modals/add-upi-id/add-upi-id.component';
import { OwnerServiceService } from '../../services/owner/owner-service.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
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
  sidebarClosed = false;
  currentRoute = '';
  loadingUserData = false;
  showFooter = false;
  footerTimeout: any;

  user_type = localStorage.getItem('user_type');
  user_id = localStorage.getItem('user_id');
  access_token = localStorage.getItem('access_token');

  constructor(
    private router: Router,
    private apiService: ApiserviceService,
    private toastr: ToastrService,
    private ModalService: ModalService,
    private OwnerService: OwnerServiceService
  ) {
    // Track route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  ngOnInit(): void {
    if (!this.access_token || !this.user_type) {
      this.clearSessionAndRedirect('Session invalid. Please log in.');
    } else {
      this.getUserData(this.user_type);
    }

    this.OwnerService.OwnerUpiIdUpdatedStatus$.subscribe((UpdateUPI) => {
      if (UpdateUPI) {
        this.getUserData(this.user_type);
      }
    });

    this.adjustSidebarForScreen(); // run on page load
  }

  // Toggle sidebar
  toggleSidebar() {
    this.sidebarClosed = !this.sidebarClosed;

    // NEW 🔥 If sidebar shrinks → close all submenus
    if (this.sidebarClosed) {
      this.sidebarItems.forEach((item) => (item.open = false));
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustSidebarForScreen();
  }

  adjustSidebarForScreen() {
    if (window.innerWidth < 1024) {
      // Auto collapse for tablet + mobile
      this.sidebarClosed = true;
    } else {
      // Desktop normal
      this.sidebarClosed = false;
    }
  }

  // NEW 🔥 toggle submenu
  toggleSubmenu(item: SidebarItem) {
    item.open = !item.open;
  }

  // Footer show/hide on scroll
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const IS_NEAR_BOTTOM = windowHeight + scrollTop + 100 >= docHeight;

    if (IS_NEAR_BOTTOM) {
      clearTimeout(this.footerTimeout);
      this.showFooter = true;
    } else {
      clearTimeout(this.footerTimeout);
      this.footerTimeout = setTimeout(() => {
        this.showFooter = false;
      }, 1000);
    }
  }

  profileredirect() {
    this.router.navigateByUrl('Account/profile');
  }

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
        this.toastr.error(
          err?.error?.error?.message || 'Logout failed',
          'Failed'
        );
        this.clearSessionAndRedirect();
      },
    });
  }

  public getUserData(data: any) {
    if (this.user_type === 'association') {
      this.loadingUserData = true;
    }

    this.apiService.UserInfo<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          const userdata = res.data;
          localStorage.setItem('userdata', JSON.stringify(userdata));

          if (this.user_type === 'association') {
            if (userdata.document_uploaded === false) {
              this.router.navigateByUrl('/onboarding/user-data');
            }
          } else if (this.user_type === 'owner') {
            if (userdata.upi_submit_status === false) {
              this.UPIidAddModal();
            }
          }
        }

        this.loadingUserData = false;
      },

      error: (err: any) => {
        this.loadingUserData = false;
      },
    });
  }

  private clearSessionAndRedirect(message: string = 'Session expired') {
    localStorage.clear();
    this.toastr.info(message, 'Info');
    this.router.navigateByUrl('/auth/sign-in');
  }

  logoutmodal() {
    this.ModalService.open(LogoutModalComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
  }

  UPIidAddModal() {
    this.ModalService.open(AddUPIIdComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: {
        click: false,
        escape: false,
      },
    });
  }
}
