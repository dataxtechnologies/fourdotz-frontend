import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrVisitorListComponent } from './qr-visitor-list.component';

describe('QrVisitorListComponent', () => {
  let component: QrVisitorListComponent;
  let fixture: ComponentFixture<QrVisitorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrVisitorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrVisitorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
