import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { FormsModule } from '@angular/forms';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OwnerServiceService } from '../../services/owner/owner-service.service';

@Component({
  selector: 'app-add-upi-id',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-upi-id.component.html',
  styleUrls: ['./add-upi-id.component.css'],
})
export class AddUPIIdComponent {
  upiForm!: FormGroup;
  showprocessingbtn = false;
  showsubmitprocessingbtn = false;
  selectedSignatureFile: File | null = null;
signatureError: string = '';

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private Router: Router,
    private OwnerService : OwnerServiceService
  ) {
    this.upiForm = this.fb.group({
      upiId: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w.\-]{2,}@[a-zA-Z]{3,}$/), // ✅ Basic UPI pattern validation
        ],
      ],
    });
  }

 onSignatureSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files || !input.files.length) return;

  const file = input.files[0];
  this.signatureError = '';

  // Helper to reset input
  const resetInput = () => {
    input.value = '';
    this.selectedSignatureFile = null;
  };

  /* ===== FILE SIZE VALIDATION (100 KB ONLY) ===== */
  const maxSize = 100 * 1024; // 100 KB
  if (file.size > maxSize) {
    this.signatureError = 'Signature file size must be under 100 KB.';
    resetInput();
    return;
  }

  /* ===== FILE TYPE VALIDATION ===== */
  if (!['image/png', 'image/jpeg'].includes(file.type)) {
    this.signatureError = 'Only PNG or JPG images are allowed.';
    resetInput();
    return;
  }

  // ✅ PASSED — NO DIMENSION CHECK
  this.selectedSignatureFile = file;
}

confirmUPISubmit() {
  if (this.upiForm.invalid || !this.selectedSignatureFile) {
    this.upiForm.markAllAsTouched();
    if (!this.selectedSignatureFile) {
      this.signatureError = 'Signature image is required.';
    }
    return;
  }

  this.showsubmitprocessingbtn = true;

  const formData = new FormData();
  formData.append('upi_id', this.upiForm.value.upiId);
  formData.append('signature', this.selectedSignatureFile);

  this.apiService.OwnerUpdateUPI<any>(formData).subscribe({
    next: (res: any) => {
      if (res?.success) {
        this.Toast.success(res.message);
        this.showsubmitprocessingbtn = false;
        this.OwnerService.triggerOwnerUpiIDUpdate(res);
        this.closeModal();
      } else {
        this.Toast.error(res.message || 'Submission failed', 'Failed');
        this.showsubmitprocessingbtn = false;
      }
    },
    error: (err: any) => {
      this.Toast.error(
        err?.error?.error?.message || 'Submission failed',
        'Failed'
      );
      this.showsubmitprocessingbtn = false;
    },
  });
}

  // confirmUPISubmit() {
  //   if (this.upiForm.invalid) {
  //     this.upiForm.markAllAsTouched();
  //     return;
  //   } 
  //   this.showsubmitprocessingbtn = true

  //   const payload = {
  //     upi_id: this.upiForm.value.upiId,
  //   };
  //   this.apiService.OwnerUpdateUPI<any>(payload).subscribe({
  //     next: (res: any) => {
  //       if (res?.success) {
  //         this.Toast.success(res.message);
  //         this.showsubmitprocessingbtn = false;
  //         this.OwnerService.triggerOwnerUpiIDUpdate(res)
  //         this.closeModal();
  //       } else {
  //         this.Toast.error(res.message || 'Logout failed', 'Failed');
  //         this.showsubmitprocessingbtn = false;
  //         this.closeModal();
  //       }
  //     },
  //     error: (err: any) => {
  //       //console.error('Logout failed:', err);
  //       this.Toast.error(
  //         err?.error?.error?.message || 'Logout failed',
  //         'Failed'
  //       );
  //       this.showsubmitprocessingbtn = false;
  //       this.closeModal();
  //     },
  //   });
  // }

  /** ✅ Close modal */
  closeModal() {
    this.modal.close();
  }

  confirmlogout() {
    this.showprocessingbtn = true;
    this.apiService.logoutApi<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.clearSessionAndRedirect(
            res.message || 'Logged out successfully'
          );
          this.Toast.success(res.message);
          this.showprocessingbtn = false;
          this.closeModal();
        } else {
          this.Toast.error(res.message || 'Logout failed', 'Failed');
          this.showprocessingbtn = false;
          this.closeModal();
        }
      },
      error: (err: any) => {
        //console.error('Logout failed:', err);
        this.Toast.error(
          err?.error?.error?.message || 'Logout failed',
          'Failed'
        );
        this.showprocessingbtn = false;
        this.closeModal();
        this.clearSessionAndRedirect();
      },
    });
  }

  private clearSessionAndRedirect(message: string = 'Session expired') {
    localStorage.clear();
    // this.Toast.info(message, 'Info');
    this.Router.navigateByUrl('/auth/sign-in');
  }
}
