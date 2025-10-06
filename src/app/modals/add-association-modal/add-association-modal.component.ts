import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-add-association-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-association-modal.component.html',
  styleUrls: ['./add-association-modal.component.css'],
})
export class AddAssociationModalComponent implements OnInit {
  associationForm!: FormGroup;
  createButton : boolean = true

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private AdminServices : AdmindataService
  ) {}

  ngOnInit(): void {
    9;
    this.associationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      associationName: ['', Validators.required],
      propertyType: this.fb.group({
        villa: [false],
        apartment: [false],
        townhouse: [false],
      }),
    });
  }

  // Close modal
  closeModal(): void {
    this.modal.close();
  }

  // Helper to check field validity
  isInvalid(controlName: string): boolean {
    const control = this.associationForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  // Check at least one property selected
  anyPropertySelected(): boolean {
    const propertyGroup = this.associationForm.get('propertyType') as FormGroup;
    return Object.values(propertyGroup.value).some((val) => val);
  }

  // Submit form
  createAssociation(): void {
    this.createButton = false
    if (this.associationForm.invalid || !this.anyPropertySelected()) {
      this.associationForm.markAllAsTouched();
      this.createButton = true
      return;
    }

    const formValue = this.associationForm.value;
    const selectedPropertyTypes = Object.keys(formValue.propertyType).filter(
      (key) => formValue.propertyType[key]
    );

    const payload = {
      name: formValue.name,
      email: formValue.email,
      mobile: formValue.phone,
      property_name: formValue.associationName,
      property_type: selectedPropertyTypes,
    };

    this.apiService.createAssociation<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
           this.createButton = true
          this.AdminServices.triggerAdminAssociation(res)
          this.closeModal();
        } else {
           this.createButton = true
          this.closeModal();
          alert(res.message || 'please try again.');
        }
      },
      error: (err: any) => {
         this.createButton = true
        console.error('Logout failed:', err);
        alert(err.message || 'Logout failed, please try again.');
      },
    });
  }
}
