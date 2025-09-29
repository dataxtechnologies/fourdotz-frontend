import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResidentDetailsComponent } from './view-resident-details.component';

describe('ViewResidentDetailsComponent', () => {
  let component: ViewResidentDetailsComponent;
  let fixture: ComponentFixture<ViewResidentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewResidentDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResidentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
