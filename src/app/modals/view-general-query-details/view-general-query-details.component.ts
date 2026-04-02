import { Component, Input } from '@angular/core';
import { CommonModule, TitleCasePipe, DatePipe } from '@angular/common';
import { ModalService } from 'ngx-modal-ease';
 
@Component({
  selector: 'app-view-general-query-details',
  imports: [CommonModule, TitleCasePipe, DatePipe],
  templateUrl: './view-general-query-details.component.html',
  styleUrl: './view-general-query-details.component.css'
})
export class ViewGeneralQueryDetailsComponent {

  @Input() enquiry : any

  constructor(private Modal : ModalService) { }

   // Computed helper to display type label cleanly
  get typeLabel(): string {
    return this.enquiry.type.replace(/_/g, ' ');
  }
 
  // Computed helper for full name
  get fullName(): string {
    return `${this.enquiry.name} ${this.enquiry.last_name}`;
  }
 
  // Computed helper for initials
  get initials(): string {
    return `${this.enquiry.name[0]}${this.enquiry.last_name[0]}`.toUpperCase();
  }
 
  onClose(): void {
    this.Modal.close();
  }
}
