import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotVisitorEntryComponent } from './spot-visitor-entry.component';

describe('SpotVisitorEntryComponent', () => {
  let component: SpotVisitorEntryComponent;
  let fixture: ComponentFixture<SpotVisitorEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotVisitorEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotVisitorEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
