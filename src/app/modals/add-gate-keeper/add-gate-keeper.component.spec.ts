import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGateKeeperComponent } from './add-gate-keeper.component';

describe('AddGateKeeperComponent', () => {
  let component: AddGateKeeperComponent;
  let fixture: ComponentFixture<AddGateKeeperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGateKeeperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGateKeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
