import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerApprovalModalComponent } from './owner-approval-modal.component';

describe('OwnerApprovalModalComponent', () => {
  let component: OwnerApprovalModalComponent;
  let fixture: ComponentFixture<OwnerApprovalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerApprovalModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerApprovalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
