import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPayoutDetailsComponent } from './view-payout-details.component';

describe('ViewPayoutDetailsComponent', () => {
  let component: ViewPayoutDetailsComponent;
  let fixture: ComponentFixture<ViewPayoutDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPayoutDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPayoutDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
