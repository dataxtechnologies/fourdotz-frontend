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

  // 👇 NEW: Sidebar toggle state
  sidebarOpen: boolean = false;

  constructor(private Modal: ModalService) {}

  ngOnInit(): void {
    if (this.PinnedAnnouncement?.length > 0) {
      this.activePost = this.PinnedAnnouncement[0];
    } else {
      this.activePost = null;
    }
  }

  // ⭐ SELECT POST
  setActive(post: any) {
    this.activePost = post;

    // ⭐ Auto-close sidebar on mobile/tablet
    if (window.innerWidth <= 1024) {
      this.sidebarOpen = false;
    }
  }

  // ⭐ Toggle Sidebar (For Mobile / Tablet)
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // ⭐ Close Sidebar when clicking overlay
  closeSidebar() {
    this.sidebarOpen = false;
  }

  // ⭐ Close Modal
  closeModal() {
    this.Modal.close();
  }

  // ⭐ Detect image file
  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|webp)$/i.test(url);
  }

  // ⭐ Detect video file
  isVideo(url: string): boolean {
    return /\.(mp4|mkv|mov)$/i.test(url);
  }
}
