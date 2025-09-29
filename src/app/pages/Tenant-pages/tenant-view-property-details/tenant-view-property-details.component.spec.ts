import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantViewPropertyDetailsComponent } from './tenant-view-property-details.component';

describe('TenantViewPropertyDetailsComponent', () => {
  let component: TenantViewPropertyDetailsComponent;
  let fixture: ComponentFixture<TenantViewPropertyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantViewPropertyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantViewPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
