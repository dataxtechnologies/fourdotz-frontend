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
  rentalinvoicelist2: any
  rentalinvoicelist1
  pages: any
  tableLoading = true

  constructor(
    private modalService: ModalService,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private OwnerService: OwnerServiceService
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
    this.RentalInvoicelistinowner()
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

    this.filteredProperties = this.rentalinvoicelist2.filter((p: any) => {
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

  changetopaidstatus(data : any){
    this.modalService.open(ChangePaidStatusComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data:{
        invoice_id: data
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
      this.apiService.RentalInvoicelistinowner<any>().subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.rentalinvoicelist2 = res.data || [];
            this.filteredProperties = [...this.rentalinvoicelist2];
  
            // Initialize TableService
            this.rentalinvoicelist1 = new TableService();
            this.rentalinvoicelist1.initialize(this.rentalinvoicelist2, 10);
  
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
