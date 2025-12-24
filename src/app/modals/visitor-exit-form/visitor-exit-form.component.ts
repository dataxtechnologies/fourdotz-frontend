import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from 'ngx-modal-ease';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-visitor-exit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './visitor-exit-form.component.html',
  styleUrl: './visitor-exit-form.component.css',
})
export class VisitorExitFormComponent implements OnInit {
  // 👇 Visitor unique number comes from parent
  @Input() visitorNo!: string;

  exitForm!: FormGroup;
  submitbtn = true;

  gateList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private toast: ToastrService,
    private AssociationService: AssociationServiceService,
  ) {}

  ngOnInit(): void {
    this.exitForm = this.fb.group({
      visitor_no: [
        { value: this.visitorNo, disabled: true },
        Validators.required,
      ],
      exit_gate_id: ['', Validators.required],
    });

    this.listGate();
  }

  // ---------------- GATE LIST ----------------
  listGate() {
    this.apiService.listGate<any>().subscribe({
      next: (res: any) => {
        this.gateList = res?.success ? res.data : [];
      },
      error: () => {
        this.gateList = [];
      },
    });
  }

  // ---------------- SUBMIT ----------------
  submitExit() {
    if (this.exitForm.invalid) {
      this.exitForm.markAllAsTouched();
      return;
    }

    this.submitbtn = false;

    const gateId = this.exitForm.value.exit_gate_id;

    const gateData = this.gateList.find((g: any) => g._id === gateId);

    if (!gateData) {
      this.toast.error('Invalid gate selected');
      this.submitbtn = true;
      return;
    }

    const payload = {
      visitor_no: this.visitorNo,
      gate: gateData.gate,
      exit_gate_id: gateData._id,
    };

    this.apiService.VisitorExit<any>(payload).subscribe({
      next: (res: any) => {
        this.submitbtn = true;
        if (res?.success) {
          this.AssociationService.triggerGatekeeperAdded(res);
          this.toast.success(res.message, 'Success');
          this.closeModal();
        } else {
          this.toast.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        this.submitbtn = true;
        this.toast.error(err?.error?.message || 'Exit failed', 'Error');
      },
    });
  }

  // ---------------- HELPERS ----------------
  isInvalid(controlName: string) {
    const control = this.exitForm.get(controlName);
    return control?.invalid && control.touched;
  }

  closeModal() {
    this.modal.close();
  }
}
