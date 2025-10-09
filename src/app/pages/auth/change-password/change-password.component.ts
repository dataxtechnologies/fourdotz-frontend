import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../../services/api/apiservice.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  usermail: string | null = null;
  loginbtn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private apiService: ApiserviceService
  ) {}

  ngOnInit(): void {
    // Build Form
    this.changePasswordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    // Get usermail from route params
    this.route.params.subscribe((params) => {
      this.usermail = params['usermail'] || null;
    });
  }

  // Password Match Validator
  passwordMatchValidator(form: FormGroup) {
    const newPass = form.get('newPassword')?.value;
    const confirmPass = form.get('confirmPassword')?.value;
    return newPass === confirmPass ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    const newsession = sessionStorage.getItem('session_key');

    const payload = {
      email: this.usermail,
      new_password: this.changePasswordForm.value.confirmPassword,
      session: newsession,
    };

    // API Call Example
    this.apiService.UpdateTempPass<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          const tokenData = res.data?.data;
          const userType = res.data?.user_type;
          const user_id = res.data?.user_id;
          this.loginbtn = true;
          sessionStorage.removeItem('session_key')
          if (tokenData) {
            sessionStorage.setItem('access_token', tokenData.AccessToken);
            sessionStorage.setItem('refresh_token', tokenData.RefreshToken);
          }

          if (userType) {
            sessionStorage.setItem('user_type', userType);
            sessionStorage.setItem('user_id', user_id);
          }

         console.log(res.message || 'Login successful');

          // Navigate based on user type
          switch (userType) {
            case 'super_admin':
              this.router.navigateByUrl('/Superadmin/Dashboard');
              break;
            case 'hoa_admin':
              this.router.navigateByUrl('/Association/Dashboard');
              break;
            case 'owner':
              this.router.navigateByUrl('/Owner/Dashboard');
              break;
            case 'tenant':
              this.router.navigateByUrl('/Tenant/Dashboard');
              break;
            default:
              console.warn('Unknown user type:', userType);
              this.router.navigateByUrl('/');
              break;
          }
        } else {
          this.loginbtn = true;
        }
      },
      error: (err: any) => {
        this.loginbtn = true;
        // const newuseremail = this.loginForm.get('username')?.value;
        // if (err.error.error.data.update_password == false) {
        //   sessionStorage.setItem(
        //     'session_key',
        //     err.error.error.data.session_key
        //   );
        //   this.router.navigateByUrl(`/auth/Change-passsword/${newuseremail}`);
        // }
        console.error('Login failed:', err.error.error.data);
        // alert(err.message || 'Login failed, please try again.');
      },
    });
  }
}
