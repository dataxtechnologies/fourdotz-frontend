import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQrCodeComponent } from './view-qr-code.component';

describe('ViewQrCodeComponent', () => {
  let component: ViewQrCodeComponent;
  let fixture: ComponentFixture<ViewQrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewQrCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
