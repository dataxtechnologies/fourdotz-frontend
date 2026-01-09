import { Component } from '@angular/core';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { ModalService } from 'ngx-modal-ease';
import { Router } from '@angular/router';
import { GenerateMaintenanceComponent } from '../../../modals/generate-maintenance/generate-maintenance.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-maintenance-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './maintenance-list.component.html',
  styleUrl: './maintenance-list.component.css',
})
export class MaintenanceListComponent {
  MaintenanceList1;
  MaintenanceList2: any;
  pages: any;
  tableLoading: boolean = true;
  MaintenanceListAmount: any;
  usertype = localStorage.getItem('user_type');
  filters = {
    fromDate: '',
    toDate: '',
    status: '',
    search: '',
  };
  constructor(
    private ModalService: ModalService,
    private route: Router,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService,
    private Toast: ToastrService
  ) {
    this.MaintenanceList1 = new TableService();
    this.MaintenanceList1.initialize(this.MaintenanceList2, 10);
  }

  ngOnInit(): void {
    this.ListMaintenanceinAssociation();
    this.AmountforAssociationinASS();

    this.AssociationService.MaintenanceInvStatus$.subscribe(
      (GenMaintenanceInv) => {
        if (GenMaintenanceInv) {
          this.ListMaintenanceinAssociation();
          this.AmountforAssociationinASS();
        }
      }
    );
  }

  applyFilters() {
    let filtered = [...this.MaintenanceList2]; // original data

    // 🔹 From Date (start of day)
    if (this.filters.fromDate) {
      const from = new Date(this.filters.fromDate);
      from.setHours(0, 0, 0, 0); // start of day

      filtered = filtered.filter(
        (item) => new Date(item.created_time.$date).getTime() >= from.getTime()
      );
    }

    // 🔹 To Date (END of day) ✅ FIX
    if (this.filters.toDate) {
      const to = new Date(this.filters.toDate);
      to.setHours(23, 59, 59, 999); // 🔥 end of day

      filtered = filtered.filter(
        (item) => new Date(item.created_time.$date).getTime() <= to.getTime()
      );
    }

    // 🔹 Status
    if (this.filters.status) {
      filtered = filtered.filter(
        (item) => this.getStatus(item) === this.filters.status
      );
    }

    // 🔹 Search
    if (this.filters.search?.trim()) {
      const s = this.filters.search.toLowerCase();

      filtered = filtered.filter(
        (item) =>
          item.resident_name?.toLowerCase().includes(s) ||
          item.property_no?.toLowerCase().includes(s)
      );
    }

    // 🔹 Reset Pagination
    this.MaintenanceList1.initialize(filtered, 10);
  }

  viewInvoice(data: any) {
    this.route.navigateByUrl(
      `maintenance-invoice/${this.usertype}/${data}?status=paynow&&user=Association`
    );
  }

  viewpaidInvoice(data: any) {
    this.route.navigateByUrl(
      `maintenance-invoice/${this.usertype}/${data}?status=paid&&user=Association`
    );
  }

  isOverdue(createdDate: any): boolean {
    const created = new Date(createdDate);
    const today = new Date();

    // Compare only the date part (ignore time)
    created.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return today > created;
  }

getStatus(item: any): 'Paid' | 'Pending' | 'Overdue' | '' {

  // ✅ Paid always wins
  if (item.payment_status === true) {
    return 'Paid';
  }

  // ✅ If not paid, decide by DUE DATE
  if (item.payment_status === false && item.due_date) {

    // due_date format: "06-Jan-2026"
    const due = new Date(item.due_date);
    due.setHours(23, 59, 59, 999);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return today > due ? 'Overdue' : 'Pending';
  }

  return '';
}

  resetFilters() {
    this.filters = {
      fromDate: '',
      toDate: '',
      status: '',
      search: '',
    };
    this.applyFilters();
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

  viewresident() {
    this.route.navigateByUrl(`Association/view-properties/${1}`);
  }

  ListMaintenanceinAssociation() {
    this.apiService.ListMaintenanceinAssociation<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.MaintenanceList2 = res.data;
          this.MaintenanceList1.initialize(this.MaintenanceList2, 10);
          this.pages = Array.from(
            { length: this.MaintenanceList2.totalPages },
            (_, i) => i + 1
          );
          this.tableLoading = false;
        } else {
          this.MaintenanceList2 = [];
          this.MaintenanceList1.initialize(this.MaintenanceList2, 10);
          this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.MaintenanceList2 = [];
        this.MaintenanceList1.initialize(this.MaintenanceList2, 10);
        this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  AmountforAssociationinASS() {
    this.apiService.AmountforAssociationinASS<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.MaintenanceListAmount = res.data;
        } else {
          this.MaintenanceListAmount = 0;

          // this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.MaintenanceListAmount = 0;

        // this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  SendRemainderforMaintenance(data: any) {
    this.apiService.SendRemainderforMaintenance<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Toast.success(res.message);
        } else {
          this.Toast.warning(res.message);

          // this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.Toast.error(err.err.error.message);

        // this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }
}
