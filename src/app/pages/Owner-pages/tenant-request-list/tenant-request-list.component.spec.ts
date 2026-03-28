import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantRequestListComponent } from './tenant-request-list.component';

describe('TenantRequestListComponent', () => {
  let component: TenantRequestListComponent;
  let fixture: ComponentFixture<TenantRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantRequestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
