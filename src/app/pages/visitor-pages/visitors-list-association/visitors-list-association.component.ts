import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { GenerateMaintenanceComponent } from '../../../modals/generate-maintenance/generate-maintenance.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentFailurePopupComponent } from '../../../modals/payment-failure-popup/payment-failure-popup.component';
import { PaymentSuccessPopupComponent } from '../../../modals/payment-success-popup/payment-success-popup.component';

@Component({
  selector: 'app-visitors-list-association',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './visitors-list-association.component.html',
  styleUrl: './visitors-list-association.component.css'
})
export class VisitorsListAssociationComponent {
 maintenancelist2: any;
  maintenancelist1;
  pages: any;
  tableLoading = true;
  usertype = localStorage.getItem('user_type')

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private Apiservice: ApiserviceService,
    private Acroute: ActivatedRoute
  ) {
    this.maintenancelist1 = new TableService();
    this.maintenancelist1.initialize(this.maintenancelist2, 10);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ListAllVisitors();


  }

 
  ListAllVisitors() {
    this.Apiservice.ListAllVisitors<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.maintenancelist2 = res.data;
          this.maintenancelist1.initialize(this.maintenancelist2, 10);
          this.pages = Array.from(
            { length: this.maintenancelist2.totalPages },
            (_, i) => i + 1
          );
          this.tableLoading = false;
        } else {
          this.maintenancelist2 = [];
          this.maintenancelist1.initialize(this.maintenancelist2, 10);
          this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.maintenancelist2 = [];
        this.maintenancelist1.initialize(this.maintenancelist2, 10);
        this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }


}