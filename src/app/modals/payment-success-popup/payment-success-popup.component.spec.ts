import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuccessPopupComponent } from './payment-success-popup.component';

describe('PaymentSuccessPopupComponent', () => {
  let component: PaymentSuccessPopupComponent;
  let fixture: ComponentFixture<PaymentSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentSuccessPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
