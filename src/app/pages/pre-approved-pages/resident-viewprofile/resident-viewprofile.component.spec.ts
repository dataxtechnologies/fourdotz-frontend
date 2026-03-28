import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentViewprofileComponent } from './resident-viewprofile.component';

describe('ResidentViewprofileComponent', () => {
  let component: ResidentViewprofileComponent;
  let fixture: ComponentFixture<ResidentViewprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentViewprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentViewprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
