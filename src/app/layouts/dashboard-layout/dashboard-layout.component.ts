import { Component, HostListener } from '@angular/core';
import { SidebarItem, SIDEBAR_ITEMS } from '../../data/sidebar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Router,
  NavigationEnd,
  RouterOutlet,
  RouterModule,
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
    RouterOutlet,
    RouterModule,
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
    private modalService: ModalService,
    private ownerService: OwnerServiceService
  ) {
    // 🔥 Route tracking + submenu auto-open
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;

        this.sidebarItems.forEach((item) => {
          if (item.children) {
            item.open = item.children.some(
              (child) => child.route === this.currentRoute
            );
          }
        });
      });
  }

  ngOnInit(): void {
    if (!this.access_token || !this.user_type) {
      this.clearSessionAndRedirect('Session invalid. Please log in.');
      return;
    }

    this.getUserData(this.user_type);

    this.ownerService.OwnerUpiIdUpdatedStatus$.subscribe((updated) => {
      if (updated) {
        this.getUserData(this.user_type);
      }
    });

    this.adjustSidebarForScreen();
  }

  // ✅ Sidebar toggle
  toggleSidebar() {
    this.sidebarClosed = !this.sidebarClosed;

    if (this.sidebarClosed) {
      this.sidebarItems.forEach((item) => (item.open = false));
    }
  }

  // ✅ FIXED HostListener (NO ERROR)
  @HostListener('window:resize')
  onResize() {
    this.adjustSidebarForScreen();
  }

  adjustSidebarForScreen() {
    this.sidebarClosed = window.innerWidth < 1024;
  }

  // ✅ ONE submenu at a time
  toggleSubmenu(clickedItem: SidebarItem) {
    this.sidebarItems.forEach((item) => {
      if (item !== clickedItem) {
        item.open = false;
      }
    });

    clickedItem.open = !clickedItem.open;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const isNearBottom = windowHeight + scrollTop + 100 >= docHeight;

    if (isNearBottom) {
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

  logout() {
    this.apiService.logoutApi<any>().subscribe({
      next: (res) => {
        this.clearSessionAndRedirect(res?.message || 'Logged out');
      },
      error: () => {
        this.clearSessionAndRedirect();
      },
    });
  }

  getUserData(type: any) {
    this.loadingUserData = true;

    this.apiService.UserInfo<any>(type).subscribe({
      next: (res) => {
        if (res?.success) {
          localStorage.setItem('userdata', JSON.stringify(res.data));
        }
        this.loadingUserData = false;
      },
      error: () => (this.loadingUserData = false),
    });
  }

  private clearSessionAndRedirect(message: string = 'Session expired') {
    localStorage.clear();
    this.toastr.info(message, 'Info');
    this.router.navigateByUrl('/auth/sign-in');
  }

  logoutmodal() {
    this.modalService.open(LogoutModalComponent, {
      modal: { enter: 'enter-going-down 0.3s', leave: 'fade-out 0.5s' },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
  }

  UPIidAddModal() {
    this.modalService.open(AddUPIIdComponent, {
      modal: { enter: 'enter-going-down 0.3s', leave: 'fade-out 0.5s' },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
  }
}
