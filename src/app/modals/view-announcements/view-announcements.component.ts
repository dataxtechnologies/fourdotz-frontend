import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-view-announcements',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './view-announcements.component.html',
  styleUrl: './view-announcements.component.css'
})
export class ViewAnnouncementsComponent {

  @Input() Postdetails: any;

  constructor(private modal: ModalService){}

  ngOnInit(): void {
    console.log('Postdetails:', this.Postdetails);
  }

  closeModal() {
    this.modal.close()
  }

  isImage(url: string): boolean {
  return /\.(jpg|jpeg|png|webp)$/i.test(url);
}

isVideo(url: string): boolean {
  return /\.(mp4|mov|avi|mkv|webm)$/i.test(url);
}

}
