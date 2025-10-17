import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleDataComponent } from './edit-vehicle-data.component';

describe('EditVehicleDataComponent', () => {
  let component: EditVehicleDataComponent;
  let fixture: ComponentFixture<EditVehicleDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVehicleDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVehicleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
