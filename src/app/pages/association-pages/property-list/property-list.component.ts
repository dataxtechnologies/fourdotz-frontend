import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssociationServiceService } from '../../../services/association/association-service.service';

@Component({
  selector: 'app-property-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css',
})
export class PropertyListComponent {
  user_id = sessionStorage.getItem('user_id');
  propertylist1;
  propertylist2: any;
  tableLoading: boolean = true;
  pages: any;
  associationId: any;

  constructor(
    private ModalService: ModalService,
    private route: Router,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService
  ) {
    this.propertylist1 = new TableService();
    this.propertylist1.initialize(this.propertylist2, 12);
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

  Addproperty() {
    this.ModalService.open(AddPropertyComponent, {
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

  viewproperty(data: any) {
    this.route.navigateByUrl(`Association/view-properties/${data}`);
  }

  getpropertiesdata() {
    this.apiService.PropertyListinAssociation<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.propertylist2 = res.data;
          this.propertylist1.initialize(this.propertylist2, 12);
          this.pages = Array.from(
            { length: this.propertylist2.totalPages },
            (_, i) => i + 1
          );
          this.tableLoading = false;
        } else {
          this.propertylist2 = [];
          this.propertylist1.initialize(this.propertylist2, 12);
          this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.propertylist2 = [];
        this.propertylist1.initialize(this.propertylist2, 12);
        this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }
}
