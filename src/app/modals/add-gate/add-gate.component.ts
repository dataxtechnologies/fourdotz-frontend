import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from 'ngx-modal-ease';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-add-gate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-gate.component.html',
  styleUrls: ['./add-gate.component.css']
})
export class AddGateComponent implements OnInit {

  @Input() associationId: any;

  gateForm!: FormGroup;
  submitbtn = true;

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private AssociationService: AssociationServiceService
  ) {}

  ngOnInit(): void {
    this.gateForm = this.fb.group({
      gateName: ['', Validators.required]
    });
  }

  addGate() {
    this.submitbtn = false;

    if (this.gateForm.invalid) {
      this.submitbtn = true;
      this.gateForm.markAllAsTouched();
      return;
    }

    const payload = {
      // associationId: this.associationId,

        gate: this.gateForm.value.gateName

    };

    this.apiService.CreateGate(payload).subscribe({
      next: (res: any) => {
        
        if (res?.success) {
          this.AssociationService.triggerGateCreate(res.data);
          this.Toast.success(res.message, 'Success');
          this.submitbtn = true;
          this.closeModal();
        } else {
          this.submitbtn = true;
          this.Toast.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        this.submitbtn = true;
        this.Toast.error(err?.error?.message || 'Failed to add gate', 'Error');
      }
    });
  }

  isInvalid(controlName: string) {
    const control = this.gateForm.get(controlName);
    return control?.invalid && control.touched;
  }

  closeModal() {
    this.modal.close();
  }
}