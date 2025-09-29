import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantRentalListComponent } from './tenant-rental-list.component';

describe('TenantRentalListComponent', () => {
  let component: TenantRentalListComponent;
  let fixture: ComponentFixture<TenantRentalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantRentalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantRentalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
