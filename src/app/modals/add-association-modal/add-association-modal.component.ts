import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-add-association-modal',
  imports: [],
  templateUrl: './add-association-modal.component.html',
  styleUrl: './add-association-modal.component.css'
})
export class AddAssociationModalComponent {

  constructor(private Modal : ModalService){}

  closeModal(){
    this.Modal.close()
  }

}
