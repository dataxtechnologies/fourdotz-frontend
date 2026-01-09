import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSavedAgreementComponent } from './list-saved-agreement.component';

describe('ListSavedAgreementComponent', () => {
  let component: ListSavedAgreementComponent;
  let fixture: ComponentFixture<ListSavedAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSavedAgreementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSavedAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
