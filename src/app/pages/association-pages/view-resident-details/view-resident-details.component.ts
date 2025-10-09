import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';
import { AddOwnerComponent } from '../../../modals/add-owner/add-owner.component';
import { AddTenantComponent } from '../../../modals/add-tenant/add-tenant.component';
import { AddPetComponent } from '../../../modals/add-pet/add-pet.component';
import { AddVehicleComponent } from '../../../modals/add-vehicle/add-vehicle.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-resident-details',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './view-resident-details.component.html',
  styleUrl: './view-resident-details.component.css',
})
export class ViewResidentDetailsComponent {
  activeTab: string = 'Property';
  Associationdata: any;
  PropertyId: any;

  constructor(
    private ModalService: ModalService,
    private apiService: ApiserviceService,
    private route: ActivatedRoute,
    private Router : Router
  ) {}

  setTab(tab: string) {
    this.activeTab = tab;
  }

  goback() {
    this.Router.navigateByUrl('/Association/residents-list')
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.PropertyId = params['residentId'] || null;
    });
    this.ViewpropertybyId(this.PropertyId);
  }

  // grantFullAccess(data: any) {}

  // Permissions model
  permissions = {
    tenant: {
      create: false,
      list: false,
      update: false,
      delete: false,
    },
    pet: {
      create: false,
      list: false,
      update: false,
      delete: false,
    },
    vehicle: {
      create: false,
      list: false,
      update: false,
      delete: false,
    },
    invoice: {
      create: false,
    },
  };

  // Give full access for a section
  grantFullAccess(section: string) {
    switch (section) {
      case 'onboarding':
        this.permissions.tenant = {
          create: true,
          list: true,
          update: true,
          delete: true,
        };
        this.permissions.pet = {
          create: true,
          list: true,
          update: true,
          delete: true,
        };
        this.permissions.vehicle = {
          create: true,
          list: true,
          update: true,
          delete: true,
        };
        break;

      case 'invoice':
        this.permissions.invoice.create = true;
        break;
    }
  }

  // Optional: reset permissions for a section
  revokeAccess(section: string) {
    switch (section) {
      case 'onboarding':
        this.permissions.tenant = {
          create: false,
          list: false,
          update: false,
          delete: false,
        };
        this.permissions.pet = {
          create: false,
          list: false,
          update: false,
          delete: false,
        };
        this.permissions.vehicle = {
          create: false,
          list: false,
          update: false,
          delete: false,
        };
        break;

      case 'invoice':
        this.permissions.invoice.create = false;
        break;
    }
  }

  // Debug (optional)
  logPermissions() {
    console.log('Current permissions:', this.permissions);
  }

  addproperty() {
    // AddOwnerComponent
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
 addTenant(propertyId : any) {
    // AddOwnerComponent
    this.ModalService.open(AddTenantComponent, {
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
  addpet(data: any) {
    // AddOwnerComponent
    this.ModalService.open(AddPetComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        propertyId: data,
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }
 addVehicle(data : any) {
    // AddOwnerComponent
    this.ModalService.open(AddVehicleComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
       data:{
        associationId:data
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  ViewpropertybyId(data: any) {
    this.apiService.ViewpropertybyId<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Associationdata = res.data;
          // this.header_loading = false; // stop loading
        } else {
          // alert(res.message || 'Something went wrong.');
          // this.header_loading = false; // stop loading even if error
        }
      },
      error: (err: any) => {
        // this.header_loading = false;
        console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }
}
