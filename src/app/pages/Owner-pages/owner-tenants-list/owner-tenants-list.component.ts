import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { AddTenantComponent } from '../../../modals/add-tenant/add-tenant.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ShepherdService } from 'angular-shepherd';
import { DashboardLayoutService } from '../../../layouts/dashboard-layout/dashboard-layout.service';
import { AssociationServiceService } from '../../../services/association/association-service.service';

@Component({
  selector: 'app-owner-tenants-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './owner-tenants-list.component.html',
  styleUrl: './owner-tenants-list.component.css',
})
export class OwnerTenantsListComponent {
  TenantList1;
  TenantList2: any;
  tableLoading = true;
  pages: any;

  constructor(
    private ModalService: ModalService,
    private router: Router,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private shepherd: ShepherdService,
    private DashboardService: DashboardLayoutService,
    private AssociationService: AssociationServiceService
  ) {
    this.TenantList1 = new TableService();
    this.TenantList1.initialize(this.TenantList2, 10);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.TenantListinOwner();
    this.ListPropertyNotresidentedbyTenantinOwner()

    this.AssociationService.OwnerStatus$.subscribe((AddOwner) => {
      if (AddOwner) {
        this.TenantListinOwner();
    this.ListPropertyNotresidentedbyTenantinOwner()
      }
    });
  }

  SendmailAgain(data: any, item: any) {
    item.spinloading = true;
    const payload = {
      username: data,
    };

    this.apiService.SendmailAgain<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Toast.success('Invite Mail sent successfully', 'Success');
          item.spinloading = false;
          this.TenantListinOwner();
        } else {
          item.spinloading = false;
          this.Toast.error(res.message, 'Failed');
        }
      },
      error: (err: any) => {
        item.spinloading = false;
        this.Toast.error(err.error.error.message, 'Failed');
      },
    });
  }

  Addtenant() {
    this.ModalService.open(AddTenantComponent, {
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

  TenantListinOwner() {
  this.apiService.TenantListinOwner<any>().subscribe({
    next: (res: any) => {
      if (res?.success && Array.isArray(res.data)) {

        this.TenantList2 = res.data;

        this.TenantList1 = new TableService();
        this.TenantList1.initialize(this.TenantList2, 10);

      } else {
        this.TenantList2 = [];
      }

      this.tableLoading = false;
    },
    error: () => {
      this.TenantList2 = [];
      this.tableLoading = false;
    }
  });
}





  addTenant() {

    // ✔ If owner → open the popup
    this.ModalService.open(AddTenantComponent, {
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

  ListPropertyNotresidentedbyTenantinOwner() {
  this.apiService.ListPropertyNotresidentedbyTenantinOwner<any>().subscribe({
    next: (res: any) => {
      if (res?.success && Array.isArray(res.data)) {

        // this.TenantList2 = res.data;

        // this.TenantList1 = new TableService();
        // this.TenantList1.initialize(this.TenantList2, 10);

      } else {
        // this.TenantList2 = [];
      }

      // this.tableLoading = false;
    },
    error: () => {
      // this.TenantList2 = [];
      // this.tableLoading = false;
    }
  });
}

  startTour() {
    const SHOULD_RUN_TOUR = true;
    if (!SHOULD_RUN_TOUR) return;

    if (this.shepherd.tourObject) {
      this.shepherd.cancel();
    }

    this.shepherd.modal = true;

    this.shepherd.defaultStepOptions = {
      scrollTo: { behavior: 'smooth', block: 'center' },
      cancelIcon: { enabled: false },
      classes: 'shepherd-dark-theme',
    };

    this.shepherd.addSteps([
      // 1️⃣ Header
      {
        id: 'tenant-list',
        title: 'Tenant List',
        text: 'This will show list of all tenants',
        attachTo: { element: '#tour-tenant-list', on: 'bottom' },
        buttons: [
          {
            text: 'Skip',
            classes: 'shepherd-btn-secondary',
            action: () => this.finishTourthispage(),
          },
          {
            text: 'Finish',
            classes: 'shepherd-btn-primary',
            action: () => this.GotoTourNextpage(),
          },
        ],
      },

      // 4️⃣ Owner Card
      // {
      //   id: 'view-property',
      //   title: 'View Property Details',
      //   text: 'Click here to view owner property details.',
      //   attachTo: { element: '#tour-view-property', on: 'left' },
      //   buttons: [
      //     {
      //       text: 'Back',
      //       classes: 'shepherd-btn-secondary',
      //       action: () => this.shepherd.back(),
      //     },
      //     {
      //       text: 'Finish',
      //       classes: 'shepherd-btn-primary',
      //       action: () => this.GotoTourNextpage(),
      //     },
      //   ],
      // },
    ]);

    this.shepherd.start();
  }

  finishTourthispage() {
    this.SkipTourthispage();
    this.shepherd.complete();
  }

  GotoTourNextpage() {
    this.TourtoNextpage();
    this.shepherd.complete();
  }

  SkipTourthispage() {
    const payload = {
      menu: {
        tenantlistinownertour: true,
      },
    };

    this.apiService.AddTourdatas<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.DashboardService.triggerTourApiStatusUpdate(res);
        }
      },
    });
  }

  TourtoNextpage() {
    const payload = {
      menu: {
        tenantlistinownertour: true,
      },
    };

    this.apiService.AddTourdatas<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.DashboardService.triggerTourApiStatusUpdate(res);
          this.router.navigateByUrl('/Owner/Maintenance-list');
        }
      },
    });
  }
}
