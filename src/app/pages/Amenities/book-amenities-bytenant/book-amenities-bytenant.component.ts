import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-book-amenities-bytenant',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './book-amenities-bytenant.component.html',
  styleUrl: './book-amenities-bytenant.component.css'
})
export class BookAmenitiesBytenantComponent {

  bookingForm!: FormGroup;

  today = new Date();
  resourcesDetails: any;

  slotAmount: any = 0;
  visibleResources: any[] = [];
  visibleCount = 8;

  selectedResource: any;
  generatedSlots: string[] = [];

  generatedSlotsFromApi: any[] = [];
  resourceId: any;
  slotulesdetails: any;
  showslot = false;
  savebtnloading = false;
hoaId: any
  timeslotsdetails: any

  propertiesList: any[] = [];
  selectedProperty: any;
  selectedSlotFull: any; // to store start/end time of selected slot

  amenityIcons: any = {
    'Swimming Pool': 'assets/icons/amenities/swim-pool.png',
    'Gym': 'assets/icons/amenities/gym.png',
    'Gym / Fitness Center': 'assets/icons/amenities/gym.png',
    'Yoga & Meditation': 'assets/icons/amenities/yoga.png',
    'Clubhouse': 'assets/icons/amenities/clubhouse.png',
    'Chess': 'assets/icons/amenities/chess.png',
    'Party Hall': 'assets/icons/amenities/party-hall.png',
    'Meeting Hall': 'assets/icons/amenities/meeting-hall.png',
    'Table Tennis': 'assets/icons/amenities/table-tennis.png',
    'Carrom': 'assets/icons/amenities/carrom.png',
    'Badminton': 'assets/icons/amenities/badminton.png',
    'Turf': 'assets/icons/amenities/turf.png',
    'Football': 'assets/icons/amenities/football.png',
    'Basketball': 'assets/icons/amenities/basketball.png'
  };

