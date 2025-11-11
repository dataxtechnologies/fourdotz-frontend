import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service'; // adjust path
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin-page',
  imports: [CommonModule, ReactiveFormsModule, FormsModule,

  ],

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
    sessionStorage.clear();
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]], // email validation
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    
    // this.getPing()
  }


  getPing() {
    this.http.get('http://dev-api.fourdotz.com/ping', { responseType: 'text' })
      .subscribe({
        next: (res) => {
          this.pingResponse = res;
          //console.log('Ping Response:', res);
        },
        error: (err) => {
          //console.error('Error:', err);
          this.pingResponse = 'Error connecting to API';
        }
      });
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
        if (res?.success) {
          const tokenData = res.data?.token;
          const userType = res.data?.userType;
          const user_id = res.data?.user_id;
          this.loginbtn = true;
          if (tokenData) {
            sessionStorage.setItem('access_token', tokenData.AccessToken);
            sessionStorage.setItem('refresh_token', tokenData.RefreshToken);
          }
          sessionStorage.setItem('user_type', userType);
          sessionStorage.setItem('user_id', user_id);

         this.toastr.success(res.message, 'Success');
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
          this.loginbtn = true;
          this.toastr.info(res.message, 'Information');
        }
      },
      error: (err: any) => {
        this.loginbtn = true;
        const newuseremail = this.loginForm.get('username')?.value;
        if (err.error.error.data.update_password == false) {
          sessionStorage.setItem(
            'session_key',
            err.error.error.data.session_key
          );
          this.route.navigateByUrl(`/auth/Change-passsword/${newuseremail}`);
        }
        this.toastr.error(err.error.error.message, 'Error');
        //console.error('Login failed:', err.error.error.data);
        // alert(err.message || 'Login failed, please try again.');
      },
    });
  }

  forgetpassscreen(): void {
    this.route.navigateByUrl('auth/forget-password');
  }
}
