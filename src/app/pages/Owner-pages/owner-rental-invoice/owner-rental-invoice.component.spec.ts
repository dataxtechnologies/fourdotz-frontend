import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerRentalInvoiceComponent } from './owner-rental-invoice.component';

describe('OwnerRentalInvoiceComponent', () => {
  let component: OwnerRentalInvoiceComponent;
  let fixture: ComponentFixture<OwnerRentalInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerRentalInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerRentalInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
