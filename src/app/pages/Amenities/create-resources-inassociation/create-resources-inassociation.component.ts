import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-resources-inassociation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-resources-inassociation.component.html',
  styleUrl: './create-resources-inassociation.component.css'
})
export class CreateResourcesInassociationComponent implements OnInit {

  selectedCategory = 'lifestyle';
  selectedAmenity: string = '';
  isAmenityLocked = false;

  resourceForm!: FormGroup;

  timeSlots: string[] = [];
  slotDurations: { label: string; value: number }[] = [];
  savebtnloading = false

  categories = [
    { key: 'lifestyle', label: 'Lifestyle & Fitness' },
    { key: 'clubhouse', label: 'Clubhouse' },
    { key: 'indoor', label: 'Indoor Games' },
    { key: 'outdoor', label: 'Outdoor Games' },
    { key: 'others', label: 'Others' }
  ];

  amenities: any = {
    lifestyle: [
      { name: 'Swimming Pool', icon: 'assets/icons/amenities/swim-pool.png' },
      { name: 'Gym / Fitness Center', icon: 'assets/icons/amenities/gym.png' },
      { name: 'Yoga & Meditation', icon: 'assets/icons/amenities/yoga.png' }
    ],
    clubhouse: [
      { name: 'Clubhouse', icon: 'assets/icons/amenities/clubhouse.png' },
      { name: 'Party Hall', icon: 'assets/icons/amenities/party-hall.png' },
      { name: 'Meeting Hall', icon: 'assets/icons/amenities/meeting-hall.png' }
    ],
    indoor: [
      { name: 'Table Tennis', icon: 'assets/icons/amenities/table-tennis.png' },
      { name: 'Chess', icon: 'assets/icons/amenities/chess.png' },
      { name: 'Carrom', icon: 'assets/icons/amenities/carrom.png' }
    ],
    outdoor: [
      { name: 'Badminton', icon: 'assets/icons/amenities/badminton.png' },
      { name: 'Basketball', icon: 'assets/icons/amenities/basketball.png' },
      { name: 'Football', icon: 'assets/icons/amenities/football.png' },
      { name: 'Turf', icon: 'assets/icons/amenities/turf.png' }
    ]
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private toast: ToastrService
  ) { }

  /* -------------------- INIT -------------------- */

  ngOnInit(): void {
    this.generateTimeSlots();
    this.generateSlotDurations();
  }

  /* -------------------- FORM -------------------- */

  createResourceForm(item: any) {
    this.resourceForm = this.fb.group(
      {
        name: [item.name],
        type: [this.getAmenityType(this.selectedCategory)],
        open_time: ['', Validators.required],
        close_time: ['', Validators.required],
        slot_duration: ['', Validators.required],
        capacity: [null, [Validators.required, Validators.min(1)]],
        pricing_type: ['free', Validators.required],
        price_per_hour: [null],
        status: ['active']
      },
      { validators: this.timeRangeValidator.bind(this) }
    );

    // Paid pricing validation
    this.resourceForm.get('pricing_type')?.valueChanges.subscribe(type => {
      const priceCtrl = this.resourceForm.get('price_per_hour');

      if (type === 'paid') {
        priceCtrl?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        priceCtrl?.clearValidators();
        priceCtrl?.setValue(null);
      }

      priceCtrl?.updateValueAndValidity();
    });

    // Reset slot duration when time changes
    this.resourceForm.get('open_time')?.valueChanges.subscribe(() => {
      this.resourceForm.get('slot_duration')?.reset();
    });

    this.resourceForm.get('close_time')?.valueChanges.subscribe(() => {
      this.resourceForm.get('slot_duration')?.reset();
    });
  }

  /* -------------------- VALIDATORS -------------------- */

  timeRangeValidator(control: AbstractControl): ValidationErrors | null {
    const open = control.get('open_time')?.value;
    const close = control.get('close_time')?.value;

    if (!open || !close) return null;

    return this.timeToMinutes(close) > this.timeToMinutes(open)
      ? null
      : { invalidTimeRange: true };
  }

  /* -------------------- TIME HELPERS -------------------- */

  generateTimeSlots() {
    const slots: string[] = [];
    let hour = 0;
    let minute = 0;

    while (!(hour === 23 && minute === 30)) {
      slots.push(this.formatTime(hour, minute));

      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour++;
      }
    }

