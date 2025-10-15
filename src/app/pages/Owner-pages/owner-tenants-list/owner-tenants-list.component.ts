import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { AddTenantComponent } from '../../../modals/add-tenant/add-tenant.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-owner-tenants-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './owner-tenants-list.component.html',
  styleUrl: './owner-tenants-list.component.css',
})
export class OwnerTenantsListComponent {
  TenantList1
  TenantList2 : any
  tableLoading = true
  pages: any







  constructor(private ModalService: ModalService, private route: Router,
    private apiService: ApiserviceService
  ) {
    this.TenantList1 = new TableService()
    this.TenantList1.initialize(this.TenantList2, 12)
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.TenantListinOwner()
  }

  
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

  TenantListinOwner() {
    this.apiService.TenantListinOwner<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.TenantList2 = res.data || [];
          // this.filteredProperties = [...this.propertieslist2];

          // Initialize TableService
          this.TenantList1 = new TableService();
          this.TenantList1.initialize(this.TenantList2, 12);

          // If backend provides pagination info
          this.pages = Array.from(
            { length: res.data?.totalPages || 1 },
            (_, i) => i + 1
          );

          this.tableLoading = false;
        } else {
          this.TenantList2 = []
          this.tableLoading = false;
          console.warn(res.message || 'Failed to load properties.');
        }
      },
      error: (err: any) => {
        this.TenantList2 = []
        this.tableLoading = false;
        console.error('Property list fetch failed:', err);
      },
    });
  }
}
