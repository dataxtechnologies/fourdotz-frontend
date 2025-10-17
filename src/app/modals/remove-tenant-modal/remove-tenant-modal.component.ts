import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-remove-tenant-modal',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './remove-tenant-modal.component.html',
  styleUrl: './remove-tenant-modal.component.css'
})
export class RemoveTenantModalComponent {
@Input() associationId: any
showprocessingbtn= false


  confirmationText: string = '';
  requiredText: string = 'DELETE';
 
  constructor(private Modal:ModalService, private apiService: ApiserviceService, private Toast: ToastrService, 
    private AssociationService: AssociationServiceService
  ){}


  canDelete(): boolean {
    return this.confirmationText.trim().toUpperCase() === this.requiredText;
  }

  confirmDelete(payload : any) {
    this.showprocessingbtn = true
    if (this.canDelete()) {
      this.apiService.RemoveTenantResident<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.showprocessingbtn = false
          this.Toast.success(res.message, 'Success')
          // this.OwnerService.triggerVehicleAdd(res);
          this.AssociationService.triggerRemoveResident(res);
          this.closeModal();
        } else {
          this.showprocessingbtn = false
           this.Toast.warning(res.message, 'Warning')
          // this.loginbtn = true;
          this.closeModal();
        }
      },
      error: (err: any) => {
        this.showprocessingbtn = false
         this.Toast.error(err.error.error.message, 'Failed')
        console.error('Login failed:', err.error.error.data);
        this.closeModal();
        // alert(err.message || 'Login failed, please try again.');
      },
    });
      // this.closeModal();
    }
  }

  closeModal(){
    this.Modal.close()
  }
}
