import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from 'ngx-modal-ease';

@Component({
  selector: 'app-view-all-pinned-announcements',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './view-all-pinned-announcements.component.html',
  styleUrl: './view-all-pinned-announcements.component.css'
})
export class ViewAllPinnedAnnouncementsComponent {

 @Input() PinnedAnnouncement: any = [];

  activePost: any = null;

  constructor(private Modal : ModalService){}

  ngOnInit(): void {
    console.log('PinnedAnnouncement', this.PinnedAnnouncement);
    
    // Set first item as active post
    if (this.PinnedAnnouncement?.length > 0) {
      this.activePost = this.PinnedAnnouncement[0];
    }
  }

  setActive(post: any) {
    this.activePost = post;
  }

  closeModal() {
    this.Modal.close()
    console.log("Close modal");
  }

}
