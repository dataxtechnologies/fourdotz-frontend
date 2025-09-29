import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { AddTenantComponent } from '../../../modals/add-tenant/add-tenant.component';

@Component({
  selector: 'app-owner-tenants-list',
  imports: [],
  templateUrl: './owner-tenants-list.component.html',
  styleUrl: './owner-tenants-list.component.css'
})
export class OwnerTenantsListComponent {

   constructor(private ModalService: ModalService, private route: Router) {}

  Addtenant() {
    this.ModalService.open(AddTenantComponent, {
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

  // viewproperty(){
  //   this.route.navigateByUrl(`Association/view-properties/${1}`)
  // }

}
