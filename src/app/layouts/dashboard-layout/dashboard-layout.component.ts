import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Router,
  NavigationEnd,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs/operators';

import { SidebarItem, SIDEBAR_ITEMS } from '../../data/sidebar';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'ngx-modal-ease';
import { LogoutModalComponent } from '../../modals/logout-modal/logout-modal.component';
import { AddUPIIdComponent } from '../../modals/add-upi-id/add-upi-id.component';
import { OwnerServiceService } from '../../services/owner/owner-service.service';
import { AssociationServiceService } from '../../services/association/association-service.service';
import { DashboardLayoutService } from './dashboard-layout.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
    RouterOutlet,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent implements OnInit {
  /* ===============================
     SIDEBAR DATA
  =============================== */
  sidebarItems: SidebarItem[] = SIDEBAR_ITEMS;
  currentRoute = '';

  searchText = '';
  suggestions: SidebarItem[] = [];

  /* ===============================
     SIDEBAR STATE
  =============================== */
  asidebarClosed = false;
  isTabletOrMobile = false;
  

  /* ===============================
     USER PROFILE DROPDOWN
  =============================== */
  profileMenuOpen = false;

  /* ===============================
     FOOTER
  =============================== */
  currentYear: number = new Date().getFullYear();

  /* ===============================
     USER DATA
  =============================== */
  user_type = localStorage.getItem('user_type');
  access_token = localStorage.getItem('access_token');
  user_id = localStorage.getItem('user_id');

  loadingUserData = false;
  userdata : any

  username : any

  constructor(
    private router: Router,
    private apiService: ApiserviceService,
    private toastr: ToastrService,
    private modalService: ModalService,
    private ownerService: OwnerServiceService,
    private DashboardLayoutService: DashboardLayoutService,
  ) {
    /* CLOSE SIDEBAR ON ROUTE CHANGE (MOBILE) */
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.syncSidebarWithRoute();

        if (this.isTabletOrMobile) {
          this.asidebarClosed = true;
        }
      });
  }

  /* ===============================
     INIT
  =============================== */
  ngOnInit(): void {
    if (!this.access_token || !this.user_type) {
      this.clearSessionAndRedirect();
      return;
    }

    this.getUserData(this.user_type);
    this.adjustSidebarForScreen();

    this.ownerService.OwnerUpiIdUpdatedStatus$.subscribe((updated) => {
      if (updated) {
        this.getUserData(this.user_type);
      }
    });
const storedUser = localStorage.getItem('userdata');

this.userdata = storedUser ? JSON.parse(storedUser) : null;
this.username = this.userdata?.name || '';

    // this.DashboardLayoutService.DashboardTourApiStatus$.subscribe((TourApi) => {
    //   if (TourApi) {
    //     this.getusertourdata();
    //   }
    // });

    this.syncSidebarWithRoute();
    // this.getusertourdata();
  }

  /* ===============================
     RESPONSIVE
  =============================== */
  @HostListener('window:resize')
  onResize(): void {
    this.adjustSidebarForScreen();
  }

  adjustSidebarForScreen(): void {
    if (window.innerWidth < 1280) {
      this.isTabletOrMobile = true;
      this.asidebarClosed = true;
    } else {
      this.isTabletOrMobile = false;
      this.asidebarClosed = false;
    }
  }

  toggleAsidebar(): void {
    this.asidebarClosed = !this.asidebarClosed;
  }

  closeAsidebar(): void {
    this.asidebarClosed = true;
  }

  /* ===============================
     SIDEBAR LOGIC (IMPORTANT)
  =============================== */
  toggleSubmenuExclusive(item: SidebarItem): void {
    this.sidebarItems.forEach((i) => {
      if (i !== item) i.open = false;
    });
    item.open = !item.open;
  }

  closeAllSubmenus(): void {
    this.sidebarItems.forEach((i) => (i.open = false));
  }

  /* ===============================
     API / USER
  =============================== */
  getUserData(role: any): void {
    this.apiService.UserInfo<any>(role).subscribe({
      next: (res) => {
        if (res?.success) {
          const userdata = res.data;
          
          if (role === 'association' && res.data.document_uploaded === false) {
            this.router.navigateByUrl('/onboarding/user-data');
          }
          
          localStorage.setItem('userdata', JSON.stringify(userdata));
          if (
            (role === 'owner' || role === 'tenant') &&
            userdata.upi_submit_status === false
          ) {
            this.openUPIModal();
          }
        }
      },
    });
  }

  /* ===============================
     PROFILE / LOGOUT
  =============================== */
  profileredirect(): void {
    this.router.navigateByUrl('/Account/profile');
  }

  logoutmodal(): void {
    this.modalService.open(LogoutModalComponent, {
      modal: { enter: 'enter-going-down 0.3s', leave: 'fade-out 0.4s' },
      overlay: { leave: 'fade-out 0.4s' },
      actions: { click: false, escape: false },
    });
  }

  openUPIModal(): void {
    this.modalService.open(AddUPIIdComponent, {
      modal: { enter: 'enter-going-down 0.3s', leave: 'fade-out 0.4s' },
      overlay: { leave: 'fade-out 0.4s' },
      actions: { click: false, escape: false },
    });
  }

  clearSessionAndRedirect(message: string = 'Session expired'): void {
    localStorage.clear();
    this.toastr.info(message, 'Info');
    this.router.navigateByUrl('/auth/sign-in');
  }

  private syncSidebarWithRoute(): void {
    const currentUrl = this.router.url;

    this.sidebarItems.forEach((item) => {
      if (item.children && item.allowedRole === this.user_type) {
        // check if any child route matches
        const hasActiveChild = item.children.some((child) =>
          currentUrl.startsWith(child.route!),
        );

        item.open = hasActiveChild;
      } else {
        item.open = false;
      }
    });
  }

  // getusertourdata(): void {
  //   this.apiService.getTourdatas<any>().subscribe({
  //     next: (res) => {
  //       if (res?.success && res?.data?.menu) {
  //         // 👉 Store menu object in sessionStorage
  //         sessionStorage.setItem('user_menu', JSON.stringify(res.data.menu));

  //         console.log('Menu stored in sessionStorage:', res.data.menu);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching tour data', err);
  //     },
  //   });
  // }


  onSearchChange() {

    const term = this.searchText.toLowerCase().trim();

    if (!term) {
      this.suggestions = [];
      return;
    }

    const roleMenus = SIDEBAR_ITEMS.filter(
      m => m.allowedRole === this.user_type
    );

    const flatMenus = this.flattenMenus(roleMenus);

    this.suggestions = flatMenus.filter(item => {

      const labelMatch =
        item.label.toLowerCase().includes(term);

      const keywordMatch =
        item.keywords?.some(k =>
          k.toLowerCase().includes(term)
        );

      return labelMatch || keywordMatch;

    }).slice(0, 6);
  }

  flattenMenus(items: SidebarItem[]): SidebarItem[] {
    let list: SidebarItem[] = [];

    for (const item of items) {
      list.push(item);
      if (item.children) {
        list.push(...item.children);
      }
    }

    return list;
  }

  goToSuggestion(item: SidebarItem) {
    if (item.route) {
      this.router.navigate([item.route]);
      this.searchText = '';
      this.suggestions = [];
    }
  }

  // startVoiceSearch() {
  //   const SpeechRecognition =
  //     (window as any).webkitSpeechRecognition;

  //   if (!SpeechRecognition) {
  //     alert('Voice search not supported');
  //     return;
  //   }

  //   const recognition = new SpeechRecognition();
  //   recognition.lang = 'en-IN';

  //   recognition.onresult = (event: any) => {
  //     this.searchText =
  //       event.results[0][0].transcript;
  //     this.onSearchChange();
  //   };

  //   recognition.start();
  // }
}
