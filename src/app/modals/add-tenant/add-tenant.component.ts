import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';
import { OwnerServiceService } from '../../services/owner/owner-service.service';

@Component({
  selector: 'app-add-tenant',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-tenant.component.html',
  styleUrl: './add-tenant.component.css',
})
export class AddTenantComponent {
  @Input() PropertyIddata!: any
  @ViewChild('hiddenDatePicker') hiddenDatePicker!: ElementRef<HTMLInputElement>;
  submitbtn: boolean = true;
  formattedDate: string = '';
  showDatePicker = false;
  days = Array.from({ length: 28 }, (_, i) => this.getOrdinal(i + 1));
  dropdownOpen = false;
  selectedProperty: string | null = null;
  searchTerm: string = '';
  filteredList: any[] = []; // property objects for dropdown
  constructor(private Modal: ModalService, private fb: FormBuilder, private apiService: ApiserviceService, private Toast: ToastrService, private AssociationService: AssociationServiceService,
    private OwnerService: OwnerServiceService

  ) { }

  closeModal() {
    this.Modal.close();
  }

  getOrdinal(day: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = day % 100;
    return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  tenantForm!: FormGroup;

  ngOnInit(): void {
this.tenantForm = this.fb.group({
  property_id: ['', Validators.required],   // 🔥 mandatory
  firstName: ['', [Validators.required, Validators.minLength(2)]],
  lastName: ['', [Validators.required, Validators.minLength(1)]],
  email: ['', [Validators.required,  Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}$/)]],
  phone: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
  rentedAt: ['', Validators.required],
  monthly_rent_due_date: ['', Validators.required],
  advancePaid: ['', [Validators.required, Validators.min(0)]],
  estimatedRent: ['', [Validators.required, Validators.min(0)]],
  maintenancePaidBy: ['', Validators.required]
});
    console.log('PropertyIddata', this.PropertyIddata);
 // 🔥 if property already passed
  if (this.PropertyIddata) {

    this.tenantForm.patchValue({
      property_id: this.PropertyIddata
    });

    // fetch property name for display
    this.loadPropertyDetails(this.PropertyIddata);

  } else {

    // user must choose property
    this.ListPropertyNotresidentedbyTenantinOwner();
  }

  }



  selectProperty(property: any) {

  this.selectedProperty = property.property_no;

  this.tenantForm.patchValue({
    property_id: property._id
  });

  this.dropdownOpen = false;
}


onSearchChange(event: any) {

  const value = event.target.value.toLowerCase();

  this.filteredList = this.filteredList.filter((property: any) =>
    property.property_no.toLowerCase().includes(value)
  );
}

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}


  loadPropertyDetails(propertyId: string) {

  this.apiService.getpropertydatabyid(propertyId).subscribe({
    next: (res: any) => {
      if (res?.success) {
        this.selectedProperty = res.data.property_no;
      }
    }
  });

}

  openDatePicker(): void {
    this.hiddenDatePicker.nativeElement.showPicker();
  }

  // 👇 Handle date selection and format the date
  onDateSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.value) return;

    const selectedDate = new Date(input.value);
    const formattedDate = this.formatDate(selectedDate);

    this.tenantForm.get('rentedAt')?.setValue(formattedDate);
  }

  // 👇 Helper function to format as dd-MMM-yyyy (e.g. 22-Jun-2025)
  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

ListPropertyNotresidentedbyTenantinOwner() {
  this.apiService.ListPropertyNotresidentedbyTenantinOwner<any>().subscribe({
    next: (res: any) => {
      if (res?.success && Array.isArray(res.data)) {

        this.filteredList = res.data;   // 🔥 bind dropdown data

      } else {
        this.filteredList = [];
      }
    },
    error: () => {
      this.filteredList = [];
    }
  });
}


  onSubmit(): void {
    this.submitbtn = false;
    if (this.tenantForm.invalid) {
      this.submitbtn = true;
      this.tenantForm.markAllAsTouched();
      return;
    }


    const payload = {
      name: this.tenantForm.get('firstName')?.value,
      last_name: this.tenantForm.get('lastName')?.value,
      email: this.tenantForm.get('email')?.value,
      mobile: this.tenantForm.get('phone')?.value,
      rented_at: this.tenantForm.get('rentedAt')?.value,
      advance_amount: this.tenantForm.get('advancePaid')?.value,
      monthly_rent_amount: this.tenantForm.get('estimatedRent')?.value,
      monthly_rent_due_date: this.tenantForm.get('monthly_rent_due_date')?.value,
      maintenance_paid_by: this.tenantForm.get('maintenancePaidBy')?.value,
      property_id: this.tenantForm.get('property_id')?.value,
    };

    //console.log('✅ Payload:', payload);
    this.apiService.createTenantinproperty<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.submitbtn = true
          this.Toast.success(res.message, 'Success')
          this.AssociationService.triggerAssociationOwner(res);
          this.OwnerService.triggerTenantAdd(res);
          this.closeModal();
        } else {
          this.submitbtn = true
          this.Toast.warning(res.message, 'Warning')
          // this.loginbtn = true;
        }
      },
      error: (err: any) => {
        this.submitbtn = true
        this.Toast.error(err.error.error.message, 'Failed')
        //console.error('Login failed:', err.error.error.data);
        // alert(err.message || 'Login failed, please try again.');
      },
    });
  }
}
