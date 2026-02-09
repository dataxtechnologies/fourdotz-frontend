import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';

interface TourStep {
  key: string;
  title: string;
  description: string;
  images: string[];
  buttonText: string;
}

@Component({
  selector: 'app-website-tour-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './website-tour-modal.component.html',
  styleUrl: './website-tour-modal.component.css',
})
export class WebsiteTourModalComponent {


  constructor(private modalService: ModalService) {}



  associationPropertyTour: {
    tourTitle: string;
    steps: TourStep[];} = {
    tourTitle: 'Association Property Tour',
    steps: [
  {
    key: 'add_property',
    title: 'Add Property',
    description:
      'Click the Add Property button to create a new property under your association. Fill in the property details and configure maintenance settings. You can choose either a fixed monthly maintenance amount or a maintenance amount calculated based on square feet. Set a due date so residents must pay the maintenance before the selected day every month.',
    images: [
      'assets/images/tour/add-property-btn.png',
      'assets/images/tour/add-property-form.png',
    ],
    buttonText: 'Next',
  },

  {
    key: 'view_property',
    title: 'View Properties',
    description:
      'View all properties added to your association in one place. From here, you can see property details, manage maintenance information, and add owners or tenants to each property.',
    images: ['assets/images/tour/view-property-btn.png'],
    buttonText: 'Next',
  },

  {
    key: 'edit_property',
    title: 'Edit Property',
    description:
      'Edit property details anytime to update maintenance amounts, due dates, unit information, or other property-related settings.',
    images: ['assets/images/tour/edit-property-btn.png'],
    buttonText: 'Next',
  },

  {
    key: 'add_owner',
    title: 'Add Owner',
    description:
      'Add an owner to a property by entering ownership details such as name and contact information. Owners must be added before assigning pets or vehicles to a property.',
    images: ['assets/images/tour/add-owner-btn.png'],
    buttonText: 'Next',
  },

  {
    key: 'add_tenant',
    title: 'Add Tenant',
    description:
      'Add tenants to a property with rental duration and contact details. A tenant must be added before registering pets or vehicles under that property.',
    images: ['assets/images/tour/add-tenant-btn.png'],
    buttonText: 'Next',
  },

  {
    key: 'add_pet',
    title: 'Add Pet',
    description:
      'Register pets belonging to an owner or tenant. Make sure an owner or tenant is added to the property before registering a pet.',
    images: ['assets/images/tour/add-pet-btn.png'],
    buttonText: 'Next',
  },

  {
    key: 'add_vehicle',
    title: 'Add Vehicle',
    description:
      'Add vehicle details such as vehicle number and type for parking and security access. An owner or tenant must be added before registering a vehicle.',
    images: ['assets/images/tour/add-vehicle-btn.png'],
    buttonText: 'Proceed',
  },
],

  };

  currentStepIndex = 0;
  currentImageIndex = 0;

  /* ================================
     SAFE GETTERS
  ================================ */
  get currentStep(): TourStep {
    return this.associationPropertyTour.steps[this.currentStepIndex];
  }

  get currentImages(): string[] {
    return this.currentStep.images;
  }

  /* ================================
     STEP NAVIGATION
  ================================ */
  nextStep() {
    if (this.currentStepIndex < this.associationPropertyTour.steps.length - 1) {
      this.currentStepIndex++;
      this.currentImageIndex = 0;
    }
  }

  previousStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.currentImageIndex = 0;
    }
  }

  /* ================================
     IMAGE NAVIGATION
  ================================ */
  nextImage() {
    if (this.currentImageIndex < this.currentImages.length - 1) {
      this.currentImageIndex++;
    }
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  proceed() {
    console.log('Tour completed');
    this.modalService.close();
    // close modal / save flag
  }
}