  constructor(
    private ActiveRoute: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {

this.bookingForm = this.fb.group({
  resource: ['', Validators.required],
  name: ['', Validators.required],
  slot: ['', Validators.required],
  property: ['', Validators.required],

  personName: ['', Validators.required],

  personMobile: [
    '',
    [
      Validators.required,
      Validators.pattern(/^[6-9]\d{9}$/) // ✅ starts 6-9 and total 10 digits
    ]
  ],

  personAge: ['', Validators.required],
});

    // whenever resource value changes → auto clear slot
    this.bookingForm.get('resource')?.valueChanges.subscribe(() => {

      this.bookingForm.patchValue({ slot: '' }, { emitEvent: false });

    });

    
    this.propertylist();
  }

  goback(){
    this.router.navigateByUrl('/Owner/amenities/list-book-amenities');
  }



  propertylist() {
    this.apiService.TenantPropertyDatas<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
this.hoaId = res.data[0].hoa_admin_id;
console.log('this.hoaId', this.hoaId);
          this.getallresourcesforOwner(this.hoaId);
          // show only owner properties
          this.propertiesList = res.data.filter(
            (p: any) => p.resident_type === 'tenant'
          );

        }
      }
    });
  }

  //   TenantPropertyDatas(){
  //   this.apiService.TenantPropertyDatas<any>().subscribe({
  //     next: (res: any) => {
  //       if (res?.success) {
  //         this.TenantPropertyData = res.data;
  //         this.header_loading = false; // stop loading
  //       } else {
  //         // alert(res.message || 'Something went wrong.');
  //         this.header_loading = false; // stop loading even if error
  //       }
  //     },
  //     error: (err: any) => {
  //       this.header_loading = false;
  //       //console.error('Logout failed:', err);
  //       // alert(err.message || 'Logout failed, please try again.');
  //     },
  //   });
  // }

  /* ---------------- RESOURCE LOAD ---------------- */

  getallresourcesforOwner(data : any) {
     this.apiService.getallresourcesforOwner<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {

          this.resourcesDetails = res.data;

          // preload icons
          this.resourcesDetails.forEach((r: any) => {
            r.icon = this.getResourceIcon(r.name);
          });

          this.visibleResources = this.resourcesDetails.slice(0, this.visibleCount);
        }
      }
    });
  }

  showMoreResources() {
    this.visibleCount += 4;
    this.visibleResources = this.resourcesDetails.slice(0, this.visibleCount);
  }

  /* ---------------- RESOURCE SELECT ---------------- */

  selectResource(resource: any) {

    // if user switching resource → reset slot state first
    if (this.selectedResource?.resource_id !== resource.resource_id) {

      this.bookingForm.patchValue({
        slot: ''
      });

      this.bookingForm.get('slot')?.markAsUntouched();
      this.bookingForm.get('slot')?.markAsPristine();

      this.generatedSlotsFromApi = [];
      this.timeslotsdetails = [];
    }

    this.selectedResource = resource;

    this.bookingForm.patchValue({
      resource: resource.resource_id,
      name: resource.name
    });

    this.slotAmount = resource.pricing_type === 'free'
      ? 'Free'
      : resource.price_per_hour || 0;

    // call APIs again for new resource
    this.GetSlotRuleforResourcesIdnew(resource.resource_id);
    this.GetTimeSlotsByResourceId(resource.resource_id);
  }

  /* ---------------- SLOT RULE API ---------------- */

  GetSlotRuleforResourcesIdnew(data: any) {

    this.apiService.GetSlotRuleforResourcesId<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {

          this.slotulesdetails = res.data;
          this.showslot = true;

          // ❌ remove generateSlotsFromRules()
        }
      },
      error: (err: any) => {
        console.error('Fetch rule failed', err);
      }
    });
  }


  GetTimeSlotsByResourceId(data: any) {

    this.apiService.GetTimeSlotsByResourceId<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {

          this.timeslotsdetails = Array.isArray(res.data) ? res.data : [];

          this.buildSlotsFromTimeslots(); // ⭐ important

          this.showslot = true;
        }
      }
    });
  }


  /* ---------------- SLOT GENERATION ---------------- */

  generateSlotsFromRules() {

    if (!this.slotulesdetails?.length) return;

    const rule = this.slotulesdetails[0];

    let start = new Date(rule.start_time.$date);
    let end = new Date(rule.end_time.$date);
    let duration = Number(this.selectedResource?.slot_duration || 60);

    this.generatedSlots = [];

    let startMin = start.getHours() * 60 + start.getMinutes();
    const endMin = end.getHours() * 60 + end.getMinutes();

    while (startMin + duration <= endMin) {

      const slotStart = this.minutesToTime(startMin);
      const slotEnd = this.minutesToTime(startMin + duration);

      this.generatedSlots.push(`${slotStart} - ${slotEnd}`);

      startMin += duration;
    }
  }

  /* ---------------- HELPERS ---------------- */

  minutesToTime(mins: number) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hr = h % 12 || 12;
    return `${hr}:${m === 0 ? '00' : m} ${ampm}`;
  }

  getResourceIcon(name: string) {
    return this.amenityIcons[name] || 'assets/icons/amenities/default.png';
  }

  getDayNames(days: number[]): string[] {
    if (!days) return [];
    const map: any = {
      0: 'Monday', 1: 'Tuesday', 2: 'Wednesday',
      3: 'Thursday', 4: 'Friday', 5: 'Saturday', 6: 'Sunday'
    };
    return days.map(d => map[d]);
  }

  isAllDays(days: number[]): boolean {
    return days?.length === 7;
  }

  formatDuration(mins: number): string {

    if (!mins) return '';

    const hr = Math.floor(mins / 60);
    const min = mins % 60;

    if (hr && min) return `${hr} hr ${min} mins`;
    if (hr) return `${hr} hr`;
    return `${min} mins`;
  }


  buildSlotsFromTimeslots() {

    if (!this.timeslotsdetails?.length) return;

    const duration = Number(this.selectedResource?.slot_duration || 60);

    this.generatedSlotsFromApi = [];

    this.timeslotsdetails.forEach((slot: any) => {

      const baseStart = new Date(slot.start_time);
      const baseEnd = new Date(slot.end_time);

      let cursor = new Date(baseStart);

      while (cursor.getTime() + duration * 60000 <= baseEnd.getTime()) {

        const subStart = new Date(cursor);
        const subEnd = new Date(cursor.getTime() + duration * 60000);

        const display =
          `${this.minutesToTime(subStart.getHours() * 60 + subStart.getMinutes())}
         - 
         ${this.minutesToTime(subEnd.getHours() * 60 + subEnd.getMinutes())}`;

        const disabled =
          slot.status !== 'open' ||
          slot.current_capacity >= slot.max_capacity;

        this.generatedSlotsFromApi.push({
          slot_id: slot.slot_id,     // same parent slot id
          display: display.trim(),
          disabled: disabled,

          // ⭐ actual split time
          sub_start_time: subStart.toISOString(),
          sub_end_time: subEnd.toISOString()
        });

        // move forward
        cursor = new Date(cursor.getTime() + duration * 60000);
      }

    });
  }

  onSlotSelect(slot: any) {
    this.selectedSlotFull = slot;
  }



  /* ---------------- BOOKING ---------------- */

  submitBooking() {

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched(); // 🔥 show all errors
      this.savebtnloading = false;
      return;
    }
    
    
    if (!this.selectedSlotFull || !this.bookingForm.value.property) {
    this.savebtnloading = false;
    return;
  }
  this.savebtnloading = true;

    const payload = {
      resource_id: this.bookingForm.value.resource,

      // parent slot id
      slot: this.selectedSlotFull.slot_id,

      // ⭐ actual selected split time
      start_time: this.selectedSlotFull.sub_start_time,
      end_time: this.selectedSlotFull.sub_end_time,

      amount: this.slotAmount.toString(),
      payment_status: "paid",
      booking_status: "booked",
      property_id: this.bookingForm.value.property,

      persons: [
        {
          name: this.bookingForm.value.personName,
          mobile: this.bookingForm.value.personMobile,
          age: this.bookingForm.value.personAge
        }
      ]
    };

    this.apiService.BookResourceinOwner<any>(payload).subscribe({
      next: (res: any) => {
        this.savebtnloading = false;

        if (res?.success) {
          this.toast.success(res.message);
          this.router.navigateByUrl('/Owner/amenities/list-book-amenities');
        } else {
          this.toast.warning(res.message);
          this.resetBookingForm(); // ← reset on API-level failure
        }
      },
      error: (err: any) => {
        this.savebtnloading = false;
        this.toast.error(err.error.error?.message || 'Booking failed');
        this.resetBookingForm(); // ← reset on API-level failure
      }
    });
  }


  resetBookingForm() {
  // Reset form controls
  this.bookingForm.reset({
    resource: '',
    name: '',
    slot: '',
    property: '',
    personName: '',
    personMobile: '',
    personAge: '',
  });

  // Reset component state
  this.selectedResource = null;
  this.selectedSlotFull = null;
  this.selectedProperty = null;
  this.generatedSlotsFromApi = [];
  this.generatedSlots = [];
  this.slotAmount = 0;
  this.showslot = false;
  this.slotulesdetails = null;
  this.timeslotsdetails = null;

  // Reset visible resources back to initial count
  this.visibleCount = 8;
  this.visibleResources = this.resourcesDetails?.slice(0, this.visibleCount) || [];

  // Mark all controls as untouched so validation errors disappear
  this.bookingForm.markAsUntouched();
  this.bookingForm.markAsPristine();
}
}
