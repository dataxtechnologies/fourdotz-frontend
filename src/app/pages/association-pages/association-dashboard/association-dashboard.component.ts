import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';

@Component({
  selector: 'app-association-dashboard',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './association-dashboard.component.html',
  styleUrl: './association-dashboard.component.css',
})
export class AssociationDashboardComponent {
  propertylist1;
  propertylist2: any;
  pages: any;
  tableLoading = true;
  associationId: any;
  dashboarddata : any
  unpaidmaintenance : any

  constructor(
    private Toastr: ToastrService,
    private apiService: ApiserviceService
  ) {
    this.propertylist1 = new TableService();
    this.propertylist1.initialize(this.propertylist2, 8);
  }

  ngOnInit(): void {
    const userdata = sessionStorage.getItem('userdata');

    if (userdata) {
      const parsedData = JSON.parse(userdata); // Convert string → object
      this.associationId = parsedData._id; // Access the _id field

      //console.log('User ID:', this.associationId);
    } else {
      //console.log('No user data found in sessionStorage');
    }
    this.getpropertiesdata();

    this.Dashboarddata()
  }

  getpropertiesdata() {
    this.apiService.PropertyListinAssociation<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.propertylist2 = res.data;
          this.propertylist1.initialize(this.propertylist2, 12);
          this.pages = Array.from(
            { length: this.propertylist2.totalPages },
            (_, i) => i + 1
          );
          this.tableLoading = false;
        } else {
          this.propertylist2 = [];
          this.propertylist1.initialize(this.propertylist2, 12);
          this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.propertylist2 = [];
        this.propertylist1.initialize(this.propertylist2, 12);
        this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }


  Dashboarddata() {
    this.apiService.Dashboarddata<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.dashboarddata = res.data

          this.unpaidmaintenance = this.dashboarddata.total_invoices - this.dashboarddata.paid_invoices
        } else {
          this.dashboarddata = '';
      
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.dashboarddata = '';
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }
}
