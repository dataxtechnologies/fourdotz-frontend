import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';
import { OwnerServiceService } from '../../services/owner/owner-service.service';

@Component({
  selector: 'app-tenant-approval-modal',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tenant-approval-modal.component.html',
  styleUrl: './tenant-approval-modal.component.css'
})
export class TenantApprovalModalComponent implements OnInit {

  @ViewChild('hiddenDatePicker') hiddenDatePicker!: ElementRef<HTMLInputElement>;

  tenantForm!: FormGroup;
  submitbtn = true;

  @Input() request_id: any;

  days = Array.from({ length: 28 }, (_, i) => this.getOrdinal(i + 1));

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private toast: ToastrService,
    private OwnerServiceService: OwnerServiceService
  ) { }

  ngOnInit(): void {
    this.tenantForm = this.fb.group({
      rentedAt: ['', Validators.required],
      advancePaid: ['', [Validators.required, Validators.min(1)]],
      estimatedRent: ['', [Validators.required, Validators.min(1)]],
      monthly_rent_due_date: ['', Validators.required],
      maintenancePaidBy: ['', Validators.required],
    });
  }

  /** Open date picker */
  openDatePicker(): void {
    this.hiddenDatePicker.nativeElement.showPicker?.();
    this.hiddenDatePicker.nativeElement.click();
  }

  /** Format date → DD-MMM-YYYY */
  onDateSelected(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    if (!raw) return;

    const date = new Date(raw);

    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-GB', { month: 'short' });
    const year = date.getFullYear();

    const displayValue = `${day}-${month}-${year}`;

    this.tenantForm.get('rentedAt')?.setValue(raw);
    this.tenantForm.get('rentedAt')?.markAsTouched();

    const displayInput = this.hiddenDatePicker.nativeElement
      .previousElementSibling as HTMLInputElement;

    if (displayInput) displayInput.value = displayValue;
  }

  getOrdinal(day: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = day % 100;
    return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  onSubmit(): void {
    if (this.tenantForm.invalid) {
      this.tenantForm.markAllAsTouched();
      return;
    }

    this.submitbtn = false;

    const payload = {
      id: this.request_id,
      approval_status: true,
      advance_amount: this.tenantForm.value.advancePaid,
      monthly_rent_amount: this.tenantForm.value.estimatedRent,
      maintenance_paid_by: this.tenantForm.value.maintenancePaidBy,
      rented_at: this.tenantForm.value.rentedAt,
      monthly_rent_due_date: this.tenantForm.value.monthly_rent_due_date
    };

    this.apiService.ApproveRequest<any>(payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.toast.success('Request Approved Successfully', 'Success');
          this.OwnerServiceService.triggerTenantRequestapproval(res);
          this.submitbtn = true;
          this.closeModal();
        } else {
          this.toast.warning('Request Approval Failed', 'Warning');
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