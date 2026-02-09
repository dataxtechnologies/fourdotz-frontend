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
import { EditPropertiesDataComponent } from '../../../modals/edit-properties-data/edit-properties-data.component';
import { EditOwnerDataComponent } from '../../../modals/edit-owner-data/edit-owner-data.component';
import { EditTenantDataComponent } from '../../../modals/edit-tenant-data/edit-tenant-data.component';
import { EditPetDataComponent } from '../../../modals/edit-pet-data/edit-pet-data.component';
import { EditVehicleDataComponent } from '../../../modals/edit-vehicle-data/edit-vehicle-data.component';
import { RemoveResidentModalComponent } from '../../../modals/remove-resident-modal/remove-resident-modal.component';
import { RemoveTenantModalComponent } from '../../../modals/remove-tenant-modal/remove-tenant-modal.component';
import { ToastrService } from 'ngx-toastr';
import { RemovePetVehicleComponent } from '../../../modals/remove-pet-vehicle/remove-pet-vehicle.component';
import { ShepherdService } from 'angular-shepherd';
import { DashboardLayoutService } from '../../../layouts/dashboard-layout/dashboard-layout.service';

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

  constructor(
    private ModalService: ModalService,
    private Router: Router,
    private apiService: ApiserviceService,
    private route: ActivatedRoute,
    private AssociationService: AssociationServiceService,
    private toastr: ToastrService,
     private shepherd: ShepherdService,
     private DashboardService: DashboardLayoutService
  ) {}

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

    this.AssociationService.OwnerUpdateStatus$.subscribe((OwnerUpdate) => {
      if (OwnerUpdate) {
        this.ViewpropertybyId(this.PropertyId);
      }
    });

    this.AssociationService.PropertyStatus$.subscribe((AddProperty) => {
      if (AddProperty) {
        this.ViewpropertybyId(this.PropertyId);
      }
    });

    this.AssociationService.petStatus$.subscribe((Addpet) => {
      if (Addpet) {
        this.ViewpropertybyId(this.PropertyId);
      }
    });

    this.AssociationService.VehicleStatus$.subscribe((Addvehicle) => {
      if (Addvehicle) {
        this.ViewpropertybyId(this.PropertyId);
      }
    });

    this.AssociationService.RemoveResidentStatus$.subscribe(
      (removeresident) => {
        if (removeresident) {
          this.ViewpropertybyId(this.PropertyId);
        }
      },
    );

    
    this.ViewpropertybyId(this.PropertyId);

     


  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  goback() {
    this.Router.navigateByUrl('/Association/properties-list');
  }

  addowner(propertyId: any) {
    // AddOwnerComponent
    this.ModalService.open(AddOwnerComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        PropertyIddata: propertyId,
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  EditProperty(propertyId: any) {
    // AddOwnerComponent
    this.ModalService.open(EditPropertiesDataComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        PropertyIddata: propertyId,
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }
  addTenant(data: any) {
    // 🔥 Check resident type before opening modal
    if (this.Associationdata?.resident_type !== 'owner') {
      this.toastr.error('Add owner first to add tenant', 'Error');
      return;
    }

    // ✔ If owner → open the popup
    this.ModalService.open(AddTenantComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        PropertyIddata: data,
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
        associationId: data,
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }
  addVehicle(data: any) {
    // AddOwnerComponent
    this.ModalService.open(AddVehicleComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        associationId: data,
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
          this.header_loading = false; // stop loading
        } else {
          // alert(res.message || 'Something went wrong.');
          this.header_loading = false; // stop loading even if error
        }
      },
      error: (err: any) => {
        this.header_loading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  EditOwner(propertyId: any, ownerData: any) {
    // AddOwnerComponent
    this.ModalService.open(EditOwnerDataComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        PropertyIddata: propertyId,
        OwnerDetails: ownerData,
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  EditTenant(propertydata: any) {
    // AddOwnerComponent
    this.ModalService.open(EditTenantDataComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        TenantDetails: propertydata,
      },
      actions: {
        click: false,
        escape: false,
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

  RemovePet(associationId: any) {
    // AddOwnerComponent
    this.ModalService.open(RemovePetVehicleComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        associationId: associationId,
        type: 'pet',
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  RemoveVehicle(associationId: any) {
    // AddOwnerComponent
    this.ModalService.open(RemovePetVehicleComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        associationId: associationId,
        type: 'vehicle',
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  RemoveOwner(associationId: any) {
    this.ModalService.open(RemoveResidentModalComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        associationId: associationId,
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  RemoveTenant(associationId: any) {
    this.ModalService.open(RemoveTenantModalComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        associationId: associationId,
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  startPropertyViewTour() {
    const SHOULD_RUN_TOUR = true;
    if (!SHOULD_RUN_TOUR) return;

    if (this.shepherd.tourObject) {
      this.shepherd.cancel();
    }

    this.shepherd.modal = true;

    this.shepherd.defaultStepOptions = {
      scrollTo: { behavior: 'smooth', block: 'center' },
      cancelIcon: { enabled: false },
      classes: 'shepherd-dark-theme',
    };

    this.shepherd.addSteps([
      // 1️⃣ Header
      {
        id: 'property-header',
        title: 'Property Details',
        text: 'This page shows complete details of the selected property.',
        attachTo: { element: '#tour-property-header', on: 'bottom' },
        buttons: [
          { text: 'Skip', classes: 'shepherd-btn-secondary', action: () => this.finishTour() },
          { text: 'Next', classes: 'shepherd-btn-primary', action: () => this.shepherd.next() },
        ],
      },

      // 2️⃣ Edit Property
      {
        id: 'edit-property',
        title: 'Edit Property',
        text: 'Click here to edit property details like area, facing, maintenance, etc.',
        attachTo: { element: '#tour-edit-property', on: 'left' },
        buttons: [
          { text: 'Back', classes: 'shepherd-btn-secondary', action: () => this.shepherd.back() },
          { text: 'Next', classes: 'shepherd-btn-primary', action: () => this.shepherd.next() },
        ],
      },

      // 3️⃣ Resident Tab
      {
        id: 'resident-tab',
        title: 'Resident Section',
        text: 'This section contains Owner and Tenant details.',
        attachTo: { element: '#tour-tab-resident', on: 'bottom' },
        buttons: [
          { text: 'Back', classes: 'shepherd-btn-secondary', action: () => this.shepherd.back() },
          { text: 'Next', classes: 'shepherd-btn-primary', action: () => this.shepherd.next() },
        ],
      },

      {
        id: 'petvehicle-tab',
        title: 'Pet & Vehicle Section',
        text: 'This section contains Pet and Vehicle details.',
        attachTo: { element: '#tour-tab-petvehicle', on: 'bottom' },
        buttons: [
          { text: 'Back', classes: 'shepherd-btn-secondary', action: () => this.shepherd.back() },
          { text: 'Next', classes: 'shepherd-btn-primary', action: () => this.shepherd.next() },
        ],
      },

      // 4️⃣ Owner Card
      {
        id: 'owner-card',
        title: 'Owner Details',
        text: 'Here you can add, edit, or remove the property owner.',
        attachTo: { element: '#tour-owner-card', on: 'top' },
        buttons: [
          { text: 'Back', classes: 'shepherd-btn-secondary', action: () => this.shepherd.back() },
          { text: 'Next', classes: 'shepherd-btn-primary', action: () => this.shepherd.next() },
        ],
      },

      // 5️⃣ Tenant Card
      {
        id: 'tenant-card',
        title: 'Tenant Details',
        text: 'If the property is rented, tenant details will appear here.',
        attachTo: { element: '#tour-tenant-card', on: 'top' },
        buttons: [
          { text: 'Back', classes: 'shepherd-btn-secondary', action: () => this.shepherd.back() },
          {
            text: 'Next', classes: 'shepherd-btn-primary',
            action: () => {
              this.setTab('petvehicle'); // 🔥 Auto switch tab
              setTimeout(() => this.shepherd.next(), 400);
            },
          },
        ],
      },

      // 6️⃣ Pet Section
      {
        id: 'pet-card',
        title: 'Pet Details',
        text: 'You can add pet details for the resident here.',
        attachTo: { element: '#tour-pet-card', on: 'top' },
        buttons: [
          { text: 'Back', classes: 'shepherd-btn-secondary', action: () => this.shepherd.back() },
          { text: 'Next', classes: 'shepherd-btn-primary', action: () => {
              this.setTab('Resident'); // 🔥 Auto switch tab
              setTimeout(() => this.shepherd.next(), 400);
            }, },
        ],
      },

      // 7️⃣ Vehicle Section
      {
        id: 'vehicle-card',
        title: 'Vehicle Details',
        text: 'Add and manage vehicle details linked to this property.',
        attachTo: { element: '#tour-vehicle-card', on: 'top' },
        buttons: [
          { text: 'Back', classes: 'shepherd-btn-secondary', action: () => this.shepherd.back() },
          {
            text: 'Finish', classes: 'shepherd-btn-primary',
            action: () => this.finishTour(),
          },
        ],
      },
    ]);

    this.shepherd.start();
  }

  finishTour() {
    // this.onPropertyTourCompleted();
    this.shepherd.complete();
  }

  onPropertyTourCompleted() {
    const payload = {
      menu: {
        propertyview: true,
      },
    };

    this.apiService.AddTourdatas<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
           this.DashboardService.triggerTourApiStatusUpdate(res);
          // ✅ Update session storage too
          // const menu = JSON.parse(sessionStorage.getItem('user_menu') || '{}');
          // menu.propertyview = true;
          // sessionStorage.setItem('user_menu', JSON.stringify(menu));
        }
      },
    });
  }
}
