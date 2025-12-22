import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotVisitorsComponent } from './spot-visitors.component';

describe('SpotVisitorsComponent', () => {
  let component: SpotVisitorsComponent;
  let fixture: ComponentFixture<SpotVisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotVisitorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
