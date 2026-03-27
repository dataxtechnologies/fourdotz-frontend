import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-agreement-to-tenant',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './send-agreement-to-tenant.component.html',
  styleUrl: './send-agreement-to-tenant.component.css'
})
export class SendAgreementToTenantComponent {
 @Input() agreementId!: string;
  @Input() by!: string;

  form!: FormGroup;

  properties: any[] = [];
  filteredList: any[] = [];
  selectedProperty: any;
  selectedowner: any;
  selectedTenant: any;

  dropdownOpen = false;
  searchTerm = '';
  submitLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private toast: ToastrService,
    private modal: ModalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      property_id: ['', Validators.required],
    });

    this.loadProperties();
  }

  /* ===== LOAD PROPERTIES ===== */
loadProperties() {
  this.apiService.TenantListinOwner<any>().subscribe({
    next: (res: any) => {
      if (res?.success && Array.isArray(res.data)) {
        this.properties = res.data; // 👈 keep all
        this.filteredList = [...this.properties];
      } else {
        this.properties = [];
        this.filteredList = [];
      }
    },
    error: () => {
      this.properties = [];
      this.filteredList = [];
    },
  });
}

  /* ===== DROPDOWN ===== */
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (!this.dropdownOpen) {
      this.searchTerm = '';
      this.filteredList = [...this.properties];
    }
  }

  selectProperty(property: any) {
    this.selectedProperty = property;
    this.selectedTenant = property.tenant_name;
    this.form.get('property_id')?.setValue(property._id);
    this.dropdownOpen = false;
  }

onSearchChange(event: Event) {
  const value = (event.target as HTMLInputElement).value
    .toLowerCase()
    .trim();

  this.searchTerm = value;

  if (!value) {
    this.filteredList = [...this.properties];
    return;
  }

  this.filteredList = this.properties.filter((p: any) =>
    (p.property_no && p.property_no.toLowerCase().includes(value)) ||
    (p.tenant_name && p.tenant_name.toLowerCase().includes(value)) ||
    (p.tenant_email && p.tenant_email.toLowerCase().includes(value)) ||
    (p.tenant_mobile && p.tenant_mobile.includes(value))
  );
}

  /* ===== SUBMIT ===== */
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('Please select a resident', 'Validation');
      return;
    }

    this.submitLoading = true;

    const payload = {
      id: this.agreementId,
      agreement_gen_user_type: this.selectedProperty.resident_type,
      agreement_gen_user_id: this.selectedProperty.tenant_user_id,
    };

    console.log('payload', payload);
    


    this.apiService.SendAgreement<any>(payload).subscribe({
      next: (res: any) => {
        this.submitLoading = false;
        if (res?.success) {
          this.toast.success(res.message);
          this.modal.close();
          this.router.navigateByUrl('/agreement/owner/list-created-agreement')
        } else {
          this.toast.warning(res.message || 'Failed');
        }
      },
      error: () => {
        this.submitLoading = false;
        this.toast.error('Failed to send agreement');
      },
    });
  }

  closeModal() {
    this.modal.close();
  }
}

// TenantListinOwner