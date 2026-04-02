import { Component, Input } from '@angular/core';
import { CommonModule, TitleCasePipe, DatePipe } from '@angular/common';
import { ModalService } from 'ngx-modal-ease';
 
@Component({
  selector: 'app-view-ticket-details',
  imports: [CommonModule, TitleCasePipe, DatePipe],
  templateUrl: './view-ticket-details.component.html',
  styleUrl: './view-ticket-details.component.css'
})
export class ViewTicketDetailsComponent {

  @Input() enquiry : any

  constructor(private Modal : ModalService) { }

   // Computed helper to display type label cleanly
  get typeLabel(): string {
    return this.enquiry.type.replace(/_/g, ' ');
  }
 
  // Computed helper for full name
  get fullName(): string {
    return `${this.enquiry.name}`;
  }
 
  // Computed helper for initials
  get initials(): string {
    return `${this.enquiry.name[0]}`.toUpperCase();
  }
 
  onClose(): void {
    this.Modal.close();
  }
}
