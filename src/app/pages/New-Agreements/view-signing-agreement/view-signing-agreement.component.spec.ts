import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSigningAgreementComponent } from './view-signing-agreement.component';

describe('ViewSigningAgreementComponent', () => {
  let component: ViewSigningAgreementComponent;
  let fixture: ComponentFixture<ViewSigningAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSigningAgreementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSigningAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
