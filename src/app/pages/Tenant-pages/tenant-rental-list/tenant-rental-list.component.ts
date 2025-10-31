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
  rentalinvoicelist1
  rentalinvoicelist2: any
  tableLoading = true
  pages: any

  constructor(
    private modalService: ModalService,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiserviceService
  ) {
    this.rentalinvoicelist1 = new TableService()
    this.rentalinvoicelist1.initialize(this.rentalinvoicelist2, 12)
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      status: [''], // Paid, Pending, Overdue
      residentSearch: [''], // Name or Phone
      fromDate: [''], // From Date
      toDate: [''], // To Date
    });

    this.RentalInvoicelistinTenant()
  }

  applyFilters(): void {
    const { status, residentSearch, fromDate, toDate } = this.filterForm.value;

    this.filteredProperties = this.properties.filter((p: any) => {
      const matchStatus = !status || p.status === status;

      const matchResident =
        !residentSearch ||
        p.name.toLowerCase().includes(residentSearch.toLowerCase()) ||
        p.phone.includes(residentSearch);

      const matchDate =
        (!fromDate || new Date(p.date) >= new Date(fromDate)) &&
        (!toDate || new Date(p.date) <= new Date(toDate));

      return matchStatus && matchResident && matchDate;
    });
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.filteredProperties = [...this.properties];
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

  viewresident(): void {
    this.router.navigateByUrl(`Association/view-properties/${1}`);
  }

  RentalInvoicelistinTenant() {
        this.apiService.TenantRentalInvoiceList<any>().subscribe({
          next: (res: any) => {
            if (res?.success) {
              this.rentalinvoicelist2 = res.data || [];
              this.filteredProperties = [...this.rentalinvoicelist2];
    
              // Initialize TableService
              this.rentalinvoicelist1 = new TableService();
              this.rentalinvoicelist1.initialize(this.rentalinvoicelist2, 12);
    
              // If backend provides pagination info
              this.pages = Array.from(
                { length: res.data?.totalPages || 1 },
                (_, i) => i + 1
              );
    
              this.tableLoading = false;
            } else {
              this.rentalinvoicelist2 = []
              this.tableLoading = false;
              //console.warn(res.message || 'Failed to load properties.');
            }
          },
          error: (err: any) => {
            this.rentalinvoicelist2 = []
            this.tableLoading = false;
            //console.error('Property list fetch failed:', err);
          },
        });
      }

  
}
