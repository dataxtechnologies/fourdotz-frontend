import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

// ─── Indian States ─────────────────────────────────────────────────────────────
const INDIAN_STATES: string[] = [
  'Tamil Nadu', 'Kerala'
  // 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  // 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  // 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  // 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Telangana',
  // 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  // 'Andaman and Nicobar Islands', 'Chandigarh',
  // 'Dadra and Nagar Haveli and Daman and Diu',
  // 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const STATE_DISTRICTS: Record<string, string[]> = {
  'Tamil Nadu': [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
    'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram',
    'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai',
    'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
    'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi',
    'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
    'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur',
    'Vellore', 'Villupuram', 'Virudhunagar'
  ],
  'Kerala': [
    'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod',
    'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad',
    'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
  ],
  // 'Karnataka': [
  //   'Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban',
  //   'Bidar', 'Chamarajanagar', 'Chikkaballapur', 'Chikkamagaluru', 'Chitradurga',
  //   'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri',
  //   'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur',
  //   'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada',
  //   'Vijayapura', 'Yadgir'
  // ],
  // 'Andhra Pradesh': [
  //   'Alluri Sitharama Raju', 'Anakapalli', 'Anantapur', 'Bapatla', 'Chittoor',
  //   'East Godavari', 'Eluru', 'Guntur', 'Kakinada', 'Konaseema', 'Krishna',
  //   'Kurnool', 'Manyam', 'Nandyal', 'NTR', 'Palnadu', 'Prakasam',
  //   'Sri Potti Sri Ramulu Nellore', 'Sri Sathya Sai', 'Srikakulam', 'Tirupati',
  //   'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'
  // ],
  // 'Telangana': [
  //   'Adilabad', 'Bhadradri Kothagudem', 'Hanumakonda', 'Hyderabad', 'Jagtial',
  //   'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy',
  //   'Karimnagar', 'Khammam', 'Kumuram Bheem', 'Mahabubabad', 'Mahabubnagar',
  //   'Mancherial', 'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool',
  //   'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli',
  //   'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet',
  //   'Vikarabad', 'Wanaparthy', 'Warangal', 'Yadadri Bhuvanagiri'
  // ],
  // 'Maharashtra': [
  //   'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara',
  //   'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli',
  //   'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban',
  //   'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar',
  //   'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara',
  //   'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
  // ],
  // 'Gujarat': [
  //   'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch',
  //   'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka',
  //   'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch',
  //   'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal',
  //   'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar',
  //   'Tapi', 'Vadodara', 'Valsad'
  // ],
  // 'Delhi': [
  //   'Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi',
  //   'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi',
  //   'South West Delhi', 'West Delhi'
  // ],
};

// ─── Password match validator ──────────────────────────────────────────────────
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirm_password');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
  return null;
}

interface Step {
  id: number;
  title: string;
  subtitle: string;
  isComplete: boolean;
  isActive: boolean;
}


@Component({
  selector: 'app-resident-onboarding-start',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './resident-onboarding-start.component.html',
  styleUrl: './resident-onboarding-start.component.css'
})
export class ResidentOnboardingStartComponent {



  // ── Step state ─────────────────────────────────────────────
  currentStep = 1;
  steps: Step[] = [
    { id: 1, title: 'Basic Details', subtitle: 'Personal info, OTP & credentials.', isComplete: false, isActive: true },
    { id: 2, title: 'Resident Details', subtitle: 'Select association & property.', isComplete: false, isActive: false },
    { id: 3, title: 'Documents', subtitle: 'Upload required KYC documents.', isComplete: false, isActive: false },
    { id: 4, title: 'Preview', subtitle: 'Review & submit your information.', isComplete: false, isActive: false },
  ];

  // ── Forms ──────────────────────────────────────────────────
  basicForm!: FormGroup;
  residentForm!: FormGroup;
  documentForm!: FormGroup;

  // ── OTP state ──────────────────────────────────────────────
  otpSent = false;
  otpVerified = false;
  otpSending = false;
  otpVerifying = false;
  otpResendTimer = 0;
  otpResendInterval: any;
  otpInput = '';

  // ── Password toggle ────────────────────────────────────────
  showPassword = false;
  showConfirmPassword = false;

  // ── State / District dropdowns (Step 2) ───────────────────
  stateSearch = '';
  districtSearch = '';
  stateDropdownOpen = false;
  districtDropdownOpen = false;
  filteredStates: string[] = [];
  filteredDistricts: string[] = [];

  // ── Association dropdown ───────────────────────────────────
  associationSearch = '';
  associationDropdownOpen = false;
  associationList: any[] = [];
  filteredAssociations: any[] = [];
  selectedAssociation: any = null;
  associationLoading = false;