    slots.push('11:30 PM');
    this.timeSlots = slots;
  }

  formatTime(hour: number, minute: number): string {
    const period = hour < 12 ? 'AM' : 'PM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const displayMinute = minute === 0 ? '00' : minute;

    return `${displayHour}:${displayMinute} ${period}`;
  }

  timeToMinutes(time: string): number {
    const [t, period] = time.split(' ');
    let [hour, minute] = t.split(':').map(Number);

    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    return hour * 60 + minute;
  }

  generateSlotDurations() {
    const slots = [];

    for (let minutes = 30; minutes <= 1440; minutes += 30) {
      if (minutes < 60) {
        slots.push({ label: `${minutes} mins`, value: minutes });
      } else {
        const hrs = minutes / 60;
        slots.push({
          label: hrs % 1 === 0
            ? `${hrs} hr${hrs > 1 ? 's' : ''}`
            : `${hrs} hrs`,
          value: minutes
        });
      }
    }

    this.slotDurations = slots;
  }

  /* -------------------- SLOT LOGIC -------------------- */

  get availableMinutes(): number {
    if (!this.resourceForm) return 0;

    const open = this.resourceForm.get('open_time')?.value;
    const close = this.resourceForm.get('close_time')?.value;

    if (!open || !close) return 0;

    return this.timeToMinutes(close) - this.timeToMinutes(open);
  }

  isSlotDisabled(slotMinutes: number): boolean {
    return slotMinutes > this.availableMinutes;
  }

  get totalSlots(): number {
    if (!this.resourceForm) return 0;

    const duration = this.resourceForm.get('slot_duration')?.value;
    if (!duration || this.availableMinutes <= 0) return 0;

    return Math.floor(this.availableMinutes / duration);
  }

  /* -------------------- AMENITY -------------------- */

  getAmenityType(category: string): string {
    switch (category) {
      case 'lifestyle':
      case 'clubhouse':
        return 'Facility';
      case 'indoor':
      case 'outdoor':
        return 'Game';
      default:
        return 'Equipment';
    }
  }

  onAmenitySelect(item: any) {
    this.selectedAmenity = item.name;
    this.isAmenityLocked = true;
    this.createResourceForm(item);
  }

  resetAmenity() {
    this.selectedAmenity = '';
    this.isAmenityLocked = false;

    this.resourceForm = null as any; // 👈 THIS hides the form
  }
  /* -------------------- SUBMIT -------------------- */

  submitAmenity() {
    this.savebtnloading = true
    if (this.resourceForm.invalid) {
      this.resourceForm.markAllAsTouched();
      return;
    }

    // console.log('Payload:', {
    //   ...this.resourceForm.value,
    //   total_slots: this.totalSlots
    // });

    const data = {
      ...this.resourceForm.value,
      total_slots: this.totalSlots
    };
    this.apiService.CreateResourcesinAssociation<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.savebtnloading = false
          this.toast.success(res.message);
          const resources_id = res.data;
          this.router.navigateByUrl(
            `/Association/manage-amenities/resources/set-slot-rules/${resources_id}`);
        } else {
          this.savebtnloading = false
          this.toast.warning(res.message);

          //  this.Toast.warning(res.message);
          // this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.savebtnloading = false
          this.toast.success(err.err.error.message);
        //  this.Toast.error(err.err.error.message);
        // this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });

    // this.router.navigateByUrl(
    //   '/Association/manage-amenities/resources/set-slot-rules/1'
    // );
  }

  goback(){
    this.router.navigateByUrl('/Association/manage-amenities/resources');
  }

  otherResource = {
    type: 'Equipment',
    name: '',
    open_time: '',
    close_time: '',
    capacity: null,
    pricing_type: 'free',
    price_per_hour: null
  };

  onOtherCategorySelect() {
    this.selectedAmenity = 'others';
    this.isAmenityLocked = true;

    this.resourceForm = this.fb.group(
      {
        name: ['', Validators.required], // USER INPUT
        type: ['Equipment'],
        open_time: ['', Validators.required],
        close_time: ['', Validators.required],
        slot_duration: ['', Validators.required],
        capacity: [null, [Validators.required, Validators.min(1)]],
        pricing_type: ['free', Validators.required],
        price_per_hour: [null],
        status: ['active']
      },
      { validators: this.timeRangeValidator.bind(this) }
    );

    this.attachCommonSubscriptions();
  }

  attachCommonSubscriptions() {

    // Pricing logic
    this.resourceForm.get('pricing_type')?.valueChanges.subscribe(type => {
      const priceCtrl = this.resourceForm.get('price_per_hour');

      if (type === 'paid') {
        priceCtrl?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        priceCtrl?.clearValidators();
        priceCtrl?.setValue(null);
      }

      priceCtrl?.updateValueAndValidity();
    });

    // Reset duration when time changes
    this.resourceForm.get('open_time')?.valueChanges.subscribe(() => {
      this.resourceForm.get('slot_duration')?.reset();
    });

    this.resourceForm.get('close_time')?.valueChanges.subscribe(() => {
      this.resourceForm.get('slot_duration')?.reset();
    });
  }


  onCategoryChange(categoryKey: string) {

    // If already locked, do nothing
    if (this.isAmenityLocked) return;

    this.selectedCategory = categoryKey;

    // OTHERS → open form directly
    if (categoryKey === 'others') {
      this.openOthersForm();
    } else {
      // Normal categories → reset selection
      this.selectedAmenity = '';
      // this.resourceForm = null;
    }
  }

  openOthersForm() {
    this.selectedAmenity = 'others';
    this.isAmenityLocked = true;

    this.resourceForm = this.fb.group(
      {
        name: ['', Validators.required], // USER ENTERS NAME
        type: ['Equipment'],
        open_time: ['', Validators.required],
        close_time: ['', Validators.required],
        slot_duration: ['', Validators.required],
        capacity: [null, [Validators.required, Validators.min(1)]],
        pricing_type: ['free', Validators.required],
        price_per_hour: [null],
        status: ['active']
      },
      { validators: this.timeRangeValidator.bind(this) }
    );

    this.attachCommonSubscriptions();
  }
}
