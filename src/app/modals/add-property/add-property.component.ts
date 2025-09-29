import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-add-property',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export class AddPropertyComponent {
  propertyTypes: string[] = ['Villa', 'Apartment', 'Townhouse'];
  buildingTypes: string[] = ['Tower', 'Block'];
  selectedPropertyType: string = '';
  bhkValue: number | null = null;
  buildingType: string = '';
  tower: string = '';
  block: string = '';
  floor: number | null = null;

  constructor(private Modal: ModalService) {}

  closeModal() {
    this.Modal.close();
  }
}
