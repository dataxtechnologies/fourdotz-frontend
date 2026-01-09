import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendAgreementToTenantComponent } from './send-agreement-to-tenant.component';

describe('SendAgreementToTenantComponent', () => {
  let component: SendAgreementToTenantComponent;
  let fixture: ComponentFixture<SendAgreementToTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendAgreementToTenantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendAgreementToTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
