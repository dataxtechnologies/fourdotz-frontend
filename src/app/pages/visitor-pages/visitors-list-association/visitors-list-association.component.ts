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

@Component({
  selector: 'app-visitors-list-association',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './visitors-list-association.component.html',
  styleUrl: './visitors-list-association.component.css',
})
export class VisitorsListAssociationComponent {
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
    private Acroute: ActivatedRoute
  ) {
    this.maintenancelist1 = new TableService();
  }

  ngOnInit(): void {
    this.ListAllVisitors();

    // Trigger filter whenever form changes
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  /* ===========================
     FETCH VISITORS LIST
     =========================== */
  ListAllVisitors() {
    this.Apiservice.ListAllVisitors<any>().subscribe({
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
    if (visitorSearch) {
      const v = visitorSearch.toLowerCase();
      data = data.filter(
        (item) =>
          item.visitor_name?.toLowerCase().includes(v) ||
          item.visitor_mobile?.toString().includes(v)
      );
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
}
