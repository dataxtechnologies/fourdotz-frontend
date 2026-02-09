import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { OwnerServiceService } from '../../services/owner/owner-service.service';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-edit-vehicle-data',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-vehicle-data.component.html',
  styleUrls: ['./edit-vehicle-data.component.css'],
})
export class EditVehicleDataComponent implements OnInit {
  @Input() vehicleDetails: any;
  @Input() associationId: any;

  vehicleForm!: FormGroup;
  submitbtn = true;

  /* 🔹 brand dropdown holder */
  brandList: any[] = [];

  /* 🔹 master brands */
  twoWheelerBrands = [
    { brand: 'Honda' }, { brand: 'Hero' }, { brand: 'Bajaj' },
    { brand: 'TVS' }, { brand: 'Royal Enfield' }, { brand: 'Suzuki' },
    { brand: 'Yamaha' }, { brand: 'KTM' }, { brand: 'Other' },
  ];

  fourWheelerBrands = [
    { brand: 'Maruti Suzuki' }, { brand: 'Hyundai' }, { brand: 'Tata' },
    { brand: 'Mahindra' }, { brand: 'Honda' }, { brand: 'Toyota' },
    { brand: 'Kia' }, { brand: 'Renault' }, { brand: 'Volkswagen' },
    { brand: 'Skoda' }, { brand: 'MG' }, { brand: 'Other' },
  ];

  constructor(
    private fb: FormBuilder,
    private Modal: ModalService,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private OwnerService: OwnerServiceService,
    private AssociationService: AssociationServiceService
  ) {}

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      vehicleType: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      vehicleNumber: [
        '',
        [Validators.required, Validators.pattern(/[A-Z]{2}\d{2}[A-Z]{2}\d{4}/)],
      ],
      ownedBy: ['', Validators.required],
    });

    this.patchVehicleData(this.vehicleDetails);
  }

  /* 🔹 patch + auto load brand list */
  patchVehicleData(data: any) {
    if (!data) return;

    this.vehicleForm.patchValue({
      vehicleType: data.type ?? '',
      brand: data.brand ?? '',
      model: data.modal ?? '',
      vehicleNumber: data.number ?? '',
      ownedBy: data.vehicle_owned_by ?? '',
    });

    // load correct brand dropdown
    this.onVehicleTypeChange();
  }

  /* 🔹 vehicle type change */
  onVehicleTypeChange() {
    const type = this.vehicleForm.get('vehicleType')?.value;

    if (type === '2 wheeler') {
      this.brandList = this.twoWheelerBrands;
    } 
    else if (type === '4 wheeler') {
      this.brandList = this.fourWheelerBrands;
    } 
    else {
      this.brandList = [];
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.vehicleForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  onVehicleNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    input.value = value;
    this.vehicleForm.get('vehicleNumber')?.setValue(value, { emitEvent: false });
  }

  EditVehicle() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }

    this.submitbtn = false;

    const payload = {
      id: this.associationId,
      vehicle: [
        {
          type: this.vehicleForm.value.vehicleType,
          brand: this.vehicleForm.value.brand,
          modal: this.vehicleForm.value.model,
          number: this.vehicleForm.value.vehicleNumber,
          vehicle_owned_by: this.vehicleForm.value.ownedBy.toLowerCase(),
        },
      ],
    };

    this.apiService.AddVehicle<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.submitbtn = true;
          this.Toast.success(res.message, 'Success');
          this.OwnerService.triggerVehicleAdd(res);
          this.AssociationService.triggervehicleAdd(res);
          this.closeModal();
        } else {
          this.submitbtn = true;
          this.Toast.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        this.submitbtn = true;
        this.Toast.error(err.error.error.message, 'Failed');
      },
    });
  }

  closeModal() {
    this.Modal.close();
  }
}
