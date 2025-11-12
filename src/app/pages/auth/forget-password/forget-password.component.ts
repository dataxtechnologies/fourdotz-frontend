import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  forgetForm!: FormGroup;
  loadingOtp = false;
  loadingSubmit = false;
  showPasswordField = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private apiService: ApiserviceService,
    private toast: ToastrService
  ) {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.minLength(4)]],
      newPassword: ['', [Validators.minLength(6)]]
    });
  }

  /** 🔹 Send OTP */
  sendOtp() {
    if (this.forgetForm.get('email')?.invalid) {
      this.forgetForm.get('email')?.markAsTouched();
      this.toast.warning('Please enter a valid email before sending OTP.');
      return;
    }

    const email = this.forgetForm.get('email')?.value;
    const payload = { email };

    this.loadingOtp = true;

    this.apiService.forgetpassword<any>(payload).subscribe({
      next: (res: any) => {
        this.loadingOtp = false;
        if (res?.success) {
          this.toast.success(res.message || 'OTP sent successfully!');
          this.showPasswordField = true;

          // Make password field required only after OTP sent
          this.forgetForm.get('newPassword')?.addValidators(Validators.required);
          this.forgetForm.get('newPassword')?.updateValueAndValidity();
        } else {
          this.toast.warning(res.message || 'Failed to send OTP.');
        }
      },
      error: (err: any) => {
        this.loadingOtp = false;
        this.toast.error(err?.error?.error?.message || 'Something went wrong.');
      }
    });
  }

  /** 🔹 Submit OTP + New Password */
  submit() {
    if (this.forgetForm.invalid) {
      this.forgetForm.markAllAsTouched();
      this.toast.warning('Please fill all required fields.');
      return;
    }

    this.loadingSubmit = true;

    const payload = {
      email: this.forgetForm.get('email')?.value,
      code: this.forgetForm.get('otp')?.value,
      password: this.forgetForm.get('newPassword')?.value
    };

    console.log('payload', payload);
    

    // Example API integration
    this.apiService.updateforgetpassword<any>(payload).subscribe({
      next: (res: any) => {
        this.loadingSubmit = false;
        if (res?.success) {
          this.toast.success('Password reset successful! Redirecting...');
         const tokenData = res.data?.data;
          const userType = res.data?.user_type;
          const user_id = res.data?.user_id;
          // this.btnloading = false;
          localStorage.removeItem('session_key')
          if (tokenData) {
            localStorage.setItem('access_token', tokenData.AccessToken);
            localStorage.setItem('refresh_token', tokenData.RefreshToken);
          }

          if (userType) {
            localStorage.setItem('user_type', userType);
            localStorage.setItem('user_id', user_id);
          }

         //console.log(res.message || 'Login successful');

          // Navigate based on user type
          switch (userType) {
            case 'superadmin':
              this.route.navigateByUrl('/Superadmin/Dashboard');
              break;
            case 'association':
              this.route.navigateByUrl('/Association/Dashboard');
              break;
            case 'owner':
              this.route.navigateByUrl('/Owner/Dashboard');
              break;
            case 'tenant':
              this.route.navigateByUrl('/Tenant/Dashboard');
              break;
            default:
              //console.warn('Unknown user type:', userType);
              this.route.navigateByUrl('/');
              break;
          }
        } else {
          this.toast.warning(res.message || 'Invalid OTP or password error.');
        }
      },
      error: (err: any) => {
        this.loadingSubmit = false;
        this.toast.error(err?.error?.message || 'Something went wrong.');
      }
    });
  }

  /** 🔹 Go back to Sign-in */
  goBack() {
    this.route.navigateByUrl('auth/sign-in');
  }
}