  // ── Property dropdown ──────────────────────────────────────
  propertySearch = '';
  propertyDropdownOpen = false;
  propertyList: any[] = [];
  filteredProperties: any[] = [];
  selectedProperty: any = null;
  propertyLoading = false;

  // ── Documents ──────────────────────────────────────────────
  saleDeedFile: File | null = null;
  aadharFile: File | null = null;
  rentalFile: File | null = null;
  MAX_FILE_SIZE = 2 * 1024 * 1024;

  // ── Submit ─────────────────────────────────────────────────
  submitLoading = false;
  userData: any;

  otptoken: any

  selfsigninbtnloading = false;

  associationId: any

  associationDetails: any

  globalLoading = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private apiService: ApiserviceService,
    private router: Router,
    private Acroute: ActivatedRoute,
    private Toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForms();

    const userJson = localStorage.getItem('userdata');
    this.userData = userJson ? JSON.parse(userJson) : {};

    this.Acroute.paramMap.subscribe(params => {
      this.associationId = params.get('username'); // ✅ FIX NAME

    });

    this.basicForm.get('phone')?.valueChanges.subscribe(() => {
      this.resetOtpState();
    });

    this.basicForm.get('email')?.valueChanges.subscribe(() => {
      this.resetOtpState();
    });

    this.fetchAssociations(this.associationId);
    // if (this.associationId) {
    //   this.fetchPropertiesFromUrl();
    // }
  }

  resetOtpState(): void {
  this.otpVerified = false;
  this.otpSent = false;
  this.otpInput = '';
  this.otptoken = null;

  clearInterval(this.otpResendInterval);
  this.otpResendTimer = 0;
}

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ════════════════════════════════════════════════════════════
  //  FORMS
  // ════════════════════════════════════════════════════════════
  initForms(): void {
    this.basicForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      user_type: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
    }, { validators: passwordMatchValidator });

    this.residentForm = this.fb.group({
      property_id: ['', Validators.required],
      occupancy_status: ['', Validators.required],
    });

    this.documentForm = this.fb.group({
      doc_primary: [null, Validators.required],  // sale_deed or rental_agreement
      aadhar_card: [null, Validators.required],
    });
  }


  fetchAssociations(data : any): void {
    this.globalLoading = true;

    this.apiService.fetchAssociationlistbyId<any>(data).subscribe({
      next: (res: any) => {
        this.globalLoading = false;

        if (res?.success && res?.data) {
          this.associationDetails = res.data[0];
          

        } else {
          this.associationDetails = [];
          // this.filteredAssociations = [];
        }
      },
      error: () => {
        this.globalLoading = false;
        this.associationDetails = [];
        // this.filteredAssociations = [];
      },
    });
  }



  // ════════════════════════════════════════════════════════════
  //  OTP
  // ════════════════════════════════════════════════════════════
  get canSendOtp(): boolean {
    const email = this.basicForm.get('email');
    const phone = this.basicForm.get('phone');
    return !!(email?.valid && phone?.valid);
  }

  sendOtp(): void {
    if (!this.canSendOtp) {
      this.basicForm.get('email')?.markAsTouched();
      this.basicForm.get('phone')?.markAsTouched();
      return;
    }
    this.otpSending = true;
    const payload = {
      email: this.basicForm.value.email,
      mobile: Number(this.basicForm.value.phone),
    };
    this.apiService.SendOTPtoVerify<any>(payload).subscribe({
      next: (res: any) => {
        this.otpSending = false;
        if (res?.success) {
          this.otptoken = res.data
          this.otpSent = true;
          this.startResendTimer();
          this.Toast.success('OTP sent successfully!', 'Success');
        } else {
          this.Toast.warning(res.message || 'Failed to send OTP.', 'Warning');
        }
      },
      error: (err: any) => {
        this.otpSending = false;
        this.Toast.error(err?.error?.error?.message || 'Error sending OTP.', 'Error');
      },
    });
  }

  verifyOtp(): void {
    if (!this.otpInput || this.otpInput.length < 4) {
      this.Toast.error('Please enter the OTP.', 'Error');
      return;
    }
    this.otpVerifying = true;
    const payload = {
      otp_token: this.otptoken,
      otp: this.otpInput,
    };
    this.apiService.VerifyOTPtoonboardresident<any>(payload).subscribe({
      next: (res: any) => {
        this.otpVerifying = false;
        if (res?.success) {
          this.otpVerified = true;
          clearInterval(this.otpResendInterval);
          this.Toast.success('OTP verified!', 'Success');
        } else {
          this.Toast.error(res.message || 'Invalid OTP.', 'Error');
        }
      },
      error: (err: any) => {
        this.otpVerifying = false;
        this.Toast.error(err?.error?.error?.message || 'OTP verification failed.', 'Error');
      },
    });
  }

  startResendTimer(): void {
    this.otpResendTimer = 30;
    clearInterval(this.otpResendInterval);
    this.otpResendInterval = setInterval(() => {
      this.otpResendTimer--;
      if (this.otpResendTimer <= 0) clearInterval(this.otpResendInterval);
    }, 1000);
  }

  resendOtp(): void {
    if (this.otpResendTimer > 0) return;
    this.sendOtp();
  }

  // ════════════════════════════════════════════════════════════
  //  STATE / DISTRICT DROPDOWNS
  // ════════════════════════════════════════════════════════════
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.searchable-select-wrapper')) {
      this.stateDropdownOpen = false;
      this.districtDropdownOpen = false;
      this.associationDropdownOpen = false;
      this.propertyDropdownOpen = false;
    }
  }






  fetchPropertiesFromUrl(): void {
    this.propertyLoading = true;

    const user_type = localStorage.getItem('user_type');

    const apiCall =
      user_type === 'owner'
        ? this.apiService.fetchnonownerpropertylist<any>(this.associationId)
        : this.apiService.fetchnontenantpropertylist<any>(this.associationId);

    apiCall.subscribe({
      next: (res: any) => {
        this.propertyLoading = false;

        if (res?.success && res?.data && res.data.length > 0) {
  this.propertyList = res.data;
  this.filteredProperties = [...res.data];
} else {
  this.propertyList = [];
  this.filteredProperties = [];
}
      },
      error: () => {
        this.propertyLoading = false;
        this.propertyList = [];
        this.filteredProperties = [];
        // this.Toast.error('Could not load property list.', 'Error');
      },
    });
  }



  // ════════════════════════════════════════════════════════════
  //  PROPERTY DROPDOWN
  // ════════════════════════════════════════════════════════════
  fetchnonownerpropertylist(associationId: string): void {
    this.propertyLoading = true;
    this.apiService.fetchnonownerpropertylist<any>(associationId).subscribe({
      next: (res: any) => {
        this.propertyLoading = false;
        if (res?.success && res?.data) {
          this.propertyList = res.data;
          this.filteredProperties = [...res.data];
        } else {
          this.propertyList = [];
          this.filteredProperties = [];
        }
      },
      error: () => {
        this.propertyLoading = false;
        this.propertyList = [];
        this.filteredProperties = [];
        // this.Toast.error('Could not load property list.', 'Error');
      },
    });
  }
  fetchnontenantpropertylist(associationId: string): void {
    this.propertyLoading = true;
    this.apiService.fetchnontenantpropertylist<any>(associationId).subscribe({
      next: (res: any) => {
        this.propertyLoading = false;
        if (res?.success && res?.data) {
          this.propertyList = res.data;
          this.filteredProperties = [...res.data];
        } else {
          this.propertyList = [];
          this.filteredProperties = [];
        }
      },
      error: () => {
        this.propertyLoading = false;
        this.propertyList = [];
        this.filteredProperties = [];
        // this.Toast.error('Could not load property list.', 'Error');
      },
    });
  }

