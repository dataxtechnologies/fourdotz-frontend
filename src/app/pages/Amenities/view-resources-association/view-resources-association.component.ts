import { Component } from '@angular/core';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableService } from '../../../services/tableservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-resources-association',
  imports: [CommonModule],
  templateUrl: './view-resources-association.component.html',
  styleUrl: './view-resources-association.component.css'
})
export class ViewResourcesAssociationComponent {

  resourceId: any;

  resourcesDetails: any;
  slotulesdetails: any;
  timeslotsdetails: any;

  BookingDetails1
  BookingDetails2: any
  pages: any

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

  openslotloading = false

  constructor(private apiService: ApiserviceService, private route: ActivatedRoute, private Router :Router, private Toast : ToastrService) {
    this.BookingDetails1 = new TableService();
    this.BookingDetails1.initialize(this.BookingDetails2, 10);
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.resourceId = params.get('resource_id');
      console.log('resourceId', this.resourceId);
    });

    const user_id = localStorage.getItem('user_id');

    this.loadResourcesbyID(this.resourceId);
    this.GetSlotRuleforResourcesId(this.resourceId);
    this.GetTimeSlotsByResourceId(this.resourceId);
    this.GetBookingforResourcesbyId(this.resourceId, user_id);
  }


  goback(){
    this.Router.navigateByUrl('/Association/manage-amenities/resources');
  }

  loadResourcesbyID(data: any) {

    this.apiService.getResourcebyId<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.resourcesDetails = res.data;
        }
      },
      error: (err: any) => {
        console.error('Fetch resource failed', err);
      }
    });
  }

  GetSlotRuleforResourcesId(data: any) {

    this.apiService.GetSlotRuleforResourcesId<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {

          this.slotulesdetails = res.data;
          console.log('resource', this.slotulesdetails);
        }
      },
      error: (err: any) => {
        console.error('Fetch resource failed', err);
      }
    });
  }


  GetTimeSlotsByResourceId(data: any) {

    this.apiService.GetTimeSlotsByResourceId<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {

          // IMPORTANT FIX
          this.timeslotsdetails = Array.isArray(res.data) ? res.data : [];

          console.log('resource', this.timeslotsdetails);
        }
      },
      error: (err: any) => {
        console.error('Fetch resource failed', err);
      }
    });
  }

GetBookingforResourcesbyId(data: any, hoa_id: any) {

  this.apiService.GetBookingforResourcesbyId<any>(data, hoa_id).subscribe({
    next: (res: any) => {
      if (res?.success) {

        // 🔥 if no bookings
        if (!res.data || !Array.isArray(res.data) || res.data.length === 0) {
          this.BookingDetails2 = [];
          this.BookingDetails1 = new TableService();
          this.BookingDetails1.initialize([], 6);
          this.pages = [1];
          return;
        }

        // 🔥 if bookings available
        this.BookingDetails2 = res.data.map((b: any) => ({
          ...b,
          timeDisplay: this.formatTimeRange(b.start_time, b.end_time),
          icon: this.getAmenityIcon(b.resource_name)
        }));

        this.BookingDetails1 = new TableService();
        this.BookingDetails1.initialize(this.BookingDetails2, 6);

        this.pages = Array.from(
          { length: this.BookingDetails1.totalPages || 1 },
          (_, i) => i + 1
        );
      }
    }
  });
}

  getDayNames(days: number[]): string[] {
    if (!days) return [];

    const map: any = {
      0: 'Monday',
      1: 'Tuesday',
      2: 'Wednesday',
      3: 'Thursday',
      4: 'Friday',
      5: 'Saturday',
      6: 'Sunday'
    };

    return days.map(d => map[d]);
  }

  isAllDays(days: number[]): boolean {
    if (!days) return false;
    return days.length === 7;
  }

  OpenthebookingslotToday() {
    this.openslotloading = true;
    const payload = {
      resource_id: this.resourceId,
    };
    this.apiService.OpenthebookingslotToday<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.Toast.success(res.message, 'Success');
          this.openslotloading = false;
          this.GetTimeSlotsByResourceId(this.resourceId);
        }
      },
      error: (err: any) => {
            this.Toast.error('Unable to open slot today. Try again another day', 'Failed');
          this.openslotloading = false;
        console.error('Fetch resource failed', err);
      }
    });
  }


  formatTimeRange(start: any, end: any): string {

    const s = new Date(start.$date);
    const e = new Date(end.$date);

    return `${this.formatTime(s)} – ${this.formatTime(e)}`;
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  getAmenityIcon(resourceName: string) {
    return this.amenityIcons[resourceName] || 'assets/icons/amenities/default.png';
  }



  prevPage() {
  if (this.BookingDetails1.currentPage > 1) {
    this.BookingDetails1.goToPage(this.BookingDetails1.currentPage - 1);
  }
}

nextPage() {
  if (this.BookingDetails1.currentPage < this.pages.length) {
    this.BookingDetails1.goToPage(this.BookingDetails1.currentPage + 1);
  }
}
}
