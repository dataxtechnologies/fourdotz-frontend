import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceInvoicePaymentComponent } from './maintenance-invoice-payment.component';

describe('MaintenanceInvoicePaymentComponent', () => {
  let component: MaintenanceInvoicePaymentComponent;
  let fixture: ComponentFixture<MaintenanceInvoicePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceInvoicePaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceInvoicePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
