import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ModalService } from 'ngx-modal-ease';
import { ToastrService } from 'ngx-toastr';
import { OwnerServiceService } from '../../services/owner/owner-service.service';

@Component({
  selector: 'app-create-request-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-request-user.component.html',
  styleUrl: './create-request-user.component.css',
})
export class CreateRequestUserComponent {
  URL = URL; // Fix for Angular template use
  dropdownOpen = false;
  associationId1: any[] = [];
  filteredList: any[] = [];
  selectedProperty: string | null = null;
  searchTerm = '';
  submitLoading = false;
  loggedUserType: string = '';

  requestForm = new FormGroup({
    property_id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  attachments: File[] = [];
  attachmentError = '';

  allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];

  constructor(
    private apiService: ApiserviceService,
    private Modal: ModalService,
    private toast: ToastrService,
    private OwnerService: OwnerServiceService
  ) {}

  ngOnInit(): void {
    // this.getpropertiesdata()
    this.loggedUserType = localStorage.getItem('user_type') || '';

    if (this.loggedUserType === 'owner') {
      this.getOwnerProperties();
    } else if (this.loggedUserType === 'tenant') {
      this.getTenantProperties();
    }
  }

  selectProperty(property: any) {
    this.selectedProperty = property.property_no;
    this.requestForm.get('property_id')?.setValue(property._id);
    this.dropdownOpen = false;
    this.searchTerm = '';
  }

  onSearchChange(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.searchTerm = input;

    if (!input) {
      this.filteredList = [...this.associationId1];
      return;
    }

    this.filteredList = this.associationId1.filter((prop: any) =>
      prop.property_no.toLowerCase().includes(input)
    );
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;

    if (!this.dropdownOpen) {
      this.searchTerm = '';
      this.filteredList = [...this.associationId1];
    }
  }

  getOwnerProperties() {
    this.apiService.ownerproperties<any>().subscribe({
      next: (res: any) => {
        if (res?.success && Array.isArray(res.data)) {
          this.associationId1 = res.data;
          this.filteredList = [...this.associationId1];
        } else {
          this.associationId1 = [];
          this.filteredList = [];
        }
      },
      error: () => {
        this.associationId1 = [];
        this.filteredList = [];
      },
    });
  }

  getTenantProperties() {
    this.apiService.TenantPropertyDatas<any>().subscribe({
      next: (res: any) => {
        if (res?.success && Array.isArray(res.data)) {
          this.associationId1 = res.data;
          this.filteredList = [...this.associationId1];
        } else {
          this.associationId1 = [];
          this.filteredList = [];
        }
      },
      error: () => {
        this.associationId1 = [];
        this.filteredList = [];
      },
    });
  }

  onFileSelect(event: any) {
    this.attachmentError = '';
    const files = event.target.files;

    for (let file of files) {
      if (this.attachments.length >= 2) {
        this.attachmentError = 'Only 2 files allowed.';
        return;
      }

      if (
        this.allowedImageTypes.includes(file.type) ||
        this.allowedVideoTypes.includes(file.type)
      ) {
        this.attachments.push(file);
      } else {
        this.attachmentError = 'Only image or video files allowed.';
      }
    }
  }

  removeAttachment(i: number) {
    this.attachments.splice(i, 1);
  }

  closeModal() {
    this.Modal.close();
  }

  submitRequest() {
    this.submitLoading = true;
    this.attachmentError = '';

    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      this.submitLoading = false;
      return;
    }

    if (this.attachments.length === 0) {
      this.attachmentError = 'Please upload at least 1 attachment.';
      this.submitLoading = false;
      return;
    }

    const images = this.attachments.filter((f) =>
      this.allowedImageTypes.includes(f.type)
    );
    const videos = this.attachments.filter((f) =>
      this.allowedVideoTypes.includes(f.type)
    );

    if (this.attachments.length > 2) {
      this.attachmentError = 'Maximum 2 attachments allowed.';
      
      return;
    }

    if (images.length > 2 || videos.length > 2) {
      this.attachmentError = 'Cannot upload more than 2 images or 2 videos.';
      
      return;
    }

    const formData = new FormData();
    formData.append('property_id', this.requestForm.value.property_id!);
    formData.append('title', this.requestForm.value.title!);
    formData.append('description', this.requestForm.value.description!);

    this.attachments.forEach((file) => {
      formData.append('images', file);
    });

    console.log('Final FormData Payload:', formData);

    this.apiService.CreateRequestUser<any>(formData).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.submitLoading = false;
          this.OwnerService.triggerRequestUser(res);
          // this.AssociationSer.triggerAnnouncementCreated(res);
          this.toast.success(res.message, 'Success');
          this.closeModal();
        } else {
          this.submitLoading = false;
          this.toast.warning(res.message || 'Something went wrong.', 'Warning');
        }
      },
      error: (err: any) => {
        this.submitLoading = false;
        this.toast.error(
          err.error?.error?.message || 'Something went wrong!',
          'Failed'
        );
        this.closeModal();
      },
    });
  }
}
