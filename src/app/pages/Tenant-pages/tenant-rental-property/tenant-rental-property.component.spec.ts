import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantRentalPropertyComponent } from './tenant-rental-property.component';

describe('TenantRentalPropertyComponent', () => {
  let component: TenantRentalPropertyComponent;
  let fixture: ComponentFixture<TenantRentalPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantRentalPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantRentalPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
