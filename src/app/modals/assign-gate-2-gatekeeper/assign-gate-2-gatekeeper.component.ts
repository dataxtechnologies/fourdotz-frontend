import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-assign-gate-2-gatekeeper',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './assign-gate-2-gatekeeper.component.html',
  styleUrls: ['./assign-gate-2-gatekeeper.component.css'],
})
export class AssignGate2GatekeeperComponent implements OnInit {
  @Input() gateKeeperdata: any;
  @Input() actionD: any;

  assignForm!: FormGroup;
  selectedGateName = '';
  Gatelist2: any;

  showprocessingbtn = false;

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private AssociationService : AssociationServiceService
  ) {}

  ngOnInit(): void {
    this.assignForm = this.fb.group({
      gateId: ['', Validators.required],
      confirmText: ['', [Validators.required, Validators.pattern(/^CONFIRM$/)]],
    });

    this.listGate();
  }

  updateGateName() {
    const gateId = this.assignForm.get('gateId')?.value;
    const gate = this.Gatelist2.find((g:any ) => g._id == gateId);
    this.selectedGateName = gate ? gate.gate : '';
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
      gatekeeper_id: this.gateKeeperdata._id,
      gate : this.selectedGateName
    };

    console.log('payload', payload);
    

    this.apiService.AssignGateKeeper(payload).subscribe({
      next: (res: any) => {
        
        if (res?.success) {
          this.showprocessingbtn = false;
          this.AssociationService.triggerGatekeeperAssigned(res.data);
          this.Toast.success(res.message, 'Success');
          this.closeModal();
        } else {
          this.showprocessingbtn = false;
          this.Toast.warning(res.message, 'Warning');
        }
      },

      error: (err: any) => {
        this.showprocessingbtn = false;
        this.Toast.error(err?.error?.message || 'Assignment failed', 'Error');
      }
    });
  }

  UnassignGateKeeper() {

    this.showprocessingbtn = true;


    const  gatekeeper_id= this.gateKeeperdata._id;


    

    this.apiService.UnassignGateKeeper(gatekeeper_id).subscribe({
      next: (res: any) => {
        
        if (res?.success) {
          this.showprocessingbtn = false;
          this.AssociationService.triggerGatekeeperAssigned(res.data);
          this.Toast.success(res.message, 'Success');
          this.closeModal();
        } else {
          this.showprocessingbtn = false;
          this.Toast.warning(res.message, 'Warning');
        }
      },

      error: (err: any) => {
        this.showprocessingbtn = false;
        this.Toast.error(err?.error?.message || 'Assignment failed', 'Error');
      }
    });
  }

  listGate() {
    this.apiService.listGate<any>().subscribe({
      next: (res) => {
        if (res?.success) {
          this.Gatelist2 = res.data;
        } else {
          this.Gatelist2 = [];
        }
      },
      error: (err) => {
        console.log('err', err.error.message);
        this.Gatelist2 = [];
        console.log('err', err);
      },
    });
  }

  closeModal() {
    this.modal.close();
  }
}
