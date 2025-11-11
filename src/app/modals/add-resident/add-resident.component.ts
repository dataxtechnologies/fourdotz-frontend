import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-add-resident',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-resident.component.html',
  styleUrls: ['./add-resident.component.css'],
})
export class AddResidentComponent implements OnInit {
  associationId1: any; // array of property objects
  @ViewChild('hiddenDatePicker')
  hiddenDatePicker!: ElementRef<HTMLInputElement>;
  ownerForm!: FormGroup;
  submitbtnloading = false
  dropdownOpen = false;
  selectedProperty: string | null = null;
  searchTerm: string = '';
  filteredList: any[] = []; // property objects for dropdown
  submitbtn: boolean = true;

  constructor(
    private Modal: ModalService,
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private AssociationService: AssociationServiceService
  ) {}

  ngOnInit(): void {

    this.getpropertiesdata()
    // Initialize filtered list with all properties
    this.filteredList = [...this.associationId1];

    // Initialize form
    this.ownerForm = this.fb.group({
      property_id: ['', Validators.required], // store selected _id
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      ownedAt: ['', Validators.required],
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (!this.dropdownOpen) {
      this.searchTerm = '';
      this.filteredList = [...this.associationId1];
    }
  }

  selectProperty(property: any) {
    this.selectedProperty = property.property_no; // show property_no in UI
    this.ownerForm.get('property_id')?.setValue(property._id); // set _id in form
    this.dropdownOpen = false;
    this.searchTerm = '';
  }

  onSearchChange(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.searchTerm = input;

    if (!input) {
      this.filteredList = [...this.associationId1];
      return;
    }

    this.filteredList = this.associationId1.filter((prop: any) =>
      prop.property_no.toLowerCase().includes(input)
    );
  }

  closeModal() {
    this.Modal.close();
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

    this.ownerForm.get('ownedAt')?.setValue(formattedDate);
  }

  // 👇 Helper function to format as dd-MMM-yyyy (e.g. 22-Jun-2025)
  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

 getpropertiesdata() {
  this.apiService.PropertyListinAssociation<any>().subscribe({
    next: (res: any) => {
      if (res?.success && Array.isArray(res.data)) {
        // ✅ Filter out properties that already have a resident_type = 'owner' or 'tenant'
        this.associationId1 = res.data.filter(
          (prop: any) =>
            !prop.resident_type || prop.resident_type === '' // keep only those without resident_type
        );

        // Initialize filtered list for dropdown
        this.filteredList = [...this.associationId1];
      } else {
        this.associationId1 = [];
        this.filteredList = [];
      }
    },
    error: (err: any) => {
      console.error('Property list fetch failed:', err);
      this.associationId1 = [];
      this.filteredList = [];
    },
  });
}
  onSubmit(): void {
    this.submitbtnloading = true;
    if (this.ownerForm.invalid) {
      this.ownerForm.markAllAsTouched();
      this.submitbtnloading = false;
      return;
    }

    const payload = {
      name: this.ownerForm.get('firstName')?.value,
      last_name: this.ownerForm.get('lastName')?.value,
      email: this.ownerForm.get('email')?.value,
      mobile: this.ownerForm.get('phone')?.value,
      owner_owned_date: this.ownerForm.get('ownedAt')?.value,
      property_id: this.ownerForm.get('property_id')?.value, // send _id
    };

    //console.log('✅ Payload:', payload);

    this.apiService.createownerinproperty<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.submitbtnloading = false;
          this.Toast.success(res.message, 'Success');
          this.AssociationService.triggerAssociationOwner(res);
          this.AssociationService.triggerAdminAssociation(res);
          this.closeModal();
        } else {
          this.submitbtnloading = false;
          this.Toast.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        this.submitbtnloading = false;
        this.Toast.error(err.error.error.message, 'Failed');
        //console.error('Request failed:', err);
      },
    });
  }
}
