import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AdmindataService } from '../../services/adminservice/admindata.service';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-delete-gate-modal',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './delete-gate-modal.component.html',
  styleUrl: './delete-gate-modal.component.css'
})
export class DeleteGateModalComponent {

  @Input() gate_id: any;
  showprocessingbtn = false;

  confirmationText: string = '';
  requiredText: string = 'DELETE';

  constructor(
    private Modal: ModalService,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private AssociationService: AssociationServiceService
  ) { }

  canDelete(): boolean {
    return this.confirmationText.trim().toUpperCase() === this.requiredText;
  }

  confirmDelete(payload: any) {
    this.showprocessingbtn = true;
    if (this.canDelete()) {
      this.apiService.DeleteGate(payload).subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.showprocessingbtn = false;
            this.Toast.success('Gate Deleted Successfully', 'Success');
            // this.OwnerService.triggerVehicleAdd(res);
            this.AssociationService.triggergatedelete(res);
            this.closeModal();
          } else {
            this.showprocessingbtn = false;
            this.Toast.warning('Gate Delete Failed', 'Warning');
            // this.loginbtn = true;
            this.closeModal();
          }
        },
        error: (err: any) => {
          this.showprocessingbtn = false;
          this.Toast.error(err.error.error.message, 'Failed');
          //console.error('Login failed:', err.error.error.data);
          this.closeModal();
          // alert(err.message || 'Login failed, please try again.');
        },
      });
      // this.closeModal();
    }
  }

  closeModal() {
    this.Modal.close();
  }

}
