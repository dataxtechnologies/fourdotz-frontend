import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalInvoiceComponent } from './global-invoice.component';

describe('GlobalInvoiceComponent', () => {
  let component: GlobalInvoiceComponent;
  let fixture: ComponentFixture<GlobalInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
