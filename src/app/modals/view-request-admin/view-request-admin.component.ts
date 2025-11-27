import { Component, Input } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';
@Component({
  selector: 'app-view-request-admin',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './view-request-admin.component.html',
  styleUrl: './view-request-admin.component.css',
})
export class ViewRequestAdminComponent {
  @Input() RequestData: any;
  residentDetails: any = null;
  propertyDetails: any;
  comment: string = '';
  messages: any[] = []; // chat history
  loggedUserType: string = '';

  constructor(private Modal: ModalService, private API: ApiserviceService, private toast: ToastrService, private AssociationService: AssociationServiceService) {}

  ngOnInit(): void {
    this.loggedUserType = localStorage.getItem('user_type') || '';
    console.log('RequestData', this.RequestData);

    this.ViewpropertyDetails(this.RequestData.property_id);
    this.listcommentsforrequest(this.RequestData._id);
  }

  isImage(file: string) {
    return file.match(/\.(jpeg|jpg|png|webp)$/i);
  }

  isVideo(file: string) {
    return file.match(/\.(mp4|mov|wmv|avi|mkv)$/i);
  }

  getAvatar(type: string): string {
    switch (type) {
      case 'association':
        return 'assets/logo/association_avatar.jpg';

      case 'admin':
        return 'assets/images/admin-avatar.png';

      default:
        return 'assets/avatar1.png'; // owner / tenant / others
    }
  }

  CommentsAddforRequest() {
    if (!this.comment.trim()) return;

    const payload = {
      request_id: this.RequestData._id,
      comments: this.comment,
    };

    this.API.CommentsAddforRequest<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.listcommentsforrequest(this.RequestData._id);

          this.comment = ''; // clear input box
        }
      },
      error: (err: any) => {
        console.error('Comment request failed');
      },
    });
  }

  listcommentsforrequest(data: any) {
    this.API.listcommentsforrequest<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.messages = res.data;
        }
      },
      error: (err: any) => {
        console.error('Comment request failed');
      },
    });
  }

  ViewpropertyDetails(id: any) {
    this.API.ViewpropertybyId<any>(id).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.propertyDetails = res.data;

          // Select owner or tenant details based on user_type
          this.residentDetails =
            this.RequestData.user_type === 'owner'
              ? this.propertyDetails.owner_details
              : this.propertyDetails.tenant_details;

          console.log('Resident Details Loaded:', this.residentDetails);
        }
      },
      error: (err: any) => {
        console.error('ViewpropertyDetails API error', err);
      },
    });
  }

  StartWork(data: any) {
    this.API.StartWorkonRequest(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.closemodal()
          this.AssociationService.triggerChangeRequestStatus(res)
          // this.RequestData.work_status = newStatus;
          this.toast.success('Work Started!', 'Success');
        } else {
          this.closemodal()
          this.toast.warning(res.message);
        }
      },
      error: () => {
        this.closemodal()
        this.toast.error('Failed to update status');
      },
    });
  }

  CompleteWork(data: any) {
    this.API.CompleteWorkonRequest(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.closemodal()
          this.AssociationService.triggerChangeRequestStatus(res)
          // this.RequestData.work_status = newStatus;
          this.toast.success('Work Completed!', 'Success');
        } else {
          this.closemodal()
          this.toast.warning(res.message);
        }
      },
      error: () => {
        this.closemodal()
        this.toast.error('Failed to update status');
      },
    });
  }

  openMedia(url: string): void {
    window.open(url, '_blank');
  }

  closemodal() {
    this.Modal.close();
  }
}
