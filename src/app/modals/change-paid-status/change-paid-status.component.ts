import { Component, Input } from '@angular/core';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { OwnerServiceService } from '../../services/owner/owner-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-paid-status',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './change-paid-status.component.html',
  styleUrl: './change-paid-status.component.css',
})
export class ChangePaidStatusComponent {
  @Input() invoice_id: any;

  showprocessingbtn = false;
  confirmationText: string = '';
  requiredText: string = 'CONFIRM';
  selectedPaymentMode: string = ''; // ✅ Store selected mode

  constructor(
    private Modal: ModalService,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private OwnerService: OwnerServiceService
  ) {}

  canConfirm(): boolean {
    return this.confirmationText.trim().toUpperCase() === this.requiredText;
  }

  confirmPaidStatus(invoice_id: any) {
    if (!this.canConfirm() || !this.selectedPaymentMode) return;

    this.showprocessingbtn = true;

    const payload = {
      rental_invoice_id: invoice_id,
      payment_method: this.selectedPaymentMode,
    };

    this.apiService.ChangeRentalInvoicePaidStatus<any>(payload).subscribe({
      next: (res: any) => {
        this.showprocessingbtn = false;

        if (res?.success) {
          this.Toast.success(res.message, 'Success');
          this.OwnerService.triggerRentalPaidStatus(res);
          this.closeModal();
        } else {
          this.Toast.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        this.showprocessingbtn = false;
        this.Toast.error(
          err.error?.error?.message || 'Something went wrong!',
          'Failed'
        );
        this.closeModal();
      },
    });
  }

  closeModal() {
    this.Modal.close();
  }
}
