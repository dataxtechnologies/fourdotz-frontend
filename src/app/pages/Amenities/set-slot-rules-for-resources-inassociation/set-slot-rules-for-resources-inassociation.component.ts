import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-set-slot-rules-for-resources-inassociation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './set-slot-rules-for-resources-inassociation.component.html',
  styleUrl: './set-slot-rules-for-resources-inassociation.component.css'
})
export class SetSlotRulesForResourcesInassociationComponent implements OnInit {

  today = new Date();


  resourceName = '';
  summaryStartTime = '';
  summaryEndTime = '';
  availableCapacity = 0;
  slotDurationMinutes = 30;
  totalSlots = 0;

  resourceId: any;



  startTimeOptions: string[] = [];
  endTimeOptions: string[] = [];

  slotForm!: FormGroup;

  savebtnloading = false

  weekDays = [
    { label: 'Monday', value: 0, selected: false },
    { label: 'Tuesday', value: 1, selected: false },
    { label: 'Wednesday', value: 2, selected: false },
    { label: 'Thursday', value: 3, selected: false },
    { label: 'Friday', value: 4, selected: false },
    { label: 'Saturday', value: 5, selected: false },
    { label: 'Sunday', value: 6, selected: false }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiserviceService,
    private router: Router,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.resourceId = params.get('resource_id');
      console.log('resourceId', this.resourceId);
    });


    this.slotForm = this.fb.group({
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      max_capacity: [
        null,
        [Validators.required, Validators.min(1)]
      ]
    });

    this.generateStartTimeOptions();
    this.loadResourcesbyID(this.resourceId);
  }

  /* ---------- WEEKDAY ---------- */

  toggleDay(index: number) {
    this.weekDays[index].selected = !this.weekDays[index].selected;
  }

  getSelectedDays(): number[] {
    return this.weekDays
      .filter(d => d.selected)
      .map(d => d.value);
  }

  /* ---------- TIME ---------- */

  generateStartTimeOptions() {
    const start = this.timeToMinutes(this.summaryStartTime);
    const end = this.timeToMinutes(this.summaryEndTime);
    this.startTimeOptions = this.generateTimeRange(start, end);
  }

  onStartTimeChange() {
    const startTime = this.slotForm.get('start_time')?.value;
    if (!startTime) return;

    const start = this.timeToMinutes(startTime);
    const end = this.timeToMinutes(this.summaryEndTime);

    this.endTimeOptions = this.generateTimeRange(
      start + this.slotDurationMinutes,
      end
    );

    this.slotForm.get('end_time')?.reset();
  }

  generateTimeRange(startMin: number, endMin: number): string[] {
    const times: string[] = [];
    for (let min = startMin; min <= endMin; min += this.slotDurationMinutes) {
      times.push(this.minutesToTime(min));
    }
    return times;
  }

  timeToMinutes(time: string): number {
    const [t, period] = time.split(' ');
    let [hour, minute] = t.split(':').map(Number);

    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    return hour * 60 + minute;
  }

  minutesToTime(mins: number): string {
    let hour = Math.floor(mins / 60);
    const minute = mins % 60;
    const period = hour >= 12 ? 'PM' : 'AM';

    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;

    return `${hour}:${minute === 0 ? '00' : minute} ${period}`;
  }

  /* ---------- SAVE ---------- */

  loadResourcesbyID(data: any) {

    this.apiService.getResourcebyId<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {

          const resource = res.data;

          // 🔹 Summary bindings
          this.resourceName = resource.name;
          this.summaryStartTime = resource.open_time;
          this.summaryEndTime = resource.close_time;
          this.availableCapacity = resource.capacity;
          this.slotDurationMinutes = Number(resource.slot_duration);
          this.totalSlots = resource.total_slots;

          // 🔹 Re-generate start times using backend times
          this.generateStartTimeOptions();

          // 🔹 Patch default max capacity (optional)
          this.slotForm.patchValue({
            max_capacity: resource.capacity
          });

        }
      },
      error: (err: any) => {
        console.error('Fetch resource failed', err);
      }
    });
  }
  onSave() {
    this.savebtnloading = true
    if (this.slotForm.invalid) {
      this.slotForm.markAllAsTouched();
      return;
    }

    const payload = {
      resource_id: this.resourceId,
      days_of_week: this.getSelectedDays(),
      start_time: this.convertTo24(this.slotForm.value.start_time),
      end_time: this.convertTo24(this.slotForm.value.end_time),
      max_capacity: this.slotForm.value.max_capacity,
      is_active: true
    };

    console.log('FINAL PAYLOAD:', payload);

    this.apiService.SetSlotRulesCreate<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.savebtnloading = false
          this.toast.success(res.message);
          this.router.navigateByUrl(
            '/Association/manage-amenities/resources');
        } else {
          this.savebtnloading = false

           this.toast.warning(res.message);
          // this.tableLoading = false;
          // alert(res.message || 'Logout failed, please try again.');
        }
      },
      error: (err: any) => {
        this.savebtnloading = false
         this.toast.error(err.err.error.message);
        // this.tableLoading = false;
        //console.error('Logout failed:', err);
        // alert(err.message || 'Logout failed, please try again.');
      },
    });

    // this.router.navigateByUrl(
    //   '/Association/manage-amenities/resources/set-slot-rules/1'
    // );
  }

  convertTo24(time: string): string {
    const mins = this.timeToMinutes(time);
    const h = Math.floor(mins / 60).toString().padStart(2, '0');
    const m = (mins % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }
}