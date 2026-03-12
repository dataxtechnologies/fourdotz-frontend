import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { AdmindataService } from '../../services/adminservice/admindata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-association-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-association-modal.component.html',
  styleUrls: ['./add-association-modal.component.css'],
})
export class AddAssociationModalComponent implements OnInit {
  associationForm!: FormGroup;
  createButton : boolean = true
otpSent: boolean = false;
otpVerified: boolean = false;
isSendingOtp: boolean = false;
otpTimer: number = 0;
OtpToken : any
countdownInterval: any;
  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private AdminServices : AdmindataService,
    private toastr : ToastrService
  ) {}

  ngOnInit(): void {
    
this.associationForm = this.fb.group({
  name: ['', Validators.required],
  email: [
    '',
    [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}$/)
    ]
  ],
  phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
   otp: [''],
  associationName: ['', Validators.required],
  propertyType: this.fb.group({
    villa: [false],
    apartment: [false],
    townhouse: [false],
  }),
});
  }

  // Close modal
  closeModal(): void {
    this.modal.close();
  }

  // Helper to check field validity
  isInvalid(controlName: string): boolean {
    const control = this.associationForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  // Check at least one property selected
  anyPropertySelected(): boolean {
    const propertyGroup = this.associationForm.get('propertyType') as FormGroup;
    return Object.values(propertyGroup.value).some((val) => val);
  }

  // Submit form
  createAssociation(): void {

      if (!this.otpVerified) {
    this.toastr.error('Please verify OTP first');
    return;
  }


    this.createButton = false
    if (this.associationForm.invalid || !this.anyPropertySelected()) {
      this.associationForm.markAllAsTouched();
      this.createButton = true
      return;
    }

    const formValue = this.associationForm.value;
    const selectedPropertyTypes = Object.keys(formValue.propertyType).filter(
      (key) => formValue.propertyType[key]
    );

    const payload = {
      name: formValue.name,
      email: formValue.email,
      mobile: formValue.phone,
      property_name: formValue.associationName,
      property_type: selectedPropertyTypes,
    };

    this.apiService.createAssociation<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
           this.createButton = true
          this.AdminServices.triggerAdminAssociation(res)
          this.toastr.success(res.message, 'success')
          this.closeModal();
        } else {
           this.createButton = true
          this.closeModal();
          this.toastr.success(res.message, 'success')
          // alert(res.message || 'please try again.');
        }
      },
      error: (err: any) => {
         this.createButton = true
         this.toastr.error(err.error.error.message, 'success')
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });
  }


sendOtp(): void {
  const phone = this.associationForm.get('phone')?.value;

  if (!phone || this.associationForm.get('phone')?.invalid) return;

  this.isSendingOtp = true;   // 👈 Start loader

  this.apiService.sendMobileOTPonOnboard({ mobile: phone }).subscribe({
    next: (res: any) => {
      this.isSendingOtp = false;   // 👈 Stop loader

      if (res.success) {
        this.OtpToken = res.data;
        this.otpSent = true;
        this.startOtpTimer();
        this.toastr.success('OTP sent successfully');
      }
    },
    error: () => {
      this.isSendingOtp = false;   // 👈 Stop loader
      this.toastr.error('Failed to send OTP');
    }
  });
}

startOtpTimer(): void {
  this.otpTimer = 20;

  this.countdownInterval = setInterval(() => {
    this.otpTimer--;

    if (this.otpTimer <= 0) {
      clearInterval(this.countdownInterval);
    }
  }, 1000);
}

verifyOtp(): void {
  const phone = this.associationForm.get('phone')?.value;
  const otp = this.associationForm.get('otp')?.value;

  if (!otp || otp.length !== 5) return;

  const payload = {
    otp_token: this.OtpToken,
    otp: otp,
  }

  this.apiService.verifyOtp(payload).subscribe({
    next: (res: any) => {
      if (res.success) {
        this.otpVerified = true;
        this.toastr.success('OTP verified successfully');
      } else {
        this.toastr.error('Invalid OTP');
      }
    },
    error: (err: any) => {
      this.toastr.error(err.error.error.message, 'Failed');
    }
  });
}
}
