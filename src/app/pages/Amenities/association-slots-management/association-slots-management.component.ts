import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';

@Component({
  selector: 'app-association-slots-management',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './association-slots-management.component.html',
  styleUrl: './association-slots-management.component.css'
})
export class AssociationSlotsManagementComponent {
  // /Owner/amenities/book-amenities/book-now/:resourceId
  tableLoading = false
  filterForm!: FormGroup;
  filteredProperties: any = [];
  resourceId: any;
  pages: any

  BookingData1
  BookingData2: any

  constructor(private ActiveRoute: ActivatedRoute, private router: Router, private ApiService: ApiserviceService, private fb: FormBuilder) {
    this.BookingData1 = new TableService();
    this.BookingData1.initialize(this.BookingData2, 10);
  }

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      propertyNo: [''],
      residentName: [''],
      mobile: [''],
      amenitiesName: [''],
      bookingDate: [''],
      paymentStatus: [''],
      bookingStatus: ['']
    });

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());

    const user_id = localStorage.getItem('user_id');
    this.GetBookingforAssociation(user_id);
  }



  viewbookingdetails(data: any) {
    this.router.navigateByUrl(`/Owner/amenities/book-amenities/booking-details/${data}`);
  }

  bookamenities() {
    this.router.navigateByUrl(`/Owner/amenities/book-amenities/book-now`);
  }



  applyFilters() {
  const {
    amenitiesName = '',
    propertyNo = '',
    residentName = '',
    mobile = '',
    bookingDate = '',
    paymentStatus = '',
    bookingStatus = ''
  } = this.filterForm.value;

  this.filteredProperties = this.BookingData2.filter((p: any) => {

    const person = p.persons?.[0] || {};

    const formattedDate = p.start_time
      ? new Date(p.start_time.$date).toISOString().split('T')[0]
      : '';

    return (
      (!amenitiesName ||
        p.resource_name?.toLowerCase().includes(amenitiesName.toLowerCase())) &&

      (!propertyNo ||
        p.property_no?.toLowerCase().includes(propertyNo.toLowerCase())) &&

      (!residentName ||
        person.name?.toLowerCase().includes(residentName.toLowerCase())) &&

      (!mobile ||
        person.mobile?.toString().includes(mobile)) &&

      (!bookingDate ||
        formattedDate === bookingDate) &&

      (!paymentStatus ||
        p.payment_status?.toLowerCase() === paymentStatus.toLowerCase()) &&

      (!bookingStatus ||
        p.booking_status?.toLowerCase() === bookingStatus.toLowerCase())
    );
  });

  this.BookingData1.initialize(this.filteredProperties, 10);
}




resetFilters() {
  this.filterForm.reset({
    propertyNo: '',
    residentName: '',
    mobile: '',
    amenitiesName: '',
    bookingDate: '',
    paymentStatus: '',
    bookingStatus: ''
  });

  this.filteredProperties = [...this.BookingData2];
  this.BookingData1.initialize(this.filteredProperties, 10);
}



  GetBookingforAssociation(hoa_id: any) {

    this.ApiService.GetBookingforAssociation<any>(hoa_id).subscribe({
      next: (res: any) => {
        if (res?.success) {

          this.BookingData2 = res.data;
          console.log('resource', this.BookingData2);
          this.BookingData1 = new TableService();
          this.BookingData1.initialize(this.BookingData2, 10);
          this.filteredProperties = [...this.BookingData2];

          this.pages = Array.from(
            { length: res.data?.totalPages || 1 },
            (_, i) => i + 1,
          );
        }
      }
    });
  }

  getAmount(amount: any): number {
    if (!amount || amount.toLowerCase() === 'free') return 0;
    return Number(amount);
  }

  formatDate(date: any) {
    if (!date) return '';
    return new Date(date.$date).toISOString().split('T')[0];
  }

  formatTime(date: any) {
    if (!date) return '';
    return new Date(date.$date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
