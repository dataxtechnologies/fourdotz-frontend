import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-otp-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-otp-page.component.html',
  styleUrls: ['./password-otp-page.component.css']
})
export class PasswordOtpPageComponent implements OnInit {

  loginForm!: FormGroup;
  authtype = '';
  authvalue = '';
  processingbtn = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private apiService: ApiserviceService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {

    this.authtype = this.route.snapshot.paramMap.get('authtype') || '';
    this.authvalue = this.route.snapshot.paramMap.get('authvalue') || '';

    this.loginForm = this.fb.group({
      password: [''],
      otp: ['']
    });

    if (this.authtype === 'password') {
      this.loginForm.get('password')?.setValidators([
        Validators.required,
        Validators.minLength(4)
      ]);
    }

    if (this.authtype === 'otp') {
      this.loginForm.get('otp')?.setValidators([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(6)
      ]);
    }

    this.loginForm.updateValueAndValidity();
  }

  togglePassword() {
  this.showPassword = !this.showPassword;
}

  // ----------------------------------------------------
  // SUBMIT
  // ----------------------------------------------------
  submit() {
    if (this.loginForm.invalid) return;

    this.processingbtn = true;

    if (this.authtype === 'password') {
      this.loginWithPassword();
    } else {
      this.verifyOtp();
    }
  }

  // ----------------------------------------------------
  // PASSWORD LOGIN
  // ----------------------------------------------------
  loginWithPassword() {
    const payload = {
      username: this.authvalue,
      password: this.loginForm.value.password
    };

    this.apiService.loginApi<any>(payload).subscribe({
      next: (res: any) => {
        
        if (res?.success) {
          this.processingbtn = false;
          this.storeAuthData(res);
          this.toastr.success(res.message, 'Success');
          this.redirectUser(res.data.userType);
        } else {
          this.processingbtn = false
          this.toastr.info(res.message, 'Information');
        }
      },
      error: (err: any) => {
        this.processingbtn = false;

        if (err.error?.error?.data?.update_password === false) {
          localStorage.setItem(
            'session_key',
            err.error.error.data.session_key
          );
          this.router.navigateByUrl(
            `/auth/Change-password/${this.authvalue}`
          );
          return;
        }

        this.toastr.info(
          err.error?.error?.message || 'Login failed',
          'Info'
        );
      }
    });
  }

  // ----------------------------------------------------
  // OTP VERIFY
  // ----------------------------------------------------
  verifyOtp() {
    const payload = {
      otp: (this.loginForm.value.otp).toString(),
      otp_token: localStorage.getItem('otp_token')
    };

    console.log('payload', payload);
    

    this.apiService.VerifyOTPtoMObile(payload).subscribe({
      next: (res: any) => {
        
        if (res?.success) {
          const tokenData = res.data?.token;
          const userType = res.data?.userType;
          const user_id = res.data?.user_id;
          localStorage.clear();
          if (tokenData) {
            localStorage.setItem('access_token', tokenData.AccessToken);
            localStorage.setItem('refresh_token', tokenData.RefreshToken);
          }
          localStorage.setItem('user_type', userType);
          localStorage.setItem('user_id', user_id);
          
          this.processingbtn = false;
          this.toastr.success(res.message, 'Success');
          this.redirectUser(userType);
        } else {
          this.processingbtn = false
          this.toastr.info(res.message, 'Information');
        }
      },
      error: (err: any) => {
        this.processingbtn = false;
        // localStorage.clear();
        if (err.error?.error?.data?.update_password === false) {
          localStorage.setItem('session_key', err.error.error.data.session_key);
          this.router.navigateByUrl(`/auth/Change-password/${this.authvalue}`);
        }
        this.toastr.info(err.error?.error?.message || 'Login failed', 'Info');
      }
    });
  }

  // ----------------------------------------------------
  // STORE TOKEN COMMON
  // ----------------------------------------------------
  storeAuthData(res: any) {
    const tokenData = res.data?.token;

    if (tokenData) {
      localStorage.setItem('access_token', tokenData.AccessToken);
      localStorage.setItem('refresh_token', tokenData.RefreshToken);
    }

    localStorage.setItem('user_type', res.data?.userType);
    localStorage.setItem('user_id', res.data?.user_id);
  }

  // ----------------------------------------------------
  // REDIRECT USER
  // ----------------------------------------------------
redirectUser(userType: string): void {
    switch (userType) {
      case 'superadmin':
        this.router.navigateByUrl('/Superadmin/Dashboard');
        break;
      case 'association':
        this.router.navigateByUrl('/Association/Dashboard');
        break;
      case 'owner':
        this.router.navigateByUrl('/Owner/Dashboard');
        break;
      case 'tenant':
        this.router.navigateByUrl('/Tenant/Dashboard');
        break;
      case 'service_admin':
        this.router.navigateByUrl('/Service-admin/manage-requests');
        break;
      case 'gate_keeper':
        this.router.navigateByUrl('/Gate-keeper/visitors-management/visitors-list');
        break;
      default:
        localStorage.clear();
        this.router.navigateByUrl('/auth/sign-in');
        break;
    }
  }

  gotoBack() {
    this.location.back();
  }
}
