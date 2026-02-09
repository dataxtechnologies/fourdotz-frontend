import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { AdmindataService } from '../../services/adminservice/admindata.service';

@Component({
  selector: 'app-create-ad-space-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-ad-space-modal.component.html',
  styleUrl: './create-ad-space-modal.component.css'
})
export class CreateAdSpaceModalComponent {

  adForm!: FormGroup;

  mainImageFile!: File | null;
  mainImagePreview: string | null = null;

  imageFiles: File[] = [];
  previewImages: string[] = [];

  showprocessingbtn = false;

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private toast: ToastrService,
    private apiService: ApiserviceService,
    private AdminService : AdmindataService
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.adForm = this.fb.group({
      title: ['', Validators.required],
      advertisement_space_type: ['', Validators.required],
      advertisement_display_area: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get f() {
    return this.adForm.controls;
  }

  // -------------------------
  // MAIN IMAGE
  // -------------------------
  onMainImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.mainImageFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.mainImagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  removeMainImage() {
    this.mainImageFile = null;
    this.mainImagePreview = null;
  }

  // -------------------------
  // ADDITIONAL IMAGES
  // -------------------------
  onImagesSelected(event: any) {
    const files: FileList = event.target.files;

    Array.from(files).forEach(file => {
      this.imageFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    this.imageFiles.splice(index, 1);
    this.previewImages.splice(index, 1);
  }

  // -------------------------
  // SUBMIT
  // -------------------------
  submitAdSpace() {

    if (this.adForm.invalid || !this.mainImageFile) {
      this.toast.warning('Please fill all required fields and upload main image.');
      return;
    }

    this.showprocessingbtn = true;

    const formData = new FormData();

    formData.append('title', this.adForm.value.title);
    formData.append('advertisement_space_type', this.adForm.value.advertisement_space_type);
    formData.append('advertisement_display_area', this.adForm.value.advertisement_display_area);
    formData.append('description', this.adForm.value.description);

    formData.append('main_image', this.mainImageFile);

    this.imageFiles.forEach(file => {
      formData.append('images', file);
    });

    this.apiService.CreateanAdSpace<any>(formData).subscribe({
      next: (res: any) => {

        this.showprocessingbtn = false;

        if (res?.success) {
          this.toast.success(res.message, 'Success');
          this.AdminService.triggerAdServiceCreated(res);
          this.closeModal();
        } else {
          this.toast.warning(res.message || 'Failed to create ad.');
        }
      },
      error: (err: any) => {
        this.showprocessingbtn = false;
        this.toast.error('Something went wrong', 'Error');
      },
    });
  }

  closeModal() {
    this.modal.close();
  }
}