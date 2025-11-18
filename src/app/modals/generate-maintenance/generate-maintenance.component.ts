import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { AssociationServiceService } from '../../services/association/association-service.service';

@Component({
  selector: 'app-generate-maintenance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generate-maintenance.component.html',
  styleUrl: './generate-maintenance.component.css',
})
export class GenerateMaintenanceComponent implements OnInit {
  maintenanceForm!: FormGroup;
  @ViewChild('hiddenDatePicker')
  hiddenDatePicker!: ElementRef<HTMLInputElement>;

  propertylist1: any;
  propertylist2: any[] = [];
  filteredList: any[] = [];
  btnloading = false;
  dropdownOpen = false;
  selectedProperty: string | null = null;
  searchTerm = '';
  tableLoading = true;

  todayDate: string = ''; // 🟩 to store min date for date picker

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private Toast: ToastrService,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService
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
    const userdata = JSON.parse(localStorage.getItem('userdata') || '{}');
    const user_type = localStorage.getItem('user_type');
    const user_id = userdata?._id;

    if(user_type == 'owner'){
      this.propertylist()
    }else{
      if (user_id) {
      this.getPropertiesData(user_id);
    }
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
        //console.error('Property list fetch failed:', err);
        this.propertylist2 = [];
        this.filteredList = [];
        this.tableLoading = false;
      },
    });
  }

  propertylist() {
    this.apiService.ownerproperties<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.propertylist2 = res.data || [];
          this.filteredList = [...this.propertylist2];

          // Initialize TableService
          this.propertylist1 = new TableService();
          this.propertylist1.initialize(this.propertylist2, 10);


          this.tableLoading = false;
        } else {
          this.tableLoading = false;
          //console.warn(res.message || 'Failed to load properties.');
        }
      },
      error: (err: any) => {
        this.tableLoading = false;
        //console.error('Property list fetch failed:', err);
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
    this.btnloading = true;

    if (this.maintenanceForm.invalid) {
      this.maintenanceForm.markAllAsTouched();
      this.btnloading = false;
      console.log('New');
      // 🔍 Check if at least one valid item is entered
      const itemsValue = this.items.value;

      // console.log('Items in array:', itemsValue); // (You can check this once)
      const validItems = itemsValue.filter(
        (item: any) =>
          item.description &&
          item.description.trim() !== '' &&
          item.amount &&
          !isNaN(item.amount) &&
          Number(item.amount) > 0
      );

      // 🔥 If all are empty or invalid — show toast
      if (validItems.length === 0) {
        this.items.markAllAsTouched();
        this.btnloading = false;
        this.Toast.info(
          'Please add at least one valid description and amount.',
          ''
        );
        return;
      }
      return;
    }

    // 🔍 Check if at least one valid item is entered
    const itemsValue = this.items.value;

    // console.log('Items in array:', itemsValue); // (You can check this once)
    const validItems = itemsValue.filter(
      (item: any) =>
        item.description &&
        item.description.trim() !== '' &&
        item.amount &&
        !isNaN(item.amount) &&
        Number(item.amount) > 0
    );

    // 🔥 If all are empty or invalid — show toast
    if (validItems.length === 0) {
      this.items.markAllAsTouched();
      this.btnloading = false;
      this.Toast.warning(
        'Please add at least one valid description and amount.',
        'Warning'
      );
      return;
    }

    // ✅ Map valid items to payload format
    const additional_charges = validItems.map((item: any) => ({
      item_name: item.description.trim(),
      charges: Number(item.amount),
    }));

    // ✅ Total amount
    const total_amount = additional_charges.reduce(
      (sum: number, item: any) => sum + item.charges,
      0
    );

    // ✅ Final payload
    const payload = {
      property_id: this.maintenanceForm.value.property_id,
      due_date: this.maintenanceForm.value.due_date,
      additional_charges,
      total_amount,
    };

    this.apiService.generateMaintenanceInvoice<any>(payload).subscribe({
      next: (res: any) => {
        this.btnloading = false;
        if (res?.success) {
          this.Toast.success(res.message, 'Success');
          this.AssociationService.triggerMaintenanceInv(res);
          this.closeModal();
        } else {
          this.Toast.warning(res.message, 'Warning');
        }
      },
      error: (err: any) => {
        this.btnloading = false;
        this.Toast.error(
          err.error?.error?.message || 'Failed to generate maintenance',
          'Failed'
        );
      },
    });
  }

  // ✅ Close modal
  closeModal() {
    this.modal.close();
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

    this.maintenanceForm.get('due_date')?.setValue(formattedDate);
  }

  // 👇 Helper function to format as dd-MMM-yyyy (e.g. 22-Jun-2025)
  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
