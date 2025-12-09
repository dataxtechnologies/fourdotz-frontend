import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-password-otp-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-otp-page.component.html',
  styleUrls: ['./password-otp-page.component.css']
})
export class PasswordOtpPageComponent {

  loginForm!: FormGroup;
  authtype: string = '';
  authvalue: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location : Location
  ) {}

  ngOnInit() {
    // Get URL Params
    this.authtype = this.route.snapshot.paramMap.get('authtype') || '';
    this.authvalue = this.route.snapshot.paramMap.get('authvalue') || '';

    // Build form based on type
    this.loginForm = this.fb.group({
      password: [''],
      otp: ['']
    });

    // Apply required validators
    if (this.authtype === 'password') {
      this.loginForm.get('password')?.setValidators([Validators.required, Validators.minLength(4)]);
    }

    if (this.authtype === 'otp') {
      this.loginForm.get('otp')?.setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(6)]);
    }
  }

  submit() {
    if (this.loginForm.invalid) return;

    if (this.authtype === 'password') {
      this.router.navigateByUrl('/auth/Change-password/naveen@gmail.com')
      console.log("Password Submitted:", this.loginForm.value.password);
    } else {
      this.router.navigateByUrl('/auth/Change-password/9360123456')
      console.log("OTP Submitted:", this.loginForm.value.otp);
    }
  }

  gotoBack(){
    this.location.back()
  }
}
