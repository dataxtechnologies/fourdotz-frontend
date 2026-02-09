import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';
import { ViewRequestUserComponent } from '../../../modals/view-request-user/view-request-user.component';
import { CreateRequestUserComponent } from '../../../modals/create-request-user/create-request-user.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwnerServiceService } from '../../../services/owner/owner-service.service';
import { ShepherdService } from 'angular-shepherd';
import { DashboardLayoutService } from '../../../layouts/dashboard-layout/dashboard-layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-requests-user',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-requests-user.component.html',
  styleUrl: './list-requests-user.component.css',
})
export class ListRequestsUserComponent {
  requestlist1;
  requestlist2: any[] = [];
  pages: any;
  tableLoading: boolean = true;
  residentType: any;

  constructor(
    private Modal: ModalService,
    private apiService: ApiserviceService,
    private OwnerService: OwnerServiceService,
    private shepherd: ShepherdService,
    private DashboardService: DashboardLayoutService,
    private router: Router,
  ) {
    this.requestlist1 = new TableService();
    this.requestlist1.initialize(this.requestlist2, 10);
  }

  ngOnInit(): void {
    this.ListRequestUser();
    this.getOwnerProperties();

    this.OwnerService.RequestUserStatus$.subscribe((res: any) => {
      if (res?.success) {
        this.ListRequestUser();
      }
    });
  }

  isImage(file: string) {
    return file.match(/\.(jpeg|jpg|png|gif)$/i);
  }

