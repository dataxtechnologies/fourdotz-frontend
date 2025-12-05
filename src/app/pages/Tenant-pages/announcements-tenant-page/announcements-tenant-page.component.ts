import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from 'ngx-modal-ease';
import { ApiserviceService } from '../../../services/api/apiservice.service';
import { TableService } from '../../../services/tableservice.service';
import { ViewAllPinnedAnnouncementsComponent } from '../../../modals/view-all-pinned-announcements/view-all-pinned-announcements.component';
import { ViewAnnouncementsComponent } from '../../../modals/view-announcements/view-announcements.component';
import { CreateAnnouncementComponent } from '../../../modals/create-announcement/create-announcement.component';
import { AssociationServiceService } from '../../../services/association/association-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-announcements-tenant-page',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './announcements-tenant-page.component.html',
  styleUrl: './announcements-tenant-page.component.css'
})
export class AnnouncementsTenantPageComponent {
 posts: any[] = [];
  pinnedannouncement: any[] = [];
  selectedCategory: string = 'all';
  selectedDateRange: string = 'all';
  filteredPosts: any[] = [];
  selectedEmoji: { [key: number]: string } = {};
  pinnedpost = false
  loadingPosts = true; // 🔹 skeleton for posts
  loadingPinned = true; // 🔹 skeleton for pinned posts

  pinnedAnnouncement1;
  pinnedAnnouncement2: any;

  constructor(
    private ModalService: ModalService,
    private apiService: ApiserviceService,
    private AssociationService: AssociationServiceService
  ) {
    this.pinnedAnnouncement1 = new TableService();
    this.pinnedAnnouncement1.initialize(this.pinnedAnnouncement2, 4);
  }

  ngOnInit(): void {
    this.ListAnnouncementinOwnerTenant();
    this.listpinannouncement();

    // this.AssociationService.AnnouncementCreatedStatus$.subscribe(
    //   (AnnouncementCreated) => {
    //     if (AnnouncementCreated) {
    //       this.ListAnnouncementinOwnerTenant();
    //     }
    //   }
    // );
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
  ListAnnouncementinOwnerTenant() {
    this.loadingPosts = true;

    this.apiService.ListAnnouncementinOwnerTenant<any>().subscribe({
      next: (res: any) => {
        this.loadingPosts = false;

       if (res?.success && Array.isArray(res.data)) {
          this.posts = res.data.map((post: any) => {
            if (Array.isArray(post.images)) {
              post.attachments = post.images.map((url: string) => {
                const isVideo = url
                  .toLowerCase()
                  .match(/\.(mp4|mov|avi|mkv|webm)$/);
                return {
                  url,
                  type: isVideo ? 'video' : 'image',
                };
              });
            } else {
              post.attachments = [];
            }
            return post;
          });

          // 🔥 Just apply filters — NO pin logic needed here
          this.applyFilters();
        } else {
          this.posts = [];
          this.filteredPosts = [];
        }
      },
      error: () => {
        this.loadingPosts = false;
        this.posts = [];
        this.filteredPosts = [];
      },
    });
  }

  applyFilters() {
    let data = [...this.posts];

    // ----- Category Filter -----
    if (this.selectedCategory !== 'all') {
      data = data.filter((post) => post.category === this.selectedCategory);
    }

    // ----- Date Range Filter -----
    const today = new Date();

    if (this.selectedDateRange === 'today') {
      data = data.filter((post) => {
        const postDate = new Date(post.created_time.$date);
        return postDate.toDateString() === today.toDateString();
      });
    }

    if (this.selectedDateRange === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);

      data = data.filter((post) => {
        const postDate = new Date(post.created_time.$date);
        return postDate >= weekAgo && postDate <= today;
      });
    }

    if (this.selectedDateRange === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(today.getMonth() - 1);

      data = data.filter((post) => {
        const postDate = new Date(post.created_time.$date);
        return postDate >= monthAgo && postDate <= today;
      });
    }

    if (this.selectedDateRange === '3months') {
      const monthsAgo = new Date();
      monthsAgo.setMonth(today.getMonth() - 3);

      data = data.filter((post) => {
        const postDate = new Date(post.created_time.$date);
        return postDate >= monthsAgo && postDate <= today;
      });
    }

    // 🔥 Push filtered list to center feed
    this.filteredPosts = data;
  }

  Createpinannouncement(data: any) {
    this.loadingPosts = true;
    const payload = {
      announcement_id: data,
    };
    this.apiService.Createpinannouncement<any>(payload).subscribe({
      next: (res: any) => {
        this.loadingPosts = false;
        if (res?.success) {
          this.listpinannouncement();
          this.ListAnnouncementinOwnerTenant();
        } else {
          // this.posts = [];
        }
      },
      error: () => {
        this.loadingPosts = false;
        // this.posts = [];
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

  viewpost(data: any) {
    this.ModalService.open(ViewAnnouncementsComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      data: {
        Postdetails: data,
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
  }

  viewallpinnedAnnouncement(data: any) {
    this.ModalService.open(ViewAllPinnedAnnouncementsComponent, {
      modal: {
        enter: 'enter-going-down 0.3s ease-out',
        leave: 'fade-out 0.5s',
      },
      data: {
        PinnedAnnouncement: data,
      },
      overlay: { leave: 'fade-out 0.5s' },
      actions: { click: false, escape: false },
    });
  }
}
