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
  user_id = sessionStorage.getItem('user_id');
  userData: any;
  passport_sizephoto: File | null = null;
  RentalAggrement: File | null = null;
  selectedFile: File | null = null;
  ChequeLeaf: File | null = null;
  Pancard: File | null = null;
  Company_proof: File | null = null;

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

    const userJson = sessionStorage.getItem('userdata');
    this.userData = userJson ? JSON.parse(userJson) : {};
  }

  initializeForms(): void {
    this.inputForm = this.fb.group({
      alternate_number: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
      ],
      gst_number: ['', [Validators.required, Validators.maxLength(15)]],
      registration_number: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.documentForm = this.fb.group({
      company_proof_type: ['', Validators.required],
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

  /** Navigation **/
  goToNextStep(): void {
  if (this.currentStep === 1) {
    if (this.inputForm.invalid) {
      this.inputForm.markAllAsTouched();
      return;
    }
    this.steps[0].isComplete = true;
    this.currentStep = 2;
  } else if (this.currentStep === 2) {
    if (!this.isDocumentsValid()) {
      // Optionally show a toast here
      this.Toast.warning('Please upload all required documents', 'Warning');
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
  const file = event.target as HTMLInputElement;
  if (file.files && file.files.length > 0) {
      this.passport_sizephoto = file.files[0];
    }
  // if (file) this.passport_sizephoto = file.files[0];
}
onFileRentalChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) this.RentalAggrement = file;
}
onFileChequeChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) this.ChequeLeaf = file;
}
onFilePanChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) this.Pancard = file;
}
onFileCompanyChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) this.Company_proof = file;
}

isDocumentsValid(): boolean {
  return (
    this.passport_sizephoto != null &&
    this.RentalAggrement != null &&
    this.ChequeLeaf != null &&
    this.Pancard != null &&
    this.Company_proof != null
  );
}
  /** Submit Input Form **/
  submitInputForm(): void {
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
          this.Toast.success(res.message, 'Success');
          this.submitDocumentForm();
        } else {
          this.Toast.warning(res.message, 'Warning');
          //console.warn('Failed to submit input form');
        }
      },
      error: (err: any) => {
        this.Toast.error(err.error.error.message, 'Failed');
        //console.error('Error submitting input form:', err);
      },
    });
  }

  /** Submit Document Form **/
  submitDocumentForm(): void {
      const formData = new FormData();

  if (this.passport_sizephoto) formData.append('passport_size_photo', this.passport_sizephoto);
  if (this.RentalAggrement) formData.append('rental_agreement', this.RentalAggrement);
  if (this.ChequeLeaf) formData.append('cancelled_cheque_leaf', this.ChequeLeaf);
  if (this.Pancard) formData.append('pan_card', this.Pancard);
  if (this.Company_proof) formData.append('company_proof', this.Company_proof);
  formData.append('company_proof_type', this.documentForm.get('company_proof_type')?.value)

  //console.log('Uploaded files:');
  formData.forEach((value, key) => {
    //console.log(key, value);
  });

    this.apiService.AssociationDocumentOnboard<FormData>(formData).subscribe({
      next: (res: any) => {
        if (res?.success) {
           this.Toast.success(res.message, 'Success')
          this.router.navigateByUrl('/Association/Dashboard');
          //console.log('Documents uploaded successfully');
        } else {
          this.Toast.warning(res.message, 'Warning')
          //console.warn('Document upload failed');
        }
      },
      error: (err: any) => {
         this.Toast.error(err.error.error.message, 'Failed')
        //console.error('Error uploading documents:', err);
      },
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
          sessionStorage.clear();
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
