import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGeneralQueryDetailsComponent } from './view-general-query-details.component';

describe('ViewGeneralQueryDetailsComponent', () => {
  let component: ViewGeneralQueryDetailsComponent;
  let fixture: ComponentFixture<ViewGeneralQueryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewGeneralQueryDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGeneralQueryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
