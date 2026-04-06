import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationInactiveComponent } from './association-inactive.component';

describe('AssociationInactiveComponent', () => {
  let component: AssociationInactiveComponent;
  let fixture: ComponentFixture<AssociationInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationInactiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
