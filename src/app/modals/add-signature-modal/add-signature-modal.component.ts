import { Component, Input } from '@angular/core';
import { AssociationServiceService } from '../../services/association/association-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-signature-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-signature-modal.component.html',
  styleUrl: './add-signature-modal.component.css',
})
export class AddSignatureModalComponent {
  @Input() agreementId: any;
  @Input() signers: any;
  @Input() agreement: any;
  typedNameError = false;

  activeTab: 'upload' | 'type' = 'type';
  otpToken: string | null = null;

  typedName = '';
  selectedFont = 'Arial';

  uploadedSignature!: string;
  sendotpbtn = false;
  showprocessingbtn  = false

  currentSignerIndex = 0;

  /** OTP STATE */
  requireOtpVerification = false;
  otp = '';

  constructor(
    private modal: ModalService,
    private AssociationService: AssociationServiceService,
    private apiService: ApiserviceService,
    private Toast: ToastrService
  ) {}

  ngOnInit() {
    console.log('agreementId', this.agreementId);
    console.log('signers', this.signers);
    console.log('agreement', this.agreement);

    this.detectCurrentSigner();
  }

  /* ===== DETERMINE WHO SIGNS ===== */
  detectCurrentSigner() {
    if (!this.signers?.length) return;

    // First signer
    if (!this.signers[0].signed && !this.signers[1]?.signed) {
      this.currentSignerIndex = 0;
      this.requireOtpVerification = false;
      return;
    }

    // Second signer → OTP required
    if (this.signers[0].signed && !this.signers[1]?.signed) {
      this.currentSignerIndex = 1;
      this.requireOtpVerification = false; // show OTP only after Apply
      return;
    }

    // All signed
    this.modal.close();
  }

  /* ===== APPLY SIGNATURE ===== */
  applySignature() {
    // STEP 1: Show OTP UI (for BOTH type & upload)
    if (!this.requireOtpVerification) {
      this.sendotp();

      return;
    }

    // STEP 2: OTP already verified → submit signature
    if (this.activeTab === 'type') {
      if (!this.typedName) {
        return;
      }

      const payload = this.buildSignerPayload('type', this.typedName, '');

      this.submitSignature(payload);
      return;
    }

    if (this.activeTab === 'upload') {
      const userdata = localStorage.getItem('userdata');
      if (!userdata) {
        this.Toast.error('User data not found', 'Error');
        return;
      }

      const parsedUser = JSON.parse(userdata);

      if (!parsedUser.signature) {
        this.Toast.error(
          'Signature not found. Please upload signature first.',
          'Error'
        );
        return;
      }

      const payload = this.buildSignerPayload(
        'image',
        '',
        parsedUser.signature // ✅ ACTUAL SIGNATURE URL
      );

      this.submitSignature(payload);
    }
  }

  get isOtpPhase(): boolean {
    return this.requireOtpVerification === true;
  }

  sendotp() {
    // Reset error
    this.typedNameError = false;

    // ✅ Validation for TYPE tab
    if (this.activeTab === 'type') {
      if (!this.typedName || !this.typedName.trim()) {
        this.typedNameError = true;
        return;
      }
    }

    this.sendotpbtn = true;

    this.apiService.SendOTPforVerifySign<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Toast.success('OTP Sent Successfully', 'Success');

          this.requireOtpVerification = true;
          this.otpToken = res.data;

          this.sendotpbtn = false;
        } else {
          this.Toast.error('OTP Send Failed', 'Failed');
          this.sendotpbtn = false;
        }
      },
      error: (err: any) => {
        this.Toast.error(
          'OTP Send Failed',
          'Failed'
        );
        this.sendotpbtn = false;
      },
    });
  }

  /* ===== VERIFY OTP ===== */
  verifyOtp() {
    this.showprocessingbtn = true
    if (!this.otp || !this.otpToken) {
      this.Toast.warning('OTP is required');
       this.showprocessingbtn = false
      return;
    }

    const payload = {
      otp: this.otp,
      otp_token: this.otpToken,
    };

    // this.sendotpbtn = true;

    this.apiService.VerifyOTPforSign<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.showprocessingbtn = false
          this.Toast.success('OTP Verified Successfully', 'Success');

          // ✅ OTP VERIFIED → PROCEED TO SIGN
          // this.sendotpbtn = false;
          this.requireOtpVerification = true;

          this.applySignature();
        } else {
          this.showprocessingbtn = false
          this.Toast.error(res.message || 'Invalid OTP', 'Failed');
          // this.sendotpbtn = false;
        }
      },
      error: (err: any) => {
        this.showprocessingbtn = false
        this.Toast.error(
          err?.error?.error?.message || 'OTP verification failed',
          'Failed'
        );
        // this.sendotpbtn = false;
      },
    });
  }

  /* ===== BUILD SIGNER PAYLOAD ===== */
  buildSignerPayload(
    signerType: 'type' | 'image',
    signerName: string,
    signerImageUrl: string
  ) {
    return {
      name: this.signers[this.currentSignerIndex].name,
      signed: true,
      signer_name: signerType === 'type' ? signerName : signerImageUrl,
      Signer_font: signerType === 'type' ? this.selectedFont : '',
      Signer_type: signerType,
      signed_date: new Date().toISOString().split('T')[0],
      Signer_user_id: localStorage.getItem('user_id'),
    };
  }

  /* ===== SEND SIGNATURE TO API ===== */
  submitSignature(signerPayload: any) {
    // 1️⃣ Build updated signers array safely
    const updatedSigners = this.signers.map((signer: any, index: number) => {
      // 👉 Only update the CURRENT signer
      if (index === this.currentSignerIndex) {
        return {
          ...signer,
          ...signerPayload,
          signed: true,
        };
      }

      // 👉 Keep already signed signer untouched
      return signer;
    });

    // 2️⃣ Final payload
    const finalPayload = {
      id: this.agreementId,
      signers: updatedSigners,
    };

    console.log('✅ FINAL SIGN PAYLOAD 👉', finalPayload);

    // 3️⃣ API call
    this.apiService.signAgreement<any>(finalPayload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Toast.success('Agreement Signed Successfully', 'Success');

          // refresh agreement in parent
          this.AssociationService.triggerNewAgreementSigned(res.data);

          this.modal.close();
        } else {
          this.Toast.error(res.message || 'Signing failed');
        }
      },
      error: () => {
        this.Toast.error('Failed to sign agreement' , 'Error');
      },
    });
  }

  closeModal() {
    this.modal.close();
  }
}
