import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ModalService } from 'ngx-modal-ease';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-edit-properties-data',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-properties-data.component.html',
  styleUrls: ['./edit-properties-data.component.css'],
})
export class EditPropertiesDataComponent implements OnInit {
  @Input() PropertyIddata: any;

  propertyForm!: FormGroup;
  PropertiesData: any;
  submitBtn: boolean = true;

  propertyTypes: string[] = [];

  // Days of month for dropdown
  days: string[] = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const suffix =
      day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th';
    return `${day}${suffix}`;
  });

  constructor(
    private apiService: ApiserviceService,
    private fb: FormBuilder,
    private Modal: ModalService,
    private AssociationService : AssociationServiceService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.PropertyIddata) {
      this.ViewpropertybyId(this.PropertyIddata);
    }
  }

  initializeForm() {
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
      bhk: [''],
      buildingType: [''],
      tower: [''],
      block: [''],
      floor: [''],
    });
  }

  ViewpropertybyId(id: any) {
    this.apiService.ViewpropertybyId<any>(id).subscribe({
      next: (res: any) => {
        if (res?.success && res?.data) {
          this.PropertiesData = res.data;

          // Handle property types from API
          const pt = res.data.property_types ?? res.data.propertyTypes ?? null;
          if (pt) {
            if (Array.isArray(pt)) {
              this.propertyTypes = pt;
            } else if (typeof pt === 'string') {
              const arr = pt
                .split(',')
                .map((x) => x.trim())
                .filter(Boolean);
              this.propertyTypes = arr.length ? arr : [pt];
            } else {
              this.propertyTypes = [];
            }
          }

          this.patchFormData(this.PropertiesData);
        } else {
          //console.warn('No property data found.');
        }
      },
      error: (err: any) => {
        //console.error('Error fetching property details:', err);
      },
    });
  }

  patchFormData(data: any) {
    // Normalize propertyType & facing
    // const selectedType = data.property_type
    //   ? data.property_type.charAt(0).toUpperCase() +
    //     data.property_type.slice(1).toLowerCase()
    //   : '';

    const selectedType = data.property_type ?? data.propertyType ?? '';
  const selectedDueDate = data.due_date ?? data.dueDate ?? '';

  if (selectedType && !this.propertyTypes.includes(selectedType)) {
    this.propertyTypes = [selectedType, ...this.propertyTypes];
  }
    const facing = data.facing
      ? data.facing.charAt(0).toUpperCase() + data.facing.slice(1).toLowerCase()
      : '';

    // Add to propertyTypes if not present
    if (selectedType && !this.propertyTypes.includes(selectedType)) {
      this.propertyTypes = [selectedType, ...this.propertyTypes];
    }

    // Format due date for dropdown


  // this.propertyForm.patchValue({
  //   propertyNo: data.property_no ?? '',
  //   area: data.area ?? '',
  //   facing: data.facing ?? '',
  //   electricityNo: data.electricity_number ?? '',
  //   parkingSlot: data.parking_slot_number ?? '',
  //   gaslineNo: data.gasline_number ?? '',
  //   maintenanceAmount: data.maintenance_amount ?? '',
  //   dueDate: selectedDueDate, // ✅ now will select correctly
  //   propertyType: selectedType,
  //   bhk: data.bhk ?? '',
  //   floor: data.floor ?? '',

    this.propertyForm.patchValue({
      propertyNo: data.property_no ?? '',
      area: data.area ?? '',
      facing: facing,
      electricityNo: data.electricity_number ?? '',
      parkingSlot: data.parking_slot_number ?? '',
      gaslineNo: data.gasline_number ?? '',
      maintenanceAmount: data.maintenance_amount ?? '',
      dueDate: selectedDueDate,
      propertyType: selectedType,
      bhk: data.bhk ?? '',
      buildingType: data.building_type ?? '',
      tower: data.tower ?? '',
      block: data.block ?? '',
      floor: data.floor ?? '',
    });
  }

  editPropertybyAssociation() {
    if (this.propertyForm.invalid) {
      this.propertyForm.markAllAsTouched();
      return;
    }

    this.submitBtn = false;

    const payload = {
      property_no: this.propertyForm.get('propertyNo')?.value,
      area: this.propertyForm.get('area')?.value,
      facing: this.propertyForm.get('facing')?.value,
      electricity_number: this.propertyForm.get('electricityNo')?.value,
      parking_slot_number: this.propertyForm.get('parkingSlot')?.value,
      gasline_number: this.propertyForm.get('gaslineNo')?.value,
      maintenance_amount: this.propertyForm.get('maintenanceAmount')?.value,
      due_date: this.propertyForm.get('dueDate')?.value,
      property_type: this.propertyForm.get('propertyType')?.value,
      bhk: this.propertyForm.get('bhk')?.value,
      buildingType: this.propertyForm.get('buildingType')?.value,
      tower: this.propertyForm.get('tower')?.value,
      block: this.propertyForm.get('block')?.value,
      floor: this.propertyForm.get('floor')?.value,

      // ...this.propertyForm.value,
      id: this.PropertiesData?._id,
    };

    this.apiService.UpdatePropertyData(payload).subscribe({
      next: (res: any) => {
        this.submitBtn = true;
        if (res?.success) {
          this.AssociationService.triggerAdminAssociation(res)
          this.closeModal();
        } else {
          //console.warn(res?.message || 'Something went wrong.');
        }
      },
      error: (err: any) => {
        this.submitBtn = true;
        //console.error('Error updating property:', err);
      },
    });
  }

  closeModal() {
    this.Modal.close();
    //console.log('Modal closed');
  }
}
