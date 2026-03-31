import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutReqListComponent } from './payout-req-list.component';

describe('PayoutReqListComponent', () => {
  let component: PayoutReqListComponent;
  let fixture: ComponentFixture<PayoutReqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayoutReqListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutReqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
