import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutApproveSAComponent } from './payout-approve-sa.component';

describe('PayoutApproveSAComponent', () => {
  let component: PayoutApproveSAComponent;
  let fixture: ComponentFixture<PayoutApproveSAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoutApproveSAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutApproveSAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
