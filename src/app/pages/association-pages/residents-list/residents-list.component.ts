import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { AddResidentComponent } from '../../../modals/add-resident/add-resident.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssociationServiceService } from '../../../services/association/association-service.service';

@Component({
  selector: 'app-residents-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './residents-list.component.html',
  styleUrl: './residents-list.component.css',
})
export class ResidentsListComponent {
  associationId: any;
  Residentlist1;
  Residentlist2: any;
  pages: any;
  tableLoading: boolean = true;
  unowned_properties: any;

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService
  ) {
    this.Residentlist1 = new TableService();
    this.Residentlist1.initialize(this.Residentlist2, 11);
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

    this.AssociationService.PropertyStatus$.subscribe((AddProperty) => {
      if (AddProperty) {
        this.getpropertiesdata();
      }
    });
  }

  AddResident(data: any) {
    this.ModalService.open(AddResidentComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        associationId1: data,
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  viewresident(data: any) {
    this.route.navigateByUrl(`Association/view-resident/${data}`);
  }

  getpropertiesdata() {
    this.apiService.ResidentedProperty<any>().subscribe({
      next: (res: any) => {
        if (res?.success && Array.isArray(res.data)) {
          this.Residentlist2 = res.data;

          // Filter unowned properties
          this.unowned_properties = this.Residentlist2.filter(
            (item: any) => !item.resident_type
          );
          //console.log('unowned_properties', this.unowned_properties);

          // Initialize table
          this.Residentlist1.initialize(this.Residentlist2, 11);

          // Calculate pages safely
          this.pages = Array.from(
            { length: Math.ceil(this.Residentlist2.length / 11) },
            (_, i) => i + 1
          );

          this.tableLoading = false;
        } else {
          this.Residentlist2 = [];
          this.unowned_properties = [];
          this.Residentlist1.initialize(this.Residentlist2, 11);
          this.pages = [];
          this.tableLoading = false;
        }
      },
      error: (err: any) => {
        this.Residentlist2 = [];
        this.unowned_properties = [];
        this.Residentlist1.initialize(this.Residentlist2, 11);
        this.pages = [];
        this.tableLoading = false;
        //console.error('Property fetch failed:', err);
      },
    });
  }
}
