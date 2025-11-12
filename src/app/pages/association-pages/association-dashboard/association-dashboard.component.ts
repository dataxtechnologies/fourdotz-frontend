import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { Router } from '@angular/router';

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
  nodatashown = false
  associationId: any;
  dashboarddata : any
  unpaidmaintenance : any
  globalloading = true

  constructor(
    private Toastr: ToastrService,
    private Router : Router,
    private apiService: ApiserviceService
  ) {
    this.propertylist1 = new TableService();
    this.propertylist1.initialize(this.propertylist2, 8);
  }

  ngOnInit(): void {
    const userdata = localStorage.getItem('userdata');

    if (userdata) {
      const parsedData = JSON.parse(userdata); // Convert string → object
      this.associationId = parsedData._id; // Access the _id field

      //console.log('User ID:', this.associationId);
    } else {
      //console.log('No user data found in localStorage');
    }
    this.getpropertiesdata();

    this.Dashboarddata()
  }

  addProperty() {
  this.Router.navigateByUrl('/Association/properties-list')
}

  getpropertiesdata() {
    this.globalloading = true
    this.apiService.PropertyListinAssociation<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.globalloading = false
          this.nodatashown = false
          this.propertylist2 = res.data;
          this.propertylist1.initialize(this.propertylist2, 12);
          this.pages = Array.from(
            { length: this.propertylist2.totalPages },
            (_, i) => i + 1
          );
          this.tableLoading = false;
        } else {
          this.globalloading = false
          this.nodatashown = true
          this.propertylist2 = [];
          this.propertylist1.initialize(this.propertylist2, 12);
          this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.globalloading = false
        this.nodatashown = true
        this.propertylist2 = [];
        this.propertylist1.initialize(this.propertylist2, 12);
        this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }


  Dashboarddata() {
    this.globalloading = true
    this.apiService.Dashboarddata<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
           this.globalloading = false
          this.dashboarddata = res.data

          this.unpaidmaintenance = this.dashboarddata.total_invoices - this.dashboarddata.paid_invoices
        } else {
           this.globalloading = false
          this.dashboarddata = '';
      
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
         this.globalloading = false
        this.dashboarddata = '';
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }
}
