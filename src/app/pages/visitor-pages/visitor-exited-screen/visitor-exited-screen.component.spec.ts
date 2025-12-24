import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorExitedScreenComponent } from './visitor-exited-screen.component';

describe('VisitorExitedScreenComponent', () => {
  let component: VisitorExitedScreenComponent;
  let fixture: ComponentFixture<VisitorExitedScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorExitedScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorExitedScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
