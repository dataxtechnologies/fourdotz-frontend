import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  profileForm: FormGroup;
  isEditMode: boolean = false;
  showeditbtn: boolean = false;
  user_type = sessionStorage.getItem('user_type');
  userData: any;

  constructor(private fb: FormBuilder, private location: Location) {
    // Fetch user data from sessionStorage
    const userJson = sessionStorage.getItem('userdata');
    this.userData = userJson ? JSON.parse(userJson) : {};

    // Initialize form with sessionStorage data
    this.profileForm = this.fb.group({
      firstName: [this.userData.name || '', Validators.required],
      lastName: [this.userData.last_name || ''], // Assuming last_name might exist
      email: [
        this.userData.email || '',
        [Validators.required, Validators.email],
      ],
      phone: [this.userData.mobile || '', Validators.pattern('^[0-9]*$')],
    });
  }

  ngOnInit(): void {
    this.profileForm.disable(); // Disable by default
    this.showeditbtn = this.user_type !== 'superadmin';
  }

  goback() {
    this.location.back();
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    this.isEditMode ? this.profileForm.enable() : this.profileForm.disable();
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const updatedProfile = this.profileForm.value;
      //console.log('Profile saved:', updatedProfile);
      alert('Profile updated successfully!');
      this.toggleEditMode();
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  cancelEdit(): void {
    this.profileForm.patchValue({
      firstName: this.userData.name || '',
      lastName: this.userData.last_name || '',
      email: this.userData.email || '',
      phone: this.userData.mobile || '',
    });
    this.toggleEditMode();
  }
}
