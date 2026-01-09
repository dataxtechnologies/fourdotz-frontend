import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewAgreementTosendComponent } from './view-new-agreement-tosend.component';

describe('ViewNewAgreementTosendComponent', () => {
  let component: ViewNewAgreementTosendComponent;
  let fixture: ComponentFixture<ViewNewAgreementTosendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewNewAgreementTosendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNewAgreementTosendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
