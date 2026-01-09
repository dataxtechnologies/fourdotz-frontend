import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSavedAgreementComponent } from './view-saved-agreement.component';

describe('ViewSavedAgreementComponent', () => {
  let component: ViewSavedAgreementComponent;
  let fixture: ComponentFixture<ViewSavedAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSavedAgreementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSavedAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
