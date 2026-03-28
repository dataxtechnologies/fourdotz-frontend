import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResidentRequestDetailsComponent } from './view-resident-request-details.component';

describe('ViewResidentRequestDetailsComponent', () => {
  let component: ViewResidentRequestDetailsComponent;
  let fixture: ComponentFixture<ViewResidentRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewResidentRequestDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResidentRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
