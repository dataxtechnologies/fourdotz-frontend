import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDashboardNewComponent } from './owner-dashboard-new.component';

describe('OwnerDashboardNewComponent', () => {
  let component: OwnerDashboardNewComponent;
  let fixture: ComponentFixture<OwnerDashboardNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerDashboardNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerDashboardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
