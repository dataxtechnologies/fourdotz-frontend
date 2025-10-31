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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-property',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export class AddPropertyComponent {
  propertyForm!: FormGroup;
  submitBtn : boolean = true
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

  // days = Array.from({ length: 31 }, (_, i) => this.getOrdinal(i + 1));

getOrdinal(day: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
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
      maintenanceAmount: ['', Validators.required],
      dueDate: ['', Validators.required],
      propertyType: ['', Validators.required],
      bhk: ['', Validators.required],
      buildingType: [''],
      tower: [''],
      block: [''],
      floor: [''],
    });

    // 🔹 Get userdata from sessionStorage
    const userdata = JSON.parse(sessionStorage.getItem('userdata') || '{}');

    if (userdata?.property_type && userdata.property_type.length > 0) {
      // Capitalize the first letter for display
      this.propertyTypes = userdata.property_type.map(
        (p: string) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
      );

      // 🔹 If only one property type, auto-select and apply validators
      if (this.propertyTypes.length === 1) {
        const selectedType = this.propertyTypes[0];
        this.propertyForm.get('propertyType')?.setValue(selectedType);

        if (selectedType === 'Villa' || selectedType === 'Townhouse') {
          this.propertyForm.get('bhk')?.setValidators([Validators.required]);
        } else if (selectedType === 'Apartment') {
          this.propertyForm.get('buildingType')?.setValidators([Validators.required]);
          this.propertyForm.get('bhk')?.setValidators([Validators.required]);
          this.propertyForm.get('floor')?.setValidators([Validators.required]);
        }

        this.propertyForm.updateValueAndValidity();
      }
    }

    // 🔹 Handle conditional validators for property type
    this.propertyForm.get('propertyType')?.valueChanges.subscribe((type) => {
      // Reset field validators first
      this.propertyForm.get('bhk')?.clearValidators();
      this.propertyForm.get('buildingType')?.clearValidators();
      this.propertyForm.get('floor')?.clearValidators();

      if (type === 'Apartment') {
        this.propertyForm.get('buildingType')?.setValidators(Validators.required);
        this.propertyForm.get('bhk')?.setValidators(Validators.required);
        this.propertyForm.get('floor')?.setValidators(Validators.required);
      } else if (type === 'Villa' || type === 'Townhouse') {
        this.propertyForm.get('bhk')?.setValidators(Validators.required);
      }

      this.propertyForm.get('bhk')?.updateValueAndValidity();
      this.propertyForm.get('buildingType')?.updateValueAndValidity();
      this.propertyForm.get('floor')?.updateValueAndValidity();
    });

    // 🔹 Handle conditional validators for building type
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
    this.submitBtn  = false
    if (this.propertyForm.valid) {
      //console.log(this.propertyForm.value);
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
            this.submitBtn  = true
            this.AssociationService.triggerAdminAssociation(res)
            this.Toastr.success(res.message, 'Success')
            this.closeModal()
          } else {
            this.submitBtn  = true
            this.Toastr.warning(res.message, 'Warning')
            // this.loginbtn = true;
          }
        },
        error: (err: any) => {
          this.submitBtn  = true
          this.Toastr.error(err.error.error.message, 'Failed')
          //console.error('Login failed:', err.error.error.data);
          // alert(err.message || 'Login failed, please try again.');
        },
      });
    } else {
      this.propertyForm.markAllAsTouched();
    }
  }
}
