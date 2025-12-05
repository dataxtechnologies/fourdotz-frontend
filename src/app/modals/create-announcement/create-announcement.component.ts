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
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-create-announcement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css'],
})
export class CreateAnnouncementComponent {
  announcementForm!: FormGroup;
  previewFiles: { url: string; type: 'image' | 'video' }[] = [];
  attachments: File[] = [];
  showprocessingbtn = false;

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private toast: ToastrService,
    private apiService: ApiserviceService,
    private AssociationSer: AssociationServiceService
  ) {
    this.initializeForm();
  }

  /** Initialize Form */
  initializeForm() {
    this.announcementForm = this.fb.group({
      category: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      summary: ['', [Validators.required, Validators.maxLength(10000)]],
      event_date: [''], // required only for "Events"
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

    // Max 2 total files
    if (this.attachments.length + files.length > 2) {
      this.toast.warning('You can only upload a maximum of 2 attachments.');
      return;
    }

    // Allowed extensions
    const allowedImages = ['jpg', 'jpeg', 'png', 'webp'];
    const allowedVideos = ['mp4', 'mkv', 'mov'];

    Array.from(files).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase();

      if (!ext) {
        this.toast.error('Invalid file type.');
        return;
      }

      const isImage = allowedImages.includes(ext);
      const isVideo = allowedVideos.includes(ext);

      // ❌ Not allowed
      if (!isImage && !isVideo) {
        this.toast.error(
          'Allowed formats: JPG, JPEG, PNG, WEBP (images) and MP4, MKV, MOV (videos)'
        );
        event.target.value = '';
        return;
      }

      // ============================
      //  IMAGE HANDLING
      // ============================
      if (isImage) {
        this.attachments.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewFiles.push({ url: e.target.result, type: 'image' });
        };
        reader.readAsDataURL(file);
        return;
      }

      // ============================
      //  VIDEO HANDLING (With duration check)
      // ============================
      if (isVideo) {
        const videoURL = URL.createObjectURL(file);
        const video = document.createElement('video');
        video.src = videoURL;

        video.onloadedmetadata = () => {
          if (video.duration > 300) {
            this.toast.error('Video must be under 5 minutes.');
            URL.revokeObjectURL(videoURL);
            return;
          }

          this.attachments.push(file);
          this.previewFiles.push({ url: videoURL, type: 'video' });
        };
      }
    });
  }

  /** Remove image */
  removeAttachment(index: number) {
    this.previewFiles.splice(index, 1);
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

    formData.append('category', this.announcementForm.value.category);
    formData.append('title', this.announcementForm.value.title.trim());
    formData.append('summary', this.announcementForm.value.summary.trim());

    if (
      this.announcementForm.value.category === 'events' &&
      this.announcementForm.value.event_date
    ) {
      formData.append('event_date', this.announcementForm.value.event_date);
    }

    // 🔥 Send multiple files under SAME KEY
    this.attachments.forEach((file) => {
      formData.append('images', file);
    });

    // Debug log
    formData.forEach((value, key) => console.log(key, value));

    // ✅ API Call
    this.apiService.CreateAnnouncement<any>(formData).subscribe({
      next: (res: any) => {
        this.showprocessingbtn = false;

        if (res?.success) {
          this.AssociationSer.triggerAnnouncementCreated(res);
          this.toast.success(res.message, 'Success');
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
