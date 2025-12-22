import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../../services/api/apiservice.service';

@Component({
  selector: 'app-change-password-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password-new.component.html',
  styleUrls: ['./change-password-new.component.css']
})
export class ChangePasswordNewComponent implements OnInit {

  passwordForm!: FormGroup;
  btnloading = false;

  showNewPassword = false;
  showConfirmPassword = false;

  username = '';

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiserviceService
  ) {}

  ngOnInit() {

    this.username = this.route.snapshot.paramMap.get('username') || '';

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  // -------------------------
  // PASSWORD MATCH CHECK
  // -------------------------
  get passwordMismatch(): boolean {
    return (
      this.passwordForm.get('newPassword')?.value &&
      this.passwordForm.get('confirmPassword')?.value &&
      this.passwordForm.get('newPassword')?.value !==
      this.passwordForm.get('confirmPassword')?.value
    );
  }

  // -------------------------
  // SUBMIT
  // -------------------------
  updatePassword() {
    if (this.passwordForm.invalid || this.passwordMismatch) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.btnloading = true;

    const sessionKey = localStorage.getItem('session_key');

    const payload = {
      username: this.username,   // ✅ FIXED (username instead of email)
      new_password: this.passwordForm.value.confirmPassword,
      session: sessionKey
    };

    this.apiService.UpdateTempPass<any>(payload).subscribe({
      next: (res: any) => {
        this.btnloading = false;

        if (res?.success) {

          localStorage.removeItem('session_key');

          const tokenData = res.data?.data;
          const userType = res.data?.user_type;
          const user_id = res.data?.user_id;

          if (tokenData) {
            localStorage.setItem('access_token', tokenData.AccessToken);
            localStorage.setItem('refresh_token', tokenData.RefreshToken);
          }

          localStorage.setItem('user_type', userType);
          localStorage.setItem('user_id', user_id);

          this.redirectUser(userType);
        }
      },
      error: () => {
        this.btnloading = false;
      }
    });
  }

  // -------------------------
  // REDIRECT
  // -------------------------
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


  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  gotoBack() {
    this.location.back();
  }
}
