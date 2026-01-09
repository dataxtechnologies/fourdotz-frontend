import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAgreementOwnerToCreateComponent } from './select-agreement-owner-to-create.component';

describe('SelectAgreementOwnerToCreateComponent', () => {
  let component: SelectAgreementOwnerToCreateComponent;
  let fixture: ComponentFixture<SelectAgreementOwnerToCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAgreementOwnerToCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAgreementOwnerToCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
