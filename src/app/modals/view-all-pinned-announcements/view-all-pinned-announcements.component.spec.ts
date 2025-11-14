import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllPinnedAnnouncementsComponent } from './view-all-pinned-announcements.component';

describe('ViewAllPinnedAnnouncementsComponent', () => {
  let component: ViewAllPinnedAnnouncementsComponent;
  let fixture: ComponentFixture<ViewAllPinnedAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllPinnedAnnouncementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllPinnedAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
