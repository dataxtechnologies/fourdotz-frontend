import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerViewSigningAgreementComponent } from './owner-view-signing-agreement.component';

describe('OwnerViewSigningAgreementComponent', () => {
  let component: OwnerViewSigningAgreementComponent;
  let fixture: ComponentFixture<OwnerViewSigningAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerViewSigningAgreementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerViewSigningAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
