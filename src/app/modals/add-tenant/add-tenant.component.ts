import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';
import { OwnerServiceService } from '../../services/owner/owner-service.service';

@Component({
  selector: 'app-add-tenant',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-tenant.component.html',
  styleUrl: './add-tenant.component.css',
})
export class AddTenantComponent {
  @Input() PropertyIddata: any

  submitbtn: boolean = true;

  constructor(private Modal: ModalService, private fb: FormBuilder, private apiService: ApiserviceService, private Toast: ToastrService, private AssociationService: AssociationServiceService,
    private OwnerService : OwnerServiceService

  ) {}

  closeModal() {
    this.Modal.close();
  }

  tenantForm!: FormGroup;

ngOnInit(): void {
    this.tenantForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // 10 digits
      rentedAt: ['', Validators.required],
      advancePaid: ['', [Validators.required, Validators.min(0)]],
      estimatedRent: ['', [Validators.required, Validators.min(0)]],
      maintenancePaidBy: ['', Validators.required]
    });
    console.log('PropertyIddata', this.PropertyIddata);
    
  }

  onSubmit(): void {
    this.submitbtn = false;
    if (this.tenantForm.invalid) {
      this.tenantForm.markAllAsTouched();
      return;
    }
    

    const payload = {
      name: this.tenantForm.get('firstName')?.value,
      last_name: this.tenantForm.get('lastName')?.value,
      email: this.tenantForm.get('email')?.value,
      mobile: this.tenantForm.get('phone')?.value,
      rented_at: this.tenantForm.get('rentedAt')?.value,
      advance_amount: this.tenantForm.get('advancePaid')?.value,
      monthly_rent_amount: this.tenantForm.get('estimatedRent')?.value,
      maintenance_paid_by: this.tenantForm.get('maintenancePaidBy')?.value,
      property_id: this.PropertyIddata,
    };

    console.log('✅ Payload:', payload);
    this.apiService.createTenantinproperty<any>(payload).subscribe({
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
        this.Toast.success(err.error.error.message, 'Failed')
        console.error('Login failed:', err.error.error.data);
        // alert(err.message || 'Login failed, please try again.');
      },
    });
  }
}
