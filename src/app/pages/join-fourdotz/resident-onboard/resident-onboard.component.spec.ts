import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentOnboardComponent } from './resident-onboard.component';

describe('ResidentOnboardComponent', () => {
  let component: ResidentOnboardComponent;
  let fixture: ComponentFixture<ResidentOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentOnboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
