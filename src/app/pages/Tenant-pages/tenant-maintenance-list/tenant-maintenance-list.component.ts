import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { GenerateMaintenanceComponent } from '../../../modals/generate-maintenance/generate-maintenance.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { PaymentFailurePopupComponent } from '../../../modals/payment-failure-popup/payment-failure-popup.component';
import { PaymentSuccessPopupComponent } from '../../../modals/payment-success-popup/payment-success-popup.component';

@Component({
  selector: 'app-tenant-maintenance-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tenant-maintenance-list.component.html',
  styleUrl: './tenant-maintenance-list.component.css',
})
export class TenantMaintenanceListComponent {

  maintenancelist2: any[] = [];
  maintenancelist1: any;

  filterForm!: FormGroup;

  pages: any;
  tableLoading = true;
  usertype = localStorage.getItem('user_type');

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private Apiservice: ApiserviceService,
    private Acroute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.maintenancelist1 = new TableService();
    this.maintenancelist1.initialize([], 10);
  }

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      propertySearch: [''],
      residentSearch: [''],
      status: [''],
      fromDate: [''],
      toDate: ['']
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.TenantMaintenanceList();

    this.Acroute.queryParams.subscribe(params => {
      const status = params['success'];
      if (status && status.toLowerCase() === 'true') {
        this.OpenSuccessPopup();
      } else if (status && status.toLowerCase() === 'false') {
        this.openfailurepopup();
      }
    });
  }

  applyFilters() {

    const { propertySearch, residentSearch, status, fromDate, toDate } = this.filterForm.value;

    let filtered = this.maintenancelist2.filter(item => {

      const matchProperty =
        !propertySearch ||
        item.property_no?.toLowerCase().includes(propertySearch.toLowerCase());

      const matchResident =
        !residentSearch ||
        item.resident_name?.toLowerCase().includes(residentSearch.toLowerCase());

      const isPaid = item.payment_status;
      const overdue = this.isOverdue(item.created_time.$date);

      const matchStatus =
        !status ||
        (status === 'paid' && isPaid) ||
        (status === 'pending' && !isPaid && !overdue) ||
        (status === 'overdue' && !isPaid && overdue);

      const createdDate = new Date(item.created_time.$date);

      const matchDate =
        (!fromDate || createdDate >= new Date(fromDate)) &&
        (!toDate || createdDate <= new Date(toDate));

      return matchProperty && matchResident && matchStatus && matchDate;
    });

    this.maintenancelist1.initialize(filtered, 10);
  }

  resetFilters() {
    this.filterForm.reset();
    this.maintenancelist1.initialize(this.maintenancelist2, 10);
  }

  OpenSuccessPopup() {
    this.ModalService.open(PaymentSuccessPopupComponent);
  }

  openfailurepopup() {
    this.ModalService.open(PaymentFailurePopupComponent);
  }

  isOverdue(createdDate: any): boolean {
    const created = new Date(createdDate);
    const today = new Date();
    created.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    return today > created;
  }

  TenantMaintenanceList() {
    this.Apiservice.TenantMaintenanceList<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.maintenancelist2 = res.data;
          this.maintenancelist1.initialize(this.maintenancelist2, 10);
          this.tableLoading = false;
        } else {
          this.maintenancelist2 = [];
          this.maintenancelist1.initialize([], 10);
          this.tableLoading = false;
        }
      },
      error: () => {
        this.maintenancelist2 = [];
        this.maintenancelist1.initialize([], 10);
        this.tableLoading = false;
      }
    });
  }

  openpaidmaintenanceinvoice(data: any){
    this.route.navigateByUrl(`maintenance-invoice/${this.usertype}/${data}?status=paid`);
  }

  CreatePaymentforInvoiceId(data: any) {
    this.route.navigateByUrl(`maintenance-invoice/${this.usertype}/${data}?status=paynow`);
  }
}
