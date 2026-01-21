import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-view-visitor-details',
  imports: [CommonModule],
  templateUrl: './view-visitor-details.component.html',
  styleUrl: './view-visitor-details.component.css'
})
export class ViewVisitorDetailsComponent {

  @Input() visitor_details : any;

  constructor(private modal : ModalService) { }

  closeModal() {
    this.modal.close();
  }

}
