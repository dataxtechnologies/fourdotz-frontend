import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// ✅ Package import
import { State, City } from 'country-state-city';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit, OnDestroy {

  contactForm!: FormGroup;
  private subs = new Subscription();

  countries: string[] = ['India'];

  filteredStates: any[] = [];
  filteredCities: any[] = [];

  submitbtnloading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private router: Router,
    private Toast: ToastrService
  ) { }

  ngOnInit(): void {

    this.contactForm = this.fb.group({
      enquiry_type: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
      country: ['', Validators.required],
      state: [{ value: '', disabled: true }, Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      address: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });

    // ── Country change ─────────────────────────
    this.subs.add(
      this.contactForm.get('country')!.valueChanges.subscribe((val: string) => {

        this.filteredStates = [];
        this.filteredCities = [];

        this.contactForm.get('state')!.reset('');
        this.contactForm.get('city')!.reset('');

        if (val === 'India') {
          this.filteredStates = State.getStatesOfCountry('IN');
          this.contactForm.get('state')!.enable();
        } else {
          this.contactForm.get('state')!.disable();
          this.contactForm.get('city')!.disable();
        }
      })
    );

    // ── State change ─────────────────────────
    this.subs.add(
      this.contactForm.get('state')!.valueChanges.subscribe((stateIso: string) => {

        this.filteredCities = [];
        this.contactForm.get('city')!.reset('');

        if (stateIso) {
          this.filteredCities = City.getCitiesOfState('IN', stateIso);
          this.contactForm.get('city')!.enable();
        } else {
          this.contactForm.get('city')!.disable();
        }
      })
    );
  }

  get f() { return this.contactForm.controls; }

  isInvalid(controlName: string): boolean {
    const ctrl = this.contactForm.get(controlName);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  onSubmit(): void {
    this.submitbtnloading = true;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.submitbtnloading = false;
      return;
    }

    const formValue = this.contactForm.getRawValue();

    // ✅ Convert ISO → State Name
    const selectedState = this.filteredStates.find(
      s => s.isoCode === formValue.state
    );

    const payload = {
      ...formValue,
      state: selectedState?.name || formValue.state
    };

    this.apiService.contactusSubmit<any>(payload).subscribe({
      next: (res: any) => {
        this.submitbtnloading = false;

        if (res?.success) {
          this.contactForm.reset();
          this.Toast.success('Your enquiry has been submitted successfully.', 'Success');
        } else {
          this.Toast.error(res.message, 'Failed');
        }
      },
      error: (err: any) => {
        this.submitbtnloading = false;
        this.Toast.error(err.error?.error?.message || 'Something went wrong', 'Failed');
      },
    });
  }

  formReset() {
    this.contactForm.reset();
    this.contactForm.get('state')?.disable();
    this.contactForm.get('city')?.disable();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  getstarted(){
    this.router.navigateByUrl('/join/join-fourdotz')
  }
  singinpage(){
    this.router.navigateByUrl('/auth/sign-in')
  }
}