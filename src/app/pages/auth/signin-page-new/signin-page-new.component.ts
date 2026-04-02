import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin-page-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signin-page-new.component.html',
  styleUrl: './signin-page-new.component.css',
})
export class SigninPageNewComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage = '';

  authtype: 'otp' | 'password' | '' = '';
  authvalue = '';
  loginbtbloading = false;
  usermail: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: ApiserviceService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
    });
  }

  // -----------------------------------------------------
  // INIT – READ QUERY PARAM & PATCH VALUE
  // -----------------------------------------------------
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.usermail = params['usermail'] || null;

      if (this.usermail) {
        this.loginForm.patchValue({
          username: this.usermail
        });

        // 🔥 IMPORTANT: auto-detect email/phone
        this.validateInput();
      }
    });
  }

  // -----------------------------------------------------
  // VALIDATE INPUT FORMAT (EMAIL OR PHONE)
  // -----------------------------------------------------
  validateInput(): void {
    const input = (this.loginForm.get('username')?.value || '').trim();

    this.errorMessage = '';
    this.authtype = '';
    this.authvalue = '';

    if (!input) {
      this.errorMessage = 'Field cannot be empty.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (emailRegex.test(input)) {
      this.authtype = 'password';
      this.authvalue = input;
      return;
    }

    if (phoneRegex.test(input)) {
      this.authtype = 'otp';
      this.authvalue = input;
      return;
    }

    this.errorMessage = 'Enter a valid email or 10-digit mobile number.';
  }


  // Self Signup
  CheckExistingUser() {

    const payload = {
      user_name: this.loginForm.get('username')?.value
    };


    this.authService.CheckExistingUser<any>(payload).subscribe({
      next: (res: any) => {
        this.loginbtbloading = false;

        if (res?.success) {
          this.submitLogin();
        } else {
          this.toastr.warning(res.message, 'Error');
        }
      },
      error: (err: any) => {
        this.loginbtbloading = false;
        this.toastr.info(
          err?.error?.error?.message || 'Login failed',
          'Info'
        );
        // this.router.navigateByUrl('/onboarding/residents/get-started')
      },
    });
  }

  // -----------------------------------------------------
  // SUBMIT LOGIN
  // -----------------------------------------------------
  submitLogin(): void {
    this.loginbtbloading = true;

    if (this.errorMessage || !this.authtype || !this.authvalue) {
      this.errorMessage = 'Enter a valid email or phone.';
      this.loginbtbloading = false; // ✅ FIX
      return;
    }

    // ✅ PHONE → OTP FLOW
    if (this.authtype === 'otp') {
      const payload = { mobile: this.authvalue };

      this.authService.SendOTPtoMobile<any>(payload).subscribe({
        next: (res: any) => {
          this.loginbtbloading = false;

          if (res?.success) {
            localStorage.setItem('otp_token', String(res.data));

            this.router.navigateByUrl(
              `/auth/user-authentication/otp/${this.authvalue}`
            );

            this.toastr.success(res.message, 'Success');
          } else {
            this.toastr.info(res.message, 'Info');
          }
        },
        error: (err: any) => {
          this.loginbtbloading = false;
          this.toastr.info(
            err?.error?.error?.message || 'Login failed',
            'Info'
          );
        },
      });

      return;
    }

    // ✅ EMAIL → PASSWORD FLOW
    if (this.authtype === 'password') {
      this.loginbtbloading = false;
      this.router.navigateByUrl(
        `/auth/user-authentication/password/${this.authvalue}`
      );
    }
  }

  // -----------------------------------------------------
  // FORGOT PASSWORD
  // -----------------------------------------------------
  forgetpassscreen(): void {
    this.router.navigateByUrl('/auth/forget-password');
  }
}
