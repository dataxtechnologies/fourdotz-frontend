import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-bookings-in-owner',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-bookings-in-owner.component.html',
  styleUrl: './list-bookings-in-owner.component.css'
})
export class ListBookingsInOwnerComponent {
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
      amenitiesName: [''],
    });

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());

    const user_id = localStorage.getItem('user_id');
    this.GetBookinginOwner(user_id);
  }



  viewbookingdetails(data :any) {
    this.router.navigateByUrl(`/Owner/amenities/book-amenities/booking-details/${data}`);
  }

  bookamenities(){
    const user_type = localStorage.getItem('user_type');
    if (user_type === 'owner') {
      this.router.navigateByUrl(`/Owner/amenities/book-amenities/book-now`);
      return;
    }else if (user_type === 'tenant') {
      this.router.navigateByUrl(`/Tenant/amenities/book-amenities/book-now`);
      return;
    }
  }



  applyFilters() {
    const { amenitiesName } = this.filterForm.value;

    this.filteredProperties = this.BookingData2.filter((p: any) => {
      return (

        (!amenitiesName ||
          p.resource_name?.toLowerCase().includes(amenitiesName.toLowerCase()))
      );
    });
  }

  resetFilters() {
    this.filterForm.reset({
      association: '',
      residentType: '',
      propertyNo: '',
    });

    this.filteredProperties = [...this.BookingData2];
  }

  GetBookinginOwner(data : any) {

    this.ApiService.GetBookinginOwner<any>(data).subscribe({
      next: (res: any) => {
        if (res?.success) {

          this.BookingData2 = res.data;
          console.log('resource', this.BookingData2);
          this.filteredProperties = [...this.BookingData2];
          this.BookingData1 = new TableService();
          this.BookingData1.initialize(this.BookingData2, 10);

          this.pages = Array.from(
            { length: res.data?.totalPages || 1 },
            (_, i) => i + 1,
          );

        }
      },
      error: (err: any) => {
        console.error('Fetch resource failed', err);
      }
    });
  }

getAmount(amount: any): number {
  if (!amount || amount.toLowerCase() === 'free') return 0;
  return Number(amount);
}

formatDate(date: any) {
  if (!date) return '';
  return new Date(date.$date).toLocaleDateString('en-IN');
}

formatTime(date: any) {
  if (!date) return '';
  return new Date(date.$date).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });
}
}
