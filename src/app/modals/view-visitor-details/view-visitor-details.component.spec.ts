import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVisitorDetailsComponent } from './view-visitor-details.component';

describe('ViewVisitorDetailsComponent', () => {
  let component: ViewVisitorDetailsComponent;
  let fixture: ComponentFixture<ViewVisitorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewVisitorDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVisitorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
