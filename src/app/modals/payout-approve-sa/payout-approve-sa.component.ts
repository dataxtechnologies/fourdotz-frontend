import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-payout-approve-sa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payout-approve-sa.component.html',
  styleUrl: './payout-approve-sa.component.css'
})
export class PayoutApproveSAComponent implements OnInit {

  @Input() requestdata: any;

  payoutdatas: any;
  Associationdata: any;
  balanceloading = false;
  bankdataloading = false;
  approvebtnloading = false;
  rejectbtnloading = false;

  constructor(
    private apiService: ApiserviceService,
    private Modal: ModalService,
    private Toast: ToastrService,
    private Association : AssociationServiceService
  ) {}

  ngOnInit(): void {
    this.payoutcardDetailsinAssociation(this.requestdata.user_id);
    this.getAssociationList(this.requestdata.user_id);
  }

  // ─── GETTERS ───────────────────────────

  get statusClass(): string {
    const s = this.requestdata?.status?.toLowerCase();
    if (s === 'pending') return 'status-pending';
    if (s === 'approved') return 'status-approved';
    if (s === 'completed') return 'status-approved';
    if (s === 'rejected') return 'status-rejected';
    return 'status-pending';
  }

  get avatarInitial(): string {
    return this.requestdata?.name?.charAt(0)?.toUpperCase() || 'A';
  }

  get requestedDate(): any {
    return this.requestdata?.created_time?.$date;
  }

  get remainingBalance(): number {
    return (this.payoutdatas?.remaining_payout || 0) - (this.requestdata?.total_amount || 0);
  }

  // ─── API CALLS ─────────────────────────

  payoutcardDetailsinAssociation(data: any) {
    this.balanceloading = false;
    this.apiService.payoutcardDetailsinAssociationbyAssociationID<any>(data).subscribe({
      next: (res: any) => {

        this.balanceloading = true;
        this.payoutdatas = res?.success ? res.data : null;
      },
      error: () => {
        this.balanceloading = true;
        this.payoutdatas = null;
      }
    });
  }

  getAssociationList(data: any) {
    this.apiService.getAssociationbyId<any>(data).subscribe({
      next: (res: any) => {
        this.bankdataloading = true;
        this.Associationdata = res?.success ? res.data : null;
      },
      error: () => {
        this.bankdataloading = true;
        this.Associationdata = null;
      }
    });
  }

  // ─── ACTIONS ───────────────────────────

  updatepayoutrequeststatus() {
    this.approvebtnloading = true;
    console.log('Approved:', this.requestdata._id);

    const formdata = new FormData();
    formdata.append('id', this.requestdata._id);
    formdata.append('status', 'approved');

    this.apiService.updatepayoutrequeststatus<any>(formdata).subscribe({
       next: (res: any) => {
        if (res?.success) {
          this.updatepayoutrequeststatustoprocessing();
          this.approvebtnloading = false;
          this.Association.triggerPayoutRequestCreate(res);
          this.Toast.success(res?.message, 'Success');
          this.close();
        }else{
          this.approvebtnloading = false;
          this.Toast.warning(res?.message, 'Warning');
          this.close();
        }
        // this.close();
      },
      error: (err : any) => {
        this.approvebtnloading = false;
        this.Toast.error(err?.error.error?.message, 'Error');
        this.close();
      }
    });
    // this.close();
  }


  updatepayoutrequeststatustoprocessing() {
    console.log('Approved:', this.requestdata._id);

    const formdata = new FormData();
    formdata.append('id', this.requestdata._id);
    formdata.append('status', 'processing');

    this.apiService.updatepayoutrequeststatus<any>(formdata).subscribe({
       next: (res: any) => {
        if (res?.success) {
          // this.Association.triggerPayoutRequestCreate(res);
          // this.Toast.success(res?.message, 'Success');
          this.close();
        }else{
          // this.Toast.warning(res?.message, 'Warning');
          this.close();
        }
        // this.close();
      },
      error: (err : any) => {
        // this.Toast.error(err?.error.error?.message, 'Error');
        this.close();
      }
    });
    // this.close();
  }

  reject() {
    this.rejectbtnloading = true;
    console.log('Rejected:', this.requestdata._id);
    const formdata = new FormData();
    formdata.append('id', this.requestdata._id);
    formdata.append('status', 'rejected');

    this.apiService.updatepayoutrequeststatus<any>(formdata).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.rejectbtnloading = false;
          this.Association.triggerPayoutRequestCreate(res);
          this.Toast.success(res?.message, 'Success');
          this.close();
        }else{
          this.rejectbtnloading = false;
          this.Toast.warning(res?.message, 'Warning');
          this.close();
        }
        // this.close();
      },
      error: (err : any) => {
        this.rejectbtnloading = false;
        this.Toast.error(err?.error.error?.message, 'Error');
        this.close();
      }
    });
  }

  close() {
    this.Modal.close();
  }
}