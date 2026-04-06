import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-update-ticket-status',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-ticket-status.component.html',
  styleUrl: './update-ticket-status.component.css'
})
export class UpdateTicketStatusComponent {
 @Input() requestdata: any;
  form!: FormGroup;
  attachedFiles: File[] = [];
  isDragging: boolean = false;
  submitbtnloading = false;
  private statusLabels: Record<string, string> = {
    approved: 'Approved',
    completed: 'Completed / Transferred',
    rejected: 'Rejected',
  };

  constructor(private fb: FormBuilder, private Modal: ModalService, private apiService: ApiserviceService, private Toast: ToastrService, private Association : AssociationServiceService) {
    this.form = this.fb.group({
      status: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
     
    });
  }

  get f() {
    return this.form.controls;
  }

  getStatusLabel(value: string): string {
    return this.statusLabels[value] ?? value;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
      console.log('requestdata', this.requestdata);
      
  }



  // ---- SUBMIT ----
  onSubmit(): void {
    this.submitbtnloading = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.submitbtnloading = false;
      return;
    }

    const payload = {
      status: this.form.value.status,
      description: this.form.value.description,
      id: this.requestdata._id
    }
 
    


    this.apiService.UpdateTicketData<any>(payload).subscribe({
       next: (res: any) => {
        if (res?.success) {
          this.submitbtnloading = false;
          this.Toast.success('Ticket Updated Successfully', 'Success');
          this.Association.triggerPayoutRequestCreate(res);
          this.close();
        }else{
          this.submitbtnloading = false;
          this.Toast.warning('Ticket Update Failed', 'Warning');
          this.close();
        }
        // this.close();
      },
      error: (err : any) => {
        this.submitbtnloading = false;
        this.Toast.error(err?.error.error?.message, 'Error');
        this.close();
      }
    });
  }

  onCancel(): void {
    this.form.reset();
    this.attachedFiles = [];
    this.close();
  }

  close() {
    this.Modal.close();
  }
}