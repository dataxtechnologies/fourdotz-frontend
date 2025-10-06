import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddOwnerComponent } from '../../../modals/add-owner/add-owner.component';
import { ModalService } from 'ngx-modal-ease';
import { AddTenantComponent } from '../../../modals/add-tenant/add-tenant.component';
import { AddPetComponent } from '../../../modals/add-pet/add-pet.component';
import { AddVehicleComponent } from '../../../modals/add-vehicle/add-vehicle.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { AssociationServiceService } from '../../../services/association/association-service.service';

@Component({
  selector: 'app-property-view',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './property-view.component.html',
  styleUrl: './property-view.component.css',
})
export class PropertyViewComponent {
  activeTab: string = 'Resident';
    Associationdata: any;
  PropertyId: any;
  header_loading: boolean = true;

  constructor(private ModalService: ModalService, private Router : Router, private apiService: ApiserviceService, private route: ActivatedRoute, private AssociationService: AssociationServiceService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.route.params.subscribe((params) => {
      this.PropertyId = params['propertiesId'] || null;
    });

     this.AssociationService.OwnerStatus$.subscribe((AddOwner) => {
      if (AddOwner) {
        this.ViewpropertybyId(this.PropertyId);
      }
    });


    this.ViewpropertybyId(this.PropertyId)
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  goback() {
    this.Router.navigateByUrl('/Association/properties-list')
  }

  addowner(propertyId : any) {
    // AddOwnerComponent
    this.ModalService.open(AddOwnerComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data:{
        PropertyIddata: propertyId
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }
  addTenant() {
    // AddOwnerComponent
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
  addpet() {
    // AddOwnerComponent
    this.ModalService.open(AddPetComponent, {
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
  addVehicle() {
    // AddOwnerComponent
    this.ModalService.open(AddVehicleComponent, {
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
  
  ViewpropertybyId(data : any){
    this.apiService.ViewpropertybyId<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Associationdata = res.data;
          this.header_loading = false; // stop loading
        } else {
          // alert(res.message || 'Something went wrong.');
          this.header_loading = false; // stop loading even if error
        }
      },
      error: (err: any) => {
        this.header_loading = false;
        console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }
}
