import { Component } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';
import { ViewRequestUserComponent } from '../../../modals/view-request-user/view-request-user.component';
import { CreateRequestUserComponent } from '../../../modals/create-request-user/create-request-user.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwnerServiceService } from '../../../services/owner/owner-service.service';

@Component({
  selector: 'app-list-requests-user',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-requests-user.component.html',
  styleUrl: './list-requests-user.component.css',
})
export class ListRequestsUserComponent {
  requestlist1;
  requestlist2: any[] = [];
  pages: any;
  tableLoading: boolean = true;

  constructor(
    private Modal: ModalService,
    private apiService: ApiserviceService,
    private OwnerService: OwnerServiceService
  ) {
    this.requestlist1 = new TableService();
    this.requestlist1.initialize(this.requestlist2, 10);
  }

  ngOnInit(): void {
    this.ListRequestUser();

    this.OwnerService.RequestUserStatus$.subscribe((res: any) => {
      if (res?.success) {
        this.ListRequestUser();
      }
    });
  }

  isImage(file: string) {
    return file.match(/\.(jpeg|jpg|png|gif)$/i);
  }

  isVideo(file: string) {
    return file.match(/\.(mp4|mov|wmv|avi)$/i);
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }

  OpenViewRequest(data: any) {
    this.Modal.open(ViewRequestUserComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      data: {
        RequestData: data,
      },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  OpenCreateRequest() {
    this.Modal.open(CreateRequestUserComponent, {
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

  // ListRequestUser

  ListRequestUser() {
    this.apiService.ListRequestUser<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.requestlist2 = res.data || [];

          // Initialize TableService
          this.requestlist1.initialize(this.requestlist2, 10);

          // If backend provides pagination info
          this.pages = Array.from(
            { length: res.data?.totalPages || 1 },
            (_, i) => i + 1
          );

          this.tableLoading = false;
        } else {
          this.tableLoading = false;
          this.requestlist2 = [];

          // Initialize TableService
          this.requestlist1.initialize(this.requestlist2, 10);
          //console.warn(res.message || 'Failed to load properties.');
        }
      },
      error: (err: any) => {
        this.tableLoading = false;
        this.requestlist2 = [];

        // Initialize TableService
        this.requestlist1.initialize(this.requestlist2, 10);
        //console.error('Property list fetch failed:', err);
      },
    });
  }
}
