import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-request-users',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './view-request-users.component.html',
  styleUrl: './view-request-users.component.css'
})
export class ViewRequestUsersComponent {
  RequestData: any
  residentDetails: any = null;
  propertyDetails: any;
  comment: string = '';
  messages: any[] = []; // chat history
  loggedUserType: string = '';
  sending: boolean = false;
  req_Id: any
  constructor(private API: ApiserviceService, private toast: ToastrService, private ActivateRoute: ActivatedRoute, private router: Router, private Location: Location) { }

  ngOnInit(): void {
    this.loggedUserType = localStorage.getItem('user_type') || '';
    console.log('RequestData', this.RequestData);

    this.req_Id = this.ActivateRoute.snapshot.paramMap.get('reqId');
    console.log('this.req_Id', this.req_Id);

    this.ListRequests(this.req_Id)


    this.listcommentsforrequest(this.req_Id);
  }


  goback() {
    this.Location.back();
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


  ListRequests(data: any) {
    // this.tableLoading = true;

    this.API.ListRequestUserbyid<any>(data).subscribe({
      next: (res) => {

        this.RequestData = res.data[0] || [];
        console.log('this.RequestData', this.RequestData);


        this.ViewpropertyDetails(this.RequestData._id);

      },
      error: () => {
        this.RequestData = [];

      },
    });
  }

  CommentsAddforRequest() {

    // stop if empty or already sending
    if (!this.comment.trim() || this.sending) return;

    this.sending = true;

    const payload = {
      request_id: this.RequestData._id,
      comments: this.comment.trim(),
    };

    this.API.CommentsAddforRequest<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.listcommentsforrequest(this.RequestData._id);
          this.comment = '';
        }
        this.sending = false;
      },
      error: () => {
        console.error('Comment request failed');
        this.sending = false;
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
    this.API.getrequestedresidentdetails<any>(id).subscribe({
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
          this.ListRequests(this.req_Id)


          this.listcommentsforrequest(this.req_Id);
          // this.AssociationService.triggerChangeRequestStatus(res)
          // this.RequestData.work_status = newStatus;
          this.toast.success('Work Started!', 'Success');
        } else {
          this.toast.warning(res.message);
        }
      },
      error: () => {
        this.toast.error('Failed to update status');
      },
    });
  }

  CompleteWork(data: any) {
    this.API.CompleteWorkonRequest(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.ListRequests(this.req_Id)


          this.listcommentsforrequest(this.req_Id);
          // this.AssociationService.triggerChangeRequestStatus(res)
          // this.RequestData.work_status = newStatus;
          this.toast.success('Work Completed!', 'Success');
        } else {
          this.toast.warning(res.message);
        }
      },
      error: () => {
        this.toast.error('Failed to update status');
      },
    });
  }

  openMedia(url: string): void {
    window.open(url, '_blank');
  }


}