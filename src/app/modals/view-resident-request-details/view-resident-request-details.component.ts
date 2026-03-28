import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-view-resident-request-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-resident-request-details.component.html',
  styleUrl: './view-resident-request-details.component.css'
})
export class ViewResidentRequestDetailsComponent {

  @Input() request: any;

  constructor(private modal: ModalService) { }


  closeModal(): void {
    this.modal.close();
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  formatLabel(text: string): string {
    return text
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }
  openDocument(url: string): void {
    window.open(url, '_blank');
  }
  downloadDocument(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }



}
