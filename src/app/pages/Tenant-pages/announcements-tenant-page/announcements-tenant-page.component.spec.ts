import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsTenantPageComponent } from './announcements-tenant-page.component';

describe('AnnouncementsTenantPageComponent', () => {
  let component: AnnouncementsTenantPageComponent;
  let fixture: ComponentFixture<AnnouncementsTenantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementsTenantPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementsTenantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
