import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-add-vehicle',
  imports: [],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent {

        constructor(private Modal : ModalService){}
      
        closeModal(){
          this.Modal.close()
        }

}
