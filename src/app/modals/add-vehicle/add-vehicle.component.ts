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
  submitbtn = true

  constructor(private fb: FormBuilder, private modal: ModalService, private apiService: ApiserviceService, private Toast: ToastrService,
    private OwnerService : OwnerServiceService, private AssociationService: AssociationServiceService
  ) {}

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      vehicleType: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      vehicleNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/)
        ],
      ],
      ownedBy: ['', Validators.required],
    });
  }

  addVehicle() {
    this.submitbtn = false
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }

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
          this.submitbtn = true
          this.Toast.success(res.message, 'Success')
          this.OwnerService.triggerVehicleAdd(res);
          this.AssociationService.triggervehicleAdd(res);
          this.closeModal();
        } else {
          this.submitbtn = true
           this.Toast.warning(res.message, 'Warning')
          // this.loginbtn = true;
        }
      },
      error: (err: any) => {
        this.submitbtn = true
         this.Toast.error(err.error.error.message, 'Failed')
        //console.error('Login failed:', err.error.error.data);
        // alert(err.message || 'Login failed, please try again.');
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
  onVehicleNumberInput(event: KeyboardEvent) {
    const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';
    const key = event.key.toUpperCase();

    // Allow backspace, delete, arrows
    if (
      ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(
        key
      )
    ) {
      return;
    }

    if (!allowedChars.includes(key)) {
      event.preventDefault();
    }
  }
}
