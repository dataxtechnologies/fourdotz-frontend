import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  /** UI STATES */
  editUpi = false;
  loadingUserData = false;
  editbtnloading = false;

  imagePreview: string | null = null;
selectedImageFile!: File | null;
imageUploading = false;


  /** USER DATA */
  user_type : any

  user = {
    name: 'User name',
    email: 'mi@xpaytech.co',
    mobile: '+20-01274318900',
    upi_id: '',
    profile_image:''
  };

  /** TEMP VARIABLE FOR EDIT MODE */
  editableUpi = '';

  constructor(
    private ApiService: ApiserviceService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location,
  ) {
    const userJson = localStorage.getItem('userdata');
    if (userJson) {
      this.user = { ...this.user, ...JSON.parse(userJson) };
    }
  }

  /* =========================
      EDIT MODE ENABLE
     ========================= */
  enableEdit() {
    this.editableUpi = this.user.upi_id || '';
    this.editUpi = true;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.user_type = localStorage.getItem('user_type');
  }

  onImageSelected(event: any) {

  const file = event.target.files[0];
  if (!file) return;

  // validate size < 2MB
  if (file.size > 2 * 1024 * 1024) {
    this.toastr.warning('Image must be under 2MB');
    return;
  }

  this.selectedImageFile = file;

  const reader = new FileReader();
  reader.onload = (e: any) => {
    this.imagePreview = e.target.result;
  };
  reader.readAsDataURL(file);
}


uploadProfileImage() {

  if (!this.selectedImageFile) return;

  this.imageUploading = true;


  const formData = new FormData();
  formData.append('profile_image', this.selectedImageFile);
  formData.append('user_type', this.user_type);

  this.ApiService.UploadProfileImage<any>(formData).subscribe({
    next: (res: any) => {

      this.imageUploading = false;

      if (res?.success) {

        this.toastr.success('Profile photo updated');

        

        this.getUserData(this.user_type);

        localStorage.setItem('userdata', JSON.stringify(this.user));

        this.imagePreview = null;
        this.selectedImageFile = null;

      } else {
        this.toastr.error(res.message);
      }
    },
    error: () => {
      this.imageUploading = false;
      this.toastr.error('Upload failed');
    }
  });
}

cancelImage() {
  this.imagePreview = null;
  this.selectedImageFile = null;
}


removeProfileImage() {
const formData = new FormData();
  formData.append('profile_image', '');
  formData.append('user_type', this.user_type);
  this.ApiService.UploadProfileImage<any>(formData).subscribe({
    next: (res: any) => {

      if (res?.success) {

        this.user.profile_image = '';

         this.getUserData(this.user_type);

        this.toastr.success('Profile photo removed');
      }
    }
  });
}

  /* =========================
      CANCEL EDIT
     ========================= */
  cancelEdit() {
    this.editableUpi = this.user.upi_id || '';
    this.editUpi = false;
  }

  /* =========================
      SAVE UPI
     ========================= */
  saveUpi() {
    if (!this.editableUpi || !this.editableUpi.trim()) {
      this.toastr.warning('Please enter a valid UPI ID');
      return;
    }

    this.editbtnloading = true;

    const payload = {
      upi_id: this.editableUpi.trim(),
    };

    this.ApiService.UpdateUPI<any>(payload).subscribe({
      next: (res) => {
        this.editbtnloading = false;

        if (res?.success) {
          this.toastr.success('UPI ID updated successfully');

          // update local user
          this.user.upi_id = this.editableUpi;

          // refresh user data
          this.getUserData(this.user_type);

          // exit edit mode
          this.editUpi = false;
        } else {
          this.toastr.error(res?.message || 'Failed to update UPI ID');
        }
      },
      error: () => {
        this.editbtnloading = false;
        this.toastr.error('Failed to update UPI ID', 'Error');
      },
    });
  }

  /* =========================
      FETCH USER DATA
     ========================= */
  getUserData(type: any) {
    if (this.user_type === 'association') {
      this.loadingUserData = true;
    }

    this.ApiService.UserInfo<any>(type).subscribe({
      next: (res: any) => {
        if (res?.success) {
          localStorage.setItem('userdata', JSON.stringify(res.data));
          this.user = { ...this.user, ...res.data };
        }
        this.loadingUserData = false;
      },
      error: () => {
        this.loadingUserData = false;
      },
    });
  }

  /* =========================
      BACK NAVIGATION
     ========================= */
  goback() {
    this.location.back();
  }
}
