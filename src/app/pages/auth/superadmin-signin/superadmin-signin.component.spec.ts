import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminSigninComponent } from './superadmin-signin.component';

describe('SuperadminSigninComponent', () => {
  let component: SuperadminSigninComponent;
  let fixture: ComponentFixture<SuperadminSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperadminSigninComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperadminSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
