import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { GenerateMaintenanceComponent } from '../../../modals/generate-maintenance/generate-maintenance.component';

@Component({
  selector: 'app-tenant-maintenance-list',
  imports: [],
  templateUrl: './tenant-maintenance-list.component.html',
  styleUrl: './tenant-maintenance-list.component.css'
})
export class TenantMaintenanceListComponent {

  
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
