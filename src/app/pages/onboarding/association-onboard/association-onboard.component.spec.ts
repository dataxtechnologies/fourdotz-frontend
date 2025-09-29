import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationOnboardComponent } from './association-onboard.component';

describe('AssociationOnboardComponent', () => {
  let component: AssociationOnboardComponent;
  let fixture: ComponentFixture<AssociationOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationOnboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
