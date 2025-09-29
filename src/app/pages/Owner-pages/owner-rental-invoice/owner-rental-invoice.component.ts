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

  constructor(
    private modalService: ModalService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      status: [''], // Paid, Pending, Overdue
      residentSearch: [''], // Name or Phone
      fromDate: [''], // From Date
      toDate: [''], // To Date
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    // Example data
    this.properties = [
      {
        amount: 2500,
        name: 'Arun Kumar',
        association: 'Lakeview',
        phone: '9955668844',
        date: '2025-09-01',
        status: 'Paid',
        paidDate: '2025-09-04',
      },
      {
        amount: 3000,
        name: 'Meena R',
        association: 'Lakeview',
        phone: '9876543210',
        date: '2025-09-03',
        status: 'Pending',
      },
      {
        amount: 1800,
        name: 'Suresh B',
        association: 'Lakeview',
        phone: '9123456789',
        date: '2025-09-05',
        status: 'Paid',
         paidDate: '2025-09-04',
      },
      {
        amount: 2200,
        name: 'Priya M',
        association: 'Lakeview',
        phone: '9789054321',
        date: '2025-09-06',
        status: 'Overdue',
      },
      {
        amount: 2750,
        name: 'Vikram S',
        association: 'Lakeview',
        phone: '9001122334',
        date: '2025-09-07',
        status: 'Paid',
         paidDate: '2025-09-04',
      },
      {
        amount: 1950,
        name: 'Neha Sharma',
        association: 'Lakeview',
        phone: '9887766554',
        date: '2025-09-08',
        status: 'Pending',
      },
      {
        amount: 2600,
        name: 'Ramesh K',
        association: 'Lakeview',
        phone: '9776655443',
        date: '2025-09-09',
        status: 'Paid',
         paidDate: '2025-09-04',
      },
      {
        amount: 2300,
        name: 'Divya P',
        association: 'Lakeview',
        phone: '9665544332',
        date: '2025-09-10',
        status: 'Pending',
      },
      {
        amount: 2900,
        name: 'Ajay N',
        association: 'Lakeview',
        phone: '9554433221',
        date: '2025-09-11',
        status: 'Overdue',
      },
      {
        amount: 2100,
        name: 'Kavya L',
        association: 'Lakeview',
        phone: '9443322110',
        date: '2025-09-12',
        status: 'Paid',
         paidDate: '2025-09-04',
      },
    ];

    this.filteredProperties = [...this.properties];
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
}
