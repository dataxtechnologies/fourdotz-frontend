import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninPageNewComponent } from './signin-page-new.component';

describe('SigninPageNewComponent', () => {
  let component: SigninPageNewComponent;
  let fixture: ComponentFixture<SigninPageNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninPageNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninPageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
