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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
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
          this.Toast.success(res.message, 'Success');
          this.AssociationService.triggerAssociationOwner(res);
          this.closeModal();
        } else {
          this.submitbtn = true;
          this.Toast.warning(res.message, 'Warning');
          // this.loginbtn = true;
        }
      },
      error: (err: any) => {
        this.submitbtn = true;
        this.Toast.error(err.error.error.message, 'Failed');
        //console.error('Login failed:', err.error.error.data);
        // alert(err.message || 'Login failed, please try again.');
      },
    });
  }

  closeModal() {
    this.modal.close();
  }
}
