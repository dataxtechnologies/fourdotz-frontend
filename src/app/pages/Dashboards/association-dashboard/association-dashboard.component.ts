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
export class NewAssociationDashboardComponent {
  propertylist1;
  propertylist2: any;

  MaintenanceList1;
  MaintenanceList2: any;

  RequestList1;
  RequestList2: any;

  posts: any;
  pages: any;
  tableLoading = true;
  nodatashown = false;
  associationId: any;
  dashboarddata: any;
  unpaidmaintenance: any;
  globalloading = true;

  constructor(
    private Toastr: ToastrService,
    private Router: Router,
    private apiService: ApiserviceService,
  ) {
    this.propertylist1 = new TableService();
    this.propertylist1.initialize(this.propertylist2, 8);

    this.MaintenanceList1 = new TableService();
    this.MaintenanceList1.initialize(this.MaintenanceList2, 8);

    this.RequestList1 = new TableService();
    this.RequestList1.initialize(this.RequestList2, 3);
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
    this.ListRequests();
    this.getpropertiesdata();
    this.ListMaintenanceinAssociation();
    this.ListAnnouncementinHOA();

    this.Dashboarddata();
  }

  gotopropertylist (){
    this.Router.navigateByUrl('/Association/properties-list');
  }

  gotoResidentlist(){
    this.Router.navigateByUrl('/Association/residents-list')
  }

  gotomaintenancelist() {
    this.Router.navigateByUrl('/Association/Maintenance-list');
  }

  gotoRequestlist() {
    this.Router.navigateByUrl('/Association/request-management/list');
  }

  getpropertiesdata() {
    this.globalloading = true;
    this.apiService.PropertyListinAssociation<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.globalloading = false;
          this.nodatashown = false;
          this.propertylist2 = res.data;
          this.propertylist1.initialize(this.propertylist2, 8);
          this.pages = Array.from(
            { length: this.propertylist2.totalPages },
            (_, i) => i + 1,
          );
          this.tableLoading = false;
        } else {
          this.globalloading = false;
          this.nodatashown = true;
          this.propertylist2 = [];
          this.propertylist1.initialize(this.propertylist2, 8);
          this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.globalloading = false;
        this.nodatashown = true;
        this.propertylist2 = [];
        this.propertylist1.initialize(this.propertylist2, 8);
        this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  Dashboarddata() {
    this.globalloading = true;
    this.apiService.Dashboarddata<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.globalloading = false;
          this.dashboarddata = res.data;

          this.unpaidmaintenance =
            this.dashboarddata.total_invoices -
            this.dashboarddata.paid_invoices;
        } else {
          this.globalloading = false;
          this.dashboarddata = '';

          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.globalloading = false;
        this.dashboarddata = '';
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  ListMaintenanceinAssociation() {
    this.apiService.ListMaintenanceinAssociation<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.MaintenanceList2 = res.data;
          this.MaintenanceList1.initialize(this.MaintenanceList2, 10);
          this.pages = Array.from(
            { length: this.MaintenanceList2.totalPages },
            (_, i) => i + 1,
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

  ListRequests() {
    this.tableLoading = true;

    this.apiService.ListAllRequestinAssociation<any>().subscribe({
      next: (res) => {
        this.RequestList2 = res.data;
        this.RequestList1.initialize(this.RequestList2, 3);
        this.tableLoading = false;
      },
      error: () => {
        this.RequestList2 = [];
        this.RequestList1.initialize([], 3);
        this.tableLoading = false;
      },
    });
  }

  formatDateTime(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return (
      date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }) +
      ' · ' +
      date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }

  /* TEXT SLICE HELPER */
  sliceText(text: string, limit: number = 200): string {
    if (!text) return '';
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }

  ListAnnouncementinHOA() {
    this.apiService.ListAnnouncementinHOA<any>().subscribe({
      next: (res: any) => {
        if (res?.success && Array.isArray(res.data)) {
          this.posts = res.data;
        } else {
          this.posts = [];
        }
      },
      error: () => {
        this.posts = [];
      },
    });
  }
}
