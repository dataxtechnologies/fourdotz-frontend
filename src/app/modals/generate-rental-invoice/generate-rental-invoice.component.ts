import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-generate-rental-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './generate-rental-invoice.component.html',
  styleUrls: ['./generate-rental-invoice.component.css'],
})
export class GenerateRentalInvoiceComponent implements OnInit {
  maintenanceForm!: FormGroup;

  propertyNumbers: string[] = [
    'H101',
    'H102',
    'H103',
    'H104',
    'H105',
    'H106',
    'H107',
    'H108',
    'H109',
    'H110',
    'H111',
    'H112',
    'H113',
    'H114',
    'H115',
  ];

  constructor(private fb: FormBuilder, private modal: ModalService) {}

  ngOnInit(): void {
    this.maintenanceForm = this.fb.group({
      penaltyPercentage: ['', Validators.required],
      items: this.fb.array([]),
    });

    this.addItem(); // start with one item row
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
      console.log('Form Data:', this.maintenanceForm.value);
      // Example output:
      // {
      //   penaltyPercentage: '10',
      //   items: [
      //     { propertyNo: 'H101', description: 'Water Bill', amount: 500 },
      //     { propertyNo: 'H102', description: 'Electricity', amount: 1000 }
      //   ]
      // }
      this.closeModal();
    }
  }

  closeModal(): void {
    this.modal.close();
  }
}
