import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutUpdateStatusSAComponent } from './payout-update-status-sa.component';

describe('PayoutUpdateStatusSAComponent', () => {
  let component: PayoutUpdateStatusSAComponent;
  let fixture: ComponentFixture<PayoutUpdateStatusSAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoutUpdateStatusSAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutUpdateStatusSAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
