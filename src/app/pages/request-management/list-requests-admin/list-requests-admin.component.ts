import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ModalService } from 'ngx-modal-ease';
import { ToastrService } from 'ngx-toastr';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAdminComponent } from '../../../modals/create-admin/create-admin.component';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { ViewRequestAdminComponent } from '../../../modals/view-request-admin/view-request-admin.component';
@Component({
  selector: 'app-list-requests-admin',
   imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-requests-admin.component.html',
  styleUrl: './list-requests-admin.component.css'
})
export class ListRequestsAdminComponent {
 // REQUEST LIST
  RequestList1 = new TableService();
  RequestList2: any[] = [];
  tableLoading = true;

  // ADMIN LIST
  adminList1 = new TableService();
  adminList2: any[] = [];
  adminLoading = true;

  constructor(
    private api: ApiserviceService,
    private modal: ModalService,
    private toast: ToastrService,
    private AssociationService: AssociationServiceService
  ) {}

  ngOnInit(): void {  
    this.ListRequests();

        this.AssociationService.ChangeRequeststatusStatus$.subscribe((res: any) => {
      if (res?.success) this.ListRequests();
    });

  }

  /* FETCH ALL REQUESTS */
  ListRequests() {
    this.tableLoading = true;

    this.api.ListAllrequestinServiceAdmin<any>().subscribe({
      next: (res) => {
        this.RequestList2 = res?.success ? res.data : [];
        this.RequestList1.initialize(this.RequestList2, 10);
        this.tableLoading = false;
      },
      error: () => {
        this.RequestList2 = [];
        this.RequestList1.initialize([], 10);
        this.tableLoading = false;
      },
    });
  }

  

  /* OPEN VIEW REQUEST MODAL */
  OpenViewRequest(item: any) {
    this.modal.open(ViewRequestAdminComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      data: {
        RequestData: item,
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
  }

  /* CHECK IMAGE */
  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|webp)$/i.test(url);
  }

  /* CHECK VIDEO */
  isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(url);
  }

  /* OPEN IMAGE / VIDEO IN NEW TAB */
  openLink(url: string) {
    window.open(url, '_blank');
  }
}