  isVideo(file: string) {
    return file.match(/\.(mp4|mov|wmv|avi)$/i);
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  getOwnerProperties() {
    this.apiService.ownerproperties<any>().subscribe({
      next: (res: any) => {
        if (res?.success && Array.isArray(res.data)) {
          this.residentType = res.data[0].resident_type;
        } else {
        }
      },
      error: () => {},
    });
  }

  OpenViewRequest(data: any) {
    this.Modal.open(ViewRequestUserComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        RequestData: data,
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  OpenCreateRequest() {
    this.Modal.open(CreateRequestUserComponent, {
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

  // ListRequestUser

  ListRequestUser() {
    this.apiService.ListRequestUser<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.requestlist2 = res.data || [];

          // Initialize TableService
          this.requestlist1.initialize(this.requestlist2, 10);

          // If backend provides pagination info
          this.pages = Array.from(
            { length: res.data?.totalPages || 1 },
            (_, i) => i + 1,
          );

          this.tableLoading = false;
        
        } else {
          this.tableLoading = false;
          this.requestlist2 = [];

          // Initialize TableService
          this.requestlist1.initialize(this.requestlist2, 10);
          //console.warn(res.message || 'Failed to load properties.');
        }
      },
      error: (err: any) => {
        this.tableLoading = false;
        this.requestlist2 = [];
        const menu = JSON.parse(sessionStorage.getItem('user_menu') || '{}');

        if (!menu.firstlistrequest) {
          this.firstrequestcreateTour();
        }

        // Initialize TableService
        this.requestlist1.initialize(this.requestlist2, 10);
        //console.error('Property list fetch failed:', err);
      },
    });
  }

  startTour() {
    const SHOULD_RUN_TOUR = true;
    if (!SHOULD_RUN_TOUR) return;

    if (this.shepherd.tourObject) {
      this.shepherd.cancel();
    }

    this.shepherd.modal = true;

    this.shepherd.defaultStepOptions = {
      scrollTo: { behavior: 'smooth', block: 'center' },
      cancelIcon: { enabled: false },
      classes: 'shepherd-dark-theme',
    };

    this.shepherd.addSteps([
      // 1️⃣ Header
      {
        id: 'request-list',
        title: 'List All Requests',
        text: 'This will List all the requests posted by the Resident.',
        attachTo: { element: '#tour-list-request', on: 'bottom' },
        buttons: [
          {
            text: 'Skip',
            classes: 'shepherd-btn-secondary',
            action: () => this.finishTourthispage(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },
      {
        id: 'request-create',
        title: 'Create All Requests',
        text: 'Click here to create the request.',
        attachTo: { element: '#tour-create-request', on: 'bottom' },
        buttons: [
          {
            text: 'Skip',
            classes: 'shepherd-btn-secondary',
            action: () => this.finishTourthispage(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },

      {
        id: 'view-request-details',
        title: 'View Request Details',
        text: 'Click here to view the request details.',
        attachTo: { element: '#tour-view-request-details', on: 'bottom' },
        buttons: [
          {
            text: 'Skip',
            classes: 'shepherd-btn-secondary',
            action: () => this.finishTourthispage(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },

      {
        id: 'view-media',
        title: 'View Request Attachments',
        text: 'Click here to view full size of the request Attachments.',
        attachTo: { element: '#tour-request-media', on: 'bottom' },
        buttons: [
          {
            text: 'Skip',
            classes: 'shepherd-btn-secondary',
            action: () => this.finishTourthispage(),
          },
          {
            text: 'Finish',
            classes: 'shepherd-btn-primary',
            action: () => this.GotoTourNextpage(),
          },
        ],
      },
    ]);

    this.shepherd.start();
  }

  firstrequestcreateTour() {
    const SHOULD_RUN_TOUR = true;
    if (!SHOULD_RUN_TOUR) return;

    if (this.shepherd.tourObject) {
      this.shepherd.cancel();
    }

    this.shepherd.modal = true;

    this.shepherd.defaultStepOptions = {
      scrollTo: { behavior: 'smooth', block: 'center' },
      cancelIcon: { enabled: false },
      classes: 'shepherd-dark-theme',
    };

    this.shepherd.addSteps([
      // 1️⃣ Header
      {
        id: 'create-request',
        title: 'Create New Request',
        text: 'Click here to create a new request.',
        attachTo: { element: '#tour-create-new-request', on: 'bottom' },
        buttons: [
          {
            text: 'Skip',
            classes: 'shepherd-btn-secondary',
            action: () => this.firstfinishTourthispage(),
          },
          {
            text: 'Finish',
            classes: 'shepherd-btn-primary',
            action: () => this.firstGotoTourNextpage(),
          },
        ],
      },
    ]);

    this.shepherd.start();
  }

  finishTourthispage() {
    this.SkipTourthispage();
    this.shepherd.complete();
  }

  GotoTourNextpage() {
    this.TourtoNextpage();
    this.shepherd.complete();
  }

  SkipTourthispage() {
    const payload = {
      menu: {
        listrequest: true,
      },
    };

    this.apiService.AddTourdatas<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.DashboardService.triggerTourApiStatusUpdate(res);
        }
      },
    });
  }

  TourtoNextpage() {
    const payload = {
      menu: {
        listrequest: true,
      },
    };

    this.apiService.AddTourdatas<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.DashboardService.triggerTourApiStatusUpdate(res);
          // this.router.navigateByUrl('/Owner/pre-visitor/list');
        }
      },
    });
  }
  firstfinishTourthispage() {
    this.firstSkipTourthispage();
    this.shepherd.complete();
  }

  firstGotoTourNextpage() {
    this.firstTourtoNextpage();
    this.shepherd.complete();
  }

  firstSkipTourthispage() {
    const payload = {
      menu: {
        firstlistrequest: true,
      },
    };

    this.apiService.AddTourdatas<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.DashboardService.triggerTourApiStatusUpdate(res);
        }
      },
    });
  }

  firstTourtoNextpage() {
    const payload = {
      menu: {
        firstlistrequest: true,
      },
    };

    this.apiService.AddTourdatas<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.DashboardService.triggerTourApiStatusUpdate(res);
          this.router.navigateByUrl('/Owner/pre-visitor/list');
        }
      },
    });
  }
}
