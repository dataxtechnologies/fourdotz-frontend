import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { GenerateMaintenanceComponent } from '../../../modals/generate-maintenance/generate-maintenance.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tenant-maintenance-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tenant-maintenance-list.component.html',
  styleUrl: './tenant-maintenance-list.component.css',
})
export class TenantMaintenanceListComponent {
  maintenancelist2: any;
  maintenancelist1;
  pages: any;
  tableLoading = true;

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private Apiservice: ApiserviceService
  ) {
    this.maintenancelist1 = new TableService();
    this.maintenancelist1.initialize(this.maintenancelist2, 12);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.TenantMaintenanceList();
  }

  isOverdue(createdDate: any): boolean {
    const created = new Date(createdDate);
    const today = new Date();

    // Compare only the date part (ignore time)
    created.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return today > created;
  }

  TenantMaintenanceList() {
    this.Apiservice.TenantMaintenanceList<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.maintenancelist2 = res.data;
          this.maintenancelist1.initialize(this.maintenancelist2, 12);
          this.pages = Array.from(
            { length: this.maintenancelist2.totalPages },
            (_, i) => i + 1
          );
          this.tableLoading = false;
        } else {
          this.maintenancelist2 = [];
          this.maintenancelist1.initialize(this.maintenancelist2, 12);
          this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.maintenancelist2 = [];
        this.maintenancelist1.initialize(this.maintenancelist2, 12);
        this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }


  CreatePaymentforInvoiceId(data: any) {
  const payload = {
    invoice_no: data
  };

  console.log('payload', payload);

  this.Apiservice.CreatePaymentforInvoiceId<any>(payload).subscribe({
    next: (res: any) => {
      if (res?.success && res?.data?.redirectUrl) {
        console.log('Payment initiated:', res);

        // ✅ Redirect user to PhonePe payment page
        window.location.href = res.data.redirectUrl;
      } else {
        console.error('Payment initiation failed:', res);
        alert(res.message || 'Failed to initiate payment, please try again.');
      }
    },
    error: (err: any) => {
      console.error('Payment API Error:', err);
      alert(err.message || 'Something went wrong, please try again later.');
    }
  });
}
}
