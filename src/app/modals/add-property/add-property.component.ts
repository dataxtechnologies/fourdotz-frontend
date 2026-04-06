import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export class AddPropertyComponent implements OnInit {
  propertyForm!: FormGroup;
  submitBtn = true;
  propertyTypes: any;
  building_types: string[] = ['tower_name', 'block_name'];
  days = Array.from({ length: 31 }, (_, i) => this.getOrdinal(i + 1));

  constructor(
    private fb: FormBuilder,
    private Modal: ModalService,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService,
    private Toastr: ToastrService
  ) {}

  getOrdinal(day: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = day % 100;
    return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  ngOnInit(): void {
     this.propertyForm = this.fb.group({
      propertyNo: ['', Validators.required],
      area: ['', Validators.required],
      facing: ['', Validators.required],
      electricityNo: ['', Validators.required],
      parkingSlot: ['', Validators.required],
      gaslineNo: [''],

      maintenanceType: ['', Validators.required],
      maintenanceAmount: [''],
      maintenancePerSqft: [''],

      dueDate: ['', Validators.required],
      propertyType: ['', Validators.required],
      bhk: [''],

      building_type: [''],
      tower_name: [''],
      block_name: [''],
      floor: [''],
    });

    // 🔹 Handle maintenance type switch
     this.propertyForm.get('maintenanceType')?.valueChanges.subscribe((type) => {
      if (type === 'fixed') {
        this.propertyForm.get('maintenanceAmount')?.setValidators(Validators.required);
        this.propertyForm.get('maintenancePerSqft')?.clearValidators();
        this.propertyForm.get('maintenancePerSqft')?.reset();
      } else if (type === 'square_feet') {
        this.propertyForm.get('maintenancePerSqft')?.setValidators(Validators.required);
        this.propertyForm.get('maintenanceAmount')?.clearValidators();
        this.propertyForm.get('maintenanceAmount')?.reset();
      }

      this.propertyForm.get('maintenanceAmount')?.updateValueAndValidity();
      this.propertyForm.get('maintenancePerSqft')?.updateValueAndValidity();
    });

    // 🔹 Get userdata from localStorage
    const userdata = JSON.parse(localStorage.getItem('userdata') || '{}');
    if (userdata?.property_type?.length) {
      this.propertyTypes = userdata.property_type.map(
        (p: string) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
      );

      if (this.propertyTypes.length === 1) {
  const selectedType = this.propertyTypes[0];
  this.propertyForm.patchValue({ propertyType: selectedType });
}
    

      // Auto-select if only one property type
      if (this.propertyTypes.length === 1) {
        const selectedType = this.propertyTypes[0];
        this.propertyForm.get('propertyType')?.setValue(selectedType);

        if (selectedType === 'Villa' || selectedType === 'Townhouse') {
          this.propertyForm.get('bhk')?.setValidators([Validators.required]);
        } else if (selectedType === 'Apartment') {
          this.propertyForm
            .get('building_type')
            ?.setValidators([Validators.required]);
          this.propertyForm.get('bhk')?.setValidators([Validators.required]);
          this.propertyForm.get('floor')?.setValidators([Validators.required]);
        }

        this.propertyForm.updateValueAndValidity();
      }
    }

    // 🔹 Conditional validators for property type
     this.propertyForm.get('propertyType')?.valueChanges.subscribe((type) => {
      this.propertyForm.get('bhk')?.clearValidators();
      this.propertyForm.get('building_type')?.clearValidators();
      this.propertyForm.get('floor')?.clearValidators();

      if (type === 'Apartment') {
        this.propertyForm.get('bhk')?.setValidators(Validators.required);
        this.propertyForm.get('building_type')?.setValidators(Validators.required);
        this.propertyForm.get('floor')?.setValidators(Validators.required);
      } else if (type === 'Villa' || type === 'Townhouse') {
        this.propertyForm.get('bhk')?.setValidators(Validators.required);
      }

      this.propertyForm.get('bhk')?.updateValueAndValidity();
      this.propertyForm.get('building_type')?.updateValueAndValidity();
      this.propertyForm.get('floor')?.updateValueAndValidity();
    });

    // 🔹 Conditional validators for building type
     this.propertyForm.get('building_type')?.valueChanges.subscribe((type) => {
      if (type === 'tower') {
        this.propertyForm.get('tower_name')?.setValidators(Validators.required);
        this.propertyForm.get('block_name')?.clearValidators();
        this.propertyForm.get('block_name')?.reset();
      } else if (type === 'block') {
        this.propertyForm.get('block_name')?.setValidators(Validators.required);
        this.propertyForm.get('tower_name')?.clearValidators();
        this.propertyForm.get('tower_name')?.reset();
      }

      this.propertyForm.get('tower_name')?.updateValueAndValidity();
      this.propertyForm.get('block_name')?.updateValueAndValidity();
    });
  }

  closeModal() {
    this.Modal.close();
  }

  AddPropertybyAssociation() {
    this.submitBtn = false;

    if (this.propertyForm.invalid) {
      this.propertyForm.markAllAsTouched();
      this.submitBtn = true;
      return;
    }

    const type = this.propertyForm.value.maintenanceType;

    const payload = {
      property_no: this.propertyForm.value.propertyNo,
      building_type: this.propertyForm.value.building_type,
      area: this.propertyForm.value.area,
      facing: this.propertyForm.value.facing,
      property_type: this.propertyForm.value.propertyType,
      type: type,
      maintenance_amount: type === 'fixed' ? this.propertyForm.value.maintenanceAmount : 0,
      square_feet_price: type === 'square_feet' ? this.propertyForm.value.maintenancePerSqft : 0,
      due_date: this.propertyForm.value.dueDate,
      electricity_number: this.propertyForm.value.electricityNo,
      gasline_number: this.propertyForm.value.gaslineNo,
      parking_slot_number: this.propertyForm.value.parkingSlot,
      bhk: this.propertyForm.value.bhk,
      tower_name: this.propertyForm.value.tower_name,
      block_name: this.propertyForm.value.block_name,
      floor: this.propertyForm.value.floor,
    };

    this.apiService.AddPropertybyAssociation<any>(payload).subscribe({
      next: (res: any) => {
        this.submitBtn = true;
        if (res?.success) {
          this.AssociationService.triggerAdminAssociation(res);
          this.Toastr.success(res.message, 'Success');
          this.closeModal();
        } else {
          this.Toastr.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        this.submitBtn = true;
        this.Toastr.error(err.error?.error?.message || 'Failed', 'Error');
      },
    });
  }
}
