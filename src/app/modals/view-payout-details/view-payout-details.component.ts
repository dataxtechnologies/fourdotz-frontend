import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-view-payout-details',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe, SlicePipe, TitleCasePipe],
  templateUrl: './view-payout-details.component.html',
  styleUrl: './view-payout-details.component.css'
})
export class ViewPayoutDetailsComponent implements OnInit {
  @Input() request: any;

  lightboxUrl: string | null = null;
  user_type = localStorage.getItem('user_type');

  constructor(private modal : ModalService) { }

  ngOnInit(): void {
    console.log('ViewPayoutDetailsComponent', this.request);
  }

  getFileName(url: string): string {
    try {
      const raw = url.split('/').pop() || 'file';
      return raw.replace(/^\d{14}_/, '');
    } catch {
      return 'attachment';
    }
  }

  viewAttachment(url: string): void {
    this.lightboxUrl = url;
  }

  closeLightbox(): void {
    this.lightboxUrl = null;
  }


  closeModal() {
    this.modal.close();
  }

  downloadAttachment(url: string): void {
    const a = document.createElement('a');
    a.href = url;
    a.download = this.getFileName(url);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const wrap = img.closest('.attach-thumb') as HTMLElement;
    if (wrap) {
      wrap.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#9ca3af;font-size:20px;"><i class="bx bx-image-alt"></i></div>`;
    }
  }
}