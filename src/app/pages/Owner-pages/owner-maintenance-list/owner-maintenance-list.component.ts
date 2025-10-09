import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { GenerateMaintenanceComponent } from '../../../modals/generate-maintenance/generate-maintenance.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';

@Component({
  selector: 'app-owner-maintenance-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './owner-maintenance-list.component.html',
  styleUrl: './owner-maintenance-list.component.css',
})
export class OwnerMaintenanceListComponent {
  tableLoading: boolean = true
  maintenancelist2: any
  maintenancelist1
  pages: any




  constructor(private ModalService: ModalService, private route: Router, private Apiservice: ApiserviceService) {
    this.maintenancelist1 = new TableService()
    this.maintenancelist1.initialize(this.maintenancelist2, 12)
  }


  ngOnInit(): void {
    this.MaintenanceListinOwner()
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

  isOverdue(createdDate: any): boolean {
  const created = new Date(createdDate);
  const today = new Date();

  // Compare only the date part (ignore time)
  created.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return today > created;
}

  MaintenanceListinOwner() {
    this.Apiservice.MaintenanceListinOwner<any>().subscribe({
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
          this.maintenancelist2 = []
           this.maintenancelist1.initialize(this.maintenancelist2, 12);
          this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.maintenancelist2 = []
         this.maintenancelist1.initialize(this.maintenancelist2, 12);
        this.tableLoading = false;
        console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }
}
