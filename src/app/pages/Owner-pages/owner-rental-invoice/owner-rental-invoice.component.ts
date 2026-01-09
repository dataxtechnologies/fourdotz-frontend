import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { GenerateMaintenanceComponent } from '../../../modals/generate-maintenance/generate-maintenance.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GenerateRentalInvoiceComponent } from '../../../modals/generate-rental-invoice/generate-rental-invoice.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { ChangePaidStatusComponent } from '../../../modals/change-paid-status/change-paid-status.component';
import { OwnerServiceService } from '../../../services/owner/owner-service.service';

@Component({
  selector: 'app-owner-rental-invoice',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './owner-rental-invoice.component.html',
  styleUrl: './owner-rental-invoice.component.css',
})
export class OwnerRentalInvoiceComponent {
  filterForm!: FormGroup;
  properties: any[] = [];
  filteredProperties: any[] = [];
  rentalinvoicelist2: any;
  rentalinvoicelist1;
  pages: any;
  tableLoading = true;
  isTenantPresent: boolean = false;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private OwnerService: OwnerServiceService
  ) {
    this.rentalinvoicelist1 = new TableService();
    this.rentalinvoicelist1.initialize(this.rentalinvoicelist2, 12);
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      status: [''], // Paid, Pending, Overdue
      residentSearch: [''], // Name or Phone
      fromDate: [''], // From Date
      toDate: [''], // To Date
    });
    this.propertylist();
    this.RentalInvoicelistinowner();
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.OwnerService.RentalPaidStatus$.subscribe((PaidRental) => {
      if (PaidRental) {
        this.RentalInvoicelistinowner();
      }
    });

    this.OwnerService.RentalInvoiceStatus$.subscribe((GeneratedInvoice) => {
      if (GeneratedInvoice) {
        this.RentalInvoicelistinowner();
      }
    });

    // this.filteredProperties = [...this.rentalinvoicelist2];
  }

applyFilters(): void {
  const { status, residentSearch, fromDate, toDate } = this.filterForm.value;

  const filtered = this.rentalinvoicelist2.filter((p: any) => {

    // ✅ Status filter
    const matchStatus =
      !status ||
      (status === 'Paid' && p.payment_status === true) ||
      (status === 'Pending' && p.payment_status === false);

    // ✅ Name / Phone filter
    const search = residentSearch?.toLowerCase() || '';
    const matchResident =
      !search ||
      p.tenant_name?.toLowerCase().includes(search) ||
      p.tenant_mobile?.includes(search);

    // ✅ Date filter
    const invoiceDate = new Date(p.created_time?.$date);

    const matchFromDate =
      !fromDate || invoiceDate >= new Date(fromDate);

    const matchToDate =
      !toDate || invoiceDate <= new Date(toDate);

    return matchStatus && matchResident && matchFromDate && matchToDate;
  });

  // 🔥 IMPORTANT: rebind pagination to filtered data
  this.filteredProperties = filtered;

  this.rentalinvoicelist1 = new TableService();
  this.rentalinvoicelist1.initialize(this.filteredProperties, 10);
}

  resetFilters(): void {
    this.filterForm.reset();
    this.filteredProperties = [...this.rentalinvoicelist2];
  }

  viewInvoice(data: any) {
    const url = `/Global-invoice/${data}`;
    window.open(url, '_blank');
  }

  generateRental(): void {
    this.modalService.open(GenerateRentalInvoiceComponent, {
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

  changetopaidstatus(data: any) {
    this.modalService.open(ChangePaidStatusComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        invoice_id: data,
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  viewresident(): void {
    this.router.navigateByUrl(`Association/view-properties/${1}`);
  }

  RentalInvoicelistinowner() {
    this.tableLoading = true;

    this.apiService.RentalInvoicelistinowner<any>().subscribe({
      next: (res: any) => {
        try {
          if (res?.success && Array.isArray(res.data)) {
            this.rentalinvoicelist2 = res.data;
            this.filteredProperties = [...this.rentalinvoicelist2];

            // Initialize TableService AFTER data loads
            this.rentalinvoicelist1 = new TableService();
            this.rentalinvoicelist1.initialize(this.rentalinvoicelist2, 10);

            // Pagination if backend sends it
            this.pages = Array.from(
              { length: res?.data?.totalPages || 1 },
              (_, i) => i + 1
            );
          } else {
            console.warn(res?.message || 'No rental invoices found.');
            this.rentalinvoicelist2 = [];
            this.filteredProperties = [];
            this.rentalinvoicelist1.initialize(this.rentalinvoicelist2, 10);
          }
        } catch (e) {
          console.error('Processing error:', e);
          this.rentalinvoicelist2 = [];
          this.filteredProperties = [];
          this.rentalinvoicelist1.initialize(this.rentalinvoicelist2, 10);
        } finally {
          this.tableLoading = false;
        }
      },

      error: (err: any) => {
        console.error('API error:', err);

        if (err?.status === 403 || err?.error?.message === 'Session expired') {
          this.router.navigate(['/auth/sign-in']);
        }

        this.rentalinvoicelist2 = [];
        this.filteredProperties = [];
        this.rentalinvoicelist1.initialize(this.rentalinvoicelist2, 10);
        this.tableLoading = false;
      },
    });
  }

  propertylist() {
    this.apiService.ownerproperties<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          const list = res.data || [];

          // 🔥 Check if ANY item has resident_type = 'tenant'
          this.isTenantPresent = list.some(
            (item: any) => item.resident_type === 'tenant'
          );

          console.log('this.isTenantPresent', this.isTenantPresent);

          // If backend provides pagination info
          this.pages = Array.from(
            { length: res.data?.totalPages || 1 },
            (_, i) => i + 1
          );

          this.tableLoading = false;
        } else {
          this.isTenantPresent = false;
          this.tableLoading = false;
        }
      },
      error: (err: any) => {
        this.isTenantPresent = false;
        this.tableLoading = false;
      },
    });
  }
}
