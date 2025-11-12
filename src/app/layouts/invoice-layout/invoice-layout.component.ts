import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-invoice-layout',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './invoice-layout.component.html',
  styleUrl: './invoice-layout.component.css'
})
export class InvoiceLayoutComponent {

}
