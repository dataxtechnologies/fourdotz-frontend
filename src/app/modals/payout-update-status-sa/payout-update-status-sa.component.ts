import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-payout-update-status-sa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payout-update-status-sa.component.html',
  styleUrl: './payout-update-status-sa.component.css'
})
export class PayoutUpdateStatusSAComponent {
  @Input() requestdata: any;
  form!: FormGroup;
  attachedFiles: File[] = [];
  isDragging: boolean = false;
  submitbtnloading = false;
  private statusLabels: Record<string, string> = {
    approved: 'Approved',
    completed: 'Completed / Transferred',
    rejected: 'Rejected',
  };

  constructor(private fb: FormBuilder, private Modal: ModalService, private apiService: ApiserviceService, private Toast: ToastrService, private Association : AssociationServiceService) {
    this.form = this.fb.group({
      status: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      attachments: [[], Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  getStatusLabel(value: string): string {
    return this.statusLabels[value] ?? value;
  }

  getFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  // ---- FILE HANDLING ----
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.addFiles(Array.from(input.files));
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.addFiles(Array.from(files));
    }
  }

  addFiles(files: File[]) {
    if (this.attachedFiles.length + files.length > 2) {
      this.form.get('attachments')?.setErrors({ max: true });
      return;
    }

    this.attachedFiles = [...this.attachedFiles, ...files];
    this.form.patchValue({ attachments: this.attachedFiles });

    if (this.attachedFiles.length > 0) {
      this.form.get('attachments')?.setErrors(null);
    }
  }

  removeFile(event: MouseEvent, index?: number): void {
    event.stopPropagation();

    if (index !== undefined) {
      this.attachedFiles.splice(index, 1);
    } else {
      this.attachedFiles = [];
    }

    this.form.patchValue({ attachments: this.attachedFiles });

    if (this.attachedFiles.length === 0) {
      this.form.get('attachments')?.setErrors({ required: true });
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  // ---- SUBMIT ----
  onSubmit(): void {
    this.submitbtnloading = true;
    if (this.form.invalid || this.attachedFiles.length === 0) {
      this.form.markAllAsTouched();
      this.submitbtnloading = false;
      return;
    }

    const formData = new FormData();
    formData.append('status', this.form.value.status);
    formData.append('description', this.form.value.description);
    formData.append('id', this.requestdata._id);
    this.attachedFiles.forEach(file => {
      formData.append('paid_attachment', file);
    });

    console.log('--- FormData ---');
    formData.forEach((value, key) => {
      console.log(key, value);
    });



    this.apiService.updatepayoutrequeststatus<any>(formData).subscribe({
       next: (res: any) => {
        if (res?.success) {
          this.submitbtnloading = false;
          this.Association.triggerPayoutRequestCreate(res);
          this.Toast.success('Payout Request updated Successfully', 'Success');
          this.close();
        }else{
          this.submitbtnloading = false;
          this.Toast.warning('Payout Request updated Failed', 'Warning');
          this.close();
        }
        // this.close();
      },
      error: (err : any) => {
        this.submitbtnloading = false;
        this.Toast.error(err?.error.error?.message, 'Error');
        this.close();
      }
    });
  }

  onCancel(): void {
    this.form.reset();
    this.attachedFiles = [];
    this.close();
  }

  close() {
    this.Modal.close();
  }
}