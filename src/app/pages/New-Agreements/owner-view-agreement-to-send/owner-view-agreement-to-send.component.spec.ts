import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerViewAgreementToSendComponent } from './owner-view-agreement-to-send.component';

describe('OwnerViewAgreementToSendComponent', () => {
  let component: OwnerViewAgreementToSendComponent;
  let fixture: ComponentFixture<OwnerViewAgreementToSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerViewAgreementToSendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerViewAgreementToSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
