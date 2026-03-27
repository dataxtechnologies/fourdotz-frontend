import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { GenerateMaintenanceComponent } from '../../../modals/generate-maintenance/generate-maintenance.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { PaymentSuccessPopupComponent } from '../../../modals/payment-success-popup/payment-success-popup.component';
import { ActivatedRoute } from '@angular/router';
import { PaymentFailurePopupComponent } from '../../../modals/payment-failure-popup/payment-failure-popup.component';
import { CreateAdminComponent } from '../../../modals/create-admin/create-admin.component';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { ToastrService } from 'ngx-toastr';
import { ShepherdService } from 'angular-shepherd';

@Component({
  selector: 'app-service-admin-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './service-admin-list.component.html',
  styleUrl: './service-admin-list.component.css',
})
export class ServiceAdminListComponent {
  adminLoading: boolean = true;
  adminList2: any;
  adminList1;
  pages: any;
  usertype: any;

  filters = {
    fromDate: '',
    toDate: '',
    status: '',
    search: '',
  };

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private Apiservice: ApiserviceService,
    private Acroute: ActivatedRoute,
    private AssociationService: AssociationServiceService,
    private Toast : ToastrService,
    private shepherd: ShepherdService,
  ) {
    this.adminList1 = new TableService();
    this.adminList1.initialize(this.adminList2, 10);
  }

  ngOnInit(): void {
    this.usertype = localStorage.getItem('user_type');
    this.ListServiceAdmin();

        this.AssociationService.CreateAdminStatus$.subscribe((res: any) => {
      if (res?.success) this.ListServiceAdmin();
    });
  }

  OpenCreateAdmin() {
    this.ModalService.open(CreateAdminComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
  }

    SendmailAgain(data: any, item: any){
        item.spinloading = true;
    const payload ={
      username : data
    }

    this.Apiservice.SendmailAgain<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Toast.success(res.message, 'Success');
          item.spinloading = false;
          this.ListServiceAdmin();
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

  ListServiceAdmin() {
    this.adminLoading = true;

    this.Apiservice.ListServiceAdmin<any>().subscribe({
      next: (res) => {
        if (res?.success && Array.isArray(res.data)) {
          // SUCCESS → assign data
          this.adminList2 = res.data;
          this.adminList1.initialize(this.adminList2, 10);
        } else {
          // FAILED RESPONSE → assign empty
          this.adminList2 = [];
          this.adminList1.initialize([], 10);
          console.warn('ListServiceAdmin: API responded without success flag');
        }
        this.adminLoading = false;
      },
      error: (err) => {
        // EXCEPTION → assign empty
        console.error('ListServiceAdmin Error:', err);
        this.adminList2 = [];
        this.adminList1.initialize([], 10);
        this.adminLoading = false;
      },
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
        id: 'service-admin-list',
        title: 'Service Admin List',
        text: 'This list shows all the service admins created by the association.',
        attachTo: { element: '#tour-service-admin-list', on: 'bottom' },
        buttons: [
          {
            text: 'Skip',
            classes: 'shepherd-btn-secondary',
            action: () => this.finishTourthispage(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },
      {
        id: 'create-service-admin',
        title: 'Create Service Admin',
        text: 'Click here to create a new service admin.',
        attachTo: { element: '#tour-create-service-admin', on: 'bottom' },
        buttons: [
          {
            text: 'Skip',
            classes: 'shepherd-btn-secondary',
            action: () => this.finishTourthispage(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },
     
      {
        id: 'send-mail',
        title: 'Send Mail',
        text: 'Click here to resend the welcome mail to the service admin.',
        attachTo: { element: '#tour-send-mail', on: 'bottom' },
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

    ]);

    this.shepherd.start();
  }

   finishTourthispage() {
    // this.SkipTourthispage();
    this.shepherd.complete();
  }

  GotoTourNextpage() {
    // this.TourtoNextpage();
    this.shepherd.complete();
  }
}
