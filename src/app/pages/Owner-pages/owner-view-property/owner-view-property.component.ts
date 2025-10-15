import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';
import { AddOwnerComponent } from '../../../modals/add-owner/add-owner.component';
import { AddTenantComponent } from '../../../modals/add-tenant/add-tenant.component';
import { AddPetComponent } from '../../../modals/add-pet/add-pet.component';
import { AddVehicleComponent } from '../../../modals/add-vehicle/add-vehicle.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { OwnerServiceService } from '../../../services/owner/owner-service.service';

@Component({
  selector: 'app-owner-view-property',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './owner-view-property.component.html',
  styleUrl: './owner-view-property.component.css',
})
export class OwnerViewPropertyComponent {
  activeTab: string = 'Resident';
  propertiesId: any
  Propertiesdata: any
  header_loading = true

  constructor(private ModalService: ModalService, private route: ActivatedRoute, private apiService: ApiserviceService, 
    private OwnerService : OwnerServiceService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.route.params.subscribe((params) => {
      this.propertiesId = params['propertiesId'] || null;
    });


    this.OwnerService.PetStatus$.subscribe((AddPet) => {
      if (AddPet) {
        this.ViewpropertybyId(this.propertiesId);
      }
    });

    this.OwnerService.TenantStatus$.subscribe((AddTenant) => {
      if (AddTenant) {
        this.ViewpropertybyId(this.propertiesId);
      }
    });

    this.OwnerService.VehicleStatus$.subscribe((AddVehicle) => {
      if (AddVehicle) {
        this.ViewpropertybyId(this.propertiesId);
      }
    });
   
    
    this.ViewpropertybyId(this.propertiesId)
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  goback() {}

  addowner() {
    // AddOwnerComponent
    this.ModalService.open(AddOwnerComponent, {
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
  addTenant(data : any) {
    // AddOwnerComponent
    this.ModalService.open(AddTenantComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data:{
        PropertyIddata: data
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }
  addpet(data :any) {
    // AddOwnerComponent
    this.ModalService.open(AddPetComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data:{
        associationId: data
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }
  addVehicle(data :any) {
    // AddOwnerComponent
    this.ModalService.open(AddVehicleComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data:{
        associationId: data
      },
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
          this.Propertiesdata = res.data;
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
