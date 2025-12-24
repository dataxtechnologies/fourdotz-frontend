import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateKeeperQrVisitorComponent } from './gate-keeper-qr-visitor.component';

describe('GateKeeperQrVisitorComponent', () => {
  let component: GateKeeperQrVisitorComponent;
  let fixture: ComponentFixture<GateKeeperQrVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateKeeperQrVisitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateKeeperQrVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
