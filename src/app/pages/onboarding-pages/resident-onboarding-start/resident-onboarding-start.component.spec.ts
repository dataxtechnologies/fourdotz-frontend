import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentOnboardingStartComponent } from './resident-onboarding-start.component';

describe('ResidentOnboardingStartComponent', () => {
  let component: ResidentOnboardingStartComponent;
  let fixture: ComponentFixture<ResidentOnboardingStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentOnboardingStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentOnboardingStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
