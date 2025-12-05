import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-view-all-pinned-announcements',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './view-all-pinned-announcements.component.html',
  styleUrl: './view-all-pinned-announcements.component.css',
})
export class ViewAllPinnedAnnouncementsComponent {
  @Input() PinnedAnnouncement: any = [];

  activePost: any = null;

  constructor(private Modal: ModalService) {}

  ngOnInit(): void {
    if (this.PinnedAnnouncement?.length > 0) {
      this.activePost = this.PinnedAnnouncement[0];
    } else {
      this.activePost = null;
    }
  }

  setActive(post: any) {
    this.activePost = post;
  }

  // Detect image file
  closeModal() {
    this.Modal.close();
  }

  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|webp)$/i.test(url);
  }

  isVideo(url: string): boolean {
    return /\.(mp4|mkv|mov)$/i.test(url);
  }
}
