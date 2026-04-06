import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-dashboard-new',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './owner-dashboard-new.component.html',
  styleUrl: './owner-dashboard-new.component.css'
})
export class OwnerDashboardNewComponent {
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

  currentMonthName: string = '';
  currentMonthMaintenanceTotal: number = 0;
  latestMaintenanceList: any[] = [];

  currentMonthRentalTotal: number = 0;
  latestRentalList: any[] = [];
  currentMonthNameRental: string = '';

  posts: any[] = [];
filteredPosts: any[] = [];
latestAnnouncements: any[] = [];
loadingPosts = false;

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
    this.ListAnnouncementinOwnerTenant();
  }

  viewallproperty() {
    this.Router.navigateByUrl('/Owner/properties-list')
  }

  viewallTenant() {
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

  ListAnnouncementinOwnerTenant() {
  this.loadingPosts = true;

  this.Apiservice.ListAnnouncementinOwnerTenant<any>().subscribe({
    next: (res: any) => {
      this.loadingPosts = false;

      // ❗ HANDLE EMPTY {}
      if (!res?.success || !Array.isArray(res.data)) {
        this.posts = [];
        this.filteredPosts = [];
        this.latestAnnouncements = [];
        // this.showtour = false;
        return;
      }

      const data = res.data;

      // ✅ MAP ATTACHMENTS
      this.posts = data.map((post: any) => {

        if (Array.isArray(post.images) && post.images.length > 0) {
          post.attachments = post.images.map((url: string) => {
            const isVideo = url
              .toLowerCase()
              .match(/\.(mp4|mov|avi|mkv|webm)$/);

            return {
              url,
              type: isVideo ? 'video' : 'image',
            };
          });

          // this.showtour = true;
        } else {
          post.attachments = [];
        }

        return post;
      });

      // ✅ SORT BY LATEST
      this.posts.sort((a: any, b: any) =>
        new Date(b.created_time?.$date).getTime() -
        new Date(a.created_time?.$date).getTime()
      );

      // ✅ TAKE ONLY 5
      this.latestAnnouncements = this.posts.slice(0, 5);

    },

    error: () => {
      this.loadingPosts = false;
      this.posts = [];
      this.filteredPosts = [];
      this.latestAnnouncements = [];
      // this.showtour = false;
    },
  });
}

gotomaintenance(){
  this.Router.navigateByUrl('/Owner/Maintenance-list')
}
gotorental(){
  this.Router.navigateByUrl('/Owner/Rental-invoice-list')
}

  MaintenanceListinOwner() {
    this.Apiservice.MaintenanceListinOwner<any>().subscribe({
      next: (res: any) => {
        if (res?.success && Array.isArray(res.data)) {

          const data = res.data;

          // ✅ Current month
          const today = new Date();
          const currentMonth = today.getMonth();
          const currentYear = today.getFullYear();

          this.currentMonthName = today.toLocaleString('default', { month: 'long' });

          // ✅ Filter current month maintenance
          const currentMonthData = data.filter((item: any) => {
            const createdDate = new Date(item.created_time?.$date);
            return (
              createdDate.getMonth() === currentMonth &&
              createdDate.getFullYear() === currentYear
            );
          });

          // ✅ Total amount
          this.currentMonthMaintenanceTotal = currentMonthData.reduce(
            (sum: number, item: any) => sum + (item.total_amount || 0),
            0
          );

          // ✅ Latest 5 records (sorted newest first)
          this.latestMaintenanceList = data
            .sort((a: any, b: any) => {
              return new Date(b.created_time?.$date).getTime() -
                new Date(a.created_time?.$date).getTime();
            })
            .slice(0, 5);

          // Table init (keep your existing logic)
          this.maintenancelist2 = data;
          this.maintenancelist1.initialize(this.maintenancelist2, 4);

          this.tableLoading = false;

        } else {
          this.currentMonthMaintenanceTotal = 0;
          this.latestMaintenanceList = [];
          this.tableLoading = false;
        }
      },
      error: () => {
        this.currentMonthMaintenanceTotal = 0;
        this.latestMaintenanceList = [];
        this.tableLoading = false;
      },
    });
  }

  propertylist() {
    this.Apiservice.ownerproperties<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.propertieslist2 = res.data[0]


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

        // ❗ HANDLE EMPTY RESPONSE
        if (!res?.success || !Array.isArray(res.data)) {
          this.currentMonthRentalTotal = 0;
          this.latestRentalList = [];
          this.rentaltableLoading = false;
          return;
        }

        const data = res.data;

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        this.currentMonthNameRental = today.toLocaleString('default', { month: 'long' });

        // ✅ FILTER CURRENT MONTH
        const currentMonthData = data.filter((item: any) => {
          const createdDate = new Date(item.created_time?.$date);
          return (
            createdDate.getMonth() === currentMonth &&
            createdDate.getFullYear() === currentYear
          );
        });

        // ✅ TOTAL
        this.currentMonthRentalTotal = currentMonthData.reduce(
          (sum: number, item: any) => sum + (item.total_amount || 0),
          0
        );

        // ✅ LATEST 5
        this.latestRentalList = data
          .sort((a: any, b: any) =>
            new Date(b.created_time?.$date).getTime() -
            new Date(a.created_time?.$date).getTime()
          )
          .slice(0, 5);

        // keep your existing table logic if needed
        this.rentalinvoicelist2 = data;
        this.rentalinvoicelist1.initialize(this.rentalinvoicelist2, 4);

        this.rentaltableLoading = false;
      },

      error: () => {
        this.currentMonthRentalTotal = 0;
        this.latestRentalList = [];
        this.rentaltableLoading = false;
      },
    });
  }
}
