import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendAgreementToUserComponent } from './send-agreement-to-user.component';

describe('SendAgreementToUserComponent', () => {
  let component: SendAgreementToUserComponent;
  let fixture: ComponentFixture<SendAgreementToUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendAgreementToUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendAgreementToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
