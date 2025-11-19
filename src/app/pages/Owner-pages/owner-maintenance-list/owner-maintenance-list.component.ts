import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { GenerateMaintenanceComponent } from '../../../modals/generate-maintenance/generate-maintenance.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { PaymentSuccessPopupComponent } from '../../../modals/payment-success-popup/payment-success-popup.component';
import { ActivatedRoute } from '@angular/router';
import { PaymentFailurePopupComponent } from '../../../modals/payment-failure-popup/payment-failure-popup.component';
@Component({
  selector: 'app-owner-maintenance-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './owner-maintenance-list.component.html',
  styleUrl: './owner-maintenance-list.component.css',
})
export class OwnerMaintenanceListComponent {
  tableLoading: boolean = true;
  maintenancelist2: any;
  maintenancelist1;
  pages: any;
  usertype: any;

  filters = {
    fromDate: '',
    toDate: '',
    status: '',
    search: '',
  };

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private Apiservice: ApiserviceService,
    private Acroute: ActivatedRoute
  ) {
    this.maintenancelist1 = new TableService();
    this.maintenancelist1.initialize(this.maintenancelist2, 10);
  }

  ngOnInit(): void {
    this.usertype = localStorage.getItem('user_type');
    this.MaintenanceListinOwner();
    this.Acroute.queryParams.subscribe(params => {
    const status = params['success'];

    if (status && status.toLowerCase() === 'true') {
      this.OpenSuccessPopup();
    }else if (status && status.toLowerCase() === 'false'){
      this.openfailurepopup();
    }
  });
  }

  applyFilters() {
    let filtered = [...this.maintenancelist2]; // original data

    // 🔹 Filter by From Date
    if (this.filters.fromDate) {
      const from = new Date(this.filters.fromDate).getTime();
      filtered = filtered.filter(
        (item) => new Date(item.created_time.$date).getTime() >= from
      );
    }

    // 🔹 Filter by To Date
    if (this.filters.toDate) {
      const to = new Date(this.filters.toDate).getTime();
      filtered = filtered.filter(
        (item) => new Date(item.created_time.$date).getTime() <= to
      );
    }

    // 🔹 Filter by Status
    if (this.filters.status) {
      filtered = filtered.filter(
        (item) => this.getStatus(item) === this.filters.status
      );
    }

    // 🔹 Search (name or property number)
    if (this.filters.search.trim() !== '') {
      const s = this.filters.search.toLowerCase();

      filtered = filtered.filter(
        (item) =>
          item.resident_name?.toLowerCase().includes(s) ||
          item.property_id?.toLowerCase().includes(s)
      );
    }

    // Reset Pagination With Filtered Data
    this.maintenancelist1.initialize(filtered, 10);
  }

  generateMaintenance() {
    this.ModalService.open(GenerateMaintenanceComponent, {
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


  OpenSuccessPopup() {
    this.ModalService.open(PaymentSuccessPopupComponent, {
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
  openfailurepopup() {
    this.ModalService.open(PaymentFailurePopupComponent, {
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

  viewresident() {
    this.route.navigateByUrl(`Association/view-properties/${1}`);
  }

  isOverdue(createdDate: any): boolean {
    const created = new Date(createdDate);
    const today = new Date();

    // Compare only the date part (ignore time)
    created.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return today > created;
  }

    getStatus(item: any) {
    const today = new Date().getTime();
    const itemDate = new Date(item.created_time?.$date).getTime();

    if (item.payment_status === true) {
      return 'Paid';
    } else if (item.payment_status === false) {
      // Check if overdue based on date
      return today > itemDate ? 'Overdue' : 'Pending';
    } else {
      return '';
    }
  }

  resetFilters() {
  this.filters = {
    fromDate: '',
    toDate: '',
    status: '',
    search: ''
  };
  this.applyFilters();
}

  MaintenanceListinOwner() {
    this.Apiservice.MaintenanceListinOwner<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.maintenancelist2 = res.data;
          this.maintenancelist1.initialize(this.maintenancelist2, 10);
          this.pages = Array.from(
            { length: this.maintenancelist2.totalPages },
            (_, i) => i + 1
          );
          this.tableLoading = false;
        } else {
          this.maintenancelist2 = [];
          this.maintenancelist1.initialize(this.maintenancelist2, 10);
          this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.maintenancelist2 = [];
        this.maintenancelist1.initialize(this.maintenancelist2, 10);
        this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  CreatePaymentforInvoiceId(data: any) {
    this.route.navigateByUrl(
      `maintenance-invoice/${this.usertype}/${data}?status=paynow`
    );
    // const payload = {
    //   invoice_no: data
    // };

    // console.log('payload', payload);

    // this.Apiservice.CreatePaymentforInvoiceId<any>(payload).subscribe({
    //   next: (res: any) => {
    //     if (res?.success && res.data?.redirectUrl) {
    //       console.log('Payment created successfully:', res);

    //       // ✅ Redirect to PhonePe payment page
    //       window.location.href = res.data.redirectUrl;
    //     } else {
    //       console.warn('Payment creation failed:', res?.message);
    //     }
    //   },
    //   error: (err: any) => {
    //     console.error('Error creating payment:', err);
    //   },
    // });
  }

  openpaidmaintenanceinvoice(data: any) {
    this.route.navigateByUrl(
      `maintenance-invoice/${this.usertype}/${data}?status=paid`
    );
  }
}
