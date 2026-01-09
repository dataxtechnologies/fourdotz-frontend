import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSigingAgreementListComponent } from './owner-siging-agreement-list.component';

describe('OwnerSigingAgreementListComponent', () => {
  let component: OwnerSigingAgreementListComponent;
  let fixture: ComponentFixture<OwnerSigingAgreementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerSigingAgreementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerSigingAgreementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
