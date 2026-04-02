import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-featues-page',
  imports: [CommonModule],
  templateUrl: './featues-page.component.html',
  styleUrl: './featues-page.component.css'
})
export class FeatuesPageComponent {
selectedType: string = 'association';


featuresData: any = {
  association: [
    {
      icon: 'assets/images/features/resident.png',
      color: '#2ecc71',
      title: 'Resident management',
      desc: 'Manage properties and assign residents while maintaining details like unit info, pets, and vehicles in an organized way.'
    },
    {
      icon: 'assets/images/features/whatsapp-png.png',
      color: '#e74c3c',
      title: 'Whatsapp',
      desc: 'Send automated notifications for onboarding, invoices, payments, and visitor approvals to keep residents informed with timely updates.'
    },
    {
      icon: 'assets/images/features/agreement.png',
      color: '#f39c12',
      title: 'Agreement',
      desc: 'Create templates and manage agreements between HOA and owners with options to send, view, and track documents easily.'
    },
    {
      icon: 'assets/images/features/helpers.png',
      color: '#e74c3c',
      title: 'Helpers Staffs',
      desc: 'Manage maintenance staff and track resident complaints and service requests efficiently through a centralized system.'
    },
    {
      icon: 'assets/images/features/amenities.png',
      color: '#f39c12',
      title: 'Manage Amenities',
      desc: 'Create and manage shared facilities and monitor resident bookings for amenities like gyms, halls, and pools.'
    },
    {
      icon: 'assets/images/features/visitor.png',
      color: '#e74c3c',
      title: 'Visitors Management',
      desc: 'Generate QR codes, track visitor entries, and send approval requests to residents via WhatsApp for smooth access control.'
    }
  ],

  owner: [
    {
      icon: 'assets/images/features/resident.png',
      color: '#3498db',
      title: 'Manage Tenants',
      desc: 'Owners can add tenant details including name, email, advance payment, and other relevant information for easy management.'
    },
    {
      icon: 'assets/images/features/rent.png',
      color: '#00bcd4',
      title: 'Manage Rent & Maintenance',
      desc: 'Monthly rent invoices are generated automatically for tenants, with the option to create additional invoices when needed.'
    },
    {
      icon: 'assets/images/features/announcement.png',
      color: '#3498db',
      title: 'Announcements',
      desc: 'HOA can create announcements for residents with options to view, pin, and unpin important updates.'
    },
    {
      icon: 'assets/images/features/panic.png',
      color: '#f39c12',
      title: 'Emergency Panic Button',
      desc: 'Add emergency contacts, and upon triggering panic, calls are automatically forwarded to the saved contacts for immediate assistance.'
    },
    {
      icon: 'assets/images/features/amenities.png',
      color: '#00bcd4',
      title: 'Manage Amenities',
      desc: 'Residents can view HOA-created amenities and book facilities based on available time slots.'
    },
    {
      icon: 'assets/images/features/visitor.png',
      color: '#9b59b6',
      title: 'Manage Visitors',
      desc: ' Create pre-approved visitors, approve or decline other visitor requests, and track all entry and exit records.'
    },
  ]
};

featuresList = this.featuresData['association'];

changeType(type: string) {
  this.selectedType = type;
  this.featuresList = this.featuresData[type];
}
}
