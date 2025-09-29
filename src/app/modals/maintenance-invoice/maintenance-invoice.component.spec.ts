import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceInvoiceComponent } from './maintenance-invoice.component';

describe('MaintenanceInvoiceComponent', () => {
  let component: MaintenanceInvoiceComponent;
  let fixture: ComponentFixture<MaintenanceInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
