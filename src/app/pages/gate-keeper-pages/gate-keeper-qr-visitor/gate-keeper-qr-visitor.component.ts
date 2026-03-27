import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { VisitorEntryFormComponent } from '../../../modals/visitor-entry-form/visitor-entry-form.component';
import { VisitorExitFormComponent } from '../../../modals/visitor-exit-form/visitor-exit-form.component';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { ViewVisitorDetailsComponent } from '../../../modals/view-visitor-details/view-visitor-details.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gate-keeper-qr-visitor',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './gate-keeper-qr-visitor.component.html',
  styleUrl: './gate-keeper-qr-visitor.component.css'
})
export class GateKeeperQrVisitorComponent {
  maintenancelist2: any[] = [];
  maintenancelist1: any;
  pages: any;
  tableLoading = true;
  usertype = localStorage.getItem('user_type');

  /* ===========================
     FILTER FORM
     =========================== */
  filterForm = new FormGroup({
    visitorSearch: new FormControl(''),
    residentSearch: new FormControl(''),
    propertyNo: new FormControl(''),
    gateNo: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
  });

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private Apiservice: ApiserviceService,
    private Acroute: ActivatedRoute,
    private AssociationService: AssociationServiceService,
    private toast: ToastrService
  ) {
    this.maintenancelist1 = new TableService();
  }

  ngOnInit(): void {
    this.ListAllVisitors('qr_code_entry');

    // Trigger filter whenever form changes
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.AssociationService.GateKeeperStatus$.subscribe((gatekeeper) => {
      if (gatekeeper) this.ListAllVisitors('qr_code_entry');
    });
  }

  /* ===========================
     FETCH VISITORS LIST
     =========================== */
  ListAllVisitors(data: any) {
    this.Apiservice.ListVisitorinGateKeeper<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.maintenancelist2 = res.data;
          this.maintenancelist1.initialize(this.maintenancelist2, 10);
          this.pages = Array.from(
            { length: this.maintenancelist1.totalPages },
            (_, i) => i + 1
          );
        } else {
          this.maintenancelist2 = [];
          this.maintenancelist1.initialize([], 10);
        }
        this.tableLoading = false;
      },
      error: () => {
        this.maintenancelist2 = [];
        this.maintenancelist1.initialize([], 10);
        this.tableLoading = false;
      },
    });
  }

  ResendVisitorRequest(data: any, item: any) {
    if (item.isLoading) return;
    item.isLoading = true;

    const payload = {
      visitor_no: data,
    };
    this.Apiservice.ResendVisitorRequest<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          item.isLoading = false;
          this.toast.success(res.message, 'Success');
          this.ListAllVisitors('qr_code_entry');
        } else {
          item.isLoading = false;
          this.toast.warning(res.message, 'Warning');
        }
        this.tableLoading = false;
      },
      error: (err: any) => {
        item.isLoading = false;
        this.toast.error(err?.error.error?.message || 'Failed');
        this.tableLoading = false;
      },
    });
  }

  /* ===========================
     APPLY FILTERS
     =========================== */
  applyFilters() {
    let data = [...this.maintenancelist2];

    const {
      visitorSearch,
      residentSearch,
      propertyNo,
      gateNo,
      fromDate,
      toDate,
    } = this.filterForm.value;

    // Visitor name / phone filter
// Visitor name / phone / visitor code filter
if (visitorSearch) {
  const v = visitorSearch.toLowerCase();
  const numericSearch = visitorSearch.replace(/\D/g, ''); // only numbers

  data = data.filter((item) => {
    return (
      item.visitor_name?.toLowerCase().includes(v) || // name
      item.visitor_mobile?.toString().includes(v) || // mobile
      item.visitor_no?.toLowerCase().includes(v) || // full visitor code
      item.visitor_no?.slice(-4).includes(numericSearch) // 🔥 last 4 digit match
    );
  });
}

    // Resident name / phone filter
    if (residentSearch) {
      const r = residentSearch.toLowerCase();
      data = data.filter(
        (item) =>
          item.resident_name?.toLowerCase().includes(r) ||
          item.resident_mobile?.toString().includes(r)
      );
    }

    // Property No filter
    if (propertyNo) {
      const p = propertyNo.toLowerCase();
      data = data.filter((item) => item.property_no?.toLowerCase().includes(p));
    }

    // Gate number filter
    if (gateNo) {
      data = data.filter((item) => item.gate?.toString() === gateNo);
    }

    // Date Range: From Date
    if (fromDate) {
      const from = new Date(fromDate).getTime();
      data = data.filter((item) => item.created_time.$date >= from);
    }

    // Date Range: To Date
    if (toDate) {
      const to = new Date(toDate).setHours(23, 59, 59, 999);
      data = data.filter((item) => item.created_time.$date <= to);
    }

    // Update pagination with filtered data
    this.maintenancelist1.initialize(data, 10);
  }

  /* ===========================
     RESET FILTERS
     =========================== */
  resetFilters() {
    this.filterForm.reset();
    this.applyFilters();
  }

  visitorEntryModal(data: any) {
    this.ModalService.open(VisitorEntryFormComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      data: { visitorNo: data },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
    // this.ModalService.open(VisitorEntryFormComponent);
  }

  VisitorExit(data: any) {
    this.ModalService.open(VisitorExitFormComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      data: { visitorNo: data },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
    // this.ModalService.open(VisitorEntryFormComponent);
  }
  ViewVisitor(data: any) {
    this.ModalService.open(ViewVisitorDetailsComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      data: { visitor_details: data },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
    // this.ModalService.open(VisitorEntryFormComponent);
  }


  formatStatus(text: string): string {
    if (!text) return '';

    return text
      .replace(/_/g, ' ') // replace _ with space
      .replace(/\b\w/g, char => char.toUpperCase()); // capitalize each word
  }

    isResendAllowed(item: any): boolean {
  return item.visitor_status === 'waiting_for_approval' || 
         item.visitor_status === 'not_approved';
}

isMarkEntryAllowed(item: any): boolean {
  return item.visitor_status === 'approved' || 
         item.visitor_status === 'not_entered';
}

isMarkExitAllowed(item: any): boolean {
  return item.visitor_status === 'entered';
}
}
