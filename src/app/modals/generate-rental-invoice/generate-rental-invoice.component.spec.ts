import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateRentalInvoiceComponent } from './generate-rental-invoice.component';

describe('GenerateRentalInvoiceComponent', () => {
  let component: GenerateRentalInvoiceComponent;
  let fixture: ComponentFixture<GenerateRentalInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateRentalInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateRentalInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
