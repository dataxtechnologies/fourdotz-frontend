import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-edit-owner-data',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-owner-data.component.html',
  styleUrls: ['./edit-owner-data.component.css']
})
export class EditOwnerDataComponent implements OnInit {

  @Input() OwnerDetails: any;
  @Input() PropertyIddata: any;

  ownerForm!: FormGroup;
  submitbtn = true;

  constructor(private fb: FormBuilder, private apiService: ApiserviceService, private Modal : ModalService) {
    this.initForm();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['OwnerDetails'] && this.OwnerDetails) {
  //     this.patchOwnerData(this.OwnerDetails);
  //   }
  // }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
      this.patchOwnerData(this.OwnerDetails)
  }

  initForm() {
    this.ownerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      ownedAt: ['', Validators.required],
    });
  }

  patchOwnerData(data: any) {
    const ownedDate = data?.onboarded_time?.$date
      ? new Date(data.onboarded_time.$date).toISOString().split('T')[0]
      : '';

    this.ownerForm.patchValue({
      firstName: data.name ?? '',
      lastName: data.last_name ?? '',
      email: data.email ?? '',
      phone: data.mobile?.toString() ?? '',
      ownedAt: ownedDate
    });
  }

  onSubmit() {
    if (this.ownerForm.invalid) {
      this.ownerForm.markAllAsTouched();
      return;
    }

    this.submitbtn = false;

    // const payload = {
    //   property_id: this.PropertyIddata,
    //   owner_id: this.OwnerDetails?._id,
    //   ...this.ownerForm.value
    // };

    // this.apiService.EditOwner(payload).subscribe({
    //   next: (res: any) => {
    //     this.submitbtn = true;
    //     if (res?.success) {
    //       alert('✅ Owner details updated successfully!');
    //       this.closeModal();
    //     } else {
    //       alert(res?.message || 'Something went wrong.');
    //     }
    //   },
    //   error: (err) => {
    //     this.submitbtn = true;
    //     //console.error('Error updating owner:', err);
    //     alert('❌ Failed to update owner details.');
    //   }
    // });
  }

  closeModal() {
    this.Modal.close()
    //console.log('Modal closed');
  }
}
