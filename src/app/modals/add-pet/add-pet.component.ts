import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-add-pet',
  imports: [],
  templateUrl: './add-pet.component.html',
  styleUrl: './add-pet.component.css',
})
export class AddPetComponent {
  constructor(private Modal: ModalService) {}

  closeModal() {
    this.Modal.close();
  }
}
