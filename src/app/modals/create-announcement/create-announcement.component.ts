import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../../services/api/apiservice.service';

@Component({
  selector: 'app-create-announcement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent {
  announcementForm!: FormGroup;
  previewImages: string[] = [];
  attachments: File[] = [];
  showprocessingbtn = false

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private toast: ToastrService,
    private apiService: ApiserviceService,
    
  ) {
    this.initializeForm();
  }

  /** Initialize Form */
  initializeForm() {
    this.announcementForm = this.fb.group({
      category: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      summary: ['', [Validators.required, Validators.maxLength(500)]],
      event_date: [''] // required only for "Events"
    });
  }

  /** Getters for form controls */
  get f() {
    return this.announcementForm.controls;
  }

  /** Handle Category Change */
  onCategoryChange() {
    const category = this.announcementForm.get('category')?.value;
    const eventDateControl = this.announcementForm.get('event_date');

    if (category == 'events') {
      eventDateControl?.setValidators([Validators.required]);
    } else {
      eventDateControl?.clearValidators();
      eventDateControl?.setValue('');
    }

    eventDateControl?.updateValueAndValidity();
  }

  /** Image Upload Handler */
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files.length) return;

    // Limit max 2 images
    if (this.attachments.length + files.length > 2) {
      this.toast.warning('You can only upload up to 2 images.');
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        this.attachments.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => this.previewImages.push(e.target.result);
        reader.readAsDataURL(file);
      } else {
        this.toast.error('Only image files are allowed.');
      }
    });
  }

  /** Remove image */
  removeImage(index: number) {
    this.previewImages.splice(index, 1);
    this.attachments.splice(index, 1);
  }

  /** Submit form */
  submitAnnouncement() {
  if (this.announcementForm.invalid) {
    this.toast.warning('Please fill all required fields correctly.');
    this.announcementForm.markAllAsTouched();
    return;
  }

  this.showprocessingbtn = true;
  const formData = new FormData();

  // ✅ Append main text fields
  formData.append('category', this.announcementForm.value.category);
  formData.append('title', this.announcementForm.value.title.trim());
  formData.append('summary', this.announcementForm.value.summary.trim());

  // ✅ Append event_date ONLY if category is 'Events' AND value exists
  if (
    this.announcementForm.value.category === 'events' &&
    this.announcementForm.value.event_date
  ) {
    formData.append('event_date', this.announcementForm.value.event_date);
  }

  // ✅ Append images
  this.attachments.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
  });

  // 🧩 Debug: Verify FormData before submission
  console.log('✅ FormData Entries:');
  formData.forEach((value, key) => console.log(`${key}:`, value));

  // ✅ API Call
  this.apiService.CreateAnnouncement<any>(formData).subscribe({
    next: (res: any) => {
      this.showprocessingbtn = false;

      if (res?.success) {
        this.toast.success(res.message || 'Announcement created successfully!', 'Success');
        this.closeModal();
      } else {
        this.toast.warning(res.message || 'Something went wrong.', 'Warning');
      }
    },
    error: (err: any) => {
      this.showprocessingbtn = false;
      this.toast.error(
        err.error?.error?.message || 'Something went wrong!',
        'Failed'
      );
      this.closeModal();
    },
  });
}


  /** Close Modal */
  closeModal() {
    this.modal.close();
  }
}
