import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerMaintenanceListComponent } from './owner-maintenance-list.component';

describe('OwnerMaintenanceListComponent', () => {
  let component: OwnerMaintenanceListComponent;
  let fixture: ComponentFixture<OwnerMaintenanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerMaintenanceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerMaintenanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
