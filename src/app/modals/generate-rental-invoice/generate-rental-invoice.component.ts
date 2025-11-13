import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../services/api/apiservice.service';
import { TableService } from '../../services/tableservice.service';
import { ToastrService } from 'ngx-toastr';
import { OwnerServiceService } from '../../services/owner/owner-service.service';

@Component({
  selector: 'app-generate-rental-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './generate-rental-invoice.component.html',
  styleUrls: ['./generate-rental-invoice.component.css'],
})
export class GenerateRentalInvoiceComponent implements OnInit {
  maintenanceForm!: FormGroup;
  TenantList2: any;
  TenantList1;
  pages: any;
  tableLoading = true;

  propertyNumbers: any;

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private apiService: ApiserviceService,
    private Toast: ToastrService,
    private OwnerService : OwnerServiceService
  ) {
    this.TenantList1 = new TableService();
    this.TenantList1.initialize(this.TenantList2, 4);
  }

  ngOnInit(): void {
    this.maintenanceForm = this.fb.group({
      items: this.fb.array([]),
    });

    this.addItem(); // start with one item row
    this.propertylist();
  }

  // Getter for items array
  get items(): FormArray {
    return this.maintenanceForm.get('items') as FormArray;
  }

  // Add new item
  addItem(): void {
    const itemGroup = this.fb.group({
      propertyNo: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      dueDate: ['', Validators.required], // 👈 added
    });

    this.items.push(itemGroup);
  }

  // Remove item
  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  // Submit
  onSubmit(): void {
    if (this.maintenanceForm.valid) {
      //console.log('this.TenantList2', this.TenantList2);

      const formItems = this.items.value; // get all form array values

      const additionalInvoice = formItems.map((item: any) => ({
        property_id: item.propertyNo,
        description: item.description,
        additional_charges: Number(item.amount),
        due_date: item.dueDate, // 👈 send date to backend
      }));

      const payload = {
        additional_invoice: additionalInvoice,
      };

      this.apiService.RentalInvoicegeninOwner<any>(payload).subscribe({
        next: (res: any) => {
          if (res?.success) {
            this.Toast.success(res.message, 'Success');
            this.OwnerService.triggerRentalGeneratedInvoice(res);
            this.closeModal();
          } else {
            this.Toast.warning(res.message, 'Warning');
            // this.loginbtn = true;
          }
        },
        error: (err: any) => {
          this.Toast.error(err.error.error.error, 'Failed');
          //console.error('Login failed:', err.error.error.data);
          // alert(err.message || 'Login failed, please try again.');
        },
      });
    }
  }

  propertylist() {
    this.apiService.TenantListinOwner<any>().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.TenantList2 = res.data || [];
          // this.filteredProperties = [...this.propertieslist2];

          // Initialize TableService
          this.TenantList1 = new TableService();
          this.TenantList1.initialize(this.TenantList2, 12);

          // If backend provides pagination info
          this.pages = Array.from(
            { length: res.data?.totalPages || 1 },
            (_, i) => i + 1
          );

          this.tableLoading = false;
        } else {
          this.TenantList2 = [];
          this.tableLoading = false;
          //console.warn(res.message || 'Failed to load properties.');
        }
      },
      error: (err: any) => {
        this.TenantList2 = [];
        this.tableLoading = false;
        //console.error('Property list fetch failed:', err);
      },
    });
  }

  closeModal(): void {
    this.modal.close();
  }
}
