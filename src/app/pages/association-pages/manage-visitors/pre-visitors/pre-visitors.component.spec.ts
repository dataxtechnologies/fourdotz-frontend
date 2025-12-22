import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreVisitorsComponent } from './pre-visitors.component';

describe('PreVisitorsComponent', () => {
  let component: PreVisitorsComponent;
  let fixture: ComponentFixture<PreVisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreVisitorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
