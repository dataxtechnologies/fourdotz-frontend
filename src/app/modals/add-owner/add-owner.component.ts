import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-add-owner',
  imports: [],
  templateUrl: './add-owner.component.html',
  styleUrl: './add-owner.component.css'
})
export class AddOwnerComponent {

    constructor(private Modal : ModalService){}
  
    closeModal(){
      this.Modal.close()
    }
}
