import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFailurePopupComponent } from './payment-failure-popup.component';

describe('PaymentFailurePopupComponent', () => {
  let component: PaymentFailurePopupComponent;
  let fixture: ComponentFixture<PaymentFailurePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentFailurePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFailurePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
