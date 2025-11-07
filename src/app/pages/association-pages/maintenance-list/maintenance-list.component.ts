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

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService,
    private Toast : ToastrService
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
