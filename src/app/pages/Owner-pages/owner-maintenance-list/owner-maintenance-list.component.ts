import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { GenerateMaintenanceComponent } from '../../../modals/generate-maintenance/generate-maintenance.component';

@Component({
  selector: 'app-owner-maintenance-list',
  imports: [],
  templateUrl: './owner-maintenance-list.component.html',
  styleUrl: './owner-maintenance-list.component.css'
})
export class OwnerMaintenanceListComponent {


   constructor(private ModalService: ModalService, private route: Router) {}

  generateMaintenance() {
    this.ModalService.open(GenerateMaintenanceComponent, {
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

  viewresident() {
    this.route.navigateByUrl(`Association/view-properties/${1}`);
  }
}
