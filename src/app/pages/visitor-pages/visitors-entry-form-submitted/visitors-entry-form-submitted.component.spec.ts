import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsEntryFormSubmittedComponent } from './visitors-entry-form-submitted.component';

describe('VisitorsEntryFormSubmittedComponent', () => {
  let component: VisitorsEntryFormSubmittedComponent;
  let fixture: ComponentFixture<VisitorsEntryFormSubmittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorsEntryFormSubmittedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorsEntryFormSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
