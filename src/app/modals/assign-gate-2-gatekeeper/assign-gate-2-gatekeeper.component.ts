import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign-gate-2-gatekeeper',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './assign-gate-2-gatekeeper.component.html',
  styleUrls: ['./assign-gate-2-gatekeeper.component.css']
})
export class AssignGate2GatekeeperComponent implements OnInit {

  @Input() gateKeeperId!: string;
  @Input() gateKeeperName: string = 'Naveen';
  @Input() gateList: any[] = [
   { id: '1',
    name: 'Gate 1'},
    { id: '2',
      name: 'Gate 2'},
      { id: '3',
        name: 'Gate 3'},
        { id: '4',
          name: 'Gate 4'},
          { id: '5',
            name: 'Gate 5'},
  ];

  assignForm!: FormGroup;
  selectedGateName = '';

  showprocessingbtn = false;

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private Toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.assignForm = this.fb.group({
      gateId: ['', Validators.required],
      confirmText: [
        '',
        [Validators.required, Validators.pattern(/^CONFIRM$/)]
      ]
    });
  }

  updateGateName() {
    const gateId = this.assignForm.get('gateId')?.value;
    const gate = this.gateList.find(g => g.id == gateId);
    this.selectedGateName = gate ? gate.name : '';
  }

  isInvalid(control: string) {
    const c = this.assignForm.get(control);
    return c && c.invalid && c.touched;
  }

  assignGate() {
    if (this.assignForm.invalid) {
      this.assignForm.markAllAsTouched();
      return;
    }

    this.showprocessingbtn = true;

    const payload = {
      gate_id: this.assignForm.value.gateId,
      gatekeeper_id: this.gateKeeperId
    };

    // this.apiService.assignGateToGatekeeper(payload).subscribe({
    //   next: (res: any) => {
    //     this.showprocessingbtn = false;

    //     if (res?.success) {
    //       this.Toast.success('Gate successfully assigned!', 'Success');
    //       this.closeModal();
    //     } else {
    //       this.Toast.warning(res.message, 'Warning');
    //     }
    //   },

    //   error: (err: any) => {
    //     this.showprocessingbtn = false;
    //     this.Toast.error(err?.error?.message || 'Assignment failed', 'Error');
    //   }
    // });
  }

  closeModal() {
    this.modal.close();
  }
}
