import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { AssociationServiceService } from '../../services/association/association-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-owner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.css'],
})
export class AddOwnerComponent implements OnInit {
  @Input() PropertyIddata: any;
  @ViewChild('hiddenDatePicker')
  hiddenDatePicker!: ElementRef<HTMLInputElement>;
  ownerForm!: FormGroup;
  submitbtn: boolean = true;

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService,
    private Toast: ToastrService
  ) {}

ngOnInit(): void {
  this.ownerForm = this.fb.group({
    firstName: ['', [
      Validators.required,
      Validators.pattern(/^[A-Za-z ]{2,}$/) // Only letters, min 2 chars
    ]],

    lastName: ['', [
      Validators.required,
      Validators.pattern(/^[A-Za-z ]{1,}$/)
    ]],

    email: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}$/)
      // ✅ ensures:
      // must contain @
      // minimum 2 letters after @
      // minimum 2 letters after .
    ]],

    phone: ['', [
      Validators.required,
      Validators.pattern(/^[6-9][0-9]{9}$/)
      // Starts 6-9
      // Exactly 10 digits
    ]],

    ownedAt: ['', Validators.required],
  });
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

  onSubmit(): void {
    this.submitbtn = false;
    if (this.ownerForm.invalid) {
      this.ownerForm.markAllAsTouched();
          this.submitbtn = true;
      return;
    }

    const payload = {
      name: this.ownerForm.get('firstName')?.value,
      last_name: this.ownerForm.get('lastName')?.value,
      email: this.ownerForm.get('email')?.value,
      mobile: this.ownerForm.get('phone')?.value,
      owner_owned_date: this.ownerForm.get('ownedAt')?.value,
      property_id: this.PropertyIddata,
    };

    //console.log('✅ Payload:', payload);
    this.apiService.createownerinproperty<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.submitbtn = true;
          this.Toast.success('Owner Added Successfully', 'Success');
          this.AssociationService.triggerAssociationOwner(res);
          this.closeModal();
        } else {
          this.submitbtn = true;
          this.Toast.warning('Owner Add Failed', 'Warning');
          // this.loginbtn = true;
        }
      },
      error: (err: any) => {
        this.submitbtn = true;
        this.Toast.error('Owner Add Failed', 'Error');
        //console.error('Login failed:', err.error.error.data);
        // alert(err.message || 'Login failed, please try again.');
      },
    });
  }

  closeModal() {
    this.modal.close();
  }
}
