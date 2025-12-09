import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLayoutNewComponent } from './dashboard-layout-new.component';

describe('DashboardLayoutNewComponent', () => {
  let component: DashboardLayoutNewComponent;
  let fixture: ComponentFixture<DashboardLayoutNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLayoutNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLayoutNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
