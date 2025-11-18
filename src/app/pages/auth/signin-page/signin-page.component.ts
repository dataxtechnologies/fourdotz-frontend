import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin-page',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css'],
})
export class SigninPageComponent implements OnInit {
  loginForm!: FormGroup;
  passwordFieldType: string = 'password';
  loginbtn: boolean = true;
  pingResponse: string = '';

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private apiService: ApiserviceService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const userType = localStorage.getItem('user_type');
    const token = localStorage.getItem('access_token');

    // 🔁 If already logged in, redirect to respective dashboard
    if (token && userType) {
      this.redirectUser(userType);
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  redirectUser(userType: string): void {
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
        localStorage.clear();
        this.route.navigateByUrl('/auth/sign-in');
        break;
    }
  }

  togglePassword(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginbtn = false;
    const payload = this.loginForm.value;

    this.apiService.loginApi<any>(payload).subscribe({
      next: (res: any) => {
        this.loginbtn = true;

        if (res?.success) {
          const tokenData = res.data?.token;
          const userType = res.data?.userType;
          const user_id = res.data?.user_id;

          if (tokenData) {
            localStorage.setItem('access_token', tokenData.AccessToken);
            localStorage.setItem('refresh_token', tokenData.RefreshToken);
          }
          localStorage.setItem('user_type', userType);
          localStorage.setItem('user_id', user_id);

          this.toastr.success(res.message, 'Success');
          this.redirectUser(userType);
        } else {
          this.toastr.info(res.message, 'Information');
        }
      },
      error: (err: any) => {
        this.loginbtn = true;
        const newuseremail = this.loginForm.get('username')?.value;
        if (err.error?.error?.data?.update_password === false) {
          localStorage.setItem('session_key', err.error.error.data.session_key);
          this.route.navigateByUrl(`/auth/Change-password/${newuseremail}`);
        }
        this.toastr.error(err.error?.error?.message || 'Login failed', 'Error');
      },
    });
  }

  forgetpassscreen(): void {
    this.route.navigateByUrl('/auth/forget-password');
  }
}
