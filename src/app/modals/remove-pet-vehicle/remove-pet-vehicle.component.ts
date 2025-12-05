import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-remove-pet-vehicle',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './remove-pet-vehicle.component.html',
  styleUrl: './remove-pet-vehicle.component.css',
})
export class RemovePetVehicleComponent {
  @Input() associationId: any;
  @Input() type: any;
  showprocessingbtn = false;

  confirmationText: string = '';
  requiredText: string = 'DELETE';

  constructor(
    private Modal: ModalService,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private AssociationService: AssociationServiceService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('associationId', this.associationId);
    
  }

  canDelete(): boolean {
    return this.confirmationText.trim().toUpperCase() === this.requiredText;
  }

  get headerTitle() {
    return this.type === 'pet'
      ? 'Remove Pet'
      : this.type === 'vehicle'
      ? 'Remove Vehicle'
      : 'Remove Tenant Resident';
  }

  get warningMessage() {
    if (this.type === 'pet') {
      return `Removing this pet will permanently delete its details
    from the property records, and it will no longer appear under
    the registered pet list.`;
    }

    if (this.type === 'vehicle') {
      return `Removing this vehicle will permanently delete its details
    from the property records, and it will no longer appear in the
    registered vehicle list.`;
    }

    // fallback for tenant delete
    return `This action cannot be undone. If you remove this tenant,
  the tenant’s access to the property will be permanently revoked,
  and they will no longer be able to view or manage any related property details.`;
  }

  get actionButtonText() {
    return this.type === 'pet'
      ? 'Yes, Remove Pet'
      : this.type === 'vehicle'
      ? 'Yes, Remove Vehicle'
      : 'Yes, Remove Tenant';
  }

  confirmDelete(data: any) {
    this.showprocessingbtn = true;

    if (!this.canDelete()) {
      this.showprocessingbtn = false;
      return;
    }



    let apiCall;

    // 🔥 Choose API based on type input
    if (this.type === 'vehicle') {
      apiCall = this.apiService.RemoveVehicle<any>(data);
    } else if (this.type === 'pet') {
      apiCall = this.apiService.RemovePet<any>(data);
    } else {
      this.Toast.error('Invalid delete type', 'Error');
      this.showprocessingbtn = false;
      return;
    }

    apiCall.subscribe({
      next: (res: any) => {
        this.showprocessingbtn = false;

        if (res?.success) {
          this.Toast.success(res.message, 'Success');

          // Trigger correct refresh event
          this.AssociationService.triggerRemoveResident(res);

          this.closeModal();
        } else {
          this.Toast.warning(res.message, 'Warning');
          this.closeModal();
        }
      },

      error: (err: any) => {
        this.showprocessingbtn = false;
        this.Toast.error(
          err.error?.error?.message || 'Something went wrong',
          'Failed'
        );
        this.closeModal();
      },
    });
  }

  closeModal() {
    this.Modal.close();
  }
}
