import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationOnboardingStartComponent } from './association-onboarding-start.component';

describe('AssociationOnboardingStartComponent', () => {
  let component: AssociationOnboardingStartComponent;
  let fixture: ComponentFixture<AssociationOnboardingStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationOnboardingStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationOnboardingStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
