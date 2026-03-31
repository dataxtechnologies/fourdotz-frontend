import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPayoutAssociationComponent } from './request-payout-association.component';

describe('RequestPayoutAssociationComponent', () => {
  let component: RequestPayoutAssociationComponent;
  let fixture: ComponentFixture<RequestPayoutAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestPayoutAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestPayoutAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
