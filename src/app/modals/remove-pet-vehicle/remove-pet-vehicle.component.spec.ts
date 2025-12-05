import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePetVehicleComponent } from './remove-pet-vehicle.component';

describe('RemovePetVehicleComponent', () => {
  let component: RemovePetVehicleComponent;
  let fixture: ComponentFixture<RemovePetVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemovePetVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemovePetVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
