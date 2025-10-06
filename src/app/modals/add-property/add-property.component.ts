import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-add-property',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export class AddPropertyComponent {
  propertyForm!: FormGroup;

  propertyTypes: string[] = ['Villa', 'Apartment', 'Townhouse'];
  buildingTypes: string[] = ['Tower', 'Block'];

  constructor(
    private fb: FormBuilder,
    private Modal: ModalService,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService
  ) {}

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      propertyNo: ['', Validators.required],
      area: ['', Validators.required],
      facing: ['', Validators.required],
      electricityNo: ['', Validators.required],
      parkingSlot: ['', Validators.required],
      gaslineNo: [''],
      maintenanceAmount: ['', Validators.required],
      dueDate: ['', Validators.required],
      propertyType: ['', Validators.required],
      bhk: ['', Validators.required],
      buildingType: [''],
      tower: [''],
      block: [''],
      floor: [''],
    });

    // Handle conditional validators
    this.propertyForm.get('propertyType')?.valueChanges.subscribe((type) => {
      if (type === 'Apartment') {
        this.propertyForm
          .get('buildingType')
          ?.setValidators(Validators.required);
        this.propertyForm.get('floor')?.setValidators(Validators.required);
      } else {
        this.propertyForm.get('buildingType')?.clearValidators();
        this.propertyForm.get('floor')?.clearValidators();
      }
      this.propertyForm.get('buildingType')?.updateValueAndValidity();
      this.propertyForm.get('floor')?.updateValueAndValidity();
    });

    this.propertyForm.get('buildingType')?.valueChanges.subscribe((bt) => {
      if (bt === 'Tower') {
        this.propertyForm.get('tower')?.setValidators(Validators.required);
        this.propertyForm.get('block')?.clearValidators();
      } else if (bt === 'Block') {
        this.propertyForm.get('block')?.setValidators(Validators.required);
        this.propertyForm.get('tower')?.clearValidators();
      } else {
        this.propertyForm.get('tower')?.clearValidators();
        this.propertyForm.get('block')?.clearValidators();
      }
      this.propertyForm.get('tower')?.updateValueAndValidity();
      this.propertyForm.get('block')?.updateValueAndValidity();
    });
  }

  closeModal() {
    this.Modal.close();
  }

  AddPropertybyAssociation() {
    if (this.propertyForm.valid) {
      console.log(this.propertyForm.value);
      const payload = {
        property_no: this.propertyForm.get('propertyNo')?.value,
        area: this.propertyForm.get('area')?.value,
        facing: this.propertyForm.get('facing')?.value,
        property_type: this.propertyForm.get('propertyType')?.value,
        maintenance_amount: this.propertyForm.get('maintenanceAmount')?.value,
        due_date: this.propertyForm.get('dueDate')?.value,
        electricity_number: this.propertyForm.get('electricityNo')?.value,
        gasline_number: this.propertyForm.get('gaslineNo')?.value,
        parking_slot_number: this.propertyForm.get('parkingSlot')?.value,
        bhk: this.propertyForm.get('bhk')?.value,
        tower: this.propertyForm.get('tower')?.value,
        block: this.propertyForm.get('block')?.value,
        floor: this.propertyForm.get('floor')?.value,
      };
      this.apiService.AddPropertybyAssociation<any>(payload).subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.AssociationService.triggerAdminAssociation(res)
            this.closeModal()
          } else {
            // this.loginbtn = true;
          }
        },
        error: (err: any) => {
          console.error('Login failed:', err.error.error.data);
          // alert(err.message || 'Login failed, please try again.');
        },
      });
    } else {
      this.propertyForm.markAllAsTouched();
    }
  }
}
