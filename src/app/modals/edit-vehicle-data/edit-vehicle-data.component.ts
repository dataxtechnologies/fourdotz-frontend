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
  @Input() vehicleDetails: any; // Full property object containing vehicles
  @Input() associationId: any; // Full property object containing vehicles
  vehicleForm!: FormGroup;
  submitbtn = true;

  constructor(private fb: FormBuilder, private Modal: ModalService, private apiService: ApiserviceService, private Toast: ToastrService,
    private OwnerService: OwnerServiceService, private AssociationService: AssociationServiceService
  ) {}

  ngOnInit(): void {
    console.log('vehicleDetails', this.vehicleDetails);
 this.vehicleForm = this.fb.group({
      vehicleType: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      vehicleNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}/),
        ],
      ],
      ownedBy: ['', Validators.required],
    });
    this.patchVehicleData(this.vehicleDetails);
  }


patchVehicleData(data: any) {
  if (!data) return;

  this.vehicleForm.patchValue({
    vehicleType: data.type ?? '',
    brand: data.brand ?? '',
    model: data.modal ?? '',
    vehicleNumber: data.number ?? '',
    ownedBy: data.vehicle_owned_by
      ? data.vehicle_owned_by.charAt(0).toUpperCase() + data.vehicle_owned_by.slice(1)
      : '',
  });
}

  isInvalid(controlName: string): boolean {
    const control = this.vehicleForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  onVehicleNumberInput(event: KeyboardEvent) {
    // Allow only letters, numbers, and dashes
    const pattern = /[A-Z0-9-]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  EditVehicle() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }

    this.submitbtn = false;

   const payload = {
      id: this.associationId, // assuming this is the unique ID
      vehicle: [
        {
          type: this.vehicleForm.value.vehicleType,
          brand: this.vehicleForm.value.brand,
          modal: this.vehicleForm.value.model,
          number: this.vehicleForm.value.vehicleNumber,
          vehicle_owned_by: this.vehicleForm.value.ownedBy.toLowerCase(), // tenant/owner in lowercase
        },
      ],
    };

    this.apiService.AddVehicle<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.submitbtn = true;
          this.Toast.success(res.message, 'Success')
          this.OwnerService.triggerVehicleAdd(res);
          this.AssociationService.triggervehicleAdd(res);
          this.closeModal();
        } else {
          this.submitbtn = true;
           this.Toast.warning(res.message, 'Warning')
          // this.loginbtn = true;
        }
      },
      error: (err: any) => {
        this.submitbtn = true;
         this.Toast.error(err.error.error.message, 'Failed')
        console.error('Login failed:', err.error.error.data);
        // alert(err.message || 'Login failed, please try again.');
      },
    });
  }

  closeModal() {
    this.Modal.close()
    console.log('Modal closed');
  }
}
