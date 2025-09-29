import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { AddResidentComponent } from '../../../modals/add-resident/add-resident.component';

@Component({
  selector: 'app-residents-list',
  imports: [],
  templateUrl: './residents-list.component.html',
  styleUrl: './residents-list.component.css'
})
export class ResidentsListComponent {

  constructor(private ModalService: ModalService, private route: Router) {}

  Addproperty() {
    this.ModalService.open(AddResidentComponent, {
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

  viewresident(){
    this.route.navigateByUrl(`Association/view-resident/${1}`)
  }


}
