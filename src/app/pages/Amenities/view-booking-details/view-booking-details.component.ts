import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-view-booking-details',
  imports: [CommonModule],
  templateUrl: './view-booking-details.component.html',
  styleUrls: ['./view-booking-details.component.css']
})
export class ViewBookingDetailsComponent implements OnInit {
  bookingId: any;
  bookingData: any;
  person: any;

  constructor(
    private apiService: ApiserviceService,
    private route: ActivatedRoute,
    private router: Router,
    private Location : Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookingId = params.get('booking_id');
      this.getBookingDetails();
    });
  }

  goback(){
    this.Location.back();
  }

  getBookingDetails() {
    this.apiService.BookingdetailsbyBookingId<any>(this.bookingId).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.bookingData = res.data;
          this.person = this.bookingData.persons?.[0];
        }
      }
    });
  }

  formatDate(date: any) {
    if (!date) return '';
    return new Date(date.$date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}