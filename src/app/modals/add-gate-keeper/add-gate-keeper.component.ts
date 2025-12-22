import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-gate-keeper',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-gate-keeper.component.html',
  styleUrls: ['./add-gate-keeper.component.css']
})
export class AddGateKeeperComponent implements OnInit {
  
  @Input() associationId: any;

  gatekeeperForm!: FormGroup;
  submitbtn = true;

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private Toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.gatekeeperForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/)   // Starts 6-9 & 10 digits
        ]
      ]
    });
  }

  addGateKeeper() {
    this.submitbtn = false;

    if (this.gatekeeperForm.invalid) {
      this.submitbtn = true;
      this.gatekeeperForm.markAllAsTouched();
      return;
    }

    const payload = {
      associationId: this.associationId,
      gatekeeper: {
        name: this.gatekeeperForm.value.name,
        email: this.gatekeeperForm.value.email,
        phone: this.gatekeeperForm.value.phone
      }
    };

    // this.apiService.AddGateKeeper(payload).subscribe({
    //   next: (res: any) => {
    //     this.submitbtn = true;
    //     if (res?.success) {
    //       this.Toast.success(res.message, 'Success');
    //       this.closeModal();
    //     } else {
    //       this.Toast.warning(res.message, 'Warning');
    //     }
    //   },
    //   error: (err: any) => {
    //     this.submitbtn = true;
    //     this.Toast.error(err?.error?.message || 'Failed to add Gate Keeper', 'Error');
    //   }
    // });
  }

  isInvalid(controlName: string) {
    const control = this.gatekeeperForm.get(controlName);
    return control?.invalid && control.touched;
  }

  closeModal() {
    this.modal.close();
  }

  // Phone input restriction
  restrictPhoneInput(event: KeyboardEvent) {
    const allowed = '0123456789';
    if (!allowed.includes(event.key)) {
      event.preventDefault();
    }
  }
}