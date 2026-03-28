import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';

// Custom validator: date must not be in the future
function noFutureDate(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const selected = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected > today ? { futureDate: true } : null;
}
@Component({
  selector: 'app-owner-approval-modal',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './owner-approval-modal.component.html',
  styleUrl: './owner-approval-modal.component.css'
})
export class OwnerApprovalModalComponent {
  @ViewChild('datePickerRef') datePickerRef!: ElementRef<HTMLInputElement>;

  ownerForm!: FormGroup;
  submitbtn = true;
  @Input() request_id: any;

  // max attribute for the native date input (today's date as YYYY-MM-DD)
  todayStr: string = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private toast: ToastrService,
    private associationService: AssociationServiceService
  ) { }

  ngOnInit(): void {
    this.ownerForm = this.fb.group({
   
      ownedDate: ['', [Validators.required, noFutureDate]],
    });
  }

  /** Programmatically open the hidden native date picker */
  openDatePicker(): void {
    this.datePickerRef.nativeElement.showPicker?.();
    this.datePickerRef.nativeElement.click();
  }

  /** When the user picks a date, format it as DD / MM / YYYY for display */
  onDateSelected(event: Event): void {
    const raw = (event.target as HTMLInputElement).value; // YYYY-MM-DD
    if (!raw) return;

    const [year, month, day] = raw.split('-');
    const displayValue = `${day} / ${month} / ${year}`;

    this.ownerForm.get('ownedDate')?.setValue(raw);        // store raw for validation
    this.ownerForm.get('ownedDate')?.markAsTouched();

    // update the visible input's displayed text
    const displayInput = this.datePickerRef.nativeElement
      .previousElementSibling as HTMLInputElement;
    if (displayInput) displayInput.value = displayValue;
  }

  onSubmit(): void {
    if (this.ownerForm.invalid) {
      this.ownerForm.markAllAsTouched();
      return;
    }

    this.submitbtn = false;

    const payload = {
      id: this.request_id,
      approval_status: true,
      owned_date: this.ownerForm.get('ownedDate')?.value
    };

    this.apiService.CreateServiceAdmin<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.toast.success(res.message, 'Success');
          this.associationService.triggerCreateAdmin(res);
          this.submitbtn = true;
          this.closeModal();
        } else {
          this.toast.warning(res.message, 'Warning');
          this.submitbtn = true;
        }
      },
      error: (err) => {
        this.toast.error(err.error?.error?.message || 'Something went wrong', 'Failed');
        this.submitbtn = true;
      }
    });
  }

  closeModal(): void {
    this.modal.close();
  }
}
