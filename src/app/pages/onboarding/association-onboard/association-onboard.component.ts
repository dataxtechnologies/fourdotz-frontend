import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  isComplete: boolean;
  isActive: boolean;
}

@Component({
  selector: 'app-association-onboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './association-onboard.component.html',
  styleUrls: ['./association-onboard.component.css'],
})
export class AssociationOnboardComponent implements OnInit {
  user_id = localStorage.getItem('user_id');
  userData: any;
  selectedFile: File | null = null;
passport_sizephoto: File | null = null;
RentalAggrement: File | null = null;
ChequeLeaf: File | null = null;
Pancard: File | null = null;
Company_proof: File | null = null;
  submitbtnloading = false;
  steps: Step[] = [
    {
      id: 1,
      title: 'User Inputs',
      subtitle: 'Provide your basic and Association details.',
      isComplete: false,
      isActive: true,
    },
    {
      id: 2,
      title: 'Document Uploads',
      subtitle: 'Upload required KYC and legal documents.',
      isComplete: false,
      isActive: false,
    },
    {
      id: 3,
      title: 'Account Details',
      subtitle: 'Provide your bank account details.',
      isComplete: false,
      isActive: false,
    },
    {
      id: 4,
      title: 'Review & Submit',
      subtitle: 'Final check before submission.',
      isComplete: false,
      isActive: false,
    },
  ];

  currentStep = 1;

  inputForm!: FormGroup;
  documentForm!: FormGroup;
  accountForm!: FormGroup;

  loginbtn = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private apiService: ApiserviceService,
    private router: Router,
    private Toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForms();

    const userJson = localStorage.getItem('userdata');
    this.userData = userJson ? JSON.parse(userJson) : {};
  }

toUpperCaseInput(event: any) {
  const value = event.target.value.toUpperCase();
  this.accountForm.get('ifsc_code')?.setValue(value, { emitEvent: false });
}

  initializeForms(): void {
    this.inputForm = this.fb.group({
      alternate_number: [
  '',
  [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')],
],
      gst_number: ['', [Validators.required, Validators.maxLength(15)]],
      registration_number: ['', Validators.required],
      address: ['', Validators.required],
    });

this.documentForm = this.fb.group({
  company_proof_type: ['', Validators.required],
  passport_size_photo: [null, Validators.required],
  rental_agreement: [null, Validators.required],
  cancelled_cheque_leaf: [null, Validators.required],
  pan_card: [null, Validators.required],
  company_proof: [null, Validators.required]
});

    this.accountForm = this.fb.group({
      account_holder_name: ['', Validators.required],
      account_number: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{9,18}$')],
      ],
      account_type: ['', Validators.required],
ifsc_code: [
  '',
  [Validators.required, Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')],
],
    });
  }

  goToNextStep(): void {
    if (this.currentStep === 1) {
      if (this.inputForm.invalid) {
        this.inputForm.markAllAsTouched();
        return;
      }
      this.steps[0].isComplete = true;
      this.currentStep = 2;
    } else if (this.currentStep === 2) {
      if (this.documentForm.invalid) {
        this.documentForm.markAllAsTouched();
        return;
      }
      this.steps[1].isComplete = true;
      this.currentStep = 3;
    } else if (this.currentStep === 3) {
      if (this.accountForm.invalid) {
        this.accountForm.markAllAsTouched();
        return;
      }
      this.steps[2].isComplete = true;
      this.currentStep = 4;
    }
    this.updateStepStatus();
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepStatus();
    }
  }

  updateStepStatus(): void {
    this.steps.forEach(
      (step) => (step.isActive = step.id === this.currentStep)
    );
  }

  /** File Upload **/
  onFilePassportChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.passport_sizephoto = file;
    this.documentForm.patchValue({ passport_size_photo: file });
  }
}

onFileRentalChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.RentalAggrement = file;
    this.documentForm.patchValue({ rental_agreement: file });
  }
}

onFileChequeChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.ChequeLeaf = file;
    this.documentForm.patchValue({ cancelled_cheque_leaf: file });
  }
}

onFilePanChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.Pancard = file;
    this.documentForm.patchValue({ pan_card: file });
  }
}

onFileCompanyChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.Company_proof = file;
    this.documentForm.patchValue({ company_proof: file });
  }
}

isDocumentsValid(): boolean {
  return this.documentForm.valid;
}
  /** Submit Input Form **/
  submitInputForm(): void {
    this.submitbtnloading = true;
    const payload = {
      alternate_number: this.inputForm.value.alternate_number,
      gst_number: this.inputForm.value.gst_number,
      registration_number: this.inputForm.value.registration_number,
      address: this.inputForm.value.address,
      account_name: this.accountForm.value.account_holder_name,
      account_number: this.accountForm.value.account_number,
      account_type: this.accountForm.value.account_type,
      ifsc_code: this.accountForm.value.ifsc_code,
      id: this.userData._id,
    };

    this.apiService.AssociationDataOnboard<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.submitbtnloading = false;
          this.Toast.success(res.message, 'Success');
          this.submitDocumentForm();
        } else {
          this.submitbtnloading = false;
          this.Toast.warning(res.message, 'Warning');
          //console.warn('Failed to submit input form');
        }
      },
      error: (err: any) => {
        this.submitbtnloading = false;
        this.Toast.error(err.error.error.message, 'Failed');
        //console.error('Error submitting input form:', err);
      },
    });
  }

  /** Submit Document Form **/
 submitDocumentForm(): void {
  this.submitbtnloading = true;

  const formData = new FormData();
  Object.keys(this.documentForm.value).forEach(key => {
    formData.append(key, this.documentForm.value[key]);
  });

  this.apiService.AssociationDocumentOnboard<FormData>(formData).subscribe({
    next: (res: any) => {
      this.submitbtnloading = false;
      if (res?.success) {
        this.Toast.success(res.message, 'Success');
        this.router.navigateByUrl('/Association/Dashboard');
      } else {
        this.Toast.warning(res.message, 'Warning');
      }
    },
    error: (err: any) => {
      this.submitbtnloading = false;
      this.Toast.error(err.error.error.message, 'Failed');
    }
  });
}

  /** Submit Account Details **/
  // submitAccountForm(): void {
  //   const payload = {
  //     account_holder_name: this.accountForm.value.account_holder_name,
  //     account_number: this.accountForm.value.account_number,
  //     account_type: this.accountForm.value.account_type,
  //     ifsc_code: this.accountForm.value.ifsc_code,
  //     id: this.user_id,
  //   };

  //   this.apiService.AssociationDataOnboard<any>(payload).subscribe({
  //     next: (res: any) => {
  //       if (res?.success) {
  //         //console.log('Account details saved successfully');
  //       } else {
  //         //console.warn('Account details submission failed');
  //       }
  //     },
  //     error: (err: any) => {
  //       //console.error('Error submitting account details:', err);
  //     },
  //   });
  // }

  /** Final Submit **/
  onSubmit(): void {
    if (
      this.inputForm.invalid ||
      this.accountForm.invalid ||
      !this.isDocumentsValid()
    ) {
      //console.warn('Please complete all sections before submitting.');
      return;
    }
    this.submitInputForm();
    // this.submitAccountForm();
    this.loginbtn = true;
    //console.log('Onboarding Completed!');
  }

  logout(): void {
    this.apiService.logoutApi<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          localStorage.clear();
          this.router.navigateByUrl('/auth/sign-in');
          this.Toast.success(res.message, 'Successs');
          //console.log(res.message || 'Logged out successfully');
        } else {
          this.Toast.error(res.message, 'Failed');
        }
      },
      error: (err: any) => {
        this.Toast.error(err.error.error.message, 'Failed');
        //console.error('Logout failed:', err);
      },
    });
  }
}
