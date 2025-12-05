import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ModalService } from 'ngx-modal-ease';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';

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

    @ViewChild('hiddenDatePicker')
  hiddenDatePicker!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private apiService: ApiserviceService, private Modal : ModalService, private Toast: ToastrService, 
    private Association : AssociationServiceService
  ) {
    this.initForm();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['OwnerDetails'] && this.OwnerDetails) {
  //     this.patchOwnerData(this.OwnerDetails);
  //   }
  // }

  ngOnInit(): void {
    console.log('PropertyIddata', this.PropertyIddata);
    
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

    const payload = {
      name: this.ownerForm.value.firstName,
      last_name: this.ownerForm.value.lastName,
      id: this.PropertyIddata
    };

    this.apiService.UpdateOwnerDetails(payload).subscribe({
      next: (res: any) => {
        this.submitbtn = true;
        if (res?.success) {
          this.Toast.success(res?.message, 'Success');
          this.Association.triggerOwnerUpdate(res);
          this.closeModal();
        } else {
          this.Toast.warning(res?.message, 'Warning');
        }
      },
      error: (err) => {
        this.submitbtn = true;
        this.Toast.error(err?.error?.message, 'Error');
        //console.error('Error updating owner:', err);
       
      }
    });
  }

  closeModal() {
    this.Modal.close()
    //console.log('Modal closed');
  }


  
  openDatePicker(): void {
    this.hiddenDatePicker.nativeElement.showPicker();
  }

  // 👇 Handle date selection and format the date
  onDateSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.value) return;

    const selectedDate = new Date(input.value);
    const formattedDate = this.formatDate(selectedDate);

    this.ownerForm.get('ownedAt')?.setValue(formattedDate);
  }

  // 👇 Helper function to format as dd-MMM-yyyy (e.g. 22-Jun-2025)
  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
