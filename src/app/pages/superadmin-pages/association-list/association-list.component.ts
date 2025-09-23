import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';
import { AddAssociationModalComponent } from '../../../modals/add-association-modal/add-association-modal.component';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-association-list',
  imports: [],
  templateUrl: './association-list.component.html',
  styleUrl: './association-list.component.css',
})
export class AssociationListComponent {
  constructor(private ModalService: ModalService, private route: Router) {}

  AddAssociation() {
    this.ModalService.open(AddAssociationModalComponent, {
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


  viewassociation(data :any){
    this.route.navigateByUrl(`Superadmin/view-association/${data}`)
  }
}
