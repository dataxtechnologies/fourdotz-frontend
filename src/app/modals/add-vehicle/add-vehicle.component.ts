import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { OwnerServiceService } from '../../services/owner/owner-service.service';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
})
export class AddVehicleComponent implements OnInit {
  @Input() associationId: any;

  vehicleForm!: FormGroup;
  submitbtn = true;

  /* 🔹 BRAND LIST HOLDER (for dropdown binding) */
  brandList: any[] = [];

  /* 🔹 BRAND MASTER DATA */
  twoWheelerBrands = [
    { brand: 'Honda' },
    { brand: 'Hero' },
    { brand: 'Bajaj' },
    { brand: 'TVS' },
    { brand: 'Royal Enfield' },
    { brand: 'Suzuki' },
    { brand: 'Yamaha' },
    { brand: 'KTM' },
    { brand: 'other' },
  ];

  fourWheelerBrands = [
    { brand: 'Maruti Suzuki' },
    { brand: 'Hyundai' },
    { brand: 'Tata' },
    { brand: 'Mahindra' },
    { brand: 'Honda' },
    { brand: 'Toyota' },
    { brand: 'Kia' },
    { brand: 'Renault' },
    { brand: 'Volkswagen' },
    { brand: 'Skoda' },
    { brand: 'MG' },
    { brand: 'other' },
  ];

  otherBrands = [
    { brand: 'Ashok Leyland' },
    { brand: 'Tata' },
    { brand: 'Mahindra' },
    { brand: 'other' },
  ];

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private OwnerService: OwnerServiceService,
    private AssociationService: AssociationServiceService
  ) { }

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      vehicleType: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      vehicleNumber: [
        '',
        [
          Validators.required
        ],
      ],
      ownedBy: ['', Validators.required],
    });
  }

  /* 🔹 VEHICLE TYPE CHANGE HANDLER (NEW) */
  onVehicleTypeChange() {
    const type = this.vehicleForm.get('vehicleType')?.value;

    if (type === '2 Wheeler') {
      this.brandList = this.twoWheelerBrands;
    }
    else if (type === '4 Wheeler') {
      this.brandList = this.fourWheelerBrands;
    }
    else {
      this.brandList = this.otherBrands;
    }

    // reset brand when type changes
    this.vehicleForm.patchValue({ brand: '' });
  }

  addVehicle() {
    this.submitbtn = false;
    if (this.vehicleForm.invalid) {
      this.submitbtn = true;
      this.vehicleForm.markAllAsTouched();
      return;
    }

    const payload = {
      id: this.associationId,
      vehicle: [
        {
          type: this.vehicleForm.value.vehicleType.toLowerCase(),
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
          this.Toast.success('Vehicle Added Successfully', 'Success');
          this.OwnerService.triggerVehicleAdd(res);
          this.AssociationService.triggervehicleAdd(res);
          this.closeModal();
        } else {
          this.submitbtn = true;
          this.Toast.warning('Vehicle Add Failed', 'Warning');
        }
      },
      error: (err: any) => {
        this.submitbtn = true;
        this.Toast.error(err.error.error.message, 'Failed');
      },
    });
  }

  isInvalid(controlName: string) {
    const control = this.vehicleForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  closeModal() {
    this.modal.close();
  }

  // Optional: restrict input dynamically while typing
  onVehicleNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');

    input.value = value;
    this.vehicleForm.get('vehicleNumber')?.setValue(value, { emitEvent: false });
  }
}
