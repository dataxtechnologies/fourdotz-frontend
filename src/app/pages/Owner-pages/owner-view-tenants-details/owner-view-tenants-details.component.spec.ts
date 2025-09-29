import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerViewTenantsDetailsComponent } from './owner-view-tenants-details.component';

describe('OwnerViewTenantsDetailsComponent', () => {
  let component: OwnerViewTenantsDetailsComponent;
  let fixture: ComponentFixture<OwnerViewTenantsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerViewTenantsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerViewTenantsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
