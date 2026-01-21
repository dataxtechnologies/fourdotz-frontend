import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  association = {
    property_name: 'Wowelse-internal association',
    mobile: '9361280082',
    email: 'fourdotz.datax@gmail.com',
    property_type: ['villa', 'apartment', 'townhouse'],
    invitation_status: true,
  };

  properties = [
    {
      name: 'Wowelse-internal association',
      number: 'F100',
      type: 'Villa',
      facing: 'North',
    },
  ];
}
