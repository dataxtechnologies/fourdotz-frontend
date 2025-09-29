import { Component } from '@angular/core';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { ModalService } from 'ngx-modal-ease';
import { Router } from '@angular/router';
import { GenerateMaintenanceComponent } from '../../../modals/generate-maintenance/generate-maintenance.component';

@Component({
  selector: 'app-maintenance-list',
  imports: [],
  templateUrl: './maintenance-list.component.html',
  styleUrl: './maintenance-list.component.css',
})
export class MaintenanceListComponent {
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
