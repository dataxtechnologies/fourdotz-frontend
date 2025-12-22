import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signin-page-new.component.html',
  styleUrl: './signin-page-new.component.css',
})
export class SigninPageNewComponent {
  loginForm!: FormGroup;
  errorMessage = '';

  authtype: string = '';
  authvalue: string = '';
  loginbtbloading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: ApiserviceService,
    private toastr: ToastrService,
    private route: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  // -----------------------------------------------------
  // VALIDATE INPUT FORMAT (EMAIL OR PHONE)
  // -----------------------------------------------------
  validateInput() {
    const input = this.loginForm.get('username')?.value.trim();
    this.errorMessage = '';
    this.authtype = '';
    this.authvalue = '';

    if (!input) {
      this.errorMessage = 'Field cannot be empty.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    // EMAIL VALIDATION
    if (emailRegex.test(input)) {
      this.authtype = 'password';
      this.authvalue = input;
      return;
    }

    // PHONE VALIDATION
    if (phoneRegex.test(input)) {
      this.authtype = 'otp';
      this.authvalue = input;
      return;
    }

    // INVALID FORMAT
    this.errorMessage = 'Enter a valid email or 10-digit mobile number.';
  }

  // -----------------------------------------------------
  // SUBMIT
  // -----------------------------------------------------
  // submitLogin() {

  //   if (this.errorMessage || !this.authtype || !this.authvalue) {
  //     this.errorMessage = "Enter a valid email or phone.";
  //     return;
  //   }

  //   const url =
  //     `/user-authentication/${this.authtype}/${this.authvalue}`;

  //   this.router.navigateByUrl(`/auth/user-authentication/${this.authtype}/${this.authvalue}`);
  // }

  submitLogin() {
    this.loginbtbloading = true;
    if (this.errorMessage || !this.authtype || !this.authvalue) {
      this.errorMessage = 'Enter a valid email or phone.';
      return;
    }

    // ✅ PHONE → CALL API → REDIRECT
    if (this.authtype === 'otp') {
      const payload = {
        mobile: this.authvalue,
      };
      this.authService.SendOTPtoMobile<any>(payload).subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.loginbtbloading = false;
            const otp_token = res.data;
            const stringOTP = otp_token.toString();
            sessionStorage.setItem('otp_token', stringOTP);

            this.router.navigateByUrl(
              `/auth/user-authentication/${this.authtype}/${this.authvalue}`
            );

            // localStorage.setItem('user_id', user_id);

            this.toastr.success(res.message, 'Success');
            // this.redirectUser(userType);
          } else {
            this.loginbtbloading = false;
            this.toastr.info(res.message, 'Information');
          }
        },
        error: (err: any) => {
          this.loginbtbloading = false;
          // const newuseremail = this.loginForm.get('username')?.value;
          // if (err.error?.error?.data?.update_password === false) {
          //   localStorage.setItem('session_key', err.error.error.data.session_key);
          //   this.route.navigateByUrl(`/auth/Change-password/${newuseremail}`);
          // }
          this.toastr.info(err.error?.error?.message || 'Login failed', 'Info');
        },
      });
      return;
    }

    // ✅ EMAIL → DIRECT REDIRECT (NO API CALL)
    if (this.authtype === 'password') {
      this.router.navigateByUrl(
        `/auth/user-authentication/password/${this.authvalue}`
      );
    }
  }
}
