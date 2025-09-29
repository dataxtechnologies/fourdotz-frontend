import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';
import { AddOwnerComponent } from '../../../modals/add-owner/add-owner.component';
import { AddTenantComponent } from '../../../modals/add-tenant/add-tenant.component';
import { AddPetComponent } from '../../../modals/add-pet/add-pet.component';
import { AddVehicleComponent } from '../../../modals/add-vehicle/add-vehicle.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-owner-view-property',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './owner-view-property.component.html',
  styleUrl: './owner-view-property.component.css'
})
export class OwnerViewPropertyComponent {

  activeTab: string = 'Resident';
  
    constructor(private ModalService: ModalService) {}
  
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

}
