import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-create-admin',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-admin.component.html',
  styleUrl: './create-admin.component.css'
})
export class CreateAdminComponent {
  adminForm!: FormGroup;
  submitbtn = true;

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private toast: ToastrService,
    private AssociationService : AssociationServiceService
  ) {}

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onSubmit(): void {
    this.submitbtn = false;

    if (this.adminForm.invalid) {
      this.adminForm.markAllAsTouched();
      this.submitbtn = true;
      return;
    }

    const payload = {
      name: this.adminForm.get('firstName')?.value,
      last_name: this.adminForm.get('lastName')?.value,
      email: this.adminForm.get('email')?.value,
      mobile: this.adminForm.get('mobile')?.value
    };

    this.apiService.CreateServiceAdmin<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.toast.success(res.message, 'Success');
          this.AssociationService.triggerCreateAdmin(res);
          this.submitbtn = true;
          this.closeModal();
        } else {
          this.toast.warning(res.message, 'Warning');
          this.submitbtn = true;
        }
      },
      error: (err) => {
        this.toast.error(err.error?.error?.message || 'Something went wrong', 'Failed');
        this.submitbtn = true;
      },
    });
  }

  closeModal() {
    this.modal.close();
  }
}