import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationSlotsManagementComponent } from './association-slots-management.component';

describe('AssociationSlotsManagementComponent', () => {
  let component: AssociationSlotsManagementComponent;
  let fixture: ComponentFixture<AssociationSlotsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationSlotsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationSlotsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