onPropertySearch(): void {
  const q = (this.propertySearch || '').toLowerCase();

  this.filteredProperties = this.propertyList.filter(p =>
    (p.property_no || p.property_name || p.unit_number || p.name || '')
      .toLowerCase()
      .includes(q)
  );

  this.propertyDropdownOpen = false;
}

onPropertyFocus(): void {
  this.propertyDropdownOpen = true;

  if (this.propertyList.length === 0) {
    this.filteredProperties = [];
  } else {
    this.filteredProperties = [...this.propertyList];
  }
}


  selectProperty(prop: any): void {
    this.selectedProperty = prop;
    this.propertySearch =
      prop.property_no || prop.property_name || prop.unit_number || prop.name || '';
    this.propertyDropdownOpen = false;
    this.residentForm.patchValue({ property_id: prop._id });
  }

  // ════════════════════════════════════════════════════════════
  //  FILE UPLOADS
  // ════════════════════════════════════════════════════════════
  get isPrimaryDocLabel(): string {
    return this.basicForm.get('user_type')?.value === 'owner' ? 'Sale Deed' : 'Rental Agreement';
  }

  onPrimaryDocChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      if (!this.validateFileSize(file, 'doc_primary', input)) return;
      this.saleDeedFile = file;
      this.documentForm.patchValue({ doc_primary: file });
    }
  }

  onAadharChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      if (!this.validateFileSize(file, 'aadhar_card', input)) return;
      this.aadharFile = file;
      this.documentForm.patchValue({ aadhar_card: file });
    }
  }

  private validateFileSize(file: File, controlName: string, inputElement: HTMLInputElement): boolean {
    if (file.size > this.MAX_FILE_SIZE) {
      this.documentForm.get(controlName)?.setErrors({ fileSize: true });
      inputElement.value = '';
      this.Toast.error('File size must be 2 MB or less.', 'Error');
      return false;
    }
    return true;
  }

  // ════════════════════════════════════════════════════════════
  //  NAVIGATION
  // ════════════════════════════════════════════════════════════
  goToNextStep(): void {
    if (this.currentStep === 1) {
      if (!this.otpVerified) {
        this.Toast.error('Please verify your OTP first.', 'Validation Error');
        return;
      }
      if (this.basicForm.invalid) {
        this.basicForm.markAllAsTouched();
        this.Toast.error('Please complete all required fields.', 'Validation Error');
        return;
      }
      this.steps[0].isComplete = true;
      this.currentStep = 2;
    } else if (this.currentStep === 2) {
      if (this.residentForm.invalid) {
        this.residentForm.markAllAsTouched();
        this.Toast.error('Please complete all required fields.', 'Validation Error');
        return;
      }
      this.steps[1].isComplete = true;
      this.currentStep = 3;
    } else if (this.currentStep === 3) {
      if (this.documentForm.invalid) {
        this.documentForm.markAllAsTouched();
        this.Toast.error('Please upload all required documents.', 'Validation Error');
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
    this.steps.forEach(step => (step.isActive = step.id === this.currentStep));
  }

  // ════════════════════════════════════════════════════════════
  //  SUBMISSION
  // ════════════════════════════════════════════════════════════
  onSubmit(): void {
    this.selfsigninbtnloading = true;
    if (this.basicForm.invalid) {
      this.Toast.error('Please complete all steps.', 'Error');
      this.selfsigninbtnloading = false;
      return;
    }

    const basicPayload = {
      email: this.basicForm.value.email,
      mobile: Number(this.basicForm.value.phone),
      user_type: this.basicForm.value.user_type,
      password: this.basicForm.value.password,
      name: this.basicForm.value.first_name,
      last_name: this.basicForm.value.last_name,
    };
    this.apiService.ResidentBasicDetails<any>(basicPayload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          console.log('response', res);
          this.storeAuthData(res);
          this.selfsigninbtnloading = false;
          this.goToNextStep();
          this.fetchPropertiesFromUrl();
        } else {
          this.selfsigninbtnloading = false;
          // this.submitLoading = false;
          this.Toast.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        this.selfsigninbtnloading = false;
        // this.submitLoading = false;
        this.Toast.error(err?.error?.error?.message || 'Registration failed.', 'Error');
      },
    });
  }

  storeAuthData(res: any) {
    const tokenData = res.data?.token;

    if (tokenData) {
      localStorage.setItem('access_token', tokenData.AccessToken);
      localStorage.setItem('refresh_token', tokenData.RefreshToken);
    }

    localStorage.setItem('user_type', res.data?.userType);
    localStorage.setItem('user_id', res.data?.user_id);
  }

  submitDocuments(): void {
    this.submitLoading = true;

    const formData = new FormData();

    formData.append('property_id', this.residentForm.value.property_id);
    // formData.append('association_id', this.residentForm.value.association_id); 
    formData.append('occupancy_type', this.residentForm.value.occupancy_status);
    formData.append('user_type', this.basicForm.value.user_type);

    // ✅ NEW CHANGE
    if (this.documentForm.value.doc_primary) {
      const agreementType =
        this.basicForm.value.user_type === 'owner'
          ? 'sale_agreement'
          : 'rent_agreement';

      formData.append('agreement_type', agreementType);   // 🔥 new key
      formData.append('agreement', this.documentForm.value.doc_primary); // 🔥 file
    }

    if (this.documentForm.value.aadhar_card) {
      formData.append('aadhar_card', this.documentForm.value.aadhar_card);
    }

    this.apiService.submitpropertyrequest<any>(formData).subscribe({
      next: (res: any) => {
        this.submitLoading = false;

        if (res?.success) {
          this.Toast.success(res.message || 'Onboarding complete!', 'Success');
          const usertype = localStorage.getItem('user_type');
          if (usertype === 'owner') {
            this.router.navigateByUrl('/Owner/Dashboard');
          } else if (usertype === 'tenant') {
            this.router.navigateByUrl('/Tenant/Dashboard');
          } else {
            this.router.navigateByUrl('/auth/sign-in');
          }
          // this.router.navigateByUrl('/auth/sign-in');
        } else {
          this.Toast.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        this.submitLoading = false;
        this.Toast.error(
          err?.error?.error?.message || 'Document upload failed.',
          'Error'
        );
      },
    });
  }
}