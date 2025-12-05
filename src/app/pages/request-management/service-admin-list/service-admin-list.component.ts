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
    private AssociationService: AssociationServiceService
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
}
