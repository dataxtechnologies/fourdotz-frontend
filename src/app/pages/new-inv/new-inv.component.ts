import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-inv',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-inv.component.html',
  styleUrl: './new-inv.component.css',
})
export class NewInvComponent {
  isPaid: boolean = false; // ✅ Toggle this to show/hide watermark

  invoiceItems = [
    {
      sno: 1,
      type: 'Rent Invoice',
      amount: '20,000.00',
      desc: 'Invoice generated for the Rent for November',
      total: '20,000.00',
    },
  ];

  totalVisibleRows = 11;

  get fillerRows() {
    const emptyCount = this.totalVisibleRows - this.invoiceItems.length;
    return Array(emptyCount > 0 ? emptyCount : 0);
  }

  get totalAmount() {
    return this.invoiceItems
      .reduce((sum, item) => sum + parseFloat(item.total.replace(/,/g, '')), 0)
      .toLocaleString();
  }
}
