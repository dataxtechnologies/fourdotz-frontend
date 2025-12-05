import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '../../../services/tableservice.service';
import { EditAssociationModalComponent } from '../../../modals/edit-association-modal/edit-association-modal.component';
import { ModalService } from 'ngx-modal-ease';
import { AdmindataService } from '../../../services/adminservice/admindata.service';

@Component({
  selector: 'app-view-association',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-association.component.html',
  styleUrl: './view-association.component.css',
})
export class ViewAssociationComponent {
  activeTab: string = 'Properties';
  Associationdata: any;
  AssociationId: any;
  header_loading: boolean = true;
  propertyTable: boolean = true;
  properties1;
  properties2: any;
  amountdata: any;
  monthly_rent_invoices_total_amount = 0;
  payout_maintenance_total_amount = 0;
  payout_rent_invoices_total_amount = 0;
  documents: { [key: string]: string }[] = [];

  constructor(
    private apiService: ApiserviceService,
    private route: ActivatedRoute,
    private router: Router,
    private ModalService: ModalService,
    private AdminServices: AdmindataService
  ) {
    this.properties1 = new TableService();
    this.properties1.initialize(this.properties2);
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.AssociationId = params['associationId'] || null;
    });

    this.AdminServices.AssociationStatus$.subscribe((addassociation) => {
      if (addassociation) {
        this.getAssociationList(this.AssociationId);
      }
    });

    this.getAssociationList(this.AssociationId);
    this.getpropertybyAssociation(this.AssociationId);
    this.AmountforAssociationinSA(this.AssociationId);
  }

  goback() {
    this.router.navigateByUrl('/Superadmin/Association-list');
  }

  getKey(doc: { [key: string]: string }): string {
    return Object.keys(doc)[0];
  }

  getValue(doc: { [key: string]: string }): string {
    return doc[Object.keys(doc)[0]];
  }

  getAssociationList(data: any) {
    this.apiService.getAssociationbyId<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Associationdata = res.data;
          this.documents = this.Associationdata.document;
          this.header_loading = false; // stop loading
        } else {
          this.documents = [];
          this.header_loading = false; // stop loading even if error
        }
      },
      error: (err: any) => {
        this.documents = [];
        this.header_loading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  getpropertybyAssociation(data: any) {
    this.propertyTable = true;

    this.apiService.getpropertybyAssociation<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success && res.data?.length > 0) {
          this.properties2 = res.data; // array of properties
          this.properties1 = new TableService();
          this.properties1.initialize(this.properties2);
        } else {
          //console.log('Data not found');
          this.properties2 = [];
          this.properties1 = new TableService();
          this.properties1.initialize(this.properties2);
        }
        this.propertyTable = false; // stop loading in both cases
      },
      error: (err: any) => {
        //console.log('Data not found', err.message);
        this.properties2 = [];
        this.properties1 = new TableService();
        this.properties1.initialize(this.properties2);
        this.propertyTable = false;
      },
    });
  }

  AmountforAssociationinSA(data: any) {
    // this.propertyTable = true;

    this.apiService.AmountforAssociationinSA<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success ) {
          this.amountdata = res.data; // array of properties
          // this.properties1 = new TableService();
          // this.properties1.initialize(this.properties2);
        } else {
          //console.log('Data not found');
          this.amountdata = [];
          // this.properties1 = new TableService();
          // this.properties1.initialize(this.properties2);
        }
        // this.propertyTable = false; // stop loading in both cases
      },
      error: (err: any) => {
        //console.log('Data not found', err.message);
        this.amountdata = [];
        // this.properties1 = new TableService();
        // this.properties1.initialize(this.properties2);
        // this.propertyTable = false;
      },
    });
  }

  editassociation(Associationdata: any) {
    // AddOwnerComponent
    this.ModalService.open(EditAssociationModalComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        Associationdata: Associationdata,
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  // EditAssociationModalComponent
}
