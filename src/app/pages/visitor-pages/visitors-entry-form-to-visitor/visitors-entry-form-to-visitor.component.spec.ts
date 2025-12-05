import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsEntryFormToVisitorComponent } from './visitors-entry-form-to-visitor.component';

describe('VisitorsEntryFormToVisitorComponent', () => {
  let component: VisitorsEntryFormToVisitorComponent;
  let fixture: ComponentFixture<VisitorsEntryFormToVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorsEntryFormToVisitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorsEntryFormToVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
