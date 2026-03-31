import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-request-payout-association',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './request-payout-association.component.html',
  styleUrl: './request-payout-association.component.css'
})
export class RequestPayoutAssociationComponent implements OnInit {

  @Input() payoutdatas: any;

  loading: boolean = false;

  UserData = localStorage.getItem('userdata') || '{}';
  FormatedUserData = JSON.parse(this.UserData);

  payoutForm: any;

  constructor(
    private fb: FormBuilder,
    private Modal: ModalService,
    private ApiService: ApiserviceService,
    private Toast: ToastrService,
    private Association : AssociationServiceService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.payoutForm = this.fb.group({
      requestAmount: [
        '',
        [
          Validators.required,
          Validators.min(1),
          this.maxAmountValidator.bind(this)
        ]
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ]
    });
  }

  get remainingAmount(): number {
    return this.payoutdatas?.remaining_payout || 0;
  }

  get f() {
    return this.payoutForm.controls;
  }

  get bankDetails() {
    return {
      accountHolder: this.FormatedUserData?.name,
      bankName: this.FormatedUserData?.bank_name,
      accountNumber: this.FormatedUserData?.account_number,
      ifsc: this.FormatedUserData?.ifsc_code,
      accountType: this.FormatedUserData?.account_type
    };
  }

  // 🔥 Custom validator (max limit)
  maxAmountValidator(control: AbstractControl) {
    if (!control.value) return null;

    if (control.value > this.remainingAmount) {
      return { maxAmount: true };
    }

    return null;
  }

  // 🔥 Hard stop typing
  onAmountInput() {
    const value = this.f['requestAmount'].value;

    if (value > this.remainingAmount) {
      this.f['requestAmount'].setValue(this.remainingAmount);
    }
  }

  onSubmit() {
    if (this.payoutForm.invalid) {
      this.payoutForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload = {
      association_id: this.FormatedUserData._id,
      association_name: this.FormatedUserData.property_name,
      total_amount: this.f['requestAmount'].value,
      description: this.f['description'].value,
      super_admin_id: this.FormatedUserData.super_admin_id,
      name: this.FormatedUserData.name,
      email: this.FormatedUserData.email,
      mobile: this.FormatedUserData.mobile
    };

    this.ApiService.createpayoutrequestinAssociation(payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res?.success) {
          this.Toast.success(res?.message, 'Success');
          this.Association.triggerPayoutRequestCreate(res);

          this.close();
        }else{
          this.Toast.warning(res?.message, 'Warning');
        }
      },
      error: (err : any) => {
        this.loading = false;
        this.Toast.error(err?.error.error?.message, 'Error');
        this.loading = false;
      }
    });
  }

  close() {
    this.Modal.close();
  }
}