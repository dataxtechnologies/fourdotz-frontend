import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';

@Component({
  selector: 'app-property-list',
  imports: [],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent {

   constructor(private ModalService: ModalService, private route: Router) {}

  Addproperty() {
    this.ModalService.open(AddPropertyComponent, {
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

  viewproperty(){
    this.route.navigateByUrl(`Association/view-properties/${1}`)
  } 

}
