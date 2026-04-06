import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';
import { AdmindataService } from '../../services/adminservice/admindata.service';

@Component({
  selector: 'app-deactive-modal',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './deactive-modal.component.html',
  styleUrl: './deactive-modal.component.css'
})
export class DeactiveModalComponent {

  @Input() associationID: any;

showprocessingbtn = false;

  confirmationText: string = '';
  requiredText: string = 'DEACTIVE';

  constructor(
    private Modal: ModalService,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private AdmindataService: AdmindataService
  ) {}

  canDelete(): boolean {
    return this.confirmationText.trim().toUpperCase() === this.requiredText;
  }

  confirmDelete(data : any) {

    const payload = {
      id: data,
      active_status: false,
    }
    this.showprocessingbtn = true;
    if (this.canDelete()) {
      this.apiService.deactiveassociation(payload).subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.showprocessingbtn = false;
            this.Toast.success('Association Deactivated Successfully', 'Success');
            // this.OwnerService.triggerVehicleAdd(res);
            this.AdmindataService.triggerAdminDeactiveAssociation(res);
            this.closeModal();
          } else {
            this.showprocessingbtn = false;
            this.Toast.warning('Association Deactivated Failed', 'Warning');
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
