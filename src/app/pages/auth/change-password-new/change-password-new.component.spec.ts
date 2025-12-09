import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordNewComponent } from './change-password-new.component';

describe('ChangePasswordNewComponent', () => {
  let component: ChangePasswordNewComponent;
  let fixture: ComponentFixture<ChangePasswordNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasswordNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
