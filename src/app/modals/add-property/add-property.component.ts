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
  buildingTypes: string[] = ['Tower', 'Block'];
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
      bhk: ['', Validators.required],
      buildingType: [''],
      tower: [''],
      block: [''],
      floor: [''],
    });

    // 🔹 Handle maintenance type switch
    this.propertyForm.get('maintenanceType')?.valueChanges.subscribe((type) => {
      if (type === 'fixed') {
        this.propertyForm
          .get('maintenanceAmount')
          ?.setValidators([Validators.required]);
        this.propertyForm.get('maintenancePerSqft')?.clearValidators();
        this.propertyForm.get('maintenancePerSqft')?.reset();
      } else if (type === 'square_feet') {
        this.propertyForm
          .get('maintenancePerSqft')
          ?.setValidators([Validators.required]);
        this.propertyForm.get('maintenanceAmount')?.clearValidators();
        this.propertyForm.get('maintenanceAmount')?.reset();
      } else {
        this.propertyForm.get('maintenanceAmount')?.clearValidators();
        this.propertyForm.get('maintenancePerSqft')?.clearValidators();
      }

      this.propertyForm.get('maintenanceAmount')?.updateValueAndValidity();
      this.propertyForm.get('maintenancePerSqft')?.updateValueAndValidity();
    });

    // 🔹 Get userdata from localStorage
    const userdata = JSON.parse(localStorage.getItem('userdata') || '{}');
    if (userdata?.property_type && userdata.property_type.length > 0) {
      this.propertyTypes = userdata.property_type.map(
        (p: string) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
      );

      // Auto-select if only one property type
      if (this.propertyTypes.length === 1) {
        const selectedType = this.propertyTypes[0];
        this.propertyForm.get('propertyType')?.setValue(selectedType);

        if (selectedType === 'Villa' || selectedType === 'Townhouse') {
          this.propertyForm.get('bhk')?.setValidators([Validators.required]);
        } else if (selectedType === 'Apartment') {
          this.propertyForm
            .get('buildingType')
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
      this.propertyForm.get('buildingType')?.clearValidators();
      this.propertyForm.get('floor')?.clearValidators();

      if (type === 'Apartment') {
        this.propertyForm
          .get('buildingType')
          ?.setValidators(Validators.required);
        this.propertyForm.get('bhk')?.setValidators(Validators.required);
        this.propertyForm.get('floor')?.setValidators(Validators.required);
      } else if (type === 'Villa' || type === 'Townhouse') {
        this.propertyForm.get('bhk')?.setValidators(Validators.required);
      }

      this.propertyForm.get('bhk')?.updateValueAndValidity();
      this.propertyForm.get('buildingType')?.updateValueAndValidity();
      this.propertyForm.get('floor')?.updateValueAndValidity();
    });

    // 🔹 Conditional validators for building type
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
    this.submitBtn = false;

    if (this.propertyForm.valid) {
      const type = this.propertyForm.get('maintenanceType')?.value;
      const maintenance_amount =
        type === 'fixed'
          ? this.propertyForm.get('maintenanceAmount')?.value
          : 0;
      const square_feet_price =
        type === 'square_feet'
          ? this.propertyForm.get('maintenancePerSqft')?.value
          : 0;

      const payload = {
        property_no: this.propertyForm.get('propertyNo')?.value,
        area: this.propertyForm.get('area')?.value,
        facing: this.propertyForm.get('facing')?.value,
        property_type: this.propertyForm.get('propertyType')?.value,
        type: type,
        maintenance_amount: maintenance_amount,
        square_feet_price: square_feet_price,
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
    } else {
      this.submitBtn = true;
      this.propertyForm.markAllAsTouched();
    }
  }
}
