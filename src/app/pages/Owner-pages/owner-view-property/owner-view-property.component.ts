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
import { EditTenantDataComponent } from '../../../modals/edit-tenant-data/edit-tenant-data.component';
import { RemoveTenantModalComponent } from '../../../modals/remove-tenant-modal/remove-tenant-modal.component';
import { EditPetDataComponent } from '../../../modals/edit-pet-data/edit-pet-data.component';
import { EditVehicleDataComponent } from '../../../modals/edit-vehicle-data/edit-vehicle-data.component';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { ToastrService } from 'ngx-toastr';
import { RemovePetVehicleComponent } from '../../../modals/remove-pet-vehicle/remove-pet-vehicle.component';
import { ShepherdService } from 'angular-shepherd';
import { DashboardLayoutService } from '../../../layouts/dashboard-layout/dashboard-layout.service';

@Component({
  selector: 'app-owner-view-property',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './owner-view-property.component.html',
  styleUrl: './owner-view-property.component.css',
})
export class OwnerViewPropertyComponent {
  activeTab: string = 'Resident';
  propertiesId: any;
  Propertiesdata: any;
  header_loading = true;

  constructor(
    private ModalService: ModalService,
    private route: ActivatedRoute,
    private apiService: ApiserviceService,
    private OwnerService: OwnerServiceService,
    private AssociationService: AssociationServiceService,
    private router: Router,
    private toastr: ToastrService,
    private shepherd: ShepherdService,
    private DashboardService: DashboardLayoutService,
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

    this.AssociationService.RemoveResidentStatus$.subscribe(
      (removeresident) => {
        if (removeresident) {
          this.ViewpropertybyId(this.propertiesId);
        }
      },
    );

    this.ViewpropertybyId(this.propertiesId);

    // const menu = JSON.parse(sessionStorage.getItem('user_menu') || '{}');

    // if (!menu.ownerpropertyviewtour) {
    //   this.startTour();
    // }
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  goback() {
    this.router.navigateByUrl('/Owner/properties-list');
  }

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
  addTenant(data: any) {
    // 🔥 Check resident type before opening modal
    if (this.Propertiesdata?.resident_type !== 'owner') {
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

  ViewpropertybyId(data: any) {
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
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }

  startTour() {
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
        id: 'property-details',
        title: 'Property Details',
        text: 'This show the complete details of the selected property.',
        attachTo: { element: '#tour-property-details', on: 'bottom' },
        buttons: [
          {
            text: 'Skip',
            classes: 'shepherd-btn-secondary',
            action: () => this.finishTour(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },

      {
        id: 'tenant-card',
        title: 'Tenant Details',
        text: 'This section contains Tenant details.',
        attachTo: { element: '#tour-card-tenant', on: 'bottom' },
        buttons: [
          {
            text: 'Back',
            classes: 'shepherd-btn-secondary',
            action: () => this.shepherd.back(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },
      {
        id: 'add-tenant',
        title: 'Add Tenant',
        text: 'Click here to add the new tenant to the property.',
        attachTo: { element: '#tour-add-tenant', on: 'bottom' },
        buttons: [
          {
            text: 'Back',
            classes: 'shepherd-btn-secondary',
            action: () => this.shepherd.back(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },

      {
        id: 'pet-tab',
        title: 'Pet Tab',
        text: 'This tab manage the pets and vehicles of the property.',
        attachTo: { element: '#tour-petvehicle-tab', on: 'top' },
        buttons: [
          {
            text: 'Back',
            classes: 'shepherd-btn-secondary',
            action: () => this.shepherd.back(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => {
              this.setTab('petvehicle'); // 🔥 Auto switch tab
              setTimeout(() => this.shepherd.next(), 400);
            },
          },
        ],
      },

      {
        id: 'add-pet',
        title: 'Add Pet Details',
        text: 'Click here to add the new pet to the property.',
        attachTo: { element: '#tour-add-pet', on: 'bottom' },
        buttons: [
          {
            text: 'Back',
            classes: 'shepherd-btn-secondary',
            action: () => this.shepherd.back(),
          },
          {
            text: 'Next',
            classes: 'shepherd-btn-primary',
            action: () => this.shepherd.next(),
          },
        ],
      },

      {
        id: 'add-vehicle',
        title: 'Add vehicle Details',
        text: 'Click here to add the new vehicle to the property.',
        attachTo: { element: '#tour-add-vehicle', on: 'bottom' },
        buttons: [
          {
            text: 'Back',
            classes: 'shepherd-btn-secondary',
            action: () => this.shepherd.back(),
          },
          {
            text: 'Finish',
            classes: 'shepherd-btn-primary',
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
        ownerpropertyviewtour: true,
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
