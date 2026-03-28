import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantApprovalModalComponent } from './tenant-approval-modal.component';

describe('TenantApprovalModalComponent', () => {
  let component: TenantApprovalModalComponent;
  let fixture: ComponentFixture<TenantApprovalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantApprovalModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantApprovalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
