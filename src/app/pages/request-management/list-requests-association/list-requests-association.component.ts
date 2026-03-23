import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ModalService } from 'ngx-modal-ease';
import { ToastrService } from 'ngx-toastr';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CreateAdminComponent } from '../../../modals/create-admin/create-admin.component';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { ViewRequestAdminComponent } from '../../../modals/view-request-admin/view-request-admin.component';
import { ShepherdService } from 'angular-shepherd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-requests-association',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-requests-association.component.html',
  styleUrls: ['./list-requests-association.component.css'],
})
export class ListRequestsAssociationComponent implements OnInit {

  // ================= REQUEST LIST =================
  RequestList1 = new TableService();
  RequestList2: any[] = [];
  filteredRequests: any[] = [];
  tableLoading = true;

  // ================= ADMIN LIST =================
  adminList1 = new TableService();
  adminList2: any[] = [];
  adminLoading = true;

  // ================= FILTER FORM =================
  filterForm!: FormGroup;

  constructor(
    private api: ApiserviceService,
    private modal: ModalService,
    private toast: ToastrService,
    private AssociationService: AssociationServiceService,
    private shepherd: ShepherdService,
    private fb: FormBuilder,
    private router: Router
  ) {

    // initialize filter form
    this.filterForm = this.fb.group({
      search: [''],
      workStatus: [''],
      residentType: ['']
    });

  }

  viewrequestpage(reqId: any) {
    this.router.navigateByUrl(`Association/request-management/view/${reqId}`);
  }

  ngOnInit(): void {

    this.ListRequests();
    this.ListServiceAdmin();

    // filter changes
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    // refresh admin list
    this.AssociationService.CreateAdminStatus$.subscribe((res: any) => {
      if (res?.success) this.ListServiceAdmin();
    });

    // refresh requests after status change
    this.AssociationService.ChangeRequeststatusStatus$.subscribe((res: any) => {
      if (res?.success) this.ListRequests();
    });
  }

  /* ================= FETCH ALL REQUESTS ================= */

  ListRequests() {
    this.tableLoading = true;

    this.api.ListAllRequestinAssociation<any>().subscribe({
      next: (res) => {

        this.RequestList2 = res.data || [];

        // initialize filtered
        this.filteredRequests = [...this.RequestList2];

        this.RequestList1.initialize(this.filteredRequests, 10);

        this.tableLoading = false;
      },
      error: () => {
        this.RequestList2 = [];
        this.filteredRequests = [];
        this.RequestList1.initialize([], 10);
        this.tableLoading = false;
      },
    });
  }

  /* ================= APPLY FILTER ================= */

  applyFilters() {

    if (!this.RequestList2) return;

    const { search, workStatus, residentType } = this.filterForm.value;

    this.filteredRequests = this.RequestList2.filter((req: any) => {

      const searchText = search?.toLowerCase() || '';

      const matchesSearch =
        !searchText ||
        req.property_no?.toLowerCase().includes(searchText) ||
        req.title?.toLowerCase().includes(searchText) ||
        req.resident_name?.toLowerCase().includes(searchText) ||
        req.resident_mobile?.toLowerCase().includes(searchText);

      const matchesStatus =
        !workStatus || req.work_status === workStatus;

      const matchesResidentType =
        !residentType || req.user_type === residentType;

      return matchesSearch && matchesStatus && matchesResidentType;
    });

    this.RequestList1.initialize(this.filteredRequests, 10);
  }

  /* ================= RESET FILTER ================= */

resetFilters() {
  this.filterForm.reset({
    search: '',
    workStatus: '',
    residentType: ''
  });

  this.filteredRequests = [...this.RequestList2];
  this.RequestList1.initialize(this.filteredRequests, 10);
}

  /* ================= FETCH ADMINS ================= */

  ListServiceAdmin() {
    this.adminLoading = true;

    this.api.ListServiceAdmin<any>().subscribe({
      next: (res) => {
        if (res?.success && Array.isArray(res.data)) {
          this.adminList2 = res.data;
          this.adminList1.initialize(this.adminList2, 10);
        } else {
          this.adminList2 = [];
          this.adminList1.initialize([], 10);
        }
        this.adminLoading = false;
      },
      error: () => {
        this.adminList2 = [];
        this.adminList1.initialize([], 10);
        this.adminLoading = false;
      },
    });
  }

  /* ================= CREATE ADMIN ================= */

  OpenCreateAdmin() {
    this.modal.open(CreateAdminComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
  }

  /* ================= VIEW REQUEST ================= */

  OpenViewRequest(item: any) {
    this.modal.open(ViewRequestAdminComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      data: {
        RequestData: item,
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
  }

  /* ================= MEDIA CHECK ================= */

  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|webp)$/i.test(url);
  }

  isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(url);
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  /* ================= SHEPHERD TOUR ================= */

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
      {
        id: 'request-list',
        title: 'Request List',
        text: 'This list shows all the requests created by the association.',
        attachTo: { element: '#tour-request-list', on: 'bottom' },
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
            text: 'Finish',
            classes: 'shepherd-btn-primary',
            action: () => this.GotoTourNextpage(),
          },
        ],
      },
    ]);

    this.shepherd.start();
  }

  finishTourthispage() {
    this.shepherd.complete();
  }

  GotoTourNextpage() {
    this.shepherd.complete();
  }
}
