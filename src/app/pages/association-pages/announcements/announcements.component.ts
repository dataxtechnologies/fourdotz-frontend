import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from 'ngx-modal-ease';
import { CreateAnnouncementComponent } from '../../../modals/create-announcement/create-announcement.component';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class Announcementcomponent implements OnInit {
  posts: any[] = [];
  pinnedannouncement: any[] = [];

  selectedEmoji: { [key: number]: string } = {};

  loadingPosts = true; // 🔹 skeleton for posts
  loadingPinned = true; // 🔹 skeleton for pinned posts

  pinnedAnnouncement1;
  pinnedAnnouncement2: any;

  constructor(
    private ModalService: ModalService,
    private apiService: ApiserviceService
  ) {
    this.pinnedAnnouncement1 = new TableService();
    this.pinnedAnnouncement1.initialize(this.pinnedAnnouncement2, 4);
  }

  ngOnInit(): void {
    this.ListAnnouncementinHOA();
    this.listpinannouncement();
  }

  /** Reaction handling */
  setReaction(postIndex: number, emoji: string) {
    this.selectedEmoji[postIndex] = emoji;
  }

  /** Open Create Announcement modal */
  opencreatepost() {
    this.ModalService.open(CreateAnnouncementComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
  }

  /** Fetch Announcements */
  ListAnnouncementinHOA() {
    this.loadingPosts = true;
    this.apiService.ListAnnouncementinHOA<any>().subscribe({
      next: (res: any) => {
        this.loadingPosts = false;
        if (res?.success && Array.isArray(res.data)) {
          this.posts = res.data;
        } else {
          this.posts = [];
        }
      },
      error: () => {
        this.loadingPosts = false;
        this.posts = [];
      },
    });
  }

  /** Fetch pinned announcements */

  listpinannouncement() {
    this.loadingPinned = true;

    this.apiService.listpinannouncement<any>().subscribe({
      next: (res: any) => {
        this.loadingPinned = false;

        if (res?.success && Array.isArray(res.data)) {
          this.pinnedAnnouncement2 = res.data;

          // ✅ Initialize TableService only when data exists
          if (this.pinnedAnnouncement2.length > 0) {
            this.pinnedAnnouncement1 = new TableService();
            this.pinnedAnnouncement1.initialize(this.pinnedAnnouncement2, 4);
          }

          console.log(
            '📌 Pinned initialized:',
            this.pinnedAnnouncement1?.paginatedData
          );
        } else {
          this.pinnedAnnouncement2 = [];
        }
      },
      error: (err) => {
        this.loadingPinned = false;
        this.pinnedAnnouncement2 = [];
        console.error('❌ Failed to load pinned announcements:', err);
      },
    });
  }
}
