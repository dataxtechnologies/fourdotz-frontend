import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visitors-entry-form-to-visitor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './visitors-entry-form-to-visitor.component.html',
  styleUrl: './visitors-entry-form-to-visitor.component.css',
})
export class VisitorsEntryFormToVisitorComponent implements OnInit {
  visitorForm!: FormGroup;
  associationId: any;

  dropdownOpen = false;
  selectedProperty: string | null = null;
  searchTerm: string = '';

  propertyList: any[] = [];
  filteredList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private Router : Router
  ) {}

  ngOnInit(): void {
    // Extract associationId from URL
    this.associationId = this.route.snapshot.paramMap.get('associationId');
    console.log('Association ID:', this.associationId);

    // Load association properties
    this.ListpropertybasedonAssociationIdtoVisitors();

    // Build form
    this.visitorForm = this.fb.group({
      full_name: ['', Validators.required],
      whatsapp: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      gender: ['', Validators.required],
      property_id: ['', Validators.required], // IMPORTANT
      gate_no: ['', Validators.required],
      count: ['', Validators.required],
      reason: ['', Validators.required],
      exit_time: ['', Validators.required],
    });
  }

  get f() {
    return this.visitorForm.controls;
  }

  // ------------------ DROPDOWN LOGIC -----------------------
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;

    if (!this.dropdownOpen) {
      this.searchTerm = '';
      this.filteredList = [...this.propertyList];
    }
  }

  onSearchChange(event: Event) {
    const term = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.searchTerm = term;

    if (!term) {
      this.filteredList = [...this.propertyList];
      return;
    }

    this.filteredList = this.propertyList.filter((prop: any) =>
      prop.property_no.toLowerCase().includes(term)
    );
  }

  selectProperty(property: any) {
    this.selectedProperty = property.property_no;
    this.visitorForm.get('property_id')?.setValue(property._id);
    this.dropdownOpen = false;
    this.searchTerm = '';
  }

  // ------------------ API CALL ----------------------------
  ListpropertybasedonAssociationIdtoVisitors() {
    this.apiService
      .ListpropertybasedonAssociationIdtoVisitors<any>(this.associationId)
      .subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.propertyList = res.data;
            this.filteredList = [...this.propertyList];
          } else {
            alert('Failed to load properties');
          }
        },
        error: () => {
          alert('Error fetching properties');
        },
      });
  }

  // ------------------ SUBMIT ------------------------------
  submitVisitorForm() {
    if (this.visitorForm.invalid) {
      this.visitorForm.markAllAsTouched();
      return;
    }

    const form = this.visitorForm.value;

    const payload = {
      visitor_name: form.full_name,
      gate: form.gate_no,
      visitor_mobile: form.whatsapp,
      visitor_email: '', // optional, send empty if not needed
      purpose_of_visit: form.reason,
      property_id: form.property_id,
      visitor_count: form.count,
      exit_time: form.exit_time,
      gender: form.gender,
    };

    console.log('Payload Sent:', payload);

    this.apiService.CreateVisitorEntry<any>(payload).subscribe({
      next: (res: any) => {
        console.log('API Response:', res);

        if (res?.success) {
          this.Toast.success(res.message, 'Success');
          this.visitorForm.reset();
          this.Router.navigateByUrl('visitor-entry-form-submitted');
          this.selectedProperty = null;
        } else {
         this.Toast.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        console.error('API Error:', err);
        this.Toast.error(err.error.error.message, 'Failed');
      },
    });
  }
}
