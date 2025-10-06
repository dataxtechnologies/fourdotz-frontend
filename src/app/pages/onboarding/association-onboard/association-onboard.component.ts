import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../../../services/api/apiservice.service';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  isComplete: boolean;
  isActive: boolean;
}

@Component({
  selector: 'app-association-onboard',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './association-onboard.component.html',
  styleUrl: './association-onboard.component.css',
})
export class AssociationOnboardComponent {
  user_id = sessionStorage.getItem('user_id');

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
      title: 'Review & Submit',
      subtitle: 'Final check before submission.',
      isComplete: false,
      isActive: false,
    },
  ];
  currentStep: number = 1;

  inputForm: FormGroup;
  documentForm: FormGroup;
  loginbtn: boolean = false;

  uploadedFiles: { [key: string]: File | null } = {
    passport_size_photo: null,
    rental_agreement: null,
    cancelled_cheque_leaf: null,
    pan_card: null,
    company_proof: null,
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private apiService: ApiserviceService
  ) {
    this.inputForm = this.fb.group({
      alternate_number: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
      ],
      gst_number: ['', [Validators.required, Validators.maxLength(15)]],
      registration_number: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });

    this.documentForm = this.fb.group({
      company_proof_type: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  logout() {}

  goToNextStep(): void {
    if (this.currentStep === 1 && this.inputForm.valid) {
      this.steps[0].isComplete = true;
      this.currentStep = 2;
      this.updateStepStatus();
    } else if (this.currentStep === 2 && this.isDocumentsValid()) {
      this.steps[1].isComplete = true;
      this.currentStep = 3;
      this.updateStepStatus();
    }
  }
  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepStatus();
    }
  }

  updateStepStatus(): void {
    this.steps.forEach((step) => {
      step.isActive = step.id === this.currentStep;
    });
  }

  onFileChange(event: any, fieldName: string): void {
    if (event.target.files.length > 0) {
      this.uploadedFiles[fieldName] = event.target.files[0];
    } else {
      this.uploadedFiles[fieldName] = null;
    }
  }

  isDocumentsValid(): boolean {
    const requiredDocs = [
      'passport_size_photo',
      'rental_agreement',
      'cancelled_cheque_leaf',
      'pan_card',
      'company_proof',
    ];
    const allDocsUploaded = requiredDocs.every(
      (doc) => this.uploadedFiles[doc] !== null
    );
    return allDocsUploaded && this.documentForm.valid;
  }

  submitInputForm(): void {
    const payload = {
      alternate_number: this.inputForm.get('alternate_number')?.value,
      gst_number: this.inputForm.get('gst_number')?.value,
      registration_number: this.inputForm.get('registration_number')?.value,
      address: this.inputForm.get('address')?.value,
      id: this.user_id,
    };

    this.apiService.AssociationDataOnboard<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.submitDocumentForm();
        } else {
          // this.loginbtn = true;
        }
      },
      error: (err: any) => {
        console.error('Login failed:', err.error.error.data);
        // alert(err.message || 'Login failed, please try again.');
      },
    });
  }

  // 2. Submit Documents
  submitDocumentForm(): void {
    const formData = new FormData();

    // Append file fields
    Object.keys(this.uploadedFiles).forEach((key) => {
      if (this.uploadedFiles[key]) {
        formData.append(key, this.uploadedFiles[key] as File);
      }
    });

    // Append other document form values
    Object.entries(this.documentForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    this.apiService.AssociationDataOnboard<any>(formData).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.loginbtn = true;
        } else {
          this.loginbtn = true;
        }
      },
      error: (err: any) => {
        console.error('Login failed:', err.error.error.data);
        // alert(err.message || 'Login failed, please try again.');
      },
    });
  }

  // Final Submit (if needed)
  onSubmit(): void {
    this.submitInputForm();
    // console.log('Final review done.');
    // alert('Onboarding completed!');
  }
}
