import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-add-resident',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-resident.component.html',
  styleUrl: './add-resident.component.css',
})
export class AddResidentComponent {
  propertyTypes: string[] = ['Villa', 'Apartment', 'Townhouse'];
  residentType: any;
  selectedPropertyType: string = '';
  bhkValue: number | null = null;
  buildingType: string = '';
  tower: string = '';
  block: string = '';
  floor: number | null = null;

  dropdownOpen = false;
  selectedProperty: string | null = null;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectProperty(prop: string) {
    this.selectedProperty = prop;
    this.dropdownOpen = false;
  }

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

  constructor(private Modal: ModalService) {}

  closeModal() {
    this.Modal.close();
  }
}
