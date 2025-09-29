import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-generate-maintenance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generate-maintenance.component.html',
  styleUrl: './generate-maintenance.component.css',
})
export class GenerateMaintenanceComponent {
  maintenanceForm!: FormGroup;

  constructor(private fb: FormBuilder, private modal: ModalService) {}

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

    dropdownOpen = false;
  selectedProperty: string | null = null;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


    selectProperty(prop: string) {
    this.selectedProperty = prop;
    this.dropdownOpen = false;
  }

  ngOnInit(): void {
    this.maintenanceForm = this.fb.group({
      // maintenanceAmount: ['1500', Validators.required],
      penaltyPercentage: ['', Validators.required],
      items: this.fb.array([]), // dynamic items
    });

    this.addItem()
  }

  // Getter for items array
  get items(): FormArray {
    return this.maintenanceForm.get('items') as FormArray;
  }

  // Add new item
  addItem() {
    const itemGroup = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.items.push(itemGroup);
  }

  // Remove item
  removeItem(index: number) {
    this.items.removeAt(index);
  }

  // Submit
  onSubmit() {
    if (this.maintenanceForm.valid) {
      console.log('Form Data:', this.maintenanceForm.value);
      // you can send this.maintenanceForm.value to API
      this.closeModal();
    }
  }

  closeModal() {
    this.modal.close();
  }
}
