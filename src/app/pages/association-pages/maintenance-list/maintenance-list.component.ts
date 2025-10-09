import { Component } from '@angular/core';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { ModalService } from 'ngx-modal-ease';
import { Router } from '@angular/router';
import { GenerateMaintenanceComponent } from '../../../modals/generate-maintenance/generate-maintenance.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-maintenance-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './maintenance-list.component.html',
  styleUrl: './maintenance-list.component.css',
})
export class MaintenanceListComponent {
  MaintenanceList1
  MaintenanceList2 : any
  pages : any
  tableLoading: boolean = true





  constructor(private ModalService: ModalService, private route: Router, private apiService: ApiserviceService) {
    this.MaintenanceList1 = new TableService()
    this.MaintenanceList1.initialize(this.MaintenanceList2, 11)
  }

  ngOnInit(): void {
    this.ListMaintenanceinAssociation()
  }

  getStatus(item: any): string {
  const today = new Date().getTime();
  const itemDate = new Date(item.created_time?.$date).getTime();

  if (item.payment_status === true) {
    return 'Paid';
  } else if (today > itemDate) {
    return 'Overdue';
  } else {
    return 'Pending';
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

  ListMaintenanceinAssociation(){
    this.apiService.ListMaintenanceinAssociation<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.MaintenanceList2 = res.data;
          this.MaintenanceList1.initialize(this.MaintenanceList2, 12);
          this.pages = Array.from(
            { length: this.MaintenanceList2.totalPages },
            (_, i) => i + 1
          );
          this.tableLoading = false;
        } else {
          this.MaintenanceList2 = []
           this.MaintenanceList1.initialize(this.MaintenanceList2, 12);
          this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.MaintenanceList2 = []
         this.MaintenanceList1.initialize(this.MaintenanceList2, 12);
        this.tableLoading = false;
        console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });

  }
}
