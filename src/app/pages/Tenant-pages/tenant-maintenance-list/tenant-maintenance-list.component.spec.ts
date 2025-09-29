import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantMaintenanceListComponent } from './tenant-maintenance-list.component';

describe('TenantMaintenanceListComponent', () => {
  let component: TenantMaintenanceListComponent;
  let fixture: ComponentFixture<TenantMaintenanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantMaintenanceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantMaintenanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
