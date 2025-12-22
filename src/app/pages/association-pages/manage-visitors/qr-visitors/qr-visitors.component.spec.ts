import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrVisitorsComponent } from './qr-visitors.component';

describe('QrVisitorsComponent', () => {
  let component: QrVisitorsComponent;
  let fixture: ComponentFixture<QrVisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrVisitorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
