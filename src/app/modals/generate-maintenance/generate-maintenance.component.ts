import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { TableService } from '../../services/tableservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-generate-maintenance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generate-maintenance.component.html',
  styleUrl: './generate-maintenance.component.css',
})
export class GenerateMaintenanceComponent implements OnInit {
  maintenanceForm!: FormGroup;

  propertylist1: any;
  propertylist2: any[] = [];
  filteredList: any[] = [];

  dropdownOpen = false;
  selectedProperty: string | null = null;
  searchTerm = '';
  tableLoading = true;

  todayDate: string = ''; // 🟩 to store min date for date picker

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private Toast: ToastrService,
    private apiService: ApiserviceService
  ) {
    this.propertylist1 = new TableService();
  }

  ngOnInit(): void {
    // 🟩 Set min date as today
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];

    // Initialize form
    this.maintenanceForm = this.fb.group({
      property_id: ['', Validators.required],
      due_date: ['', Validators.required], 
      items: this.fb.array([]),
    });

    // Fetch user id from session
    const userdata = JSON.parse(sessionStorage.getItem('userdata') || '{}');
    const user_id = userdata?._id;

    if (user_id) {
      this.getPropertiesData(user_id);
    }

    // Add first item row
    this.addItem();
  }

  // ✅ Fetch property list API
  getPropertiesData(user_id: any) {
    this.apiService.propertiesbyAssociation<any>(user_id).subscribe({
      next: (res: any) => {
        if (res?.success && Array.isArray(res.data)) {
          this.propertylist2 = res.data;
          this.filteredList = [...this.propertylist2];
        } else {
          this.propertylist2 = [];
          this.filteredList = [];
        }
        this.tableLoading = false;
      },
      error: (err: any) => {
        console.error('Property list fetch failed:', err);
        this.propertylist2 = [];
        this.filteredList = [];
        this.tableLoading = false;
      },
    });
  }

  // ✅ Dropdown toggle
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // ✅ Select property
  selectProperty(property: any) {
    this.selectedProperty = property.property_no;
    this.maintenanceForm.get('property_id')?.setValue(property._id);
    this.dropdownOpen = false;
    this.searchTerm = '';
  }

  // ✅ Search filter
  onSearchChange(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.searchTerm = input;

    if (!input) {
      this.filteredList = [...this.propertylist2];
      return;
    }

    this.filteredList = this.propertylist2.filter((prop) =>
      prop.property_no.toLowerCase().includes(input)
    );
  }

  // ✅ Get items form array
  get items(): FormArray {
    return this.maintenanceForm.get('items') as FormArray;
  }

  // ✅ Add item
  addItem() {
    const itemGroup = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.items.push(itemGroup);
  }

  // ✅ Remove item
  removeItem(index: number) {
    this.items.removeAt(index);
  }

  // ✅ Submit
  onSubmit() {
    if (this.maintenanceForm.valid) {
      const payload = {
        property_id: this.maintenanceForm.value.property_id,
        duedate: this.maintenanceForm.value.due_date,
        additional_charges: [
          {
            item_name: this.maintenanceForm.value.model,
            charges: this.maintenanceForm.value.vehicleNumber,
          },
        ],
      };

      this.apiService.generateMaintenanceInvoice<any>(payload).subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.Toast.success(res.message, 'Success');
            // this.AssociationService.triggerAssociationOwner(res);
            this.closeModal();
          } else {
            this.Toast.warning(res.message, 'Warning');
            // this.loginbtn = true;
          }
        },
        error: (err: any) => {
          this.Toast.error(err.error.error.message, 'Failed');
          console.error('Login failed:', err.error.error.data);
          // alert(err.message || 'Login failed, please try again.');
        },
      });
      // this.closeModal();
    } else {
      this.maintenanceForm.markAllAsTouched();
    }
  }

  // ✅ Close modal
  closeModal() {
    this.modal.close();
  }
}
