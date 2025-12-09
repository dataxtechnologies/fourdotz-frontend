import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin-page-new',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signin-page-new.component.html',
  styleUrl: './signin-page-new.component.css'
})
export class SigninPageNewComponent {


loginForm!: FormGroup;
  errorMessage = '';

  authtype: string = '';
  authvalue: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]]
    });
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
      this.errorMessage = "Field cannot be empty.";
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
    this.errorMessage = "Enter a valid email or 10-digit mobile number.";
  }

  // -----------------------------------------------------
  // SUBMIT
  // -----------------------------------------------------
  submitLogin() {

    if (this.errorMessage || !this.authtype || !this.authvalue) {
      this.errorMessage = "Enter a valid email or phone.";
      return;
    }

    const url =
      `/user-authentication/${this.authtype}/${this.authvalue}`;

    this.router.navigateByUrl(`/auth/user-authentication/${this.authtype}/${this.authvalue}`);
  }

}
