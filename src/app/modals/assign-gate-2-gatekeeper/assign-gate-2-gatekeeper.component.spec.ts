import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignGate2GatekeeperComponent } from './assign-gate-2-gatekeeper.component';

describe('AssignGate2GatekeeperComponent', () => {
  let component: AssignGate2GatekeeperComponent;
  let fixture: ComponentFixture<AssignGate2GatekeeperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignGate2GatekeeperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignGate2GatekeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
