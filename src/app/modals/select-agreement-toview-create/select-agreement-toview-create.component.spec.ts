import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAgreementToviewCreateComponent } from './select-agreement-toview-create.component';

describe('SelectAgreementToviewCreateComponent', () => {
  let component: SelectAgreementToviewCreateComponent;
  let fixture: ComponentFixture<SelectAgreementToviewCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAgreementToviewCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAgreementToviewCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
