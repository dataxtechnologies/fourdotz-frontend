import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMaintenanceComponent } from './generate-maintenance.component';

describe('GenerateMaintenanceComponent', () => {
  let component: GenerateMaintenanceComponent;
  let fixture: ComponentFixture<GenerateMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateMaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
