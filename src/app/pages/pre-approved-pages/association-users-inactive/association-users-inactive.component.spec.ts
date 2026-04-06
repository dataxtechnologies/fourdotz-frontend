import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationUsersInactiveComponent } from './association-users-inactive.component';

describe('AssociationUsersInactiveComponent', () => {
  let component: AssociationUsersInactiveComponent;
  let fixture: ComponentFixture<AssociationUsersInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationUsersInactiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationUsersInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
