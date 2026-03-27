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
  Gatelist2: any

  dropdownOpen = false;
  selectedProperty: string | null = null;
  searchTerm: string = '';
  btnloading = false;

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

    this.getGatelistinQrformExternal(this.associationId)

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
  this.btnloading = true;

  if (this.visitorForm.invalid) {
    this.visitorForm.markAllAsTouched();
    this.btnloading = false;
    return;
  }

  const form = this.visitorForm.value;

  // gate_id from form
  const gateId = form.gate_no;

  // find full gate object
  const gateData = this.Gatelist2.find((g: any) => g._id === gateId);

  const payload = {
    visitor_name: form.full_name,
    visitor_mobile: form.whatsapp,
    visitor_email: '',

    property_id: form.property_id,

    gate: gateData?.gate,
    gate_id: gateData?._id,

    purpose_of_visit: form.reason,
    visitor_count: form.count,
    gender: form.gender,

    exit_time: form.exit_time,
  };

  console.log('Payload Sent:', payload);

  this.apiService.CreateVisitorEntry<any>(payload).subscribe({
    next: (res: any) => {
      this.btnloading = false;

      if (res?.success) {
        this.Toast.success(res.message, 'Success');
        this.visitorForm.reset();
        this.selectedProperty = null;
        this.Router.navigateByUrl('visitor-entry-form-submitted');
      } else {
        this.Toast.warning(res.message, 'Warning');
      }
    },
    error: (err: any) => {
      this.btnloading = false;
      console.error('API Error:', err);
      this.Toast.error(err?.error?.error?.message || 'Failed', 'Failed');
    },
  });
}

     getGatelistinQrformExternal(data : any) {
    this.apiService.getGatelistinQrformExternal<any>(data).subscribe({
      next: (res) => {
        if (res?.success) {
          this.Gatelist2 = res.data;
        } else {
          this.Gatelist2 = [];
        }
      },
      error: (err) => {
        console.log('err', err.error.message);
        this.Gatelist2 = [];
        console.log('err', err);
      },
    });
  }
}
