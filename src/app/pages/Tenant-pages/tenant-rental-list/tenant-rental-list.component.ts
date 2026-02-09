import { Component } from '@angular/core';
import { GenerateRentalInvoiceComponent } from '../../../modals/generate-rental-invoice/generate-rental-invoice.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';

@Component({
  selector: 'app-tenant-rental-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tenant-rental-list.component.html',
  styleUrl: './tenant-rental-list.component.css'
})
export class TenantRentalListComponent {

  filterForm!: FormGroup;

  properties: any[] = [];
  filteredProperties: any[] = [];

  rentalinvoicelist1: any;
  rentalinvoicelist2: any;

  tableLoading = true;
  pages: any;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiserviceService
  ) {
    this.rentalinvoicelist1 = new TableService();
    this.rentalinvoicelist1.initialize([], 10);
  }

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      status: [''],
      residentSearch: [''],
      fromDate: [''],
      toDate: [''],
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.RentalInvoicelistinTenant();
  }

  RentalInvoicelistinTenant() {

    this.apiService.TenantRentalInvoiceList<any>().subscribe({
      next: (res: any) => {

        if (res?.success) {

          this.rentalinvoicelist2 = res.data || [];

          this.filteredProperties = [...this.rentalinvoicelist2];

          this.rentalinvoicelist1.initialize(this.filteredProperties, 10);

          this.tableLoading = false;

        } else {
          this.rentalinvoicelist2 = [];
          this.filteredProperties = [];
          this.rentalinvoicelist1.initialize([], 10);
          this.tableLoading = false;
        }
      },
      error: () => {
        this.rentalinvoicelist2 = [];
        this.filteredProperties = [];
        this.rentalinvoicelist1.initialize([], 10);
        this.tableLoading = false;
      },
    });
  }

  applyFilters(): void {

    const { status, residentSearch, fromDate, toDate } = this.filterForm.value;

    this.filteredProperties = this.rentalinvoicelist2.filter((p: any) => {

      const matchStatus =
        !status ||
        (status === 'paid' && p.payment_status) ||
        (status === 'pending' && !p.payment_status);

      const matchResident =
        !residentSearch ||
        p.tenant_name?.toLowerCase().includes(residentSearch.toLowerCase()) ||
        String(p.tenant_mobile)?.includes(residentSearch);

      const createdDate = new Date(p.created_time?.$date);

      const matchDate =
        (!fromDate || createdDate >= new Date(fromDate)) &&
        (!toDate || createdDate <= new Date(toDate));

      return matchStatus && matchResident && matchDate;
    });

    this.rentalinvoicelist1.initialize(this.filteredProperties, 10);
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.filteredProperties = [...this.rentalinvoicelist2];
    this.rentalinvoicelist1.initialize(this.filteredProperties, 10);
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
      actions: { click: false, escape: false },
    });
  }
}
