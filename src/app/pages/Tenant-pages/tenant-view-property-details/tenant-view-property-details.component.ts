import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';
import { AddOwnerComponent } from '../../../modals/add-owner/add-owner.component';
import { AddTenantComponent } from '../../../modals/add-tenant/add-tenant.component';
import { AddPetComponent } from '../../../modals/add-pet/add-pet.component';
import { AddVehicleComponent } from '../../../modals/add-vehicle/add-vehicle.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { OwnerServiceService } from '../../../services/owner/owner-service.service';
import { EditPetDataComponent } from '../../../modals/edit-pet-data/edit-pet-data.component';
import { EditVehicleDataComponent } from '../../../modals/edit-vehicle-data/edit-vehicle-data.component';

@Component({
  selector: 'app-tenant-view-property-details',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tenant-view-property-details.component.html',
  styleUrl: './tenant-view-property-details.component.css',
})
export class TenantViewPropertyDetailsComponent {
  activeTab: string = 'Resident';
  TenantPropertyData : any
  header_loading: any

  constructor(private ModalService: ModalService, private apiService: ApiserviceService, private OwnerService: OwnerServiceService) {}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.TenantPropertyDatas()

     this.OwnerService.PetStatus$.subscribe((AddPet) => {
      if (AddPet) {
        this.TenantPropertyDatas();
      }
    });

    this.OwnerService.TenantStatus$.subscribe((AddTenant) => {
      if (AddTenant) {
        this.TenantPropertyDatas();
      }
    });

    this.OwnerService.VehicleStatus$.subscribe((AddVehicle) => {
      if (AddVehicle) {
        this.TenantPropertyDatas();
      }
    });
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

  TenantPropertyDatas(){
    this.apiService.TenantPropertyDatas<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.TenantPropertyData = res.data;
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


   EditPet(PetData: any, propertyId: any) {
      // AddOwnerComponent
      this.ModalService.open(EditPetDataComponent, {
        modal: {
          enter: 'enter-going-down 0.3s ease-out',
          leave: 'fade-out 0.5s',
        },
        overlay: { leave: 'fade-out 0.5s' },
        data: {
          PetDetails: PetData,
          propertyId: propertyId,
        },
        actions: {
          click: false,
          escape: false,
        },
      });
    }
  
    EditVehicle(VehicleData: any, associationId: any) {
      // AddOwnerComponent
      this.ModalService.open(EditVehicleDataComponent, {
        modal: {
          enter: 'enter-going-down 0.3s ease-out',
          leave: 'fade-out 0.5s',
        },
        overlay: { leave: 'fade-out 0.5s' },
        data: {
          vehicleDetails: VehicleData,
          associationId: associationId,
        },
        actions: {
          click: false,
          escape: false,
        },
      });
    }
}
