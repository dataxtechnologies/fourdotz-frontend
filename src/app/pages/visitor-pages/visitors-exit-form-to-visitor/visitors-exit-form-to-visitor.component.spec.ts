import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsExitFormToVisitorComponent } from './visitors-exit-form-to-visitor.component';

describe('VisitorsExitFormToVisitorComponent', () => {
  let component: VisitorsExitFormToVisitorComponent;
  let fixture: ComponentFixture<VisitorsExitFormToVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorsExitFormToVisitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorsExitFormToVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
