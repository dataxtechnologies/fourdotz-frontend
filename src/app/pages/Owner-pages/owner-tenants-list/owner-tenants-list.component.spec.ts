import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTenantsListComponent } from './owner-tenants-list.component';

describe('OwnerTenantsListComponent', () => {
  let component: OwnerTenantsListComponent;
  let fixture: ComponentFixture<OwnerTenantsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerTenantsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerTenantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
