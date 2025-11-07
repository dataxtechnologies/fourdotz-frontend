import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';

@Component({
  selector: 'app-tenant-dashboard',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tenant-dashboard.component.html',
  styleUrl: './tenant-dashboard.component.css'
})
export class TenantDashboardComponent {
maintenancelist2: any;
  maintenancelist1;
  pages: any;
  tableLoading = true;
  TenantPropertyData : any
  header_loading = true
  propertieslist1 
  propertieslist2 : any

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private Apiservice: ApiserviceService
  ) {
    this.maintenancelist1 = new TableService();
    this.maintenancelist1.initialize(this.maintenancelist2, 12);

    this.propertieslist1 = new TableService()
    this.propertieslist1.initialize(this.propertieslist2, 6)
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.TenantMaintenanceList();
    this.TenantPropertyDatas()
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
          this.maintenancelist1.initialize(this.maintenancelist2, 6);
          this.pages = Array.from(
            { length: this.maintenancelist2.totalPages },
            (_, i) => i + 1
          );
          this.tableLoading = false;
        } else {
          this.maintenancelist2 = [];
          this.maintenancelist1.initialize(this.maintenancelist2, 6);
          this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.maintenancelist2 = [];
        this.maintenancelist1.initialize(this.maintenancelist2, 6);
        this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  TenantPropertyDatas(){
    this.Apiservice.TenantPropertyDatas<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.propertieslist2 = res.data;
           this.propertieslist1.initialize(this.propertieslist2, 12);
          this.header_loading = false; // stop loading
        } else {
          this.propertieslist2 = [];
           this.propertieslist1.initialize(this.propertieslist2, 12);
          // alert(res.message || 'Something went wrong.');
          this.header_loading = false; // stop loading even if error
        }
      },
      error: (err: any) => {
        this.propertieslist2 = [];
           this.propertieslist1.initialize(this.propertieslist2, 12);
        this.header_loading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }
}
