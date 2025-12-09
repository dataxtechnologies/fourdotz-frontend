import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordOtpPageComponent } from './password-otp-page.component';

describe('PasswordOtpPageComponent', () => {
  let component: PasswordOtpPageComponent;
  let fixture: ComponentFixture<PasswordOtpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordOtpPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordOtpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
