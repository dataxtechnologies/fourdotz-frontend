import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateKeeperVisitorListComponent } from './gate-keeper-visitor-list.component';

describe('GateKeeperVisitorListComponent', () => {
  let component: GateKeeperVisitorListComponent;
  let fixture: ComponentFixture<GateKeeperVisitorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateKeeperVisitorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateKeeperVisitorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
