import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateKeeperGatesComponent } from './gate-keeper-gates.component';

describe('GateKeeperGatesComponent', () => {
  let component: GateKeeperGatesComponent;
  let fixture: ComponentFixture<GateKeeperGatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateKeeperGatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateKeeperGatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
