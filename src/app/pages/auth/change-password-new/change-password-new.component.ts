import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-change-password-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password-new.component.html',
  styleUrls: ['./change-password-new.component.css']
})
export class ChangePasswordNewComponent {

  passwordForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private location : Location
  ) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  get passwordMismatch(): boolean {
    return (
      this.passwordForm.get('newPassword')?.value !==
      this.passwordForm.get('confirmPassword')?.value
    );
  }

  updatePassword() {
    if (this.passwordForm.invalid || this.passwordMismatch) return;

    console.log("New Password Set:", this.passwordForm.value.newPassword);

    // TODO: Call API → Update password
  }

  gotoBack(){
    this.location.back()
  }
}
