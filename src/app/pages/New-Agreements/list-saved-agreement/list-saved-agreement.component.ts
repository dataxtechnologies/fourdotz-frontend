import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { SelectAgreementToviewCreateComponent } from '../../../modals/select-agreement-toview-create/select-agreement-toview-create.component';

@Component({
  selector: 'app-list-saved-agreement',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-saved-agreement.component.html',
  styleUrl: './list-saved-agreement.component.css',
})
export class ListSavedAgreementComponent {
  user_id = localStorage.getItem('user_id');
  spotVisitorlist1;
  spotvisitorlist2: any;
  tableLoading: boolean = true;
  pages: any;
  associationId: any;
  user_type: any;

  constructor(
    private Modal: ModalService,
    private route: Router,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService
  ) {
    this.spotVisitorlist1 = new TableService();
    this.spotVisitorlist1.initialize(this.spotvisitorlist2, 12);
  }

  ngOnInit(): void {
    const userdata = localStorage.getItem('userdata');
    this.user_type = localStorage.getItem('user_type');

    if (userdata) {
      const parsedData = JSON.parse(userdata);
      this.associationId = parsedData._id;
    } else {
    }
    this.ListCreatedAgreements();

    this.AssociationService.PropertyStatus$.subscribe((AddProperty) => {
      if (AddProperty) {
        this.ListCreatedAgreements();
      }
    });
  }

  CreateTemplate() {
    this.route.navigateByUrl(`agreement/association/create-template`);
  }

  viewproperty(data: any) {
    this.route.navigateByUrl(`Association/view-properties/${data}`);
  }

  openagreement(data: any){
    this.route.navigateByUrl(`/agreement/association/view-signing-agreement/${data}`);
  }

  ListCreatedAgreements() {
    this.apiService.ListCreatedAgreements<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.spotvisitorlist2 = res.data;
          this.spotVisitorlist1.initialize(this.spotvisitorlist2, 12);
          this.pages = Array.from(
            { length: this.spotvisitorlist2.totalPages },
            (_, i) => i + 1
          );
          this.tableLoading = false;
        } else {
          this.spotvisitorlist2 = [];
          this.spotVisitorlist1.initialize(this.spotvisitorlist2, 12);
          this.tableLoading = false;
        }
      },
      error: (err: any) => {
        this.spotvisitorlist2 = [];
        this.spotVisitorlist1.initialize(this.spotvisitorlist2, 12);
        this.tableLoading = false;
      },
    });
  }

  openSelectAgreementModal() {
    this.Modal.open(SelectAgreementToviewCreateComponent, {
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
}
