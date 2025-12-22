import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateKeeperPreVisitorComponent } from './gate-keeper-pre-visitor.component';

describe('GateKeeperPreVisitorComponent', () => {
  let component: GateKeeperPreVisitorComponent;
  let fixture: ComponentFixture<GateKeeperPreVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateKeeperPreVisitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateKeeperPreVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
