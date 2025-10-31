import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-dashboard',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './owner-dashboard.component.html',
  styleUrl: './owner-dashboard.component.css',
})
export class OwnerDashboardComponent {
  maintenancelist1;
  maintenancelist2: any;
  pages: any;
  tableLoading = true;
  TenanttableLoading = true;
  rentaltableLoading = true;
  propertytableLoading = true;
  propertieslist2: any
  propertieslist1
  TenantList2: any
  TenantList1
  rentalinvoicelist2: any
  rentalinvoicelist1

  constructor(private Apiservice: ApiserviceService, private Router: Router) {
    this.maintenancelist1 = new TableService();
    this.maintenancelist1.initialize(this.maintenancelist2, 4);

    this.propertieslist1 = new TableService();
    this.propertieslist1.initialize(this.propertieslist2, 2)

    this.TenantList1 = new TableService();
    this.TenantList1.initialize(this.TenantList2, 2)

    this.rentalinvoicelist1 = new TableService();
    this.rentalinvoicelist1.initialize(this.rentalinvoicelist2, 2)
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.MaintenanceListinOwner();
    this.propertylist();
    this.TenantListinOwner();
    this.rentalInvoicelistinowner();
  }

  viewallproperty(){
    this.Router.navigateByUrl('/Owner/properties-list')
  }

  viewallTenant(){
    this.Router.navigateByUrl('/Owner/tenants-list')
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
          this.maintenancelist1.initialize(this.maintenancelist2, 4);
          this.pages = Array.from(
            { length: this.maintenancelist2.totalPages },
            (_, i) => i + 1
          );
          this.tableLoading = false;
        } else {
          this.maintenancelist2 = [];
          this.maintenancelist1.initialize(this.maintenancelist2, 4);
          this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.maintenancelist2 = [];
        this.maintenancelist1.initialize(this.maintenancelist2, 4);
        this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  propertylist() {
    this.Apiservice.ownerproperties<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.propertieslist2 = res.data 
          

          // Initialize TableService
          this.propertieslist1 = new TableService();
          this.propertieslist1.initialize(this.propertieslist2, 2);

          // If backend provides pagination info
          this.pages = Array.from(
            { length: res.data?.totalPages || 1 },
            (_, i) => i + 1
          );

          this.propertytableLoading = false;
        } else {
          this.propertieslist2 = []
          this.propertytableLoading = false;
          //console.warn(res.message || 'Failed to load properties.');
        }
      },
      error: (err: any) => {
        this.propertieslist2 = []
        this.propertytableLoading = false;
        //console.error('Property list fetch failed:', err);
      },
    });
  }


  TenantListinOwner() {
    this.Apiservice.TenantListinOwner<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.TenantList2 = res.data || [];
          // this.filteredProperties = [...this.propertieslist2];

          // Initialize TableService
          this.TenantList1 = new TableService();
          this.TenantList1.initialize(this.TenantList2, 2);

          // If backend provides pagination info
          this.pages = Array.from(
            { length: res.data?.totalPages || 1 },
            (_, i) => i + 1
          );

          this.TenanttableLoading = false;
        } else {
          this.TenantList2 = []
          this.TenanttableLoading = false;
          //console.warn(res.message || 'Failed to load properties.');
        }
      },
      error: (err: any) => {
        this.TenantList2 = []
        this.TenanttableLoading = false;
        //console.error('Property list fetch failed:', err);
      },
    });
  }

  rentalInvoicelistinowner() {
      this.Apiservice.RentalInvoicelistinowner<any>().subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.rentalinvoicelist2 = res.data 
  
            // Initialize TableService
            this.rentalinvoicelist1 = new TableService();
            this.rentalinvoicelist1.initialize(this.rentalinvoicelist2, 12);
  
            // If backend provides pagination info
            this.pages = Array.from(
              { length: res.data?.totalPages || 1 },
              (_, i) => i + 1
            );
  
            this.rentaltableLoading = false;
          } else {
            this.rentalinvoicelist2 = []
            this.rentaltableLoading = false;
            //console.warn(res.message || 'Failed to load properties.');
          }
        },
        error: (err: any) => {
          this.rentalinvoicelist2 = []
          this.rentaltableLoading = false;
          //console.error('Property list fetch failed:', err);
        },
      });
    }
}
