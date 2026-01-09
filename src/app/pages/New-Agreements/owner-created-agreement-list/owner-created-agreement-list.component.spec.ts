import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCreatedAgreementListComponent } from './owner-created-agreement-list.component';

describe('OwnerCreatedAgreementListComponent', () => {
  let component: OwnerCreatedAgreementListComponent;
  let fixture: ComponentFixture<OwnerCreatedAgreementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerCreatedAgreementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerCreatedAgreementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
