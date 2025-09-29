import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'ngx-modal-ease';
import { AddPropertyComponent } from '../../../modals/add-property/add-property.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-properties',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './owner-properties.component.html',
  styleUrl: './owner-properties.component.css'
})
export class OwnerPropertiesComponent {


   filterForm!: FormGroup;

  associations: string[] = ['Association A', 'Association B', 'Association C'];

  properties = [
    { no: 'H101', type: 'Apartment',association:'Lakeview', area: '1000 sq.ft', bhk: '2BHK', residentType: 'Owner'},
    { no: 'H102', type: 'Villa',association:'Riverside', area: '1800 sq.ft', bhk: '3BHK', residentType: 'Tenant' },
    { no: 'H103', type: 'Apartment',association:'Lakeview', area: '1200 sq.ft', bhk: '2BHK', residentType: 'Owner'},
  ];

  filteredProperties = [...this.properties];


  constructor(private ModalService: ModalService, private route: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      association: [''],
      residentType: [''],
      propertyNo: ['']
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters() {
    const { association, residentType, propertyNo } = this.filterForm.value;

    this.filteredProperties = this.properties.filter(p => {
      return (
        (!association || p.association === association) &&
        (!residentType || p.residentType === residentType) &&
        (!propertyNo || p.no.toLowerCase().includes(propertyNo.toLowerCase()))
      );
    });
  }

  resetFilters() {
    this.filterForm.reset();
    this.filteredProperties = [...this.properties];
  }




   

  Addproperty() {
    this.ModalService.open(AddPropertyComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: {
        click: false,
        escape: false,
      },
    });
  }

  viewproperty(data : any){
    this.route.navigateByUrl(`Owner/view-properties/${data}`)
  }


}
