import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ModalService } from 'ngx-modal-ease';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';
import { OwnerServiceService } from '../../services/owner/owner-service.service';

@Component({
  selector: 'app-edit-tenant-data',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-tenant-data.component.html',
  styleUrls: ['./edit-tenant-data.component.css'],
})
export class EditTenantDataComponent implements OnInit {
  @Input() TenantDetails: any; // Full tenant response object
  tenantForm!: FormGroup;
  submitbtn = true;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private Modal: ModalService,
    private Toast: ToastrService,
    private AssociationService: AssociationServiceService,
    private OwnerService: OwnerServiceService
  ) {}

  ngOnInit(): void {
    this.initForm();

    if (this.TenantDetails) {
      this.patchTenantData(this.TenantDetails);
    }
  }

  initForm() {
    this.tenantForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      rentedAt: ['', Validators.required],
      advancePaid: ['', [Validators.required, Validators.min(1)]],
      estimatedRent: ['', [Validators.required, Validators.min(1)]],
      maintenancePaidBy: ['', Validators.required],
    });
  }

  patchTenantData(data: any) {
    const tenant = data?.tenant_details ?? {};
    const rentedAtDate = data?.tenant_rented_at?.$date
      ? new Date(data.tenant_rented_at.$date).toISOString().split('T')[0]
      : '';

    this.tenantForm.patchValue({
      firstName: tenant.name ?? data.tenant_name ?? '',
      lastName: tenant.last_name ?? '',
      email: tenant.email ?? data.tenant_email ?? '',
      phone: tenant.mobile?.toString() ?? data.tenant_mobile ?? '',
      rentedAt: rentedAtDate,
      advancePaid: data.advance_amount ?? '',
      estimatedRent: data.monthly_rent_amount ?? '',
      maintenancePaidBy: data.maintenance_paid_by ?? '',
    });
  }

  onSubmit() {
    if (this.tenantForm.invalid) {
      this.tenantForm.markAllAsTouched();
      return;
    }

    this.submitbtn = false;

       const payload = {
      name: this.tenantForm.get('firstName')?.value,
      last_name: this.tenantForm.get('lastName')?.value,
      email: this.tenantForm.get('email')?.value,
      mobile: this.tenantForm.get('phone')?.value,
      rented_at: this.tenantForm.get('rentedAt')?.value,
      advance_amount: this.tenantForm.get('advancePaid')?.value,
      monthly_rent_amount: this.tenantForm.get('estimatedRent')?.value,
      maintenance_paid_by: this.tenantForm.get('maintenancePaidBy')?.value,
      id: this.TenantDetails._id,
    };

    console.log('Payload to update tenant:', payload);

    this.apiService.EditTenantDetails(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.submitbtn = true
          this.Toast.success(res.message, 'Success')
          this.AssociationService.triggerAssociationOwner(res);
          this.OwnerService.triggerTenantAdd(res);
          this.closeModal();
        } else {
          this.submitbtn = true
          this.Toast.warning(res.message, 'Warning')
          // this.loginbtn = true;
        }
      },
      error: (err: any) => {
        this.submitbtn = true
        this.Toast.error(err.error.error.message, 'Failed')
        console.error('Login failed:', err.error.error.data);
        // alert(err.message || 'Login failed, please try again.');
      },
    });
  }

  closeModal() {
    this.Modal.close();
    console.log('Modal closed');
  }
}
