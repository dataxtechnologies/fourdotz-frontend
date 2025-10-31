import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { AdmindataService } from '../../services/adminservice/admindata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-association-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-association-modal.component.html',
  styleUrls: ['./edit-association-modal.component.css'],
})
export class EditAssociationModalComponent implements OnInit {
  @Input() Associationdata: any;

  associationForm!: FormGroup;
  createButton: boolean = true;

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private AdminServices: AdmindataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.associationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      associationName: ['', Validators.required],
      propertyType: this.fb.group({
        villa: [false],
        apartment: [false],
        townhouse: [false],
      }),
    });

    // ✅ Patch values when data is available
    if (this.Associationdata) {
      this.patchFormValues(this.Associationdata);
    }
  }

  patchFormValues(data: any) {
    // Handle property type checkboxes
    const propertyType = {
      villa: data.property_type?.includes('villa') || false,
      apartment: data.property_type?.includes('apartment') || false,
      townhouse: data.property_type?.includes('townhouse') || false,
    };

    // Patch form
    this.associationForm.patchValue({
      name: data.name || '',
      email: data.email || '',
      phone: data.mobile?.toString() || '',
      associationName: data.property_name || '',
      propertyType,
    });
  }

  closeModal(): void {
    this.modal.close();
  }

get selectedPropertyTypes(): string[] {
  const propertyGroup = this.associationForm.get('propertyType') as FormGroup;
  return Object.keys(propertyGroup.value).filter(key => propertyGroup.value[key]);
}

  isInvalid(controlName: string): boolean {
    const control = this.associationForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  anyPropertySelected(): boolean {
    const propertyGroup = this.associationForm.get('propertyType') as FormGroup;
    return Object.values(propertyGroup.value).some((val) => val);
  }

  // ✅ Update existing association
  createAssociation(): void {
    this.createButton = false;

    if (this.associationForm.invalid || !this.anyPropertySelected()) {
      this.associationForm.markAllAsTouched();
      this.createButton = true;
      return;
    }

    const formValue = this.associationForm.value;
    const selectedPropertyTypes = Object.keys(formValue.propertyType).filter(
      (key) => formValue.propertyType[key]
    );

    const payload = {
      id: this.Associationdata?._id, // include ID for edit
      name: formValue.name,
      email: formValue.email,
      mobile: formValue.phone,
      property_name: formValue.associationName,
      property_type: selectedPropertyTypes,
    };

    this.apiService.UpdateAssociation<any>(payload).subscribe({
      next: (res: any) => {
        this.createButton = true;
        if (res?.success) {
          this.AdminServices.triggerAdminAssociation(res);
          this.toastr.success(res.message, 'Success');
          this.closeModal();
        } else {
          this.toastr.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        this.createButton = true;
        this.toastr.error(
          err.error?.error?.message || 'Update failed',
          'Error'
        );
        //console.error('Update failed:', err);
      },
    });
  }
}
