import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
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
  selector: 'app-spot-visitor-entry',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './spot-visitor-entry.component.html',
  styleUrl: './spot-visitor-entry.component.css',
})
export class SpotVisitorEntryComponent implements OnInit {
  associationId1: any[] = [];
  filteredList: any[] = [];
  Gatelist2: any[] = [];

  @ViewChild('hiddenDatePicker')
  hiddenDatePicker!: ElementRef<HTMLInputElement>;

  visitorForm!: FormGroup;

  dropdownOpen = false;
  selectedProperty: string | null = null;
  searchTerm = '';
  submitbtnloading = false;

  constructor(
    private modal: ModalService,
    private fb: FormBuilder,
    private apiService: ApiserviceService,
    private toast: ToastrService,
    private AssociationService :AssociationServiceService
  ) {}

  ngOnInit(): void {
    this.getpropertiesdata();
    this.listGate();

    this.visitorForm = this.fb.group({
      property_id: ['', Validators.required],

      visitor_name: ['', Validators.required],
      visitor_email: [''],
      visitor_mobile: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],

      gate: ['', Validators.required],
      purpose_of_visit: ['', Validators.required],
      visitor_count: [1, [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],

      ownedAt: ['', Validators.required], // exit_time UI field
    });
  }

  /* ---------------- PROPERTY DROPDOWN ---------------- */

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (!this.dropdownOpen) {
      this.searchTerm = '';
      this.filteredList = [...this.associationId1];
    }
  }

  selectProperty(property: any) {
    this.selectedProperty = property.property_no;
    this.visitorForm.get('property_id')?.setValue(property._id);
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

  /* ---------------- DATE PICKER ---------------- */

  openDatePicker(): void {
    this.hiddenDatePicker.nativeElement.showPicker();
  }

  onDateSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.value) return;

    this.visitorForm.get('ownedAt')?.setValue(input.value);
  }

  /* ---------------- API CALLS ---------------- */

  getpropertiesdata() {
    this.apiService.GetPropertyData<any>().subscribe({
      next: (res: any) => {
        if (res?.success && Array.isArray(res.data)) {
          this.associationId1 = res.data;
          this.filteredList = [...this.associationId1];
        } else {
          this.associationId1 = [];
          this.filteredList = [];
        }
      },
      error: () => {
        this.associationId1 = [];
        this.filteredList = [];
      },
    });
  }

  listGate() {
    this.apiService.listGate<any>().subscribe({
      next: (res: any) => {
        this.Gatelist2 = res?.success ? res.data : [];
      },
      error: (err: any) => {
        console.error('Gate list error:', err);
        this.Gatelist2 = [];
      },
    });
  }

  /* ---------------- SUBMIT ---------------- */

  onSubmit(): void {
    if (this.visitorForm.invalid) {
      this.visitorForm.markAllAsTouched();
      return;
    }

    this.submitbtnloading = true;

    // gate_id from form
    const gateId = this.visitorForm.value.gate;

    // ✅ find full gate object
    const gateData = this.Gatelist2.find((g: any) => g._id === gateId);

    if (!gateData) {
      this.toast.error('Invalid gate selected');
      this.submitbtnloading = false;
      return;
    }

    const payload = {
      visitor_name: this.visitorForm.value.visitor_name,
      visitor_mobile: this.visitorForm.value.visitor_mobile,
      visitor_email: this.visitorForm.value.visitor_email || '',

      property_id: this.visitorForm.value.property_id,

      // ✅ derived correctly
      gate: gateData.gate,
      gate_id: gateData._id,

      purpose_of_visit: this.visitorForm.value.purpose_of_visit,
      visitor_count: this.visitorForm.value.visitor_count,
      gender: this.visitorForm.value.gender,

      exit_time: this.visitorForm.value.ownedAt,
    };
    console.log('payload', payload);

    // 🔥 Uncomment when API ready
    
    this.apiService.AddSpotVisitorinGateKeeper<any>(payload).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.submitbtnloading = false;
          this.AssociationService.triggerGatekeeperAdded(res);
          this.toast.success(res.message, 'Success');
          this.closeModal();
        } else {
          this.submitbtnloading = false;
          this.toast.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        this.submitbtnloading = false;
        this.toast.error(err?.error?.message || 'Failed');
      },
    });
    
  }

  closeModal() {
    this.modal.close();
  }
}
