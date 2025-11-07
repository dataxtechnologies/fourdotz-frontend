import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-modal',
   imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './logout-modal.component.html',
  styleUrl: './logout-modal.component.css'
})
export class LogoutModalComponent {
showprocessingbtn = false

    constructor(private Modal:ModalService, private apiService: ApiserviceService, private Toast: ToastrService, 
      private AssociationService: AssociationServiceService, private Router :Router
    ){}


  closeModal(){
    this.Modal.close()
  }

  confirmlogout(){
    this.showprocessingbtn = true
this.apiService.logoutApi<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.clearSessionAndRedirect(
            res.message || 'Logged out successfully'
          );
          this.Toast.success(res.message);
          this.showprocessingbtn = false
          this.closeModal()
        } else {
          this.Toast.error(res.message || 'Logout failed', 'Failed');
          this.showprocessingbtn = false
          this.closeModal()
        }
      },
      error: (err: any) => {
        //console.error('Logout failed:', err);
        this.Toast.error(
          err?.error?.error?.message || 'Logout failed',
          'Failed'
        );
        this.showprocessingbtn = false
        this.closeModal()
        this.clearSessionAndRedirect();
      },
    });
  }

  private clearSessionAndRedirect(message: string = 'Session expired') {
    sessionStorage.clear();
    // this.Toast.info(message, 'Info');
    this.Router.navigateByUrl('/auth/sign-in');
  }
}
